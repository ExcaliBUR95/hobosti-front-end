import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteComm, postComm } from "../../redux/features/comm";

const PostsId = ({ news, newsOne }) => {
  const dispatch = useDispatch();
  const [text1, setText] = useState("");
  const loading = useSelector((state) => state.comm.loading);
  const handleClickDelete = (id) => {
    dispatch(deleteComm(id));
  };
  const comm = useSelector((state) => state.comm.items);

  const user = useSelector((state) => state.application.id);
  const author = localStorage.getItem("author");
  const commFilter = comm.filter((item) => item.news === newsOne._id);
  const handleChangeComm = (e) => {
    setText(e.target.value);
  };
  const handleClickCOmm = () => {
    dispatch(postComm(text1, newsOne._id, user, author));
    setText("");
  };
  if (loading) {
    return <div>...</div>;
  }
  return (
    <div>
      <div>
        <input
          type="text"
          value={text1}
          className="inputComm"
          onChange={(e) => handleChangeComm(e)}
          placeholder="Оставить комментарий"
        />
        <button className="buttonSend" onClick={handleClickCOmm}>
          <span data-title="OH YEAH!">Отправить</span>
        </button>
      </div>
      {/* <div>
        <label for="username" className="label">
          Name
        </label>
        <input
          type="name"
          className="inputComm"
          id="username"
          placeholder="Your name"
        />
        <button className="buttonSend" onClick={handleClickCOmm}>
          <span data-title="OH YEAH!">Отправить</span>
        </button>
      </div> */}

      <div>
        {commFilter.map((item) => {
          return (
            <div className="comms" key={item._id}>
              <div>
                <label>{item.author.toUpperCase()}</label>
                <div className="comments__text">
                  <p> {item.text} </p>
                  <button
                    className="btnDel"
                    onClick={() => handleClickDelete(item._id)}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostsId;

// PostsId.PropTypes = {
//   newsOne = PropTypes.String
// };
