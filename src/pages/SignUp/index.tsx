/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { signUpRequest } from '../../store/modules/auth/actions';

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
  name: yup.string().min(5, 'Minimo de 5 caracteres').required('requerido'),
  originalname: yup.string().required('requerido'),
  fantasyname: yup.string().required('requerido'),
  email: yup
    .string()
    .email('Email invalido')
    .min(5, 'Minimo de 5 caracteres')
    .required('requerido'),
  cnpj: yup.string().min(14, 'Cnpj invalido!').required('requerido'),
  password: yup.string().min(8, 'Minimo de 8 caracteres').required('requerido'),
});

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleSubmit(values) {
    const { name } = values;
    const { originalname } = values;
    const { fantasyname } = values;
    const { email } = values;
    const { cnpj } = values;
    const { password } = values;

    dispatch(
      signUpRequest(name, originalname, fantasyname, email, cnpj, password),
    );
  }

  return (
    <>
      <Header />
      <Container>
        <LoginText>Cadastrar</LoginText>
        <LoginContainer>
          <Formik
            initialValues={{
              name: '',
              originalname: '',
              fantasyname: '',
              email: '',
              cnpj: '',
              password: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={validations}
          >
             {({values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
              <>
                <Field
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                  placeholder="Nome completo"
                  placeholderTextColor="#3f51b5"
                />
                {touched.name && errors.name && (
                  <ErrorText>{errors.name}</ErrorText>
                )}

                <Field
                  value={values.originalname}
                  onChangeText={handleChange('originalname')}
                  onBlur={() => setFieldTouched('originalname')}
                  placeholder="Razão Social"
                  placeholderTextColor="#3f51b5"
                />
                {touched.originalname && errors.originalname && (
                  <ErrorText>{errors.originalname}</ErrorText>
                )}

                <Field
                  value={values.fantasyname}
                  onChangeText={handleChange('fantasyname')}
                  onBlur={() => setFieldTouched('fantasyname')}
                  placeholder="Nome Fantasia"
                  placeholderTextColor="#3f51b5"
                />
                {touched.fantasyname && errors.fantasyname && (
                  <ErrorText>{errors.fantasyname}</ErrorText>
                )}

                <Field
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  placeholder="Email"
                  placeholderTextColor="#3f51b5"
                  textContentType="emailAddress"
                />
                {touched.email && errors.email && (
                  <ErrorText>{errors.email}</ErrorText>
                )}

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
                  title="Cadastrar"
                  disabled={!isValid}
                  onPress={handleSubmit}
                >
                  <ButtonText>Cadastrar</ButtonText>
                </Button>
              </>
            )}
          </Formik>
          <LinkContainer>
            <LinkButton onPress={() => navigation.navigate('SignIn')}>
              <LinkText>Já possui cadastro? Clique aqui</LinkText>
            </LinkButton>
          </LinkContainer>
        </LoginContainer>
      </Container>
    </>
  );
};

export default SignUp;
