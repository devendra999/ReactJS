import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Image from "next/image";
import EditIconImage from "../assets/icons/edit.svg";
import SaveIconImage from "../assets/icons/save-blueicon-lg.svg";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import {
  useMasterControllerMasterPageGet,
  useMasterControllerMasterPageManagementOrderingUpdate,
} from "@root/backend/backendComponents";
import Modal from "./Modal";
import ButtonItem from "./ButtonItem";

const PageManagement = () => {
  const [stores, setStores] = useState([]);
  const [editItems, setEditItems] = useState<{ [key: number]: boolean }>({});
  const [editedText, setEditedText] = useState<any>([]);
  const [isError, setIsError] = useState("");
  const [nameError, setNameErrors] = useState<{ [key: number]: string }>({});
  const [infoMsg, setInfoMsg] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);

  const { data: allMasterPageData, refetch: getAllMasterPageData } =
    useMasterControllerMasterPageGet({}, { enabled: false });

  const { mutateAsync: saveUpdatePages } =
    useMasterControllerMasterPageManagementOrderingUpdate();

  useEffect(() => {
    getAllMasterPageData();
  }, [getAllMasterPageData]);

  useEffect(() => {
    if ((allMasterPageData as any)?.data.length > 0) {
      const pageArray = (allMasterPageData as any)?.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        orderby: item.orderby,
      }));

      setStores(pageArray?.sort((a: any, b: any) => a.orderby - b.orderby));
    }
  }, [allMasterPageData]);

  // useEffect(() => {
  //   setStores(stores);
  // }, [stores]);

  const editBrand = (id: any, editItemValue: boolean) => {
    setEditItems({ [id]: editItemValue });
    const editText: any = stores.filter((obj: any) => obj.id === id);
    setEditedText(editText.length > 0 && editText[0].name);
  };

  const handleDragDrop = (results: any) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "group") {
      const reorderedStores = [...stores];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedStore] = reorderedStores.splice(sourceIndex, 1);
      reorderedStores.splice(destinationIndex, 0, removedStore);
      return setStores(reorderedStores);
    }
  };

  const BrandList = ({ name, id, orderby }: any) => {
    return (
      <Box className="single-brand-card">
        <Box className="bg-white p-[15px] rounded-xl">
          <Box className="flex items-center justify-between">
            <Box className="title">
              {!editItems[id] ? (
                <Typography
                  variant="h5"
                  className=" text-md leading-7 font-semibold text-blue"
                >
                  {name}
                </Typography>
              ) : (
                <Box>
                  {editItems[id] && (
                    <TextField
                      name="name"
                      inputProps={{ maxLength: 64 }}
                      placeholder="Please Fill Your Page Name"
                      type="text"
                      value={editedText}
                      onChange={(event: any) => {
                        setEditedText(event.target.value);
                      }}
                      autoFocus
                      className={`border-b outline-none w-full ${editedText == "" ? 'error-border' : ''}`}
                    />
                  )}
                  {isError && (
                    <Box className="text-red mt-1 error-message w-full text-xs leading-3">
                      {isError}
                    </Box>
                  )}
                  {nameError[id] && (
                    <div className="error-message text-red z-[11] absolute left-[18px] bottom-[-15px]">
                      {nameError[id]}
                    </div>
                  )}
                </Box>
              )}
            </Box>
            <Box className="right-btn">
              <Box className="flex items-center">
                {editItems[id] && (
                  <Box className="close-icon-box" title="Clear">
                    <HighlightOffOutlinedIcon
                      className="text-blue close-icon cursor-pointer"
                      onClick={() => {
                        const updatedStores: any = stores.map((store: any) => {
                          if (editedText && store.id === editedText[0].id) {
                            return {
                              ...store,
                              name: editedText[0].name,
                            };
                          }
                          return store;
                        });

                        setStores(updatedStores);

                        setEditItems({ [id]: false });

                        setNameErrors("");
                      }}
                    />
                  </Box>
                )}

                <button
                  onClick={() => {
                    if (editItems[id]) {
                      onSaveClick(id);
                    } else {
                      editBrand(id, !editItems[id]);
                    }
                  }}
                  className="text-white btn flex items-center text-xs rounded-md"
                >
                  <Image
                    className="filter brightness-0 invert"
                    src={editItems[id] ? SaveIconImage : EditIconImage}
                    width={18}
                    height={18}
                    alt={editItems[id] ? "Save" : "Edit"}
                    title={editItems[id] ? "Save" : "Edit"}
                  />
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  const updatePageManagement = async () => {
    try {
      const response: any = await saveUpdatePages({
        body: stores.map((item: any, index: any) => ({
          ...item,
          orderby: index + 1,
        })),
      });
      if (response.statusCode == 200) {
        setInfoMsg(response.message)
        setIsConfirmationModalOpen(true);
        getAllMasterPageData();
        // setEditedText([]);
        setEditItems([]);
      } else {
        setInfoMsg("Something went wrong while updating Page management")
        setIsConfirmationModalOpen(true);
      }
    } catch (error) {
      console.error("Mutation Error:", error);
    }
  };

  const onSaveClick = (id: any) => {
    if(editedText !== ""){
      const updatedStores: any = stores.map((store: any) => {
        if (store.id === id) {
          return {
            ...store,
            name: editedText,
          };
        }
        return store;
      });
      setStores(updatedStores);
      setEditedText([]);
      setEditItems({ [id]: false });
    }
  };

  const handleConfirmationCloseModal = () => {
    setIsConfirmationModalOpen(false);
    setInfoMsg("");
  };

  return (
    <Box className="brand-wrapper animate__animated animate__fadeIn animate__faster">
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ sm: 1 }}
              className="pb-5 pl-0 brand-box"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {stores.map((brand: any, index: any) => (
                <Draggable
                  draggableId={brand.id.toString()}
                  key={brand.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <Grid
                      item
                      xs={12}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <BrandList {...brand} />
                    </Grid>
                  )}
                </Draggable>
              ))}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
      <Button className="btn w-80 mt-5" type="button" onClick={updatePageManagement}>
        Save
      </Button>
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
    </Box>
  );
};

export default PageManagement;
