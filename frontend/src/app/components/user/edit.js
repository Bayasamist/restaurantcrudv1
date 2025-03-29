import React, { memo } from "react"
import * as Yup from 'yup';
import { Button, DatePicker, Form, Input, Select, Typography } from "antd";
import "./edit.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { UserApi } from "../../apis";
import { setUser } from "../../store/auth-slice";
import { ROLES } from "../../constant/role";


const { Title } = Typography;

const validationSchema = Yup.object({
   firstName: Yup.string().required('Required!!'),
   lastName: Yup.string().required('Required!!'),
   birthday: Yup.string().required('Required!!'),
   role: Yup.string().required('Required!!'),
});

const { Option } = Select;


const UserEditForm = memo(() => {
    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (values) => {
        try{
            console.log("values :", values);
            const res = await UserApi.update(user._id, values);
            dispatch(setUser(res));
            navigate("/dashboard");
        }catch(err){

        }

    }
    
    return (
        <div style={{ maxWidth: 500, margin: '40px auto' }}>
            <Title level={2} style={{ textAlign: 'center' }}>POS User profile</Title>

             <Formik
                initialValues={{ firstName: undefined, lastName: undefined, birthday: undefined, role: undefined }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                   {({ values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue  }) => (
                         <Form onFinish={handleSubmit} layout="vertical">
                            <Form.Item
                                label="FirstName"
                                name="firstName"
                                validateStatus={touched.firstName && errors.firstName ? 'error' : ''}
                                help={touched.firstName && errors.firstName}
                            >
                            <Input
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="firstName"
                            />
                            </Form.Item>

                            <Form.Item
                                label="LastName"
                                name="lastName"
                                validateStatus={touched.lastName && errors.lastName ? 'error' : ''}
                                help={touched.lastName && errors.lastName}
                            >
                            <Input
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="lastName"
                            />
                            </Form.Item>

                            <Form.Item
                                label="birthday"
                                name="birthday"
                                validateStatus={touched.birthday && errors.birthday ? 'error' : ''}
                                help={touched.birthday && errors.birthday}
                            >
                                <DatePicker style={{width: "100%"}} name="birthday" onChange={(_,date) => setFieldValue("birthday", date)} />

                            </Form.Item>

                            <Form.Item
                                label="Role"
                                name="role"
                                validateStatus={touched.role && errors.role ? 'error' : ''}
                                help={touched.role && errors.role}
                            >
                                <Select
                                name="role"
                                placeholder="Select role"
                                onChange={(role) => setFieldValue("role", ROLES[role])}
                                allowClear
                                >
                                    {
                                        Object.keys(ROLES).map((role, index) => (
                                            <Option key={index} value={role}>
                                                {ROLES[role]}
                                            </Option>
                                        ))
                                    }
                                </Select>

                            </Form.Item>

                            <div className="h10"/>

                            <Button htmlType="submit" type="primary" style={{width: "100%"}}>
                                Save
                            </Button>


                         </Form>
                   )}
              </Formik>
        </div>
    )

});

UserEditForm.displayName = "UserEditForm";

export {
    UserEditForm
}