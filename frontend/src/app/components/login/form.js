import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {AuthApi} from "../../apis"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../store/auth-slice';

const { Title } = Typography;

const validationSchema = Yup.object({
  username: Yup.string().required('user name required'),
  password: Yup.string()
    .min(3, 'user name must be at least 3 characters')
    .required('password required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = () => {
    navigate("/register");
  } 

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <Title level={2} style={{ textAlign: 'center' }}>POS Login</Title>

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log('🛂 Login:', values);
          const res = await AuthApi.login(values);
          dispatch(setAccessToken(res));
          navigate("/dashboard")
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
          <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Username"
              validateStatus={touched.username && errors.username ? 'error' : ''}
              help={touched.username && errors.username}
            >
              <Input
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="👤 Username"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              validateStatus={touched.password && errors.password ? 'error' : ''}
              help={touched.password && errors.password}
            >
              <Input.Password
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="🔐 Password"
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
            <div className='h10'/>
            <Button onClick={onRegister} block>
              Register 
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}


export {
    LoginForm
}