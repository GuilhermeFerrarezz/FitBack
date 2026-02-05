import React, { useState } from 'react';
import { TouchableOpacity, Platform, Text } from 'react-native';
import styled from 'styled-components/native';
import Svg, { G, Path } from 'react-native-svg';
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// O componente recebe onGooglePress como prop para integrar com sua lógica anterior
const SignUpForm = ({ onSignUpPress }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
    const [isFocused, setIsFocused] = useState(null); // Para simular o :focus-within
    const [message, setMessage] = useState('')
    

    const verifyData = () => {
        console.log('Verificando')
        if (!password || !email || !nome) {
            setMessage('Ambos os cambos devem ser preenchidos')
        } else {
            const res = onSignUpPress({ email, password, nome })
            setMessage(res)
            
        }
    }
    

  return (
      <FormCard>
        <FlexColumn>
        <Label>Nome</Label>
      </FlexColumn>
      <InputContainer isFocused={isFocused === 'nome'}>
        <MaterialIcons name="drive-file-rename-outline" size={24} color="black" />
        <Input 
          placeholder="Seu Name" 
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
          onFocus={() => setIsFocused('nome')}
          onBlur={() => setIsFocused(null)}
        />
      </InputContainer>
      <FlexRow></FlexRow>
      {/* Campo Email */}
      <FlexColumn>
        <Label>Email</Label>
      </FlexColumn>
      <InputContainer isFocused={isFocused === 'email'}>
        <Svg height={20} width={20} viewBox="0 0 32 32">
          <G id="Layer_3">
            <Path 
              fill={isFocused === 'email' ? "#2d79f3" : "#151717"}
              d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" 
            />
          </G>
        </Svg>
        <Input 
          placeholder="Seu email" 
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setIsFocused('email')}
          onBlur={() => setIsFocused(null)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </InputContainer>

      {/* Campo Senha */}
      <FlexColumn>
        <Label>Password</Label>
      </FlexColumn>
      <InputContainer isFocused={isFocused === 'password'}>
        <MaterialIcons name="password" size={24} color="black" />
        <Input 
          placeholder="Sua senha" 
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onFocus={() => setIsFocused('password')}
          onBlur={() => setIsFocused(null)}
        />
      </InputContainer>


      <ButtonSubmit onPress={verifyData}>
        <ButtonText>Sign In</ButtonText>
      </ButtonSubmit>

      <FooterText>
        Já tem um conta? <TouchableOpacity onPress = {()=>{router.navigate({ pathname: '../screens/Login' })}}><BlueText>Log In</BlueText></TouchableOpacity>
      </FooterText>
      
      <DividerContainer>
        <Line />
        <DividerText>Or With</DividerText>
        <Line />
      </DividerContainer>

      <SocialContainer>
  <SocialButton  onPress = {()=>{router.navigate({ pathname: '../screens/Login' })}}>
    <AntDesign name="google" size={20} color="black" style={{ marginRight: 10 }} />
    <SocialText>Google</SocialText>
  </SocialButton>
          </SocialContainer>
          <Text style={{fontSize: 20, color: 'red', marginTop: 10}}>{message}</Text>
    </FormCard>
  );
};

// --- Estilos Reativos ---

const FormCard = styled.View`
  background-color: #ffffff;
  flex: 1;
  padding: 25px;
  width: 100%;
  border-radius: 20px;
  elevation: 5; /* Sombra no Android */
  shadow-color: #000; /* Sombra no iOS */
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
`;

const FlexColumn = styled.View`
  margin-bottom: 8px;
`;

const Label = styled.Text`
  color: #151717;
  font-weight: 600;
  font-size: 14px;
`;

const InputContainer = styled.View`
  border-width: 1.5px;
  border-color: ${props => props.isFocused ? '#2d79f3' : '#ecedec'};
  border-radius: 10px;
  height: 50px;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  margin-bottom: 15px;
`;

const Input = styled.TextInput`
  flex: 1;
  margin-left: 10px;
  height: 100%;
  color: #151717;
`;

const FlexRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const RememberGroup = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Checkbox = styled.View`
    width: 16px;
    height: 16px;
    border-width: 1px;
    border-color: #2d79f3;
    border-radius: 4px;
    margin-right: 6px;
`;

const BlueText = styled.Text`
  color: #2d79f3;
  font-size: 13px;
  font-weight: 500;
`;

const TextSmall = styled.Text`
    font-size: 13px;
    color: #000;
`;

const ButtonSubmit = styled.TouchableOpacity`
  background-color: #151717;
  height: 50px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: 600;
`;

const FooterText = styled.Text`
  text-align: center;
  margin-top: 15px;
  font-size: 13px;
  color: #000;
`;

const DividerContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-vertical: 20px;
`;

const Line = styled.View`
    flex: 1;
    height: 1px;
    background-color: #ecedec;
`;

const DividerText = styled.Text`
    margin-horizontal: 10px;
    color: #666;
    font-size: 12px;
`;

const SocialContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const SocialButton = styled.TouchableOpacity`
  flex: 0.48;  
  width: 80%; 
  height: 45px;
  border-width: 1px;
  border-color: #ededef;
  border-radius: 10px;
  
  
  flex-direction: row; 
  justify-content: center; 
  align-items: center;
`;

const SocialText = styled.Text`
  font-weight: 500;
  color: #151717;
  font-size: 15px;
`;

export default SignUpForm;