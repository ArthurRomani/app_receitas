import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddRecipeScreen({ navigation }) {
    const [titulo, setTitulo] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [modoPreparo, setModoPreparo] = useState('');

    const salvarReceita = async () => {
        if (!titulo || !ingredientes || !modoPreparo) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        const novaReceita = {
            id: Date.now().toString(),
            titulo,
            ingredientes,
            modoPreparo,
        };

        try {
            const receitasSalvas = await AsyncStorage.getItem('@receitas');
            const receitas = receitasSalvas ? JSON.parse(receitasSalvas) : [];
            receitas.push(novaReceita);
            await AsyncStorage.setItem('@receitas', JSON.stringify(receitas));
            Alert.alert('Sucesso', 'Receita adicionada com sucesso!');
            navigation.goBack(); // Voltar para a HomeScreen
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar a receita.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Título</Text>
            <TextInput
                style={styles.input}
                value={titulo}
                onChangeText={setTitulo}
                placeholder="Digite o título da receita"
            />
            <Text style={styles.label}>Ingredientes</Text>
            <TextInput
                style={styles.input}
                value={ingredientes}
                onChangeText={setIngredientes}
                placeholder="Digite os ingredientes"
            />
            <Text style={styles.label}>Modo de Preparo</Text>
            <TextInput
                style={styles.input}
                value={modoPreparo}
                onChangeText={setModoPreparo}
                placeholder="Digite o modo de preparo"
            />
            <TouchableOpacity style={styles.saveButton} onPress={salvarReceita}>
                <Text style={styles.saveButtonText}>Salvar Receita</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: '#7B68EE', // Cor personalizada para o botão
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#FFF', // Texto em branco para contraste
        fontSize: 16,
        fontWeight: 'bold',
    },
});
