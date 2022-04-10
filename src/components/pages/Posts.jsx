import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchComment } from "../../redux/features/comm";
import { fetchNews } from "../../redux/features/news";

import PostsId from "./PostsId";
import styles from "../../UI/Loader/loader.module.css";

const Posts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [text1, setText] = useState("");
  useEffect(() => {
    dispatch(fetchNews());
    dispatch(fetchComment());
  }, [dispatch]);

  const comm = useSelector((state) => state.comm.items);

  const news = useSelector((state) => state.news.items);
  const newsOne = news.find((item) => item._id === id);

  const loadingNews = useSelector((state) => state.news.loading);
  const loadingComm = useSelector((state) => state.comm.loading);

  let navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/", { replace: true });

    if (loadingNews && loadingComm) {
      return <div style={styles.loader}>...</div>;
    }
  };

  return (
    <div>
      <div className="sidebar">
        <p onClick={handleClickHome}>Все новости</p> <p>Авторизация</p>
      </div>
      <div className="commentMargin">
        <div className="header__news">
          <div className="img_post">
            {!loadingNews && <img src={newsOne.img} />}
          </div>
          <h1>{!loadingNews && newsOne.title}</h1>
          <p className="post_text">{!loadingNews && newsOne.text}</p>
        </div>

        {<PostsId news={news} newsOne={newsOne} />}
      </div>
    </div>
  );
};

export default Posts;
