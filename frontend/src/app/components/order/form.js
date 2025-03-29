import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, message, Select, InputNumber } from "antd";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MenuApi, OrderApi, TableApi } from "../../apis";

const { Option } = Select;

const validationSchema = Yup.object({
  name: Yup.string().required('Please enter your name!'),
  table: Yup.string().required('Please enter your table number!'),
  food: Yup.string().required('Please select a food item!'),
  quantity: Yup.number().required('Please enter the quantity!').min(1, 'Quantity must be at least 1'),
});

const OrderForm = ({ onCancel, action }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [tableItems, setTableItems] = useState([]);

  // Set initial values based on action
  const [initialValues] = useState({
    name: undefined,
    table: undefined,
    quantity: undefined,
    food: undefined,
    ...(action && action[0] === "edit" ? action[1] : {}),
  });

  // Fetch menus and tables
  const fetchMenus = useCallback(async () => {
    try {
      const res = await MenuApi.list({
        limit: 100,
        page: 1
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
        page: 1
      });
      setTableItems(res.rows || []);
    } catch (error) {
      console.error("Error fetching tables:", error);
      message.error("Failed to load table items");
    }
  }, []);

  // Fetch menus and tables on component mount
  useEffect(() => {
    fetchMenus();
    fetchTables();
  }, [fetchMenus, fetchTables]);

  const handleFoodChange = (value, setFieldValue) => {
    setFieldValue("food", value);
  };

  const handleTableChange = (value, setFieldValue) => {
    setFieldValue("table", value);
  };

  const handleSubmit = async (values) => {
    try {
      const orderData = {
        table: values.table,
        items: [{
          name: values.food,
          quantity: values.quantity,
          specialRequests: values.notes || ''
        }]
      };
  
      await OrderApi.create(orderData);
      message.success('Order created successfully!');
      onCancel(); 
    } catch (error) {
      console.error('Order creation failed:', error.response?.data);
      if (error.response?.data) {
        message.error(`Error: ${error.response?.data.message}`);
      } else {
        message.error('Failed to create order. Please try again.');
      }
    }
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit} // Use the handleSubmit here
      enableReinitialize
    >
      {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
        <div style={{ maxWidth: 500, margin: "auto", padding: 20, backgroundColor: "#f8f8f8", borderRadius: 10 }}>
          <h2>Order Your Food</h2>
          <Form layout="vertical">
            <Form.Item
              label="Your Name"
              validateStatus={touched.name && errors.name ? 'error' : ''}
              help={touched.name && errors.name}
            >
              <Input
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your name"
              />
            </Form.Item>

            <Form.Item
              label="Select Table"
              validateStatus={touched.table && errors.table ? 'error' : ''}
              help={touched.table && errors.table}
            >
              <Select
                placeholder="Choose a table"
                value={values.table}
                onChange={(value) => handleTableChange(value, setFieldValue)}
              >
                {tableItems.length > 0 ? (
                  tableItems.map(table => (
                    <Option key={table._id} value={table._id}>
                      {`Table ${table.number}`}
                    </Option>
                  ))
                ) : (
                  <Option disabled>No tables available</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label="Select Food Item"
              validateStatus={touched.food && errors.food ? 'error' : ''}
              help={touched.food && errors.food}
            >
              <Select
                placeholder="Choose a food item"
                value={values.food}
                onChange={(value) => handleFoodChange(value, setFieldValue)}
              >
                {foodItems.length > 0 ? (
                  foodItems.map(food => (
                    <Option key={food._id} value={food._id}>{food.name}</Option>
                  ))
                ) : (
                  <Option disabled>No food items available</Option>
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label="Quantity"
              validateStatus={touched.quantity && errors.quantity ? 'error' : ''}
              help={touched.quantity && errors.quantity}
            >
              <InputNumber
                name="quantity"
                min={1}
                value={values.quantity}
                onChange={(value) => setFieldValue("quantity", value)}
                style={{ width: "100%" }}
              />
            </Form.Item>

         <div className="modal-footer">
                                              <Button onClick={onCancel}>
                                                  Cancel
                                              </Button>
                                              <div className="w10"/>
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
