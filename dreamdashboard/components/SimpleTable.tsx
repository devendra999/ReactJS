import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { NoSsr } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRouter } from "next/navigation";
import format from "date-fns/format";
import DownloadIcon from "../../public/assets/icons/download-icon.png";
import Image from "next/image";
import { useImportFileControllerImportBucketFileDownload } from "@root/backend/backendComponents";
import { Search } from "@mui/icons-material";
import { getFromLocalStorage } from "@root/utils";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import IconButton from "@mui/material/IconButton";
import ModalSheetDump from "./ModalSheetDump";
import Modal from "./Modal";
import ButtonItem from "./ButtonItem";
// import SearchBar from "material-ui-search-bar";

interface SimpleTableProps {
  columns: string[];
  rows: Row[];
  sheetValidationToggle: () => void;
  bucketId: number;
}

interface Row {
  filename: string;
  uploadedon?: string;
  action: string;
  mapping: string;
  info: string;
  tooltipData: string;
}
const SimpleTable: React.FC<SimpleTableProps> = ({
  columns,
  rows,
  sheetValidationToggle,
  bucketId,
  HandleSheetInfoPopup,
}: any) => {
  const router = useRouter();

  const [expanded, setExpanded] = React.useState<string | false>("");
  const [rowss, setRows] = React.useState<Row[]>(rows);
  const [curFileId, setCurFileId] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [searchText, setSearchText] = React.useState("");
  const [modalDataDump, setModalDataDump] = React.useState(false);

  const [selectedData, setSelectedData] = React.useState(false);
  const [sheetName, setSheetName] = React.useState("");
  const [failSheetError, setFailSheetError] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const rolewiseDisplay: any = JSON.parse(
    getFromLocalStorage("@rolewise-display") || "{}"
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const { data: userDetails, refetch: handleFileDownload } =
    useImportFileControllerImportBucketFileDownload(
      {
        pathParams: { id: curFileId as unknown as number },
      },
      {
        enabled: false,
      }
    );

  React.useEffect(() => {
    if (rows) {
      setRows(rows);
    }
  }, [rows]);

  React.useEffect(() => {
    if (curFileId) {
      handleFileDownload()
        .then((data: any) => {
          setCurFileId(null);
          window.open(data?.data?.data, "_blank");
          // router.push(data?.data?.data);
        })
        .catch((error) => {
          // console.log(error);
          setCurFileId(null);
        });
    }
  }, [curFileId]);

  const downloadfile = (event: React.SyntheticEvent, fileId: any) => {
    event.stopPropagation();
    setCurFileId(fileId);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter((row: any) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleDataDumpPopup = (
    isOpen: boolean,
    selectedValue: any,
    sheetName: any
  ) => {
    setSelectedData(selectedValue);
    setModalDataDump(isOpen);
    setSheetName(sheetName);
  };

  const failFileClick = (param: any) => {
    // console.log(param, "param");
    setFailSheetError(param);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFailSheetError("");
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        modalextraclass="modal-small text-center"
      >
        <Box>
          <Typography className="text-center" variant="h6">
            {failSheetError}
          </Typography>
          <ButtonItem
            className="containBtn mt-5"
            ButtonTitle="Close"
            type="button"
            onClick={handleCloseModal}
          />
        </Box>
      </Modal>
      <Box className={"mui-datatable-main"}>
        <Box
          className={`text-right search-data ${
            rolewiseDisplay.canImport == false && `rightSideTwoRem`
          }`}
        >
          <TextField
            type="search"
            className="mt-2"
            value={searchText}
            onChange={handleSearchTextChange}
            variant="outlined"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="medium" className="mb-[7px]" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
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
          <TableHead className="card-header">
            <TableRow>
              {columns.map((column: any, index: number) => (
                <TableCell align="left" key={index}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {/* <NoSsr> */}
            {filteredRows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) => (
                <TableRow
                  key={index}
                  className={index % 2 !== 0 ? "itembg-cream" : ""}
                >
                  <TableCell align="center">
                    <Box className="table-item flex justify-center items-center">
                      <Typography className="icon-add-remove">
                        {row?.fileName}
                      </Typography>
                      {rolewiseDisplay.isFileExportAllowed && (
                        <Box
                          className="download-icon-main"
                          onClick={(e) => downloadfile(e, row?.fileId)}
                        >
                          <Image
                            alt=""
                            src={DownloadIcon}
                            height={30}
                            width={30}
                          />
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center" className="withoutPadding relative">
                    <Table className="h-full absolute top-0 bottom-0">
                      {row?.sheetInfo?.map((sheet: any, index: number) => (
                        <TableRow
                          key={index}
                          // className={index % 2 !== 0 ? "itembg-cream" : ""}
                        >
                          <TableCell align="center">
                            {(sheet as any).uploadStatus === 0 ? (
                              "Success"
                            ) : (sheet as any).uploadStatus === 1 ? (
                              <Box
                                className="info-button-badge mr-1 cursor-pointer"
                                onClick={() =>
                                  failFileClick(sheet?.errorReason)
                                }
                              >
                                <Tooltip
                                  title={sheet?.errorReason}
                                  placement="right"
                                >
                                  <>
                                    <WarningRoundedIcon
                                      style={{ color: "#e4af17" }}
                                    />{" "}
                                    Fail
                                  </>
                                </Tooltip>
                              </Box>
                            ) : (
                              "In Progress"
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </Table>
                  </TableCell>
                  <TableCell align="center" className="withoutPadding">
                    <Table>
                      {row?.sheetInfo?.map((sheet: Row, index: number) => (
                        <TableRow
                          key={index}
                          // className={index % 2 !== 0 ? "itembg-cream" : ""}
                        >
                          <TableCell align="center">
                            {(sheet as any).sheetName}
                          </TableCell>
                          <TableCell align="center">
                            <Box className=" flex flex-wrap  items-center justify-center sheet-col">
                              {rolewiseDisplay.isFileInvalidateAllowed && (
                                <Box
                                  className="badge badge-primary cursor-pointer rounded-lg mr-2 text-darkblue bg-darkestblue"
                                  onClick={() =>
                                    sheetValidationToggle(
                                      (sheet as any).sheetId,
                                      (sheet as any).inValidate
                                    )
                                  }
                                >
                                  <Typography component={"span"}>
                                    {sheet.action}
                                  </Typography>
                                </Box>
                              )}
                              <Box
                                className="badge badge-success cursor-pointer rounded-lg mr-2"
                                onClick={() =>
                                  router.push(
                                    `/bucket-management/list/field-mapping?fileId=${row.fileId}&bucketId=${bucketId}`
                                  )
                                }
                              >
                                <Typography component={"span"}>
                                  {sheet.mapping}
                                </Typography>
                              </Box>
                              <Box className="info-button-badge mr-1 cursor-pointer">
                                <Tooltip
                                  title={sheet.tooltipData}
                                  placement="right"
                                >
                                  <InfoOutlinedIcon
                                    onClick={() =>
                                      HandleSheetInfoPopup(
                                        true,
                                        (sheet as any).sheetId
                                      )
                                    }
                                  />
                                </Tooltip>
                              </Box>

                              <Box className="view-button-badge cursor-pointer">
                                <Tooltip title="File view" placement="right">
                                  <IconButton
                                    onClick={() =>
                                      handleDataDumpPopup(
                                        true,
                                        (sheet as any).sheetId,
                                        row?.fileName +
                                          "-" +
                                          (sheet as any).sheetName
                                      )
                                    }
                                  >
                                    <RemoveRedEyeRoundedIcon className="text-darkblue" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </Table>
                  </TableCell>
                  <TableCell align="center">
                    <Box className="table-item">
                      <Typography>
                        {row?.updloadedDate
                          ? format(new Date(row?.updloadedDate), "dd-MM-yyyy")
                          : "NDF"}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            {/* </NoSsr> */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className="bucketListPagination"
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <ModalSheetDump
        isOpen={modalDataDump}
        selectedValue={selectedData}
        handleDataDumpPopup={handleDataDumpPopup}
        sheetName={sheetName}
        rowPerPage={20}
        page={1}
      />
    </>
  );
};
export default SimpleTable;
