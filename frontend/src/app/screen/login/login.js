import React, { memo, useState } from "react";
import "./login.css";
import { LoginForm } from "../../components/login/form";

const LoginScreen = memo(() => {
  return (
    <div className="container">
      <div className="box">
        <LoginForm/>
      </div>
    </div>
  );
});

LoginScreen.displayName = "LoginScreen";
export { LoginScreen };
