import React from "react";
import { Layout } from "antd";
import Home from "./components/Home";
import styles from "./styles";
import AppBar from "./components/AppBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
const { Footer } = Layout;

// Main App component
const App = () => {
  return (
    <BrowserRouter> {/* BrowserRouter to manage navigation */}
      <Layout style={styles.layout}> {/* Layout component with custom styles */}
        <AppBar /> {/* AppBar component for navigation */}
        <Routes> {/* Routes component to define route paths */}
          <Route path="/" element={<Home />} /> {/* Route for Home component */}
          <Route path="/authform" element={<AuthForm />} /> {/* Route for AuthForm component */}
        </Routes>
        <Footer style={styles.footer}>2023 Instaverse</Footer> {/* Footer section with custom styles */}
      </Layout>
    </BrowserRouter>
  );
};

export default App;
