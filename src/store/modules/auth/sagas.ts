import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  const { cnpj, password } = payload;
  const users = yield call(api.get, 'users', {
    params: {
      cnpj,
    },
  });
  try {
    if (Object.keys(users).length !== 0) {
      try {
        if (users.data.password === password) {
          try {
            const response = yield call(api.post, 'sessions', {
              cnpj,
              password,
            });

            const token = 'fake token';
            const user = {
              id: '1',
              name: 'Cláudio Filipe Lima Rapôso',
              cnpj,
              admin: 'true',
            };
            // const {t oken, user } = response.data
            // api.defaults.headers.Authorization = `Baerer ${token}`;
            return yield put(signInSuccess(token, user));
          } catch (error) {
            Alert.alert('Falha na autenticação, token invalido');
            return yield put(signFailure());
          }
        }
      } catch (error) {
        Alert.alert(
          'Falha na autenticação, Houve um erro no login, verifique seu email/senha',
        );
        return yield put(signFailure());
      }
    }
  } catch (error) {
    yield put(signFailure());
    return Alert.alert('Usuario não encontrado');
  }
}

const signOut = useCallback(async () => {
  localStorage.removeItem('@LinkShare:token');
  localStorage.removeItem('@LinkShare:user');

  setData({} as AuthState);
}, []);


export function setToken({ payload }) {
  if (!payload) return;
  // const { token } = payload.auth;
  // if (token) {
  // api.defaults.headers.Authorization = `Baerer ${token}`;
  // }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
