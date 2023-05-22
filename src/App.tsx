import { RouterProvider } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';
import UserProvider from './context/user/UserProvider'
import GifProvider from './context/gif/GifProvider';
import router from './router/router';
import { isLocalhost } from './utils/isLocalhost';

export default function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
      clientId={
        isLocalhost
          ? import.meta.env.VITE_DEVELOPMENT_AUTH0_CLIENT_ID as string
          : import.meta.env.VITE_PRODUCTION_AUTH0_CLIENT_ID as string
      }
      authorizationParams={{
        redirect_uri: window.location.origin + '/',
        audience: isLocalhost
          ? import.meta.env.VITE_AUTH0_AUDIENCE_DEVELOPMENT
          : import.meta.env.VITE_AUTH0_AUDIENCE_PRODUCTION
      }}
    >
      <UserProvider>
        <GifProvider>
          <RouterProvider
            router={router}
            fallbackElement={<></>}
          />
        </GifProvider>
      </UserProvider>
    </Auth0Provider>
  )
}