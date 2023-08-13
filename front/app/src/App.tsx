import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import HomeDetail from "./pages/HomeDetail";
import Contribute from "./pages/Contribute";
import ReviewDetail from "./pages/ReviewDetail";
import Review from "./pages/Review";

const App = (): JSX.Element => {
  const id = sessionStorage.getItem("id");

  if (id !== null) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/Signin">
            <Redirect to="/Home" />
          </Route>
          <Route path="/Signup">
            <Redirect to="/Home" />
          </Route>
          <Route path="/Home/:fileinfo">
            <HomeDetail />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Contribute">
            <Contribute />
          </Route>
          <Route path="/Review/:fileid">
            <ReviewDetail />
          </Route>
          <Route path="/Review">
            <Review />
          </Route>
          <Route path="/">
            <Redirect to="/Home" />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/Signin">
            <Signin />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
          <Route path="/Home/detail">
            <Redirect to="/Signin" />
          </Route>
          <Route path="/Home">
            <Redirect to="/Signin" />
          </Route>
          <Route path="/Contribute">
            <Redirect to="/Signin" />
          </Route>
          <Route path="/Review/:fileid">
            <Redirect to="/Signin" />
          </Route>
          <Route path="/Review">
            <Redirect to="/Signin" />
          </Route>
          <Route path="/">
            <Redirect to="/Signin" />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
};

export default App;
