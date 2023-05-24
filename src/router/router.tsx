import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedGif, ProtectedUser } from "./user.middelware";

// LAYOUTS
const BasicLayout = lazy(() => import('views/layouts/basicLayout'));
// USER PAGES
const HomePage = lazy(() => import('views/pages/basic/homePage'));
const CategoriesPage = lazy(() => import('views/pages/basic/categoriesPage'));
const Category = lazy(() => import('views/components/basic/category'));
const ProfilePage = lazy(() => import('views/pages/basic/profilePage'));
const GifFormPage = lazy(() => import('views/pages/basic/gifFormPage'));
const SearchPage = lazy(() => import('views/pages/basic/searchPage'));
// MESSAGES PAGES
const ErrorPage = lazy(() => import('views/pages/errors'));

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
        path: "search",
        element: <Suspense fallback={<></>}><SearchPage /></Suspense>
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