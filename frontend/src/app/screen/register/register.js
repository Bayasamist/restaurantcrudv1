import React, { memo } from "react";
import "./register.css"
import { RegisterForm } from "../../components/register/form";

const RegisterScreen = memo(() => {

    return (
        <div className="container">
            <div className="box">
                <RegisterForm/>
            </div>
        </div>
    )
});

RegisterScreen.displayName = "RegisterScreen";

export {
    RegisterScreen
}