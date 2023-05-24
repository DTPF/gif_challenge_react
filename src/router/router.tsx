/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedGif, ProtectedUser } from "./user.middelware";

// LAYOUTS
const BasicLayout = lazy(() => import('src/views/layouts/basicLayout'));
// USER PAGES
const HomePage = lazy(() => import('src/views/pages/basic/homePage'));
const CategoriesPage = lazy(() => import('src/views/pages/basic/categoriesPage'));
const Category = lazy(() => import('src/views/components/basic/category'));
const ProfilePage = lazy(() => import('src/views/pages/basic/profilePage'));
const GifFormPage = lazy(() => import('src/views/pages/basic/gifFormPage'));
// MESSAGES PAGES
const ErrorPage = lazy(() => import('src/views/pages/errors'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<></>}><BasicLayout /></Suspense>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<></>}><HomePage /></Suspense>,
      },
      {
        path: "categories",
        element: <Suspense fallback={<></>}><CategoriesPage /></Suspense>,
        children: [
          {
            path: ":categoryId",
            element: <Suspense fallback={<></>}><Category /></Suspense>
          },
        ]

      },
      {
        path: "profile",
        element:
          <ProtectedUser>
            <Suspense fallback={<></>}><ProfilePage /></Suspense>
          </ProtectedUser>
      },
      {
        path: "gif-form",
        element:
          <ProtectedUser>
            <Suspense fallback={<></>}><GifFormPage /></Suspense>
          </ProtectedUser>,
        children: [
          {
            path: ":gifId",
            element: (
              <ProtectedUser>
                <ProtectedGif>
                  <Suspense fallback={<></>}>
                    <GifFormPage />
                  </Suspense>
                </ProtectedGif>
              </ProtectedUser>
            ),
          },
        ]
      },
      {
        path: "*",
        element: <Suspense fallback={<></>}><ErrorPage /></Suspense>
      }
    ],
  },
]);

export default router;