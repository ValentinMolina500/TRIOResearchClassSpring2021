import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Box, useToast } from "@chakra-ui/react";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import CreateForm from "./components/CreateForm";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewForms from "./components/ViewForms";
import QRCode from "./components/QRCode";
import ViewFormData from "./components/ViewFormData";

import Authentication from "./utils/Authentication";

function App() {
 

  /* Hold toast notification */
  const toast = useToast();

  const onAuthStateChanged = (authInfo) => {

    /* Alert user on account creation */
    if (authInfo.currentUser && authInfo.newUser) {
      toast({ title: "Account created!", status: "success", isClosable: true })
    } else if (authInfo.currentUser && !authInfo.newUser ) {
      toast({ title: "Logged in!", status: "success", isClosable: true })
    }

   
  }

  useEffect(() => {
    Authentication.onAuthStateChanged(onAuthStateChanged);

    return () => {
      Authentication.signOut();
    }
  }, []);

  return (
    <Router>
      <Box>
        <Switch>
          <ProtectedRoute path="/dashboard">
            <Dashboard />
          </ProtectedRoute>

          <ProtectedRoute path="/create-form">
            <CreateForm />
          </ProtectedRoute>

          <ProtectedRoute path="/view-forms">
            <ViewForms />
          </ProtectedRoute>

          <ProtectedRoute path="/qrcode">
            <QRCode />
          </ProtectedRoute>

          <ProtectedRoute path="/forms/:formId">
            <ViewFormData />
          </ProtectedRoute>

          <Route path="/signup" component={SignUp} />
          <Route path="/" component={Login} />
        </Switch>
      </Box>
    </Router>
  );
}

export default App;
