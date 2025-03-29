import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, message, Select } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { MenuApi, TableApi } from "../../apis";

const { Option } = Select;

const validationSchema = Yup.object({
  table: Yup.string().required("Require!"),
  menu: Yup.string().required("Require!"),
  status: Yup.string().required("Require!"),
});

const STATUS = {
    ORDERED : 'ordered',
    COOKING: 'cooking',
    READY :    'ready',
    SERVED: 'served',
    CANCELLED: 'cancelled'
}

const OrderForm = ({ onCancel, action, onSubmit }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [tableItems, setTableItems] = useState([]);

  const [initialValues] = useState({
    table: undefined,
    menu: undefined,
    status: undefined,
    ...(action && action[0] === "edit" ? action[1] : {}),
  });

  console.log("initialValues :", initialValues);

  const fetchMenus = useCallback(async () => {
    try {
      const res = await MenuApi.list({
        limit: 100,
        page: 1,
      });
      setFoodItems(res.rows || []);
    } catch (error) {
      console.error("Error fetching menus:", error);
      message.error("Failed to load menu items");
    }
  }, []);

  const fetchTables = useCallback(async () => {
    try {
      const res = await TableApi.list({
        limit: 100,
        page: 1,
      });
      setTableItems(res.rows || []);
    } catch (error) {
      console.error("Error fetching tables:", error);
      message.error("Failed to load table items");
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
  }

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
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit
      }) => (
        <div
          style={{
            maxWidth: 500,
            margin: "auto",
            padding: 20,
            backgroundColor: "#f8f8f8",
            borderRadius: 10,
          }}
        >
          <h2>Order Your Food</h2>
          <Form layout="vertical">
            <Form.Item
              label="Select Table"
              validateStatus={touched.table && errors.table ? "error" : ""}
              help={touched.table && errors.table}
            >
              <Select
                placeholder="Choose a table"
                value={values.table}
                onChange={(value) => selectTable(value, setFieldValue)}
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
            </Form.Item>

            <Form.Item
              label="Select Food Item"
              validateStatus={touched.menu && errors.menu ? "error" : ""}
              help={touched.menu && errors.menu}
            >
              <Select
                placeholder="Choose a food item"
                value={values.menu}
                onChange={(value) => selectMenu(value, setFieldValue)}
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
            </Form.Item>

            <Form.Item
              label="Selected status"
              validateStatus={touched.status && errors.status ? "error" : ""}
              help={touched.status && errors.status}
            >
              <Select
                placeholder="Choose a selected status"
                value={values.status}
                name="status"
                onChange={(value) => statusSelect(value, setFieldValue)}
              >
                {Object.keys(STATUS).map((status) => (
                  <Option key={status} value={STATUS[status]}>
                    {status}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <div className="modal-footer">
              <Button onClick={onCancel}>Cancel</Button>
              <div className="w10" />
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Ok
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export { OrderForm };
