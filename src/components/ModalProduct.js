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
  const [comment, setComment] = useState("");
  useEffect(() => {
    getProductComments();
  }, [props.modalIsOpen]);
  // show comments
  const getProductComments = () => {
    setComment("");
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
      .then(({ comments }) => {
        if (comments.length > 0) {
          setComments((prevState) => {
            return comments;
          });
        } else {
          setComments((prevState) => {
            return [];
          });
        }
      });
  };

  // create comments
  const addProductComments = (e) => {
    e.preventDefault();
    fetch("https://codeship-api.herokuapp.com/comment/", {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": props.token,
      },
      method: "PUT",
      body: JSON.stringify({
        product: props.product._id,
        comment: comment,
      }),
    }).then(getProductComments);
  };

  const onChangeTextarea = (e) => {
    setComment(e.currentTarget.value);
  };
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
      <form className="FormComments" onSubmit={addProductComments}>
        <textarea
          className="textareaComments"
          value={comment}
          onChange={onChangeTextarea}
        ></textarea>
        <button type="submit" className="PublishComment">
          PUBLISH
        </button>
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
