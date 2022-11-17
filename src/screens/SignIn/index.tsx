import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignInAnonymously() {
    const { user } = await auth().signInAnonymously();

    console.log(user);
  }

  function handleCreateUserAccount() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Usuáriuo criado com sucesso!'))
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            return Alert.alert('E-mail não disponível. Escolha outro e-mail para cadastrar!')
          case 'auth/invalid-email':
            return Alert.alert('E-mail inválido!')
          case 'auth/weak-password':
            return Alert.alert('A senha deve ter no mínimo 6 dígitos!')
          default:
            return Alert.alert('Erro desconhecido!');
        }
      });
  }

  function handleSignInWithEmailAndPassword() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => console.log(user))
      .catch(error => {
        switch (error.code) {
          case 'auth/user-not-found' || 'auth/wrong-password':
            return Alert.alert('Usuário não econtrado. E-mail e/ou senha inválida!')
          case 'auth/invalid-email':
            return Alert.alert('E-mail inválido!')
          default:
            return Alert.alert('Erro desconhecido!');
        }
      })
  }

  function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert('Enviamos um link no seu e-mail para você redefinir sua senha.'))
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
        autoCapitalize='none'
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}