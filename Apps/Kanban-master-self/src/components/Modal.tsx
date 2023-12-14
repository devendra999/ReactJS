import React from "react";
import { X } from "react-feather";

const Modal = (props) => {
  const handleContentClick = (e) => {
    // Prevent the click event from propagating to the outer container
    e.stopPropagation();
  };

  const handleModalClick = () => {
    // Close the modal when clicking outside the content
    props.setshowModal(false);
  };

  return (
    <div className="modal" onClick={handleModalClick}>
      <div className="modal-content" onClick={handleContentClick}>
        <X className="close-modal" onClick={handleModalClick} />
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
