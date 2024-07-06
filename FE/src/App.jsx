
import { Routes, Route } from "react-router-dom";
import { Fragment, Suspense, lazy } from "react";
import AuthProvider from "./context/AuthContext.jsx";
import "./App.css";

const DefaultLayout = lazy(() => import("./component/layout/DefaultLayout.jsx"));

import RequireAuth from "./routes/RequireAuth.jsx";
import { publicRoutes, privateRoutes } from "./routes/Route.jsx";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <Suspense>
        <Routes>
          {/* Route tự viết để test */}
          {/* Route tự viết không ghi qua phần này */}
          {publicRoutes.map((route, index) => {
            let Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              // Route cho nhung thanh phan cha
              <Route
                key={index}
                index={route.index ? true : undefined}
                path={route.index ? undefined : route.path}
                element={
                  <Layout>
                    {" "}
                    <Page />{" "}
                  </Layout>
                }
              >
                {/* Route neu co child trong file Route.jsx */}
                {route.children && route.children.map((childRoute, childIndex) => {
                  let ChildPage = childRoute.component
                  return (
                    <Route key={childIndex} index={childRoute.index ? true : undefined} path={childRoute.index ? undefined : childRoute.path} element={<ChildPage />} />
                  )
                })}

              </Route>
            )
          })}

          {/* Private route */}

          {privateRoutes.map((route, index) => {
            let Page = route.component;
            let Layout = Fragment;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                element={<RequireAuth allowedRole={route.role} />}
              >
                <Route
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                >
                  {route.children &&
                    route.children.map((childRoute, childIndex) => {
                      let ChildPage = childRoute.component;
                      return (
                        <Route
                          key={childIndex}
                          index={childRoute.index ? true : undefined}
                          path={childRoute.index ? undefined : childRoute.path}
                          element={<ChildPage />}
                        />
                      );
                    })}
                </Route>
              </Route>
            );
          })}


        </Routes>
      </Suspense>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App
