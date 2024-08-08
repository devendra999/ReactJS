"use client";

import { useState } from "react";

interface FormType {
  firstname: string;
  lastname: string;
  email: string;
  phone: number | undefined;
  birthYear: number | undefined;
  state: string;
  gender: string | undefined;
  courses: string[];
}

export default function Home() {
  const initialFormData: FormType = {
    firstname: "",
    lastname: "",
    email: "",
    phone: undefined,
    birthYear: undefined,
    state: "",
    gender: undefined,
    courses: [],
  };

  const [formData, setFormData] = useState<FormType>(initialFormData);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData({ ...formData, courses: [...formData.courses, value] });
      } else {
        setFormData({
          ...formData,
          courses: formData.courses.filter((course) => course !== value),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // Reset form data after submission if needed
    setFormData(initialFormData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
          placeholder="First Name"
        />

        <br />
        <br />

        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
          placeholder="Last Name"
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />

        <br />
        <br />

        <input
          type="number"
          name="phone"
          value={formData.phone || ""}
          onChange={handleInputChange}
          placeholder="Phone"
        />

        <br />
        <br />

        <select
          name="birthYear"
          value={formData.birthYear || ""}
          onChange={handleInputChange}
        >
          <option value="">Select Birth Year</option>
          <option value="2000">2000</option>
          <option value="2001">2001</option>
          <option value="2002">2002</option>
          <option value="2003">2003</option>
        </select>

        <br />
        <br />

        <select
          name="state"
          value={formData.state}
          onChange={handleInputChange}
        >
          <option value="">Select State</option>
          <option value="NY">New York</option>
          <option value="CA">California</option>
          {/* Add more options as needed */}
        </select>

        <br />
        <br />

        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleInputChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleInputChange}
            />
            Female
          </label>
        </div>

        <br />
        <br />

        <div>
          <label>
            <input
              type="checkbox"
              name="courses"
              value="math"
              checked={formData.courses.includes("math")}
              onChange={handleInputChange}
            />
            Math
          </label>
          <label>
            <input
              type="checkbox"
              name="courses"
              value="hindi"
              checked={formData.courses.includes("hindi")}
              onChange={handleInputChange}
            />
            Hindi
          </label>
          <label>
            <input
              type="checkbox"
              name="courses"
              value="science"
              checked={formData.courses.includes("science")}
              onChange={handleInputChange}
            />
            Science
          </label>
        </div>

        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
