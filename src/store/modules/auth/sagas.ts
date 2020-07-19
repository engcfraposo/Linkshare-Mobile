import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { cnpj, password } = payload;
    const response = yield call(api.post, 'sessions', {
      cnpj,
      password,
    });

    const user = yield call(api.get, 'users', {params:{cnpj}});

    if(user.data.length == 0 ||user.data.length == null ) {
      Alert.alert('Falha na autenticação, usuario não existe');
      return yield put(signFailure());
    }
    //const { token, user } = response.data;

    const token = 'fake token';

    //api.defaults.headers.Authorization = `Baerer ${token}`;

    yield put(signInSuccess(token, user));

  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seu email/senha'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
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
  const { token } = payload.auth;
  if (token) {
    //api.defaults.headers.Authorization = `Baerer ${token}`;
    api.defaults.headers.Authorization = 'fake token';
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
