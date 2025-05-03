import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
    const [receitas, setReceitas] = useState([]);

    const buscarReceitas = async () => {
        try {
            const receitasArmazenadas = await AsyncStorage.getItem('@receitas');
            const listaReceitas = receitasArmazenadas ? JSON.parse(receitasArmazenadas) : [];
            console.log('Receitas carregadas:', listaReceitas); // Debug
            setReceitas(listaReceitas);
        } catch (error) {
            console.error('Erro ao buscar receitas:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', buscarReceitas);
        return unsubscribe; // Remove o listener ao desmontar
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Receitas</Text>
            <FlatList
                data={receitas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.recipeItem}
                        onPress={() => navigation.navigate('Detalhes da Receita', { receita: item })}
                    >
                        <Text style={styles.recipeTitle}>{item.titulo}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('Adicionar Receita')}
            >
                <Text style={styles.addButtonText}>Adicionar Receita</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    recipeItem: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    recipeTitle: {
        fontSize: 18,
    },
    addButton: {
        backgroundColor: '#7B68EE', // Cor roxa especificada
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#FFF', // Texto em branco para contraste
        fontSize: 16,
        fontWeight: 'bold',
    },
});
