import { Form, Input, Typography, Button } from "antd";
import { Formik } from "formik";
import React, { memo } from "react";
import * as Yup from 'yup';
import { AuthApi } from "../../apis";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../store/auth-slice";

const { Title } = Typography;

const validationSchema = Yup.object({
  username: Yup.string().required('Хэрэглэгчийн нэр шаардлагатай'),
  email: Yup.string().required('Email'),
  password: Yup.string()
    .min(3, 'Нууц үг хамгийн багадаа 3 тэмдэгт байх ёстой')
    .required('Нууц үг шаардлагатай'),
});

const RegisterForm = memo(() => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onSubmit = async (values) => {
        try{
            console.log("values :", values);
            const res = await AuthApi.register(values);
            console.log("res :", res);
            dispatch(setAccessToken(res))
            navigate("/user/edit")
        }catch(err){

        }
    }

    return (
        <div style={{ maxWidth: 400, margin: '40px auto' }}>
            <Title level={2} style={{ textAlign: 'center' }}>POS Register</Title>

            <Formik
            initialValues={{ email: undefined, password: undefined, username: undefined }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
                {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                <Form onFinish={handleSubmit} layout="vertical">
                     <Form.Item
                        email="username"
                        label="Username"
                        validateStatus={touched.username && errors.username ? 'error' : ''}
                        help={touched.username && errors.username}
                    >
                    <Input
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="👤 username"
                    />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        validateStatus={touched.email && errors.email ? 'error' : ''}
                        help={touched.email && errors.email}
                    >
                    <Input
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="👤 email"
                    />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        validateStatus={touched.password && errors.password ? 'error' : ''}
                        help={touched.password && errors.password}
                    >
                    <Input
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="🔐 password"
                        type="password"
                    />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                     Register
                    </Button>

                </Form>
                )}
            </Formik>
        </div>
    )
});


RegisterForm.displayName = "RegisterForm";

export {
    RegisterForm
}