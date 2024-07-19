"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  MenuItem,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { PanelHeading } from "@root/components/PanelHeading";
import ButtonItem from "@root/components/ButtonItem";
import {
  useCreateOneBaseClaimsControllerClaims,
  useReplaceOneBaseClaimsControllerClaims,
  useGetManyBaseProductsControllerProducts,
} from "../../../backend/backendComponents";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../../../components/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { claimSchema } from "../schema/schema";
import InputField from "@root/components/InputField";
import SelectComp from "@root/components/SelectComp";
import { ClaimType } from "../page";

interface Options {
  value: number;
  label: string;
}

interface ManageClaimProps {
  isEdit: boolean;
  initialClaimData?: any;
  refetchClaimDetails: () => void;
}

const ManageClaim: React.FC<ManageClaimProps> = ({
  isEdit,
  initialClaimData,
  refetchClaimDetails,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [infoMsg, setInfoMsg] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  const [editUserId, setEditUserId] = useState(searchParams?.get("id"));
  const [productOptions, setProductOptions] = useState<Options[]>([]);
  const [fieldValues, setFieldValues] = useState<any>(
    isEdit
      ? {
          name: initialClaimData?.name || "",
          productId: initialClaimData?.productId || "",
        }
      : {
          name: "",
          productId: "",
        }
  );

  const handleChangeLocation = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    setFieldValues({ ...fieldValues, [name as string]: value as number });
  };

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const { mutateAsync: createClaim } = useCreateOneBaseClaimsControllerClaims();
  const { mutateAsync: updateClaim } =
    useReplaceOneBaseClaimsControllerClaims();

  const { data: productDetails, refetch: refetchProductDetails } =
    useGetManyBaseProductsControllerProducts({}, { enabled: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await refetchProductDetails();

        if (Array.isArray(result.data) && result.data.length > 0) {
          const options = result.data
            .map((item: any) => ({
              value: item.id,
              label: item.name,
            }))
            .sort((a: any, b: any) => a.label.localeCompare(b.label));
          setProductOptions(options);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    };
    fetchData();
  }, [refetchProductDetails]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(claimSchema(isEdit)),
  });

  const onSubmit = async (data: ClaimType) => {
    const requestBody: ClaimType = {
      name: data?.name,
      productId: data.productId,
    };
    
    let claimResponse: any;
    try {
      if (isEdit || (isEdit && claimResponse?.id)) {
        claimResponse = await updateClaim({
          pathParams: {
            id: parseInt(editUserId as unknown as string),
          },
          body: requestBody as any,
        });
      } else {
        claimResponse = await createClaim({
          body: requestBody as any,
        });
      }
      debugger;
      if (claimResponse?.statusCode === 409) {
        setIsConfirmationModalOpen(true);
        setInfoMsg(claimResponse.message);
      }  else if (!isEdit || (isEdit && claimResponse?.statusCode == 200)) {
        setSuccess(true);
        setIsConfirmationModalOpen(true);
        setInfoMsg(`Claim successfully ${isEdit ? "updated" : "created"}`);
      } else {
        setIsConfirmationModalOpen(true);
        const error =
          claimResponse?.message ||
          `Something went wrong while ${
            isEdit ? "updating" : "creating"
          } claim...`;
        setInfoMsg(error);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setIsConfirmationModalOpen(true);
      setInfoMsg(`Something went wrong: ${(error as any).message}`);
    }
  };

  const handleBack = () => {
    router.push("/claims");
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
    if (success) router.push("/claims");
  };

  useEffect(() => {
    if (isEdit) {
      setValue("name", fieldValues?.name);
      setValue("productId", fieldValues?.productId);
    }
  }, [isEdit, setValue]);

  return (
    <>
      <Box className="content-wrapper pb-6 pl-6 pr-6 h-full relative">
        <Box className="main-header sticky top-0 bg-lightgrey z-[4] pt-4 pb-4 mb-4 res-title-height flex flex-wrap justify-between items-center">
          <PanelHeading
            firstHeading={`${isEdit ? "Edit Claim" : " Create Claim"}`}
          />
        </Box>

        <Modal
          isOpen={isConfirmationModalOpen}
          onClose={handleConfirmationCloseModal}
          modalextraclass="modal-small"
        >
          <Box className="modal-main-data">
            <Typography variant="h6" className="note-description text-center">
              {infoMsg}
            </Typography>

            <Box>
              <Box className="w-100 flex justify-center button-group-data">
                <ButtonItem
                  className="outlineBtn mx-1"
                  ButtonTitle="Close"
                  type="button"
                  onClick={handleConfirmationCloseModal}
                />
              </Box>
            </Box>
          </Box>
        </Modal>

        <Box className="main-wrapper inline-block w-full h-full max-h-full pb-4">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <Box className="scroll-content-item">
              <Box className="user-form card-fields small-form-control bg-white max-w-[100%] my-0 mx-auto rounded-[20px]">
                <Box className="user-form-in" key={0}>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      className="mb-0"
                    >
                      <label className="form-custom-label">
                        Claim Name
                        <span style={{ color: "red" }}>
                          <sup>*</sup>
                        </span>
                      </label>
                      <InputField
                        register={register("name")}
                        name="name"
                        maxLength={64}
                        placeholder="Enter Claim Name"
                        type="text"
                        defaultValue={fieldValues?.name}
                        className="dropdownComponent rounded-lg text-blacklight600 p-0"
                        helperText={errors.name?.message}
                        error={Boolean(errors.name)}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      className="mb-0"
                    >
                      <Grid className="dropdownComponent custom-selectitem-main">
                        <label className="form-custom-label">
                          Product Name
                          <span style={{ color: "red" }}>
                            <sup>*</sup>
                          </span>
                        </label>
                        <SelectComp
                          {...register("productId")}
                          name="productId"
                          labelId="product-id"
                          id="productId"
                          className="custom-select-item"
                          input={<OutlinedInput />}
                          value={fieldValues.productId || ""}
                          displayEmpty
                          fullWidth
                          onChange={handleChangeLocation}
                          error={Boolean(errors?.productId)}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: "300px",
                                overflowY: "auto",
                              },
                            },
                          }}
                        >
                          <MenuItem value="" disabled>
                            <Box className="opacity-50">
                              Select Product Name
                            </Box>
                          </MenuItem>
                          {productOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </SelectComp>

                        {errors.productId && (
                          <FormHelperText error>
                            {errors.productId.message}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                <Box className="w-100 mb-2 mt-5 pt-5 flex justify-center">
                  <ButtonItem
                    className="outlineBtn mx-1"
                    ButtonTitle="Cancel"
                    type="button"
                    onClick={handleBack}
                  />
                  <ButtonItem
                    className="containBtn mx-1"
                    ButtonTitle="Save"
                    type="submit"
                  />
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ManageClaim;
