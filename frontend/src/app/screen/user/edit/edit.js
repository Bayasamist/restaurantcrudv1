import React, { memo } from "react";
import "./edit.css"
import { Header } from "antd/es/layout/layout";
import { UserEditForm } from "../../../components/user/edit";

const  UserEditScreen = memo(() => {

    return (
        <div className="root">
            <Header 
             style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}/>
              <div className="container">
                <UserEditForm/>
              </div>
        </div>
    )
});

UserEditScreen.displayName = "UserEditScreen";

export {
    UserEditScreen
}