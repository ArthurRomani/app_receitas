import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FeedbackScreen({ route, navigation }) {
  const { id } = route.params; // ID da receita
  const [feedback, setFeedback] = useState(''); // Estado para controlar o feedback

  const enviarFeedback = async () => {
    if (feedback.trim()) {
      try {
        // Recuperar as receitas do AsyncStorage
        const receitasSalvas = await AsyncStorage.getItem('@receitas');
        const receitas = receitasSalvas ? JSON.parse(receitasSalvas) : [];

        // Encontrar a receita com o ID passado
        const receitaIndex = receitas.findIndex((receita) => receita.id === id);

        if (receitaIndex !== -1) {
          // Adicionar o feedback à receita encontrada
          const receita = receitas[receitaIndex];
          receita.feedbacks = receita.feedbacks || []; // Se não houver feedbacks, cria o array
          receita.feedbacks.push(feedback);

          // Atualizar a receita no array
          receitas[receitaIndex] = receita;

          // Salvar as receitas atualizadas no AsyncStorage
          await AsyncStorage.setItem('@receitas', JSON.stringify(receitas));

          // Limpar o feedback e voltar para a tela anterior
          setFeedback('');
          navigation.goBack();
        } else {
          Alert.alert('Erro', 'Receita não encontrada!');
        }
      } catch (error) {
        console.error('Erro ao salvar feedback:', error);
        Alert.alert('Erro', 'Não foi possível salvar o feedback.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, insira um feedback!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Seu Feedback:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escreva aqui..."
        value={feedback}
        onChangeText={setFeedback}
      />
      <TouchableOpacity style={styles.button} onPress={enviarFeedback}>
        <Text style={styles.buttonText}>Enviar Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#7B68EE', // Cor do botão
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
