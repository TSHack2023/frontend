import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import HomeDetail from "./pages/HomeDetail";
import Contribute from "./pages/Contribute";
import ReviewDetail from "./pages/ReviewDetail";
import Review from "./pages/Review";

const App = (): JSX.Element => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/Signin">
            <Signin />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
          <Route path="/Home/">
            <HomeDetail />
          </Route>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/Contribute">
            <Contribute />
          </Route>
          <Route path="/Review/:fileid" component={ReviewDetail}></Route>
          <Route path="/Review">
            <Review />
          </Route>
          <Route path="/">
            <Header />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
