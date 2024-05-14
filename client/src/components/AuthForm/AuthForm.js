import React, { useState } from "react";
import { Form, Input, Card, Layout, Typography, Button, Spin } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, signup } from "../../actions/authentication";
import styles from "./styles";

const { Title } = Typography;


function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (formValues) => {
    setIsLoading(true);
    try {
      if (isLogin) {
        await dispatch(login(formValues, navigate));
      } else {
        await dispatch(signup(formValues, navigate));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
     <Layout style={styles.container}>
      {/* <Content style={{ padding: "50px", minHeight: "100vh" }}> */}
        <Card  style={styles.card} title={<Title level={4}>{isLogin ? "Login to" : "Join"} Instaverse</Title>}>
          <Form
            form={form}
            name="authform"
            size="large"
            wrapperCol={{ span: 20, offset: 2 }}
            onFinish={onSubmit}
            initialValues={{ remember: true }}
          >
            {!isLogin && (
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Please enter your username" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
            )}
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter valid email" }]}
            >
              <Input type="email" prefix={<MailOutlined />} placeholder="Email address" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password type="password" prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            {!isLogin && (
              <Form.Item
                name="confirmPassword"
                rules={[{ required: true, message: "Please repeat your password" }]}
              >
                <Input.Password
                type="password"
                  prefix={<LockOutlined />}
                  placeholder="Confirm password"
                />
              </Form.Item>
            )}
            <Form.Item>
              <Button typeof="primary" htmlType="submit">
                {isLogin ? "Log In" : "Join"}
              </Button>
              <span style={{ margin: "0 10px 0px 20px" }}> Or</span>
              <Button type="link" onClick={switchMode}>
                {isLogin ? "Register Now" : "Have an Account?"}
              </Button>
            </Form.Item>
          </Form>
          {isLoading && (
            <div style={{ textAlign: "center" }}>
              <Spin />
            </div>
          )}
        </Card>
      {/* </Content> */}
    </Layout>
  );
}

export default AuthForm;





// import React, { useState } from "react";
// import { Form, Input, Card, Layout, Typography, Button } from "antd";
// import styles from "./styles";
// import { useNavigate } from "react-router-dom";
// import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
// import { useDispatch } from "react-redux";
// import { login, signup } from "../../actions/authentication";

// const { Title } = Typography;

// function AuthForm() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [form] = Form.useForm();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const onSubmit = (formValues) => {
//     if (isLogin) {
//       dispatch(login(formValues, navigate));
//     } else {
//       dispatch(signup(formValues, navigate));
//     }
//   };

//   const switchMode = () => {
//     setIsLogin(prevIsLogin => !prevIsLogin);
//   };

//   return (
//     <Layout style={styles.container}>
//       <Card
//         style={styles.card}
//         title={
//           <Title level={4} style={{ textAlign: "center" }}>
//             {isLogin ? "Login to" : "Join"} Instaverse
//           </Title>
//         }
//       >
//         <Form
//           name="authform"
//           form={form}
//           size="large"
//           wrapperCol={{ span: 20, offset: 2 }}
//           onFinish={onSubmit}
//         >
//           {isLogin || (
//             <>
//               <Form.Item
//                 name="username"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please enter your username",
//                   },
//                 ]}
//               >
//                 <Input prefix={<UserOutlined />} placeholder="username" />
//               </Form.Item>
//             </>
//           )}
//           <Form.Item
//             name="email"
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter valid email",
//               },
//             ]}
//           >
//             <Input
//               type="email"
//               prefix={<MailOutlined />}
//               placeholder="email address"
//             />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter your password",
//               },
//             ]}
//           >
//             <Input.Password
//               type="password"
//               prefix={<LockOutlined />}
//               placeholder="password"
//             />
//           </Form.Item>
//           {isLogin || (
//             <Form.Item
//               name="confirmPassword"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please repeat your password",
//                 },
//               ]}
//             >
//               <Input.Password
//                 type="password"
//                 prefix={<LockOutlined />}
//                 placeholder="confirm password"
//               />
//             </Form.Item>
//           )}

//           <Form.Item>
//             <Button htmlType="submit" typeof="primary">
//               {isLogin ? "Log In" : "Join"}
//             </Button>
//             <span style={{ margin: "0 10px 0px 20px" }}> Or</span>
//             <Button type="link" onClick={switchMode}>
//               {isLogin ? "Register Now" : "Have an Account?"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </Layout>
//   );
// }

// export default AuthForm;

