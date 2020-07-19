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
  CreateFormContainer,
  CreateFormText,
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
import { pickImage } from '../../util/pickImage'


const validations = yup.object().shape({
  title: yup.string().min(3, 'Minimo de 3 caracteres').required('requerido'),
  price: yup.number().required('requerido'),
});


const Edit: React.FC<>= () => {

  const navigation = useNavigation();
    const [image, setImage] = useState<string>('')


     const takeAPhoto = async() => {
     const result = await pickImage();
     const { uri } = result
     setImage(uri);
    }

   const handleSubmit = async (values) => {
    const { title } = values;
    const { price } = values;


    try {
      await api.post('products', {
        image: 'computer',
        title,
        price,
      });
      Alert.alert('Produto criado!')
      return navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Produto não criado!, tente mais tarde')
    }
  }

  return (
    <>
      <Header />
      <Container>
        <CreateFormText>Criar Produto</CreateFormText>
        <CreateFormContainer>
          <Formik
            initialValues={{ title: '', price: 0 }}
            onSubmit={handleSubmit}
            validationSchema={validations}
          >
            {({values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, }) => (
              <>
                <CameraView>
                  {image? (<CameraImage source={{ uri: image }} />):(<></>)}
                </CameraView>
                <Button onPress={()=>takeAPhoto()}>
                  <Icon name="camera" color="#FFF" size={20} />
                </Button>
                <Field
                  value={values.title}
                  onChangeText={handleChange('title')}
                  placeholder="Titulo"
                  placeholderTextColor="#3f51b5"
                />
                {touched.title && errors.title && (
                  <ErrorText>{errors.title}</ErrorText>
                )}

                <Field
                  value={values.price}
                  onChangeText={handleChange('price')}
                  placeholder=" Valor"
                  keyboardType="numeric"
                  placeholderTextColor="#3f51b5"
                />
                {touched.price && errors.price && (
                  <ErrorText>{errors.price}</ErrorText>
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
        </CreateFormContainer>
      </Container>
      <CreateContainer>
        <CreateButton onPress={() => navigation.navigate('Create')}>
          <ProductAmount>
            <Icon name="pencil" color="#FFF" size={20} />
          </ProductAmount>
          <CreateButtonText>Criar Produto</CreateButtonText>
        </CreateButton>
      </CreateContainer>
    </>
  );
};

export default Edit
