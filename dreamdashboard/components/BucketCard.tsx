import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  List,
  ListItem,
  Divider,
  Grid,
  Box,
} from "@mui/material";
import IconButton from "@root/components/IconButton";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ButtonItem from "@root/components/ButtonItem";
import { useRouter } from "next/navigation";
import { getFromLocalStorage } from "@root/utils/common";
import Image from "next/image";
import EditIconImage from "../assets/icons/edit.svg";
import SaveIconImage from "../assets/icons/save-icon.svg";
import SettingIcon from "../assets/images/setting-icon.svg";
import {
  useUpdateOneBaseImportBucketControllerImportBucket,
  useGetManyBaseImportBucketControllerImportBucket,
} from "../backend/backendComponents";
import Modal from "@root/components/Modal";
import InputField from "./InputField";
import { useEffect, useState } from "react";
import { boolean } from "yup";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
const brandId = JSON.parse(getFromLocalStorage("@brand-id") || "{}");
interface BucketCardProps {
  data: {
    title: string;
    list: any;
    bucketId: number;
    updatedAt: Date;
    createdAt: Date;
  }[];
  flagFunction: (param: any) => void;
}
const BucketCard: React.FC<BucketCardProps> = (props: any) => {
  const router = useRouter();

  const isSuperAdmin = getFromLocalStorage("@super-admin");
  const superAdmin = Boolean(isSuperAdmin); // Convert the string to a boolean

  const [editItems, setEditItems] = useState<{ [key: number]: boolean }>({});
  const [editedText, setEditedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [fileUploadStatus, setFileUploadStatus] = useState("");

  const [idError, setIdError] = useState<string>("");
  const [nameError, setNameErrors] = useState<{ [key: number]: string }>({});
  const { mutateAsync: updateImportBucket } =
    useUpdateOneBaseImportBucketControllerImportBucket();

  const { data: brand, refetch: refetchBrand } =
    useGetManyBaseImportBucketControllerImportBucket(
      {},
      {
        enabled: false,
      }
    );

  const onEditClick = (
    bucketId: number,
    title: string,
    editItemValue: boolean
  ) => {
    setEditedText(title);
    setEditItems((prevEditItems) => ({
      ...prevEditItems,
      [bucketId]: editItemValue,
    }));
  };

  const onSettingClick = (bucketId: number) => {
    router.push(`sheet-mapping?bucketId=${bucketId}`);
  };

  const validateRequestBody = (id: number, name: string): boolean => {
    const errors: { [key: number]: string } = {};
    setIdError("");
    setNameErrors({});

    if (id <= 0) {
      errors[id] = "Invalid ID";
    }
    if (name.trim() === "") {
      errors[id] = "Please fill your Bucket Name";
    } else if (name.trim().length < 8) {
      errors[id] = "Bucket Name should be at least 8 characters long";
    } else if (name.trim().length > 100) {
      errors[id] = "Bucket Name should not exceed 100 characters";
    }
    setNameErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSaveClick = async (bucketId: number, title: string) => {
    const isValidRequestBody = validateRequestBody(bucketId, editedText);

    const currentTimestamp = new Date().toISOString();

    if (isValidRequestBody) {
      const requestBody = {
        id: bucketId,
        name: editedText === "" ? title : editedText,
        isDeleted: false,
        updatedAt: currentTimestamp,
      };

      const bucketManagementResponse = await refetchBrand();
      const response = bucketManagementResponse.data;

      const value = response?.filter(
        (obj) =>
          obj.name === requestBody.name &&
          obj.id !== requestBody.id &&
          obj.brandId === brandId?.brandId
      );
      if (value.length > 0) {
        setIsModalOpen(true);
        setFileUploadStatus(` Bucket Name ${requestBody.name} already exists.`);
      } else {
        const importResponse = await updateImportBucket({
          pathParams: {
            id: parseInt(bucketId as unknown as string),
          },
          body: requestBody,
        });
        if (importResponse && importResponse?.id == bucketId) {
          setIsModalOpen(true);
          setFileUploadStatus("Bucket name updated successfully");
          router.replace("/bucket-management");
        } else {
          setIsModalOpen(true);
          setFileUploadStatus("Something went wrong while updated");
        }
      }

      setEditedText("");

      setEditItems((prevEditItems) => ({
        ...prevEditItems,
        [bucketId]: false,
      }));
    } else {
      console.log("Invalid request body");
    }
  };

  const handleEditedChange = (data: any) => {
    setEditedText(data?.name);
  };

  const handleConfirmationCloseModal = () => {
    setIsModalOpen(false);
    props.flagFunction(true);
    router.replace("/bucket-management");
  };

  const sortedData = [...props.data].sort((a, b) => {
    const dateA = new Date(a.createdAt)?.getTime() || 0;
    const dateB = new Date(b.createdAt)?.getTime() || 0;

    // Sort in descending order
    return dateB - dateA;
  });

  return (
    <>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ md: 3, sm: 2 }}
        className="py-5"
      >
        <Modal
          isOpen={isModalOpen}
          onClose={handleConfirmationCloseModal}
          modalextraclass="modal-small"
        >
          <Box className="modal-main-data">
            <Typography variant="h6" className="note-description text-center">
              {fileUploadStatus}
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

        {sortedData.map((item, index) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={index}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }} className="h-full relative buck-card pb-[50px]">
              <CardHeader
                className="card-header bucket-card  relative bg-gradient-blue text-white"
                title={item.title}
                action={
                  superAdmin === true ? (
                    <Box className="flex items-center bucket-card-in">
                      {editItems[item.bucketId] && (
                        <Box className="close-icon-box" title="Clear">
                          <HighlightOffOutlinedIcon
                            className="text-white close-icon "
                            onClick={() => {
                              setEditItems((prevEditItems) => ({
                                ...prevEditItems,
                                [item.bucketId]: false,
                              }));
                              setNameErrors("");
                            }}
                          />
                        </Box>
                      )}

                      <Box className="edit-text-icon">
                        <Image
                          src={
                            editItems[item.bucketId]
                              ? SaveIconImage
                              : EditIconImage
                          }
                          height={20}
                          width={20}
                          className=" text-white h-[20px] w-[20px] ml-[4px] mr-[4px] cursor-pointer transition-all duration-500 ease-in-out delay-0   hover:opacity-80"
                          alt={editItems[item.bucketId] ? "Save" : "Edit"}
                          title={editItems[item.bucketId] ? "Save" : "Edit"}
                          // onClick={() => {onEditClick(item.bucketId, !editItems[item.bucketId]);}}
                          onClick={() => {
                            if (editItems[item.bucketId]) {
                              onSaveClick(item.bucketId, item.title);
                            } else {
                              onEditClick(
                                item.bucketId,
                                item.title,
                                !editItems[item.bucketId]
                              );
                            }
                          }}
                        />
                      </Box>
                      <Image
                        height={20}
                        width={20}
                        alt="setting icon"
                        onClick={() => {
                          onSettingClick(item.bucketId);
                        }}
                        src={SettingIcon}
                        className="cursor-pointer"
                      />
                      <IconButton
                        className="icon-button  bg-white"
                        ButtonTitle="Map KPI"
                        onClick={() =>
                          router.push(`/mapkpi?bucketId=${item.bucketId}`)
                        }
                        startIcon={<RemoveRedEyeOutlinedIcon />}
                      />

                      {editItems[item.bucketId] && (
                        <InputField
                          className="input-field-fix rounded-tl-[4px] rounded-tr-[4px] absolute top-[8px] left-[16px] right-0 w-full  bg-white z-[1]"
                          placeholder="Please Fill Your Bucket Name"
                          variant=""
                          type="text"
                          name="name"
                          defaultValue={item.title}
                          handleChange={handleEditedChange}
                        />
                      )}
                      {idError && (
                        <div className="error-message text-red z-[11] absolute left-[18px] bottom-[-15px]">{idError}</div>
                      )}
                      {nameError[item.bucketId] && (
                        <div className="error-message text-red z-[11] absolute left-[18px] bottom-[-15px]">
                          {nameError[item.bucketId]}
                        </div>
                      )}
                    </Box>
                  ) : (
                    <Box className="flex items-center bucket-card-in no-btn mr-1 min-h-[30px]">
                      {editItems[item.bucketId] && (
                        <Box className="close-icon-box" title="Clear">
                          <HighlightOffOutlinedIcon
                            className="text-white close-icon cursor-pointer"
                            onClick={() => {
                              setEditItems((prevEditItems) => ({
                                ...prevEditItems,
                                [item.bucketId]: false,
                              }));
                              setNameErrors("");
                            }}
                          />
                        </Box>
                      )}

                      <Box className="edit-text-icon cursor-pointer">
                        <Image
                          src={
                            editItems[item.bucketId]
                              ? SaveIconImage
                              : EditIconImage
                          }
                          height={20}
                          width={20}
                          alt={editItems[item.bucketId] ? "Save" : "Edit"}
                          title={editItems[item.bucketId] ? "Save" : "Edit"}
                          // onClick={() => {onEditClick(item.bucketId, !editItems[item.bucketId]);}}
                          onClick={() => {
                            if (editItems[item.bucketId]) {
                              onSaveClick(item.bucketId, item.title);
                            } else {
                              onEditClick(
                                item.bucketId,
                                item.title,
                                !editItems[item.bucketId]
                              );
                            }
                          }}
                        />
                      </Box>

                      {editItems[item.bucketId] && (
                        <InputField
                          className="input-field-fix  rounded-tl-[4px] rounded-tr-[4px] absolute top-[8px] left-[16px] right-0 w-full  bg-white z-[1]"
                          placeholder="Please Fill Your Bucket Name"
                          variant=""
                          type="text"
                          name="name"
                          defaultValue={item.title}
                          handleChange={handleEditedChange}
                        />
                      )}
                      {idError && (
                        <div className="error-message text-red z-[11] absolute left-[18px] bottom-[-15px]">{idError}</div>
                      )}
                      {nameError[item.bucketId] && (
                        <div className="error-message text-red z-[11] absolute left-[18px] bottom-[-15px]">
                          {nameError[item.bucketId]}
                        </div>
                      )}
                    </Box>
                  )
                }
              />
              <CardContent className="content animate__animated animate__fadeIn animate__delay-700ms">
                <Typography component="span" className="link-text block text-blue1 hover:text-bluelight1 font-medium  text-xs my-[5px] mx-0 no-underline">
                  {item?.maxCreatedAt === null ? 'No File Uploaded ': `Last file uploaded on ${item?.maxCreatedAt}`}
                </Typography>
                <List className="sheet-list">
                  {item.list.map((listItem: any, listItemIndex: any) => (
                    <ListItem
                      key={listItemIndex}
                      className={`item-name px-[15px] py-[5px] rounded-[8px] font-medium ${
                        listItemIndex % 2 === 0
                          ? "itembg-cream"
                          : "itembg-cream"
                      }`}
                    >
                      <Typography component="span" className='font-medium break-all'>{listItem}</Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions>
                {/* <Link className="m-auto" href={{ pathname: '/bucket-management/list', query: { bucketId: `${item?.bucketId}` }} > */}
                <IconButton
                  onClick={() =>
                    router.push(
                      `bucket-management/list?bucketId=${item?.bucketId}`
                    )
                  }
                  className="upload-btn animate__animated animate__fadeIn animate__delay-1s"
                  variant="contained"
                  ButtonTitle="Detail"
                  startIcon={<RemoveRedEyeOutlinedIcon />}
                />
                {/* </Link> */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BucketCard;
