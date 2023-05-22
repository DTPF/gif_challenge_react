import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedUser } from "./user.middelware";

// LAYOUTS
const BasicLayout = lazy(() => import('src/views/layouts/basicLayout'));

// USER PAGES
const HomePage = lazy(() => import('src/views/pages/basic/homePage'));
const CategoryPage = lazy(() => import('src/views/pages/basic/categoryPage'));
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
        element: <Suspense fallback={<></>}><CategoryPage /></Suspense>,
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
          <Suspense fallback={<></>}><GifFormPage /></Suspense>
      },
      {
        path: "*",
        element: <Suspense fallback={<></>}><ErrorPage /></Suspense>
      }
    ],
  },
]);

export default router;