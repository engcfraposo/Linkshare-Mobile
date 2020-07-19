import React from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { signInRequest } from '../../store/modules/auth/actions';

import {
  Container,
  LoginContainer,
  LoginText,
  Button,
  Field,
  LinkContainer,
  LinkButton,
  LinkText,
  ErrorText,
  ButtonText,
} from './styles';

const validations = yup.object().shape({
  cnpj: yup.number().min(14, 'Cnpj invalido!').required('requerido'),
  password: yup.string().min(8, 'Minimo de 8 caracteres').required('requerido'),
});

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit(values) {
    const { cnpj } = values;
    const { password } = values;

    if (cnpj && password) dispatch(signInRequest(cnpj, password));

    navigation.navigate('Main');
  }

  return (
    <>
      <Header />
      <Container>
        <LoginText>Login</LoginText>
        <LoginContainer>
          <Formik
            initialValues={{ cnpj: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={validations}
          >

            {({values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
              <>
                <Field
                  value={values.cnpj}
                  onChangeText={handleChange('cnpj')}
                  onBlur={() => setFieldTouched('cnpj')}
                  placeholder="Cnpj"
                  placeholderTextColor="#3f51b5"
                  keyboardType="numeric"
                />
                {touched.cnpj && errors.cnpj && (
                  <ErrorText>{errors.cnpj}</ErrorText>
                )}

                <Field
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  placeholder=" Coloque sua senha"
                  secureTextEntry
                  placeholderTextColor="#3f51b5"
                  autoCompleteType="off"
                />
                {touched.password && errors.password && (
                  <ErrorText>{errors.password}</ErrorText>
                )}

                <Button
                  title="Entrar"
                  disabled={!isValid}
                  onPress={handleSubmit}
                  loading={loading}
                >
                  <ButtonText>Entrar</ButtonText>
                </Button>
              </>
            )}
          </Formik>
          <LinkContainer>
            <LinkButton onPress={() => {}}>
              <LinkText>Esqueci minha senha</LinkText>
            </LinkButton>
            <LinkButton onPress={() => navigation.navigate('SignUp')}>
              <LinkText>Não possui cadastro? Clique aqui</LinkText>
            </LinkButton>
          </LinkContainer>
        </LoginContainer>
      </Container>
    </>
  );
};

export default SignIn;
