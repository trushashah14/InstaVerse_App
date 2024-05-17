import React, { useState, useEffect } from "react";
import { Layout, Image, Typography, Button, Avatar } from "antd";
import styles from "./styles";
import Logo from "../../images/Logo.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import jwtDecode from 'jwt-decode'; // Import jwtDecode function from 'jwt-decode' library

const { Title } = Typography;
const { Header } = Layout;

function AppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve user information from local storage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token); // Decode the JWT token

      // Check if the token has expired
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token]);

  // Function to handle user logout
  const logout = () => {
    dispatch({ type: LOGOUT }); // Dispatch logout action
    setUser(null); // Clear user information
    navigate("/authform"); // Redirect user to the authentication form
  };

  return (
    <Header style={styles.header}>
      <Link to="/">
        <div style={styles.homelink}>
          <Image width={45} preview="false" src={Logo} style={styles.image} />
          &nbsp;
          <Title style={styles.title}>Instaverse</Title>
        </div>
      </Link>
      {!user ? (
        <Link to="/authform">
          <Button htmlType="button" style={styles.login}>
            Log In
          </Button>
        </Link>
      ) : (
        <div style={styles.userInfo}>
          <Avatar style={styles.avatar} alt="username" size="large">
            {user?.result?.username?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Title style={styles.title} level={4}>
            {user?.result?.username}
          </Title>
          <Button htmlType="button" onClick={logout}>
            Log Out
          </Button>
        </div>
      )}
    </Header>
  );
}

export default AppBar;
