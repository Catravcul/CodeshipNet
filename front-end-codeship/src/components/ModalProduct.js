import React, { useEffect, useState } from "react";
import Modal from "react-modal";

function ModalProduct(props) {
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
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getProductComments();
  }, [props.modalIsOpen]);
  // show comments
  const getProductComments = () => {
    fetch("https://codeship-api.herokuapp.com/public/comment/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        product: props.product._id,
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        if (data.comment.length > 0) {
          setComments((prevState) => {
            return data.comment;
          });
        }
      });
  };

  // create comments

  return (
    <Modal style={customStyles} className="modal" isOpen={props.modalIsOpen}>
      <span className="closeModal" onClick={() => props.setModalIsOpen(false)}>
        X
      </span>
      <img
        className="imgProduct"
        src={"https://codeship-api.herokuapp.com/" + props.product.img_path}
      />
      <h3 className="TitleProductModal">{props.product.title}</h3>
      <p className="DescriptionProductModal">{props.product.description}</p>
      <form className="FormComments">
        <textarea className="textareaComments"></textarea>
        <button className="PublishComment">PUBLISH</button>
      </form>
      <div className="commentsContainer">
        {comments.map((commentObj) => (
          <div className="Comment" key={commentObj.user_id}>
            <img
              className="ImgUser"
              src={"https://codeship-api.herokuapp.com/" + commentObj.img_path}
            />
            <p>
              <span>{commentObj.username}</span>
              {commentObj.comment}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
}
export default ModalProduct;
