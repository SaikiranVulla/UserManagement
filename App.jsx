import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './rootNavigation/MainStack';
import {Provider} from 'react-redux';
import {store} from './redux/store';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <MainStack />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
