import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: #3f51b5;
  flex-direction: column;
  padding: 0 20px;
  flex: 1;
`;

export const SingUpText = styled.Text`
  margin: 10% 0 0 0;
  font-size: 28px;
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

export const SingUpContainer = styled.View`
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
  color: red;
`;
