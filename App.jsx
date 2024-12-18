import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './rootNavigation/MainStack';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <MainStack />
        </TouchableWithoutFeedback>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
