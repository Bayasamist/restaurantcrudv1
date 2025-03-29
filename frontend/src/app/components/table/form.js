import React, { useRef, useState } from "react";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form, Input, Button, Typography, InputNumber, Checkbox } from 'antd';


const validationSchema = Yup.object({
    number: Yup.string().required('Require!'),
  });


  
const TableForm = ({onSubmit,onCancel,  action}) => {

    const [data] = useState({
        number: undefined,
     
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
                                       label="Number"
                                       validateStatus={touched.number && errors.number ? 'error' : ''}
                                       help={touched.number && errors.number}
                                   >
                                   <Input
                                       name="number"
                                       value={values.number}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       placeholder="Number"
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
                       )
                    )
                }}
              </Formik>
    )
}

export {
    TableForm
}