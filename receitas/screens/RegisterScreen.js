// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !name) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem!');
      return;
    }

    // Armazena os dados de usuário no AsyncStorage
    try {
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);
      setMessage('Cadastro realizado com sucesso!');
      setTimeout(() => {
        setMessage('');
        navigation.navigate('Login');
      }, 2000); // Redireciona após 2 segundos
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
      setMessage('Não foi possível salvar os dados. Tente novamente.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Crie sua Conta</Text>
        {message ? <Text style={styles.message}>{message}</Text> : null}

        <View style={styles.inputContainer}>
          <Icon name="account-outline" size={20} color="#7B68EE" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#7B68EE"
          />
        </View>

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

        <View style={styles.inputContainer}>
          <Icon name="lock-check-outline" size={20} color="#7B68EE" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#7B68EE"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </ScrollView>
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
  scrollContainer: {
    paddingVertical: 20,
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
    shadowColor: '#7B68EE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Som para Android
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});
