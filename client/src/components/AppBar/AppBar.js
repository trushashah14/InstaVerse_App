import React, { useState, useEffect } from "react";
import { Layout, Image, Typography, Button, Avatar } from "antd";
import styles from "./styles";
import Logo from "../../images/Logo.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import {jwtDecode} from 'jwt-decode';


const { Title } = Typography;
const { Header } = Layout;

function AppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token]);

  const logout = () => {
    dispatch({ type: LOGOUT });
    setUser(null);
    navigate("/authform");
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