import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Image from "next/image";
import EditIconImage from "../../assets/icons/edit.svg";
import SaveIconImage from "../../assets/icons/save-icon.svg";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import InputField from "../InputField";
import {
  useBrandControllerAllBrandsGetForCrud,
  useBrandControllerBrandManagementOrderingUpdate,
} from "@root/backend/backendComponents";
import ButtonItem from "../ButtonItem";
import Modal from "../Modal";

const BrandManagement = () => {
  const [stores, setStores] = useState([]);
  const [editItems, setEditItems] = useState<{ [key: number]: boolean }>({});
  const [editedBrandText, setEditedBrandText] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [isError, setIsError] = useState("");
  const [nameError, setNameErrors] = useState<{ [key: number]: string }>({});
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [infoMsg, setInfoMsg] = useState("");

  const { data: brandsList, refetch: fetchBrand } =
    useBrandControllerAllBrandsGetForCrud({}, { enabled: false });

  const { mutateAsync: saveUpdateBrands } =
    useBrandControllerBrandManagementOrderingUpdate();

  useEffect(() => {
    fetchBrand();
  }, [fetchBrand]);

  useEffect(() => {
    if ((brandsList as any)?.data.length > 0) {
      const brandArray = (brandsList as any)?.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        orderby: item.orderBy,
      }));
      setStores(brandArray?.sort((a: any, b: any) => a.orderby - b.orderby));
    }
  }, [brandsList]);

  const editBrand = (id: any, editItemValue: boolean) => {
    setEditItems({ [id]: editItemValue });
    const editText: any = stores.filter((obj: any) => obj.id === id);
    setEditedBrandText(editText.length > 0 && editText[0].name);
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

  const BrandList = ({ name, id }: any) => {
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
                      placeholder="Please Fill Your Brand Name"
                      type="text"
                      value={editedBrandText}
                      onChange={(event: any) => {
                        setEditedBrandText(event.target.value);
                      }}
                      autoFocus
                      className={`border-b outline-none w-full ${editedBrandText == "" ? 'error-border' : ''}`}
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
                        setEditItems((prevEditItems) => ({
                          ...prevEditItems,
                          [id]: false,
                        }));
                        setNameErrors("");
                      }}
                    />
                  </Box>
                )}

                <button
                  onClick={() => {
                    if (editItems[id]) {
                      onBrandSaveClick(id);
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

  const onBrandSaveClick = (id: any) => {
    if(editedBrandText !== ""){
      const updatedStores: any = stores.map((store: any) => {
        if (store.id === id) {
          return {
            ...store,
            name: editedBrandText,
          };
        }
        return store;
      });
      setStores(updatedStores);
      setEditedBrandText([]);
      setEditItems({ [id]: false });
    }
  };

  const updateBrandManagement = async () => {
    try {
      const response: any = await saveUpdateBrands({
        body: stores.map((item: any, index: any) => ({
          ...item,
          orderby: index + 1,
        })),
      });
      if (response.statusCode == 200) {
        setInfoMsg(response.message);
        setIsConfirmationModalOpen(true);
        fetchBrand();
        setEditedBrandText([]);
        setEditItems([]);
      } else {
        setInfoMsg("Something went wrong while updating Brand management")
        setIsConfirmationModalOpen(true);
      }
    } catch (error) {
      console.error("Mutation Error:", error);
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
              {stores.map((brand: any, index) => (
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
      <Button
        className="btn w-80 mt-5"
        type="button"
        onClick={updateBrandManagement}
      >
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

export default BrandManagement;
