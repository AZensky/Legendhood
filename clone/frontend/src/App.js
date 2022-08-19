import React from "react";
import HomePage from "./components/HomePage";
import DashBoard from "./components/Dashboard";
import WatchListPage from "./components/WatchListPage";
import SignUpPage from "./components/SignUpPage";
import { Switch, Route } from "react-router-dom";
import DetailsPage from "./components/DetailsPage";
import LogInPage from "./components/LogInPage";

function App() {
  return (
    <>
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
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/login">
          <LogInPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
