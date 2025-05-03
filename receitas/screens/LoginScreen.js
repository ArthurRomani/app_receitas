import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '../assets/logo.png';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPassword = await AsyncStorage.getItem('userPassword');

      if (email === storedEmail && password === storedPassword) {
        setMessage('Login realizado com sucesso!');
        setTimeout(() => {
          setMessage('');
          navigation.replace('Home'); // Certifique-se de que "Home" está correto
        }, 2000);
      } else {
        setMessage('Credenciais inválidas!');
      }
    } catch (error) {
      console.error(error);
      setMessage('Erro ao realizar login.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <Text style={styles.title}>Bem-vindo ao App de Receitas!</Text>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={20} color="#7B68EE" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#7B68EE"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="#7B68EE" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#7B68EE"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.registerButtonText}>Cadastrar-se</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    color: '#FF6347',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#7B68EE',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333',
  },
  button: {
    backgroundColor: '#7B68EE',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  registerButton: {
    marginTop: 20,
  },
  registerButtonText: {
    color: '#7B68EE',
    textAlign: 'center',
    fontSize: 16,
  },
});
