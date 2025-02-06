import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store/store';
import {LogBox} from 'react-native';
import {Auth0Provider} from 'react-native-auth0';
import StackNavigator from './navigation/StackNavigator';
import {AUTH0_CLIENT_ID, AUTH0_DOMAIN} from './config/auth0Config';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
        <StackNavigator />
      </Auth0Provider>
    </Provider>
  );
};

export default App;
