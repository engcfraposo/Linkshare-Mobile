import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { cnpj, password } = payload;

    const users = yield call(api.get, 'users', {
      params: {
        cnpj,
      },
    });

    if (!users.data.password === password) {
      return alert(
        'Falha na autenticação, Houve um erro no login, verifique seu email/senha',
      );
    }
    // const { token, user } = response.data;

    const token = 'fake token';
    const user = {
      id: '1',
      name: 'Cláudio Filipe Lima Rapôso',
      cnpj,
      admin: 'true',
    };

    // api.defaults.headers.Authorization = `Baerer ${token}`;
    const response = yield call(api.post, 'sessions', {
      cnpj,
      password,
    });
    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seu email/senha',
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, originalname, fantasyname, cnpj, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      originalname,
      fantasyname,
      cnpj,
      email,
      password,
    });
    Alert.alert('Cadastro de Usuário', 'Cadastradado com sucesso!');
    // history.push('/');
  } catch (err) {
    console.tron.log('erro no cadastro', err);
    Alert.alert('Falha no cadastro', 'verifique seus dados');
    yield put(signFailure());
  }
}

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
