import React, { useState, useEffect, useCallback } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import Header from '../../components/Header';

import {
  CreateButton,
  CreateButtonText,
  Container,
  ProductContainer,
  ProductImage,
  ProductTitle,
  ProductPrice,
  Button,
  ButtonText,
  ProductInfo,
  ProductAmount,
  ActivityArea,
  TrashButton,
  TrashAmount,
  CreateContainer,
} from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation();

  useEffect(() => {
    api.get('products').then((response) => {
      setProducts(response.data);
      setLoading(false);
    });
  }, []);

  const handleNavigate = useCallback((productId: number) => {
    navigation.navigate('Details', {
      productId,
    });
  }, []);

  const handleDelete = async (id: number) => {
    await api.delete(`/products/${id}`);
    Alert.alert('Produto deletado');
    return navigation.navigate('Main');
  };

  const handleEditProduct = async (productId: number) =>
    navigation.navigate('Edit', { productId });

  return (
    <>
      <Header />
      <Container>
        {loading ? (
          <ActivityArea>
            <ActivityIndicator size="large" color="#999" />
          </ActivityArea>
        ) : (
          products.map((product) => (
            <ProductContainer
              key={product.id}
              onPress={() => {
                handleNavigate(product.id);
              }}
            >
              <ProductImage
                source={{ uri: 'https://source.unsplash.com/daily' }}
              />
              <ProductInfo>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>{formatPrice(product.price)}</ProductPrice>
              </ProductInfo>
              <Button onPress={() => handleEditProduct(product.id)}>
                <ProductAmount>
                  <Icon name="folder-open" color="#FFF" size={20} />
                </ProductAmount>
                <ButtonText>Editar Produto</ButtonText>
              </Button>
              <TrashButton onPress={() => handleDelete(product.id)}>
                <TrashAmount>
                  <Icon name="trash" color="#FFF" size={20} />
                </TrashAmount>
                <ButtonText>Deletar Produto</ButtonText>
              </TrashButton>
            </ProductContainer>
          ))
        )}
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

export default Admin;
