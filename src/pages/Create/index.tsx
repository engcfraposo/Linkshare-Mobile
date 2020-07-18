/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import Header from '../../components/Header';
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
  CreateContainer,
  CreateButtonText,
  CreateButton,
  CameraView,
  CameraImage,
  ProductAmount,
} from './styles';
import api from '../../services/api';


const validations = yup.object().shape({
  cnpj: yup.number().min(14, 'Cnpj invalido!').required('requerido'),
  password: yup.string().min(8, 'Minimo de 8 caracteres').required('requerido'),
});


const Create: React.FC<>= () => {

  const navigator = useNavigation();
    const [image, setImage] = useState<string>('')


    const takeAPhoto = async() => {
      const result = await pickImage();
      const { uri } = result
      return setImage(uri);
    }

   const handleSubmit = async (values) => {
    const { title } = values;
    const { price } = values;
    //como está sem api não será feito o upload
    Alert.alert(image)

    await api.post('products', {
      image: 'computer',
      title,
      price,
      headers: {
        token: 'fake token'
      }
    });

    return navigator.goBack();
  }

  return (
    <>
      <Header />
      <Container>
        <LoginText>Cadastrar</LoginText>
        <LoginContainer>
          <Formik
            initialValues={{ cnpj: '', password: '' }}
            onSubmit={handleSubmit}
            validationSchema={validations}
          >
            {({values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
              <>
                <CameraView>
                  <Button title="Pick an image from camera roll" onPress={takeAPhoto()} />
                  {image && <CameraImage source={{ uri: image }} />}
                </CameraView>

                <Field
                  value={values.cnpj}
                  onChangeText={handleChange('title')}
                  onBlur={() => setFieldTouched('title')}
                  placeholder="Titulo"
                  placeholderTextColor="#3f51b5"
                />
                {touched.cnpj && errors.cnpj && (
                  <ErrorText>{errors.cnpj}</ErrorText>
                )}

                <Field
                  value={values.password}
                  onChangeText={handleChange('price')}
                  placeholder=" Valor"
                  keyboardType="numeric"
                  placeholderTextColor="#3f51b5"
                />
                {touched.password && errors.password && (
                  <ErrorText>{errors.password}</ErrorText>
                )}

                <Button
                  title="Entrar"
                  disabled={!isValid}
                  onPress={handleSubmit}
                >
                  <ButtonText>Criar</ButtonText>
                </Button>
              </>
            )}
          </Formik>
          <LinkContainer>
            <LinkButton onPress={() => navigation.goBack()}>
              <LinkText>Voltar</LinkText>
            </LinkButton>
          </LinkContainer>
        </LoginContainer>
      </Container>
      <CreateContainer>
        <CreateButton onPress={() => navigation.navigate('Create')}>
          <ProductAmount>
            <Icon name="pencil" color="#FFF" size={20} />
          </ProductAmount>
          <CreateButtonText>Cria Produto</CreateButtonText>
        </CreateButton>
      </CreateContainer>
    </>
  );
};

export default Create
