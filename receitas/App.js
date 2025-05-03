 import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import RecipeDetailsScreen from './screens/RecipeDetailsScreen';
import FeedbackScreen from './screens/FeedbackScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#7B68EE' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Tela de Login */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Entrar' }} 
        />
        
        {/* Tela de Cadastro */}
        <Stack.Screen 
          name="Cadastro" 
          component={RegisterScreen} 
          options={{ title: 'Cadastrar-se' }} 
        />
        
        {/* Tela Inicial (Home) */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Minhas Receitas', headerLeft: null }} 
        />
        
        {/* Tela de Adicionar Receita */}
        <Stack.Screen 
          name="Adicionar Receita" 
          component={AddRecipeScreen} 
          options={{ title: 'Nova Receita' }} 
        />
        
        {/* Tela de Detalhes da Receita */}
        <Stack.Screen 
          name="Detalhes da Receita" 
          component={RecipeDetailsScreen} 
          options={{ title: 'Detalhes da Receita' }} 
        />

        {/* Tela de Feedback */}
        <Stack.Screen 
          name="Feedback" 
          component={FeedbackScreen} 
          options={{ title: 'Deixar Feedback' }} 
        />

        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
