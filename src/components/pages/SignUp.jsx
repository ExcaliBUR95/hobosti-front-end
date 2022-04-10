import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { createUser } from "../../redux/features/application";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const signingup = useSelector((state) => state.application.signingup);
  const error = useSelector((state) => state.application.error);

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(createUser(login, password));
    <Navigate to="/" replace={true} />;
  };
  let navigate = useNavigate();
  const handleClickHome = () => {
    navigate("/", { replace: true });
  };
  const handleClickAuth = () => {
    navigate("/signin", { replace: true });
  };
  return (
    <div>
      <div className="sidebar">
        <p onClick={handleClickHome}>Все новости</p>{" "}
        <p onClick={handleClickAuth}>Авторизация</p>
      </div>
      <div>
        <h1 style={{ marginTop: "270px" }}>Зарегистрироваться</h1>
      </div>
      <div>
        {error}
        <input
          type="text"
          placeholder="type login"
          value={login}
          onChange={handleChangeLogin}
          className="password_input"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="type password"
          value={password}
          onChange={handleChangePassword}
          className="password_input"
        />
      </div>
      <button
        className="button__reg"
        onClick={handleSubmit}
        disabled={signingup}
      >
        Зарегистрироваться
      </button>
    </div>
  );
};

export default SignUp;
