import { RouterProvider } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';
import UserProvider from './context/user/UserProvider'
import GifProvider from './context/gif/GifProvider';
import MyGifsProvider from './context/mygifs/MyGifsProvider';
import router from './router/router';
import { isLocalhost } from './utils/isLocalhost';
import SearchProvider from './context/search/SearchProvider';

export default function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
      clientId={
        isLocalhost
          ? process.env.REACT_APP_DEVELOPMENT_AUTH0_CLIENT_ID as string
          : process.env.REACT_APP_PRODUCTION_AUTH0_CLIENT_ID as string
      }
      authorizationParams={{
        redirect_uri: window.location.origin + '/',
        audience: isLocalhost
          ? process.env.REACT_APP_AUTH0_AUDIENCE_DEVELOPMENT
          : process.env.REACT_APP_AUTH0_AUDIENCE_PRODUCTION
      }}
    >
      <UserProvider>
        <GifProvider>
          <MyGifsProvider>
            <SearchProvider>
              <RouterProvider
                router={router}
                fallbackElement={<></>}
              />
            </SearchProvider>
          </MyGifsProvider>
        </GifProvider>
      </UserProvider>
    </Auth0Provider>
  )
}