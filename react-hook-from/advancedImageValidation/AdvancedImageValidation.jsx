import React from 'react'
import { get, useForm } from "react-hook-form";
import classNames from "classnames";

const getDimension = async (file) => {
    let reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort();
            reject(new DOMException("Problem parsing input file."));
        };

        reader.onload = () => {
            var image = new Image();
            image.src = reader.result;
            image.onload = function () {
                resolve({ width: this.width, height: this.height });
            };
        };
        reader.readAsDataURL(file);
    });
};

const AdvancedImageValidation = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => console.log("form data::", data);

  return (
    <>
          <div className="card border-0 shadow">
              <div className="card-header">Upload Images</div>
              <div className="card-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="custom-file mb-3">
                          <input
                              type="file"
                              className={classNames("custom-file-input", {
                                  "is-invalid": errors.profile
                              })}
                              id="validatedCustomFile"
                              {...register('profile', {
                                  required: "this field is required.",
                                  validate: async (value) => {
                                      console.log(value[0]);
                                      const fileTypes = ["jpg", "png", "jpeg"];
                                      const fileType = value[0].name.split(".")[1];

                                      if (!fileTypes.includes(fileType)) {
                                          return `please upload a valid file format. (${fileTypes})`;
                                      }

                                      const sizes = await getDimension(value[0]);
                                      if (sizes.width > 1000 && sizes.height > 1000) {
                                          return "Image width and height must be less than or equal to 1000px";
                                      }

                                      const fileSize = Math.round(value[0].size / 1024);
                                      if (fileSize > 500) {
                                          return "file size must be lower than 500kb";
                                      }
                                  }
                              })}
                          />
                          <label className="custom-file-label" htmlFor="validatedCustomFile">
                              Choose file...
                          </label>
                          {errors.profile && (
                              <div className="invalid-feedback">{errors.profile.message}</div>
                          )}
                      </div>
                      <button className="btn btn-primary" type="submit">
                          Upload Profile
                      </button>
                  </form>
              </div>
          </div>
    </>
  )
}

export default AdvancedImageValidation