import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Header from "./components/Header";
import Progress from "./components/Progress";
const MarketingApp = lazy(() => import("./components/MarketingApp"));
const AuthApp = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  const [isSignedin, setSignedin] = useState(false);

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header  onSignOut={()=>setSignedin(false)}  isSignedIn={isSignedin} />
          <Suspense fallback={<Progress/>}>
            <Switch>
              <Route path="/auth">
                <AuthApp onSignIn={()=>setSignedin(true)}/>
                </Route>
              <Route path="/" component={MarketingApp} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
