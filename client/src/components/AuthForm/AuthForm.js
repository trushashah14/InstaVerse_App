import React, { useState } from "react";
import { Form, Input, Card, Layout, Typography, Button, Spin } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, signup } from "../../actions/authentication";
import styles from "./styles";

const { Title } = Typography;

function AuthForm() {
  // State variables
  const [isLogin, setIsLogin] = useState(true); // State for login or signup mode
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  const [form] = Form.useForm(); // Form instance
  const navigate = useNavigate(); // Navigation hook
  const dispatch = useDispatch(); // Redux dispatch function

  // Function to handle form submission
  const onSubmit = async (formValues) => {
    setIsLoading(true); // Set loading state to true
    try {
      if (isLogin) {
        // Dispatch login action if in login mode
        await dispatch(login(formValues, navigate));
      } else {
        // Dispatch signup action if in signup mode
        await dispatch(signup(formValues, navigate));
      }
    } catch (error) {
      console.log(error); // Log any errors
    } finally {
      setIsLoading(false); // Set loading state to false after form submission
    }
  };

  // Function to switch between login and signup mode
  const switchMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin); // Toggle login/signup mode
  };

  return (
    <Layout style={styles.container}>
      {/* Authentication card */}
      <Card
        style={styles.card}
        title={
          <Title level={4} style={{ textAlign: "center" }}>
            {/* Display login or signup title based on mode */}
            {isLogin ? "Login to" : "Join"} Instaverse
          </Title>
        }
      >
        {/* Authentication form */}
        <Form
          form={form}
          name="authform"
          size="large"
          wrapperCol={{ span: 20, offset: 2 }}
          onFinish={onSubmit}
          initialValues={{ remember: true }}
        >
          {/* Username input field (only for signup mode) */}
          {!isLogin && (
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
          )}
          {/* Email input field */}
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter valid email" }]}
          >
            <Input
              type="email"
              prefix={<MailOutlined />}
              placeholder="Email address"
            />
          </Form.Item>
          {/* Password input field */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              type="password"
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>
          {/* Confirm password input field (only for signup mode) */}
          {!isLogin && (
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please repeat your password" },
              ]}
            >
              <Input.Password
                type="password"
                prefix={<LockOutlined />}
                placeholder="Confirm password"
              />
            </Form.Item>
          )}
          {/* Form submission buttons */}
          <Form.Item>
            <Button typeof="primary" htmlType="submit">
              {/* Display "Log In" or "Join" based on mode */}
              {isLogin ? "Log In" : "Join"}
            </Button>
            {/* Switch mode link */}
            <span style={{ margin: "0 10px 0px 20px" }}> Or</span>
            <Button type="link" onClick={switchMode}>
              {/* Display "Register Now" or "Have an Account?" based on mode */}
              {isLogin ? "Register Now" : "Have an Account?"}
            </Button>
          </Form.Item>
        </Form>
        {/* Loading spinner */}
        {isLoading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
      </Card>
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
