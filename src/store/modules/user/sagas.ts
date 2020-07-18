import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';
import { Alert } from 'react-native';

export function* updateProfile({ payload }) {
  try {
    const {
      name,
      originalname,
      fantasyname,
      email,
      cnpj,
      password,
      admin,
      token,
    } = payload.data;

    const profile = {
      name,
      originalname,
      fantasyname,
      email,
      cnpj,
      admin,
      password,
      token,
    };

    const response = yield call(api.put, 'users', profile);

    Alert.success('Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.error('Erro ao atualizar perfil, confira os seus dados');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
