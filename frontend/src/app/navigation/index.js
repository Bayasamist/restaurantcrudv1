import React, { memo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { DashboardScreen, LoginScreen } from "../screen";
import { PrivateRoute } from "./private-route";
import { RegisterScreen } from "../screen/register/register";
import { UserEditScreen } from "../screen/user/edit/edit";
import { AuthRoute } from "./auth-route";
import { MenuListScreen } from "../screen/menu/list";
import { OrderFoodScreen } from "../screen/order/list";
import { TableListScreen } from "../screen/table/list";

const Navigation = memo(() => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {
          <Route path="/login" element={
            <AuthRoute>
              <LoginScreen />
            </AuthRoute>
          }/>
        }
        <Route path="/register" element={
          <AuthRoute>
            <RegisterScreen />
          </AuthRoute>
        }/>

        <Route path="/user/edit" element={
          <PrivateRoute>
            <UserEditScreen/>
          </PrivateRoute>
        }/>

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardScreen />
            </PrivateRoute>
          }
        />

      <Route
          path="/menu/list"
          element={
            <PrivateRoute>
              <MenuListScreen />
            </PrivateRoute>
          }
        />
 <Route
          path="/table/list"
          element={
            <PrivateRoute>
              <TableListScreen />
            </PrivateRoute>
          }
        />
        <Route
            path="/order/list"
            element={
              <PrivateRoute>
                <OrderFoodScreen />
              </PrivateRoute>
            }
          />
        </Routes>
    </Router>
  );
});

Navigation.displayName = "Navigation";

export { Navigation };
