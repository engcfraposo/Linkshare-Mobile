import 'react-native-gesture-handler';
import React from 'react';
import '../config/ReactotronConfig';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Routes from './routes';
import { store, persistor } from '../store';

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <NavigationContainer>
        <View style={{ backgroundColor: '#222', flex: 1 }}>
          <StatusBar barStyle="light-content" backgroundColor="#333" />
          <Routes />
        </View>
      </NavigationContainer>
    </PersistGate>
  </Provider>
);

export default App;
