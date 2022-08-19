import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
// import LoginForm from "./components/auth/LoginForm";
// import SignUpForm from "./components/auth/SignUpForm";
import SignUpPage from "./components/SignUpPage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// import UsersList from './components/UsersList';
// import User from "./components/User";
import HomePage from "./components/HomePage";
import DashBoard from "./components/Dashboard";
import WatchListPage from "./components/WatchListPage";
import DetailsPage from "./components/DetailsPage";
import LogInPage from "./components/LogInPage";
import { authenticate } from "./store/session";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path="/stocks/:symbol">
          <DetailsPage />
        </Route>
        <Route path="/dashboard">
          <DashBoard />
        </Route>
        <Route path="/watchlist">
          <WatchListPage />
        </Route>
        <Route path="/login" exact={true}>
          <LogInPage />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpPage />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        {/* <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute> */}
        {/* <ProtectedRoute path="/" exact={true}>
          <HomePage />
        </ProtectedRoute> */}
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
