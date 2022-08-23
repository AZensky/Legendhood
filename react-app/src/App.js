import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignUpPage from "./components/SignUpPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import HomePage from "./components/HomePage";
import DashBoard from "./components/Dashboard";
import WatchListPage from "./components/WatchListPage";
import DetailsPage from "./components/DetailsPage";
import LogInPage from "./components/LogInPage";
import { authenticate } from "./store/session";
import APICallsExceeded from "./components/APICallsExceeded/Index";
import DashboardNav from "./components/DashboardNavbar";
import PageNotFound from "./components/PageNotFound/PageNotFound";

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
      <Switch>
        <ProtectedRoute path="/stocks/:symbol">
          <DetailsPage />
        </ProtectedRoute>
        <ProtectedRoute path="/dashboard">
          <DashBoard />
        </ProtectedRoute>
        <ProtectedRoute path="/watchlists/:watchlistId">
          <WatchListPage />
        </ProtectedRoute>
        <Route path="/login" exact={true}>
          <LogInPage />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpPage />
        </Route>
        <Route exact path="/api-calls-exceeded">
          <DashboardNav />
          <APICallsExceeded />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
