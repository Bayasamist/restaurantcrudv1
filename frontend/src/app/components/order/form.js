import React, { useState, useEffect, useCallback } from "react";
import { Button, message, Select } from "antd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MenuApi, TableApi } from "../../apis";

const { Option } = Select;

const validationSchema = Yup.object({
  table: Yup.string().required("Required!"),
  menu: Yup.string().required("Required!"),
  status: Yup.string().required("Required!"),
});

const STATUS = {
  ORDERED: "ordered",
  COOKING: "cooking",
  READY: "ready",
  SERVED: "served",
  CANCELLED: "cancelled",
};

const OrderForm = ({ onCancel, action, onSubmit }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [tableItems, setTableItems] = useState([]);

  const [initialValues] = useState(() => {
    if (
      action &&
      Array.isArray(action) &&
      action[0] === "edit" &&
      typeof action[1] === "object"
    ) {
      return {
        table: undefined,
        menu: undefined,
        status: undefined,
        ...action[1],
      };
    }
    return {
      table: undefined,
      menu: undefined,
      status: undefined,
    };
  });

  const fetchMenus = useCallback(async () => {
    try {
      const res = await MenuApi.list({
        limit: 100,
        page: 1,
      });
      setFoodItems(res?.rows || []);
    } catch (error) {
      console.error("Error fetching menus:", error);
      message.error(error?.message || "Failed to load menu items");
    }
  }, []);

  const fetchTables = useCallback(async () => {
    try {
      const res = await TableApi.list({
        limit: 100,
        page: 1,
      });
      setTableItems(res?.rows || []);
    } catch (error) {
      console.error("Error fetching tables:", error);
      message.error(error?.message || "Failed to load table items");
    }
  }, []);

  useEffect(() => {
    fetchMenus();
    fetchTables();
  }, [fetchMenus, fetchTables]);

  const selectMenu = (value, setFieldValue) => {
    setFieldValue("menu", value);
  };

  const selectTable = (value, setFieldValue) => {
    setFieldValue("table", value);
  };

  const statusSelect = (value, setFieldValue) => {
    setFieldValue("status", value);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
      }) => (
        <Form
          style={{
            maxWidth: 500,
            margin: "auto",
            padding: 20,
            backgroundColor: "#f8f8f8",
            borderRadius: 10,
          }}
        >
          <h2>Order Your Food</h2>

          <div className="form-group">
            <label>Select Table</label>
            <Select
              placeholder="Choose a table"
              value={values.table}
              onChange={(value) => selectTable(value, setFieldValue)}
              style={{ width: "100%" }}
            >
              {tableItems.length > 0 ? (
                tableItems.map((table) => (
                  <Option key={table._id} value={table._id}>
                    {`Table ${table.number}`}
                  </Option>
                ))
              ) : (
                <Option disabled>No tables</Option>
              )}
            </Select>
            {touched.table && errors.table && (
              <div style={{ color: "red" }}>{errors.table}</div>
            )}
          </div>

          <div className="form-group" style={{ marginTop: 16 }}>
            <label>Select Food Item</label>
            <Select
              placeholder="Choose a food item"
              value={values.menu}
              onChange={(value) => selectMenu(value, setFieldValue)}
              style={{ width: "100%" }}
            >
              {foodItems.length > 0 ? (
                foodItems.map((menu) => (
                  <Option key={menu._id} value={menu._id}>
                    {menu.name}
                  </Option>
                ))
              ) : (
                <Option disabled>No food</Option>
              )}
            </Select>
            {touched.menu && errors.menu && (
              <div style={{ color: "red" }}>{errors.menu}</div>
            )}
          </div>

          <div className="form-group" style={{ marginTop: 16 }}>
            <label>Select Status</label>
            <Select
              placeholder="Choose status"
              value={values.status}
              onChange={(value) => statusSelect(value, setFieldValue)}
              style={{ width: "100%" }}
            >
              {Object.keys(STATUS).map((status) => (
                <Option key={status} value={STATUS[status]}>
                  {status}
                </Option>
              ))}
            </Select>
            {touched.status && errors.status && (
              <div style={{ color: "red" }}>{errors.status}</div>
            )}
          </div>

          <div className="modal-footer" style={{ marginTop: 24, textAlign: "right" }}>
            <Button onClick={onCancel}>Cancel</Button>
            <div style={{ width: 10, display: "inline-block" }} />
            <Button type="primary" htmlType="submit">
              Ok
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export { OrderForm };
