import { Button, Card, Col, Row, Typography } from "antd";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { Header } from "antd/es/layout/layout";
import { LogoutOutlined } from "@ant-design/icons";

const DashboardScreen = memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const menus = [
    {
      name: "Menu",
      icon: "/assets/icons/menu.png",
      route: "/menu/list",
    },
    {
      name: "Order",
      icon: "/assets/icons/order.png",
      route: "/order/list",
    },
    {
      name: "Table",
      icon: "/assets/icons/delivery-man.png",
      route: "/table/list",
    },
  ];

  return (
    <div className="root">
      <Header className="header">
        <h2 className="title">POS Dashboard</h2>
        <Button
          onClick={logout}
          type="primary"
          danger
          icon={<LogoutOutlined />}
        />
      </Header>
      <div className="body">
        <div className="content">
          <Row gutter={[16, 16]} justify="center">
            {menus.map((item) => (
              <Col key={item.name} xs={24} sm={12} md={8} lg={6}>
                <Card
                  bordered={false}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(item.route);
                  }}
                >
                  <img src={item.icon} className="icon" />
                  <h4>{item.name}</h4>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
});

DashboardScreen.displayName = "DashboardScreen";

export { DashboardScreen };
