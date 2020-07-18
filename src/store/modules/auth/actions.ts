export function signInRequest(cnpj: string, password: string) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { cnpj, password },
  };
}

export function signInSuccess(token: string, user: Object) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signUpRequest(
  name: string,
  originalname: string,
  fantasyname: string,
  cnpj: string,
  email: string,
  password: string,
) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {
      name,
      originalname,
      fantasyname,
      cnpj,
      email,
      password,
    },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
