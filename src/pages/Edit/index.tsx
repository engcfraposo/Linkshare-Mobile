/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
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
  CameraView,
  CameraImage,
} from './styles';
import api from '../../services/api';
import { pickImage } from '../../util/pickImage'
import { Alert } from 'react-native';

interface RouteParams {
  productId: string;
}

interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
  subtotal: number;
  priceFormatted: string;
}

const validations = yup.object().shape({
  title: yup.string().min(3, 'Minimo de 3 caracteres'),
  price: yup.number()
});


const Create: React.FC = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const [image, setImage] = useState<string>('')
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const routeParams = route.params as RouteParams;

  useEffect(() => {
    async function loadProduct(): Promise<void> {
      const response = await api.get(`products/${routeParams.productId}`);

      setProduct(response.data);
    }

    loadProduct();
  }, [routeParams]);

  const takeAPhoto = async() => {
     const result = await pickImage();
     const { uri } = result
     setImage(uri);
  }

   const handleSubmit = async (values) => {
    const { title } = values;
    const { price } = values;

    try {
      await api.put(`products/${routeParams.productId}`, {
        image: 'computer',
        title,
        price,
        headers: {
          token: 'fake token'
        }
      });
    } catch (error) {
      Alert.alert('Produto não editado!, tente mais tarde')
    }

    return navigation.navigate('Main');
  }

  return (
    <>
      <Header />
      <Container>
        <LoginText>Editar Produto</LoginText>
        <LoginContainer>
          <Formik
            initialValues={{ title: product.title, price: product.price }}
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
                  placeholder={product.title}
                  placeholderTextColor="#3f51b5"
                />
                {touched.title && errors.title && (
                  <ErrorText>{errors.title}</ErrorText>
                )}

                <Field
                  value={values.price}
                  onChangeText={handleChange('price')}
                  placeholder={product.price}
                  keyboardType="numeric"
                  placeholderTextColor="#3f51b5"
                />
                {touched.price && errors.price && (
                  <ErrorText>{errors.price}</ErrorText>
                )}

                <Button
                  disabled={!isValid}
                  onPress={handleSubmit}
                >
                  <ButtonText>Editar</ButtonText>
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
    </>
  );
};

export default Create
