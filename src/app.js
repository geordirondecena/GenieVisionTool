import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import { ProtectedRoute } from "./components/protected-route";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProfilePage } from "./pages/profile-page";

export const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};
