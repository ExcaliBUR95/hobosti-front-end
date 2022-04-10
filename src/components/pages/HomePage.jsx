import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCats } from "../../redux/features/cats";
import News from "./News";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.news.loading);
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
  useEffect(() => {
    dispatch(fetchCats());
  }, [dispatch]);

  const cats = useSelector((state) => state.cats.item);

  return (
    <div>
      <div className="sidebar">
        <p onClick={handleClickHome}>Все новости</p>{" "}
        <p onClick={handleClickAuth}>Авторизация</p>
        <p onClick={handleClickReg}>Регистрация</p>
      </div>
      <div>
        <div className="background"></div>
        <div className="cats">
          {cats.map((elem) => {
            return (
              <div key={elem._id}>
                <Link to={`/cats/${elem._id}`}>{elem.text}</Link>
              </div>
            );
          })}
        </div>
        <div>{<News />}</div>
      </div>
    </div>
  );
};

export default HomePage;
