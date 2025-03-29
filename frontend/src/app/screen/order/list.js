import { Button, Dropdown, Modal, Space, Table, Tag } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { memo, useCallback, useState } from "react";
import "./order.css";
import { OrderApi } from "../../apis";
import { OrderForm } from "../../components/order/form";

import { DownOutlined } from "@ant-design/icons";

const OrderFoodScreen = memo(() => {
  const [action, setAction] = useState([]);

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const [data, setData] = useState({
    rows: [],
    count: 0,
  });

  const fetch = useCallback(
    async (pagination) => {
      const res = await OrderApi.list({
        limit: pagination.pageSize,
        page: pagination.current,
      });
      setData(res);
    },
    [setData]
  );

  const items = [
    {
      label: "Edit",
      key: "edit",
    }
  ];

  const handleActions = async (e, id) => {
    switch (e) {
      case "edit":
        const res = await OrderApi.get(id);
        console.log("res :", res);
        setAction(["edit", {
            _id: res._id,
            table: res.table?._id,
            menu: res.menu?._id,
            status: res.status,
            served: res?.served?._id,
            cooked: res?.cooked?._id,
        }]);
        break;
      default:
    }
  };

  const onChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const onCreate = () => {
    setAction(["create"]);
  };
  const onCancel = () => {
    setAction([]);
  };

  const onRemove = async (id) => {
    await OrderApi.remove(id);
    fetch({
      pageSize: 20,
      current: 1,
    });
  };
  const onSubmit = async (values) => {
    console.log("values :", values);

    try {
      if (action && action[0] === "edit") {
        await OrderApi.update(action[1]._id, values);
      } else {
        await OrderApi.create(values);
      }
      setAction([]);
    } catch (err) {
    } finally {
      fetch({
        pageSize: 20,
        current: 1,
      });
    }
  };

  React.useEffect(() => {
    fetch(pagination);
  }, [fetch, pagination]);

  return (
    <>
      <div className="root">
        <Header className="header">
          <h2 className="title">Orders</h2>
        </Header>

        <div className="body">
          <div className="content">
            <div className="table-header">
              <h3>Orders</h3>

              <Button onClick={onCreate}>New</Button>
            </div>
            <Table
              bordered={true}
              columns={columns(items, handleActions)}
              dataSource={data.rows}
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      {action && action[0] && (
        <Modal
          title="New order"
          open={action && action[0]}
          onOk={onSubmit}
          onCancel={onCancel}
          footer={null}
        >
          <OrderForm onSubmit={onSubmit} onCancel={onCancel} action={action} />
        </Modal>
      )}
    </>
  );
});

const columns = (items, handleActions) => {
  return [
    {
      title: "Table",
      dataIndex: "table",
      key: "table",
      render: (value) => <label>{value.number}</label>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) => <Tag>{value}</Tag>,
    },
    {
      title: "Menu",
      dataIndex: "menu",
      key: "menu",
      render: (value) => <label>{value.name}</label>,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: items,
            onClick: (e) => handleActions(e.key, record._id),
          }}
          trigger={["click"]}
        >
          <Button onClick={(e) => e.preventDefault()}>
            <Space>
              Actions
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      ),
    },
  ];
};

OrderFoodScreen.displayName = "OrderFoodScreen";

export { OrderFoodScreen };
