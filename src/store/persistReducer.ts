import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default (reducers) =>
  persistReducer(
    {
      key: 'linkshare',
      storage: AsyncStorage,
      whitelist: ['auth', 'user'],
    },
    reducers,
  );
