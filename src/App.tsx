import { Route, Routes } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";
import { Verify } from "./containers/Verify.jsx/index.js";
import { Login } from "./containers/Login.jsx";
import { Register } from "./containers/Register.jsx";
import { Profile } from "./containers/Profile.jsx";
import { AuthenticatedRoute } from "./components/routes/AuthenticatedRoute.jsx";
import { UnauthenticatedRoute } from "./components/routes/UnauthenticatedRoute.jsx";
import { Dashboard } from "./containers/DashBoard.jsx";
import { UserInfoProvider } from "./components/providers/UserInfoProvider.jsx";
import { DashBoardProvider } from "./components/providers/DashBoardProvider.jsx";
import { LoggedUserInfoProvider } from "./components/providers/LoggedUserInfoProvider.jsx";
import { MovieCardProvider } from "./components/providers/MovieCardProvider.jsx";
import { CommentPop } from "./graphql/CommentPop.jsx";

const options = {
  position: positions.MIDDLE,
};

const App = function () {
  return (
    <MovieCardProvider>
      <Provider template={AlertMUITemplate} {...options}>
        <Routes>
          <Route path="/" element={<UnauthenticatedRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/verify" element={<Verify />} />
          <Route path="/" element={<AuthenticatedRoute />}>
            <Route
              path="/"
              element={
                <DashBoardProvider>
                  <Dashboard />
                </DashBoardProvider>
              }
            />
            <Route
              path="/movies/:num"
              element={
                <DashBoardProvider>
                  <Dashboard />
                </DashBoardProvider>
              }
            />
            <Route
              path="/marks/:num"
              element={
                <DashBoardProvider>
                  <Dashboard />
                </DashBoardProvider>
              }
            />
            <Route
              path="/mark/:markId"
              element={
                <LoggedUserInfoProvider>
                  <DashBoardProvider>
                    <CommentPop />
                  </DashBoardProvider>
                </LoggedUserInfoProvider>
              }
            />

            <Route
              path="/user/:userId/profile"
              element={
                <LoggedUserInfoProvider>
                  <UserInfoProvider>
                    <Profile />
                  </UserInfoProvider>
                </LoggedUserInfoProvider>
              }
            />
          </Route>
          <Route path="/" element={<Register />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>Theres nothing here!</p>
              </main>
            }
          />
        </Routes>
      </Provider>
    </MovieCardProvider>
  );
};

export default App;
