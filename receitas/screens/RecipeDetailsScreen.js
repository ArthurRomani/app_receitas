import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RecipeDetailsScreen({ route, navigation }) {
  const { receita } = route.params; // Obtém os dados passados da tela anterior

  if (!receita) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Erro ao carregar receita</Text>
        <Text style={styles.description}>Não foi possível carregar os detalhes da receita.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{receita.titulo}</Text>
      <Text style={styles.ingredientsTitle}>Ingredientes:</Text>
      <Text style={styles.ingredients}>{receita.ingredientes}</Text>
      <Text style={styles.instructionsTitle}>Modo de Preparo:</Text>
      <Text style={styles.instructions}>{receita.modoPreparo}</Text>

      {/* Botão para ir à tela de Feedback */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Feedback', { receita })} // Passa a receita para Feedback
      >
        <Text style={styles.buttonText}>Deixar Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 15,
    marginBottom: 5,
  },
  ingredients: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  instructions: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7B68EE',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
