import React from 'react'
import Modal from "react-modal";

function ModalPayment(){
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "none",
        backgroundColor: "black",
        border: "none",
        inset: "10% auto auto 50%",
      },
    };

    return(
        <Modal style={customStyles} className="modalPayment" isOpen={modalIsOpen}>

        </Modal>
    );
}

export default ModalPayment;