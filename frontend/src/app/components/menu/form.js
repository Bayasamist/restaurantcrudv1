import React, { useRef, useState } from "react";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form, Input, Button, Typography, InputNumber, Checkbox } from 'antd';


const validationSchema = Yup.object({
    name: Yup.string().required('Require!'),
    price: Yup.number().required('Require!').min(0,'Require!'),
  });


  
const MenuForm = ({onSubmit,onCancel,  action}) => {

    const [data] = useState({
        name: undefined,
        price: undefined,
        available: false,
        ...(action && action[0] === "edit" ? action[1]: {})
    })

    return (
          <Formik
                initialValues={data}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue }) => {
                    return (
                        (
                            <div>
                               <Form onFinish={handleSubmit} layout="vertical">
                                   <Form.Item
                                       label="Name"
                                       validateStatus={touched.name && errors.name ? 'error' : ''}
                                       help={touched.name && errors.name}
                                   >
                                   <Input
                                       name="name"
                                       value={values.name}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       placeholder="Name"
                                   />
                                   </Form.Item>
       
                                   <Form.Item
                                       label="price"
                                       validateStatus={touched.price && errors.price ? 'error' : ''}
                                       help={touched.price && errors.price}
                                   >
                                   <InputNumber
                                       name="Price"
                                       defaultValue={0}
                                       formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                       parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                       value={values.price}
                                       onChange={(e) => setFieldValue("price", e)}
                                       style={{width: "100%"}}
                                   />
                                   </Form.Item>
       
                                   <Form.Item
                                       label="Available"
                                       validateStatus={touched.available && errors.available ? 'error' : ''}
                                       help={touched.available && errors.available}
                                   >
                                    <Checkbox 
                                       checked={values.available} 
                                       onChange={(e) => setFieldValue("available", e.target.checked)} 
                                       name="available"/>
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
                       )
                    )
                }}
              </Formik>
    )
}

export {
    MenuForm
}