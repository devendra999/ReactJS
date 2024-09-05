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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import IconButton from "@root/components/IconButton";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ButtonItem from "@root/components/ButtonItem";
import { useRouter } from "next/navigation";
import { getFromLocalStorage } from "@root/utils/common";
import Image from "next/image";
import EditIconImage from "../assets/icons/edit-icon-blue.svg";
import SaveIconImage from "../assets/icons/save-icon-blue.svg";
import {
  useUpdateOneBaseImportBucketControllerImportBucket,
  useGetManyBaseImportBucketControllerImportBucket,
} from "../backend/backendComponents";
import Modal from "@root/components/Modal";
import InputField from "./InputField";
import { useEffect, useState } from "react";
import { boolean } from "yup";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { Search } from "@mui/icons-material";

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
const BucketCardNew: React.FC<BucketCardProps> = (props: any) => {
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
  const [searchValue, setSearchValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);

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
        (obj) => obj.name === requestBody.name && obj.id !== requestBody.id
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
          router.replace("/bucket-management-new");
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
    router.replace("/bucket-management-new");
  };

  const sortedData = [...props.data].sort((a, b) => {
    const dateA = new Date(a.createdAt)?.getTime() || 0;
    const dateB = new Date(b.createdAt)?.getTime() || 0;

    // Sort in descending order
    return dateB - dateA;
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Grid
        rowSpacing={3}
        columnSpacing={{ md: 3, sm: 2 }}
        className="pb-3 pt-0 search-datatable-filter"
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

        <Box className="bucketcard-table-view w-full">
          <Box className={`text-right search-data ${superAdmin === true ? '' : 'search-data-right-end'}`} mb={3}>
            <TextField
              type="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              variant="outlined"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="medium" className="mb-[7px]" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TableContainer
            component={Paper}
            sx={{ borderRadius: 4, marginTop: "15px" }}
            className="table-container-main"
          >
            <Table
              style={{ borderSpacing: "0 8px" }}
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              className="simple-table custom-simple-table"
            >
              <TableHead className="card-header bg-gradient-blue">
                <TableRow>
                  <TableCell align="left">Bucket Name</TableCell>
                  <TableCell align="left">Sheet Name</TableCell>
                  {superAdmin === true && (
                    <TableCell align="left">Map KPI</TableCell>
                  )}

                  <TableCell align="left">Upload File</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table-body">
                {sortedData
                  .filter(
                    (item) =>
                      item.title
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                      item.list.some((sheet: any) =>
                        sheet.toLowerCase().includes(searchValue.toLowerCase())
                      )
                  )
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow
                      key={index}
                      className={index % 2 !== 0 ? "itembg-cream" : ""}
                    >
                      <TableCell align="center" className="relative">
                        <Box className="table-item flex justify-center">
                          <Typography className="icon-add-remove title-bucketname flex items-center">
                            <Box className="text-data mr-[24px]">{item.title}</Box>

                        
                              <Box className="flex items-center bucket-card-in">
                                <Box className="icon-input z-[2] flex items-center absolute right-[10px]">
                                  {editItems[item.bucketId] && (
                                    <Box
                                      className="close-icon-box"
                                      title="Clear"
                                    >
                                      <HighlightOffOutlinedIcon
                                        className="close-icon text-lg cursor-pointer mr-[6px]"
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
                                      className=" min-w-[20px] cursor-pointer"
                                      height={24}
                                      width={24}
                                      alt={
                                        editItems[item.bucketId]
                                          ? "Save"
                                          : "Edit"
                                      }
                                      title={
                                        editItems[item.bucketId]
                                          ? "Save"
                                          : "Edit"
                                      }
                                      // onClick={() => {onEditClick(item.bucketId, !editItems[item.bucketId]);}}
                                      onClick={() => {
                                        if (editItems[item.bucketId]) {
                                          onSaveClick(
                                            item.bucketId,
                                            item.title
                                          );
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
                                </Box>

                                {editItems[item.bucketId] && (
                                  <InputField
                                    className="input-field-fix absolute w-full z-[1] bg-white rounded-tl-[4px] rounded-tr-[4px] "
                                    placeholder="Please Fill Your Bucket Name"
                                    variant=""
                                    type="text"
                                    name="name"
                                    defaultValue={item.title}
                                    handleChange={handleEditedChange}
                                  />
                                )}
                                {idError && (
                                  <div className="error-message text-red z-[2] absolute left-[20px] bottom-[13px]">{idError}</div>
                                )}
                                {nameError[item.bucketId] && (
                                  <div className="error-message text-red z-[2] absolute left-[20px] bottom-[13px]">
                                    {nameError[item.bucketId]}
                                  </div>
                                )}
                              </Box>
                            
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center" className="sheet-name-cell p-0">
                        {/* <Typography component="span" className="link-text">
                          (Upload Excel File With Maximum {item?.noOfSheets}{" "}
                          Sheets)
                        </Typography> */}
                        <List className="sheet-list-item p-0 text-center">
                          {item.list.map(
                            (listItem: any, listItemIndex: any) => (
                              <ListItem
                                key={listItemIndex}
                                className={`item-name px-[22px] py-[8px] rounded-[0] font-medium m-0`}
                              >
                                <Typography component="span"  className='break-all w-full text-center font-normal'>
                                  {listItem}
                                </Typography>
                              </ListItem>
                            )
                          )}
                        </List>
                      </TableCell>

                      {superAdmin === true && (
                        <TableCell align="center">
                          <Box className="table-item w-full  flex justify-center">
                            <IconButton
                              className="icon-button"
                              ButtonTitle="Map KPI"
                              onClick={() =>
                                router.push(`/mapkpi?bucketId=${item.bucketId}`)
                              }
                              startIcon={<RemoveRedEyeOutlinedIcon />}
                            />
                          </Box>
                        </TableCell>
                      )}

                      <TableCell align="center">
                        <Box className="table-item">
                          <IconButton
                            onClick={() =>
                              router.push(
                                `bucket-management-new/list?bucketId=${item?.bucketId}`
                              )
                            }
                            className="upload-btn"
                            variant="contained"
                            ButtonTitle="Upload File"
                            startIcon={<UploadFileOutlinedIcon />}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}

                {sortedData.filter(
                  (item) =>
                    item.title
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    item.list.some((sheet: any) =>
                      sheet.toLowerCase().includes(searchValue.toLowerCase())
                    )
                ).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No data found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            className="bucketListPagination"
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            component="div"
            count={sortedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Grid>
    </>
  );
};

export default BucketCardNew;
