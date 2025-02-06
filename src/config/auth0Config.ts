import Auth0 from 'react-native-auth0';
import Config from 'react-native-config';

const AUTH0_DOMAIN = Config.AUTH0_DOMAIN || '';
const AUTH0_CLIENT_ID = Config.AUTH0_CLIENT_ID || '';

const auth0 = new Auth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID,
});

export default auth0;

export {AUTH0_DOMAIN, AUTH0_CLIENT_ID, auth0};
