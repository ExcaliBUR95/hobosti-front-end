import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../redux/features/news";
import { useNavigate, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import loader from "../../UI/Loader/loader";

const News = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const news = useSelector((state) => state.news.items);

  const error = useSelector((state) => state.news.error);

  const newsFilter = news.filter((nw) => {
    if (!id) {
      return true;
    }
    return nw.cats === id;
  });

  let navigate = useNavigate();
  const handleClickHome = () => {
    navigate("/", { replace: true });
  };
  const handleClickAuth = () => {
    navigate("/signin", { replace: true });
  };

  const handleClickReg = () => {
    navigate("/signup", { replace: true });
  };
  return (
    <div>
      <div className="sidebar">
        <p onClick={handleClickHome}>Все новости</p>{" "}
        <p onClick={handleClickAuth}>Авторизация</p>
        <p onClick={handleClickReg}>Регистрация</p>
      </div>
      <div className="newsCats">
        {newsFilter.map((elem) => {
          return (
            <div className="news__all" key={elem._id}>
              <img className="img__card" src={elem.img} />
              <div className="title__card">{elem.title}</div>
              <div className="button__card">
                <button>
                  <Link className="link__button" to={`/posts/${elem._id}`}>
                    open
                  </Link>{" "}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
