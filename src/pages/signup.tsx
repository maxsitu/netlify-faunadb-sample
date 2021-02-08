import React from 'react';
import {
  useIdentityContext,
  IdentityContextProvider,
} from 'react-netlify-identity';
import Signup from 'component/Signup';

function App() {
  const url = process.env.UMI_APP_NETLIFY_IDENTITY_URL; // should look something like "https://foo.netlify.com"
  if (!url)
    throw new Error(
      'process.env.REACT_APP_NETLIFY_IDENTITY_URL is blank2, which means you probably forgot to set it in your Netlify environment variables',
    );
  return (
    <IdentityContextProvider url={url}>
      <Signup />
    </IdentityContextProvider>
  );
}

export default App;
