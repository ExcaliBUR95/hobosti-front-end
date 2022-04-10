import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../redux/features/application";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClickIn = () => {
    dispatch(auth(login, password));
    handleClickHome();
  };
  let navigate = useNavigate();
  const handleClickHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div>
      <div className="sidebar">
        <p onClick={handleClickHome}>Все новости</p> <p>Авторизация</p>
      </div>
      <div>
        <div>
          <h1 style={{ marginTop: "270px" }}>Вход</h1>
        </div>
        <div>
          <input
            type="text"
            placeholder="type login"
            value={login}
            className="password_input"
            onChange={handleChangeLogin}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="type password"
            value={password}
            className="password_input"
            onChange={handleChangePassword}
          />
        </div>
        <button className="button__auth" onClick={handleClickIn}>
          Войти
        </button>
      </div>
    </div>
  );
};

export default SignIn;
