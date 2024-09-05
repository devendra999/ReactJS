import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  Grid,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useRouter } from "next/navigation";
import { getFromLocalStorage } from "@root/utils/common";
import Image from "next/image";
import EditIconImage from "../assets/icons/edit.svg";
import TrashIconImage from "../assets/icons/trash.svg";

import SaveIconImage from "../assets/icons/save-blueicon-lg.svg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import IconButtonSingle from "@root/components/IconButtonSingle";
import {
  useGetManyBaseSectionControllerSection,
  useKpiControllerBrandWiseKpiListing,
  useKpiControllerKpiRemoveUsingId,
  useSectionControllerGetSectionBasedOnBrand,
  useSectionControllerUpdateSectionAndKpi,
} from "@root/backend/backendComponents";
import Modal from "./Modal";
const brandId = JSON.parse(getFromLocalStorage("@brand-id") || "{}");
import dynamic from "next/dynamic";
import { reInitialStates } from "@root/utils/globalFunction";
import ButtonItem from "./ButtonItem";
import Loading from "./Loading";
const SwitchSmall = dynamic(() => import("@root/components/SwitchSmall"));
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { PanelHeading } from "./PanelHeading";

export const KPIManagement = () => {
  const router = useRouter();
  const globalFilterSelector = (state: any) => state.globalFilter;
  const _globalFilter = useSelector(globalFilterSelector);
  const isSuperAdmin = getFromLocalStorage("@super-admin");
  const superAdmin = Boolean(isSuperAdmin); // Convert the string to a boolean

  const [editItems, setEditItems] = useState<{ [key: number]: boolean }>({});
  const [editListItems, setEditListItems] = useState<{
    [key: number]: boolean;
  }>({});
  const [editedText, setEditedText] = useState<any>([]);
  const [deleteKpiId, setDeleteKpiId] = useState<any>("");
  const [fileUploadStatus, setFileUploadStatus] = useState("");
  const [flagValue, setFlagValue] = useState(false);
  const [idError, setIdError] = useState<string>("");
  const [nameError, setNameErrors] = useState<{ [key: number]: string }>({});
  const [showInputField, setShowInputFields] = useState(false);
  const [selectedListItemId, setSelectedListItemId] = useState(null);
  const [stores, setStores] = useState<any>([]);
  const [kpiLists, setKpiLists] = useState([]);
  const [sectionLists, setSectionLists] = useState([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState<boolean>(false);
  const [infoMsg, setInfoMsg] = useState("");

  const { data: kpiListing, refetch: fetchKpiListing } =
    useKpiControllerBrandWiseKpiListing(
      {
        pathParams: {
          brandId:
            _globalFilter &&
            _globalFilter?.global_filter?.p_brand_id > 0 &&
            _globalFilter?.global_filter?.p_brand_id,
        },
      },
      { enabled: false }
    );

  const { data: allSectionBrandWise, refetch: refetchAllSectionBrandWise } =
    useSectionControllerGetSectionBasedOnBrand(
      {
        queryParams: {
          brand_id: _globalFilter.global_filter.p_brand_id,
          result_key: "kpi-management",
          master_page_id: flagValue ? 2 : 1,
        },
      },
      {
        enabled: false,
      }
    );

  const { mutateAsync: saveUpdatePages, isLoading: loading } =
    useSectionControllerUpdateSectionAndKpi();

  const { mutateAsync: deleteKpi } = useKpiControllerKpiRemoveUsingId();

  useEffect(() => {
    if (_globalFilter.global_filter.p_brand_id != 0) {
      refetchAllSectionBrandWise();
    }
  }, [refetchAllSectionBrandWise, _globalFilter.global_filter.p_brand_id]);

  useEffect(() => {
    if (_globalFilter.global_filter.p_brand_id != 0) {
      fetchKpiListing();
    }
  }, [fetchKpiListing, _globalFilter.global_filter.p_brand_id]);

  useEffect(() => {
    reInitialStates();
  }, []);

  useEffect(() => {
    if (
      (allSectionBrandWise as any)?.data?.length > 0 &&
      (kpiListing as any)?.data.length > 0
    ) {
      const sectionArray = (allSectionBrandWise as any)?.data?.map(
        (item: any) => ({
          section_id: item.id,
          section_name: item.name,
          orderby: item.orderBy,
        })
      );
      setSectionLists(
        sectionArray?.sort((a: any, b: any) => a.orderby - b.orderby)
      );
      const kpiArray = (kpiListing as any)?.data
        .filter(
          (obj: any) =>
            obj.master.pageCode ===
            (flagValue ? "sr_dashboard" : "sl_dashboard")
        )
        ?.map((item: any) => ({
          id: item.id.toString(),
          name: item.display_column,
          section_id: item.sectionId,
          orderby: item.sequence,
        }));
      setKpiLists(kpiArray?.sort((a: any, b: any) => a.orderby - b.orderby));
      const combineSectionKpiArray = sectionArray.map(
        (section: any, index: number) => {
          const _kpiList = kpiArray?.filter(
            (obj: any) => obj.section_id === section.section_id
          );
          return {
            id: ("s" + index).toString(),
            title: section.section_name,
            bucketId: section.section_id,
            list: _kpiList,
          };
        }
      );
      setStores(combineSectionKpiArray);
    }
  }, [allSectionBrandWise, kpiListing, flagValue]);

  useEffect(() => {
    refetchAllSectionBrandWise();
  }, [refetchAllSectionBrandWise, flagValue]);

  useEffect(() => {
    if (_globalFilter.global_filter.p_brand_id != 0) {
      fetchKpiListing();
    }
  }, [_globalFilter.global_filter.p_brand_id]);

  const handleClear = (listId: any, bucketId: any) => {
    setEditListItems({ [listId]: false });
    setEditItems({ [bucketId]: false });
  };

  const handleSave = (listId: any, bucketId: any) => {
    if (editedText !== "") {
      if (listId !== null) {
        const updatedStores: any = stores.map((store: any) => {
          if (editedText && store.bucketId === bucketId) {
            return {
              ...store,
              list: store.list.map((listItem: any) => {
                if (listItem.id === listId) {
                  return {
                    ...listItem,
                    name: editedText,
                  };
                }
                return listItem;
              }),
            };
          }
          return store;
        });
        setStores(updatedStores);
      } else {
        const updatedStores: any = stores.map((store: any) => {
          if (store.bucketId === bucketId) {
            return {
              ...store,
              title: editedText,
            };
          }
          return store;
        });
        setStores(updatedStores);
      }
      setEditedText([]);
      setEditListItems({ [listId]: false });
      setEditItems({ [bucketId]: false });
    }
  };

  //   const onDeleteClick = (listId: any) => {
  //     setIsConfirmationModalOpen(true);
  // console.log(listId,"fff");

  //     // wantDelete(listId);
  //   };

  const onDeleteClick = async () => {
    const deletedBranchResponse: any = await deleteKpi({
      pathParams: {
        kpiId: deleteKpiId,
      },
    });

    if (deletedBranchResponse?.statusCode === 200) {
      setIsConfirmationModalOpen(false);
      setIsDeleteConfirmationModalOpen(true);
      setInfoMsg(deletedBranchResponse?.message);
    }
    refetchAllSectionBrandWise();
    fetchKpiListing();
    setDeleteKpiId("");
  };

  const onEditClick = (
    bucketId: number,
    listId: any,
    editItemValue: boolean
  ) => {
    if (listId !== null) {
      setEditListItems({ [listId]: true });
      setEditItems({ [bucketId]: false });
      const editText = stores
        .filter((obj: any) => obj.bucketId === bucketId)[0]
        ?.list.filter((obj1: any) => obj1.id == listId);

      setEditedText(editText.length > 0 && editText[0].name);
    } else {
      setEditListItems({ [listId]: false });
      setEditItems({ [bucketId]: editItemValue });
      const editText = stores.filter((obj: any) => obj.bucketId === bucketId);
      setEditedText(editText.length > 0 && editText[0].title);
    }
  };

  const handleDragAndDrop = (results: any) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setStores(reorderedStores);
    }

    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = stores.findIndex(
      (store: any) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store: any) => store.id === destination.droppableId
    );

    const newSourceItems = [...stores[storeSourceIndex].list];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].list]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      list: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      list: newDestinationItems,
    };

    setStores(newStores);
  };

  const StoreList = ({ title, list, bucketId, id }: any) => {
    return (
      <Box className="h-full">
        <Droppable droppableId={id}>
          {(provided) => (
            <Card
              sx={{ borderRadius: 3, boxShadow: 3 }}
              className="h-full"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <CardHeader
                className="card-header bucket-card  relative bg-gradient-blue text-white drag-card-section"
                title={title}
                action={
                  <Box className="flex items-center bucket-card-in py-4">
                    {editItems[bucketId] && (
                      <Box className="close-icon-box mr-1" title="Clear">
                        <HighlightOffOutlinedIcon
                          className="text-white close-icon"
                          onClick={() => {
                            handleClear(editListItems[0], editItems[bucketId]);
                          }}
                        />
                      </Box>
                    )}

                    {/* <Box className="edit-text-icon mr-2">
                      <Box
                        onClick={() => {
                          if (editItems[bucketId]) {
                            handleSave(null, bucketId);
                          } else {
                            onEditClick(bucketId, null, !editItems[bucketId]);
                          }
                        }}
                        className="cursor-pointer transition-all duration-500 ease-in-out delay-0 hover:opacity-90 flex items-center bg-white rounded-[5px] px-[6px] py-[3px]"
                      >
                        <Image
                          src={
                            editItems[bucketId] ? SaveIconImage : EditIconImage
                          }
                          height={20}
                          width={20}
                          className=" text-white h-[20px] w-[20px] mr-[4px] cursor-pointer transition-all duration-500 ease-in-out delay-0 "
                          alt={editItems[bucketId] ? "Save" : "Edit"}
                          title={editItems[bucketId] ? "Save" : "Edit"}
                        />
                        <Box className=" text-black mr-[4px] ">
                          {editItems[bucketId] ? "Save" : "Edit"}
                        </Box>
                      </Box>
                    </Box> */}

                    {editItems[bucketId] && (
                      <TextField
                        name="title"
                        hiddenLabel
                        id="filled-hidden-label-small"
                        variant="filled"
                        size="small"
                        inputProps={{ maxLength: 64 }}
                        placeholder="Please Fill Your Section Name"
                        type="text"
                        value={editedText || title}
                        onChange={(event: any) => {
                          setEditedText(event.target.value);
                        }}
                        autoFocus
                        className="input-field-fix rounded-tl-[4px] rounded-tr-[4px] absolute top-[8px] left-[16px] right-0 w-full  bg-white z-[1]"
                      />
                    )}
                    {idError && (
                      <div className="error-message text-red z-[11] absolute left-[18px] bottom-[-15px]">
                        {idError}
                      </div>
                    )}
                    {nameError[bucketId] && (
                      <div className="error-message text-red z-[11] absolute left-[18px] bottom-[-15px]">
                        {nameError[bucketId]}
                      </div>
                    )}
                  </Box>
                }
              />
              <CardContent className="content drag-list-content">
                <List className="sheet-list overflow-y-auto">
                  {list.map((listItem: any, listItemIndex: any) => (
                    <Draggable
                      draggableId={listItem.id}
                      key={listItem.id.toString()}
                      index={listItemIndex}
                    >
                      {(provided) => (
                        <ListItem
                          className={`item-name px-[18px] py-[8px] rounded-[10px] font-medium ${
                            listItemIndex % 2 === 0
                              ? "itembg-cream"
                              : "itembg-white"
                          }`}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <Box className="flex justify-between items-center w-full">
                            <Box className="w-full">
                              {editListItems[listItem?.id] ? (
                                <TextField
                                  name="list"
                                  inputProps={{ maxLength: 64 }}
                                  placeholder="Please Enter Kpi Name"
                                  type="text"
                                  value={editedText}
                                  onChange={(event: any) => {
                                    setEditedText(event.target.value);
                                  }}
                                  autoFocus
                                  className={`input-field-fix rounded-tl-[4px] rounded-tr-[4px] right-0 w-full z-[1] ${
                                    editedText == "" ? "error-border" : ""
                                  }`}
                                />
                              ) : (
                                <div className="list_name">
                                  {listItem?.name}
                                </div>
                              )}
                            </Box>
                            <Box className="flex items-center">
                              {editListItems[listItem?.id] ? (
                                <>
                                  <IconButtonSingle
                                    onClick={() => {
                                      handleClear(
                                        editListItems[listItem?.id],
                                        editItems[bucketId]
                                      );
                                    }}
                                    className="p-1"
                                    icon={<HighlightOffOutlinedIcon />}
                                  />
                                  <IconButtonSingle
                                    onClick={() => {
                                      handleSave(listItem?.id, bucketId);
                                    }}
                                    className="p-1"
                                    iconImage={
                                      <Image
                                        src={SaveIconImage}
                                        height={20}
                                        width={20}
                                        alt="Save icon"
                                      />
                                    }
                                  />
                                </>
                              ) : (
                                <Box className=" flex items-center">
                                  <IconButtonSingle
                                    onClick={() => {
                                      onEditClick(
                                        bucketId,
                                        listItem?.id,
                                        !editItems[bucketId]
                                      );
                                    }}
                                    className="p-1 mr-1"
                                    iconImage={
                                      <Image
                                        src={EditIconImage}
                                        height={20}
                                        width={20}
                                        alt="EDIT icon"
                                        title="Edit"
                                      />
                                    }
                                  />
                                  {superAdmin && (
                                    <IconButtonSingle
                                      onClick={() => {
                                        // onDeleteClick(listItem);
                                        setDeleteKpiId(listItem?.id);
                                        setIsConfirmationModalOpen(true);
                                      }}
                                      className="p-1"
                                      iconImage={
                                        <Image
                                          src={TrashIconImage}
                                          height={20}
                                          width={20}
                                          alt="Delete icon"
                                          title="Delete"
                                        />
                                      }
                                    />
                                  )}
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              </CardContent>
            </Card>
          )}
        </Droppable>
      </Box>
    );
  };

  const handleDashboardSwitchChange = (event: any) => {
    if (event.target.checked) {
      setFlagValue(true);
    } else {
      setFlagValue(false);
    }
  };

  const updateKpiManagement = async () => {
    const updatedStores: any = stores.map((store: any) => {
      return {
        ...store,
        list: store.list.map((listItem: any) => {
          return {
            ...listItem,
            section_id: store.bucketId,
          };
        }),
      };
    });

    const sectionArray = updatedStores?.map((item: any, index: any) => ({
      section_id: item.bucketId,
      section_name: item.title,
      orderby: index + 1,
    }));

    const listArray = updatedStores.flatMap((item: any) => item.list);

    const kpiArray = listArray?.map((item: any, index: number) => ({
      kpi_id: item.id.toString(),
      kpi_name: item.name,
      section_id: item.section_id,
      orderby: index + 1,
    }));

    const combineSection = {
      sections: sectionArray,
      kpis: kpiArray,
    };

    try {
      const response: any = await saveUpdatePages({
        body: combineSection,
      });

      if (response.statusCode == 200) {
        setInfoMsg(response.message);
        setIsDeleteConfirmationModalOpen(true);
        refetchAllSectionBrandWise();
        fetchKpiListing();
        // setEditItems([]);
        setEditedText([]);
        setEditListItems({});
        setEditItems({});
        // setEditListItems({ [listId]: false });
        // setEditItems({ [bucketId]: false });
      } else {
        setInfoMsg(
          "Something went wrong while updating Section & KPI management"
        );
        setIsDeleteConfirmationModalOpen(true);
      }
    } catch (error) {
      console.error("Mutation Error:", error);
    }
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
    // setInfoMsg("");
  };

  const handleDeleteConfirmationCloseModal = () => {
    setIsDeleteConfirmationModalOpen(false);
    setInfoMsg("");
  };

  return (
    <Box>
      <Loading className={`${loading ? "" : "hide"} `} />
      <SwitchSmall
        leftLabel="Sales"
        rightLabel="Service"
        className="mx-3 sm:mr-2 switch-small-item ss-switch ml-0 mr-2.5 mb-2"
        onChange={handleDashboardSwitchChange}
        checked={flagValue}
      />
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Droppable droppableId="ROOT" type="group" direction="horizontal">
          {(provided) => (
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ md: 3, sm: 2 }}
              className="pb-5"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {stores.map((store: any, index: any) => (
                <Draggable draggableId={store.id} index={index} key={store.id}>
                  {(provided) => (
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={4}
                      xl={3}
                      ref={provided.innerRef}
                      // {...provided.dragHandleProps}
                      // {...provided.draggableProps}
                    >
                      <StoreList {...store} />
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        className="btn w-80 mb-2"
        type="button"
        onClick={updateKpiManagement}
      >
        Save
      </Button>
      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={handleConfirmationCloseModal}
        modalextraclass="modal-small kpi-modal"
      >
        <PanelHeading
          firstHeading={"Are You sure to Remove the KPI"}
          className="title-pop-kpi"
        />
        <Button onClick={onDeleteClick} variant="contained">
          Ok
        </Button>
        <Button onClick={handleConfirmationCloseModal} variant="contained">
          cancel
        </Button>
      </Modal>
      <Modal
        isOpen={isDeleteConfirmationModalOpen}
        onClose={handleDeleteConfirmationCloseModal}
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
                onClick={handleDeleteConfirmationCloseModal}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
