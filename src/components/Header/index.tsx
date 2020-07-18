import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import { signOut } from '../../store/modules/auth/actions';

import {
  Wrapper,
  Container,
  Logo,
  BasketContainer,
  StatusContainer,
  ItemCount,
} from './styles';

const Header: React.FC = ({ cart }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profile = useSelector<null | Object>((state) => state.user.profile);
  const [admin, setAdmin] = useState<undefined | boolean>(null);

  useEffect(() => {
    console.log(!profile, profile);
    if (!profile) {
      setAdmin(true);
    }
  }, [profile]);

  const handleSignOut = () => {
    dispatch(signOut());
    setAdmin(null);
    return navigation.navigate('Main');
  };

  return (
    <Wrapper>
      <Container>
        <Logo />
        <StatusContainer>
          <BasketContainer onPress={() => navigation.navigate('Cart')}>
            <MaterialIcons name="shopping-basket" color="#FFF" size={24} />
            <ItemCount>{cart.length}</ItemCount>
          </BasketContainer>
          {!admin ? (
            <BasketContainer onPress={() => navigation.navigate('Admin')}>
              <FontIcon name="key" color="#FFF" size={24} />
            </BasketContainer>
          ) : (
            <></>
          )}

          {!admin ? (
            <BasketContainer onPress={handleSignOut}>
              <MaterialCommunityIcons name="logout" color="#FFF" size={24} />
            </BasketContainer>
          ) : (
            <BasketContainer onPress={() => navigation.navigate('SignIn')}>
              <FontIcon name="user-alt" color="#FFF" size={24} />
            </BasketContainer>
          )}
        </StatusContainer>
      </Container>
    </Wrapper>
  );
};

export default connect((state: CartState) => ({
  cart: state.cart,
}))(Header);
