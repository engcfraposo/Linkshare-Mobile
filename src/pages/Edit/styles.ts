import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.ScrollView`
  background-color: #3f51b5;
  flex-direction: column;
  padding: 0 20px;
  flex: 1;
`;

export const LoginText = styled.Text`
  margin: 10% 0 0 0;
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

export const LoginContainer = styled.View`
  margin-top: 50px;
  align-items: center;
  background-color: #fff;
  margin-top: 5px;
  border-radius: 5px;
  padding: 10px;
`;

export const Field = styled.TextInput`
  background-color: #fff;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #3f51b5;
  margin-top: 5px;
  flex-direction: row;

  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  background-color: #3f51b5;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin-top: 10px;
  flex-direction: row;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
`;

export const LinkButton = styled.TouchableOpacity``;

export const LinkContainer = styled.View`
  margin-top: 10px;
  align-items: center;
`;

export const LinkText = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: #3f51b5;
`;

export const ErrorText = styled.Text`
  font-size: 16px;
  color: #f66;
`;

export const ProductAmount = styled.View`
  background-color: ${darken(0.09, '#3f51b5')};
  width: 20%;
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const CameraView = styled.View`
  width: 350px;
  height: 350px;
  flex: 1;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  background-color: ${darken(0.01, '#3f51b5')};
`;

export const CameraImage = styled.Image`
  width: 350px;
  height: 350px;

`;
