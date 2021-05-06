import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Box, useToast } from "@chakra-ui/react";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import SignUp from "./components/SignUp";
import CreateForm from "./components/CreateForm";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewForms from "./components/ViewForms";
import QRCode from "./components/QRCode";
import ViewFormData from "./components/ViewFormData";

import Authentication, { UserRole } from "./utils/Authentication";
import { useState } from "react";
import ViewAllFormsAdmin from "./components/ViewAllFormsAdmin";
import ViewFormDataAdmin from "./components/ViewFormDataAdmin";
import ScanQRCode from "./components/ScanQRCode";

function App() {
  const [bump, setBump] = useState({});
  const user = Authentication.getCurrentUser() || {};
  /* Hold toast notification */
  const toast = useToast();

  const onAuthStateChanged = (authInfo) => {

    /* Alert user on account creation */
    if (authInfo.currentUser && authInfo.newUser) {
      toast({ title: "Account created!", status: "success", isClosable: true })
    } else if (authInfo.currentUser && !authInfo.newUser ) {
      toast({ title: "Logged in!", status: "success", isClosable: true })
    }

   setBump({})
  }

  useEffect(() => {
    Authentication.onAuthStateChanged(onAuthStateChanged);

    return () => {
      Authentication.signOut();
    }
  }, []);

  const renderDashboard = (userData) => {
    console.log("WOO");
    console.log(userData);
    if (!userData.role)
    {
      return <Dashboard />;
    }

    return userData.role === UserRole.REGULAR ? <Dashboard /> : <AdminDashboard />
  }

  const renderViewForms = (userData) => {
    if (!userData || !userData.role) {
      return <ViewForms />;
    }

    return userData.role === UserRole.REGULAR ? <ViewForms /> : <ViewAllFormsAdmin />
  }

  const renderFormData = (userData) => {
    if (!userData || !userData.role) {
      return <ViewFormData />;
    }
    return userData.role === UserRole.REGULAR ? <ViewFormData /> : <ViewFormDataAdmin />
  }

  return (
    <Router>
      <Box>
        <Switch>
          
        <ProtectedRoute path="/dashboard">
          {renderDashboard(user)}
        </ProtectedRoute>

          <ProtectedRoute path="/create-form">
            <CreateForm />
          </ProtectedRoute>

          <ProtectedRoute path="/view-forms">
            {renderViewForms(user)}
          </ProtectedRoute>

          

          <ProtectedRoute path="/qrcode">
            <QRCode />
          </ProtectedRoute>

          <ProtectedRoute path="/forms/:formId">
            {renderFormData(user)}
          </ProtectedRoute>

          <ProtectedRoute path="/scan-qrcode">
            <ScanQRCode />
          </ProtectedRoute>

          <Route path="/signup" component={SignUp} />
          <Route path="/" component={Login} />
        </Switch>
      </Box>
    </Router>
  );
}

export default App;
