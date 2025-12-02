import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, ScrollView, Alert, Keyboard } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// --- 1. Função MOCK para Cálculo da Taxa de Entrega ---
const calculateDeliveryFee = (address: string): number => {
    const lowerCaseAddress = address.toLowerCase();

    // Simulação baseada em palavras-chave ou "zonas"
    if (lowerCaseAddress.includes('centro') || lowerCaseAddress.includes('principal')) {
        return 5.00; // Zona próxima (taxa baixa)
    }
    if (lowerCaseAddress.includes('periferia') || lowerCaseAddress.includes('longa')) {
        return 12.00; // Zona distante (taxa alta)
    }
    if (lowerCaseAddress.includes('condominio') || lowerCaseAddress.includes('elite')) {
        return 8.00; // Zona intermediária
    }

    // Taxa padrão
    return 6.50;
};
// ----------------------------------------------------

const AdicionarLocalizacaoScreen: React.FC = () => {
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [reference, setReference] = useState('');
    const [deliveryFee, setDeliveryFee] = useState<number | null>(null);

    const handleCheckFeeAndSave = () => {
        if (!street || !number) {
            Alert.alert('Erro', 'Por favor, preencha a rua e o número.');
            return;
        }

        // Constrói o endereço completo (mock)
        const fullAddress = `${street}, ${number}`;
        
        // Calcula a taxa usando a função mock
        const fee = calculateDeliveryFee(fullAddress);
        setDeliveryFee(fee);

        Keyboard.dismiss();

        // Simula a adição da localização
        Alert.alert(
            'Localização Adicionada',
            `Endereço salvo! Taxa de entrega para este local: R$ ${fee.toFixed(2).replace('.', ',')}`,
            [
                { text: 'OK', onPress: () => router.back() }
            ]
        );
    };

    return (
        <View style={locationStyles.fullContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" /> 

            {/* --- CABEÇALHO --- */}
            <View style={locationStyles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#ffffffff" />
                </TouchableOpacity>
                <Text style={locationStyles.headerTitle}>ADICIONAR LOCALIZAÇÃO</Text>
                <View style={{ width: 28 }} /> 
            </View>

            {/* --- MAPA E CONTEÚDO --- */}
            <ScrollView contentContainerStyle={locationStyles.content} keyboardShouldPersistTaps="handled">
                
                {/* Simulação do Mapa */}
                <View style={locationStyles.mapContainer}>
                    <Ionicons name="map-outline" size={80} color="#999" />
                    <Text style={locationStyles.mapText}>Arraste o mapa para refinar o local de entrega</Text>
                </View>

                <Text style={locationStyles.sectionTitle}>Detalhes do Endereço</Text>

                {/* Campos de Input */}
                <TextInput
                    style={locationStyles.input}
                    placeholder="Rua / Avenida"
                    placeholderTextColor="#999"
                    value={street}
                    onChangeText={setStreet}
                />
                <TextInput
                    style={locationStyles.input}
                    placeholder="Número"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={number}
                    onChangeText={setNumber}
                />
                <TextInput
                    style={locationStyles.input}
                    placeholder="Complemento (Ex: Apt 101, Bloco A)"
                    placeholderTextColor="#999"
                    value={complement}
                    onChangeText={setComplement}
                />
                <TextInput
                    style={locationStyles.input}
                    placeholder="Ponto de Referência (Ex: Próximo à Praça Central)"
                    placeholderTextColor="#999"
                    value={reference}
                    onChangeText={setReference}
                />
                
                {/* Exibição da Taxa de Entrega Calculada */}
                {deliveryFee !== null && (
                    <View style={locationStyles.feeResult}>
                        <Text style={locationStyles.feeLabel}>Taxa de Entrega Estimada:</Text>
                        <Text style={locationStyles.feeValue}>R$ {deliveryFee.toFixed(2).replace('.', ',')}</Text>
                    </View>
                )}

                {/* Botão Salvar e Calcular Taxa */}
                <TouchableOpacity 
                    style={locationStyles.saveButton}
                    onPress={handleCheckFeeAndSave}
                >
                    <Text style={locationStyles.saveButtonText}>SALVAR ENDEREÇO E VER TAXA</Text>
                </TouchableOpacity>

            </ScrollView>
            
            {/* BARRA DE NAVEGAÇÃO INFERIOR */}
            <View style={locationStyles.tabBar}>
                <TouchableOpacity style={locationStyles.tabItem} onPress={() => router.replace('/(tabs)')}>
                    <Ionicons name="home-outline" size={24} color="#ffffffff" />
                </TouchableOpacity>
                <TouchableOpacity style={locationStyles.tabItem} onPress={() => router.replace('/buscar')}>
                    <Ionicons name="search-outline" size={24} color="#ffffffff" />
                </TouchableOpacity>
                <TouchableOpacity style={locationStyles.tabItem} onPress={() => router.replace('/carrinho')}>
                    <Ionicons name="cart-outline" size={24} color="#ffffffff" />
                </TouchableOpacity>
                <TouchableOpacity style={locationStyles.tabItem} onPress={() => router.replace('/minha-conta')}>
                    <Ionicons name="person-outline" size={24} color="#ffffffff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Estilos ---
const locationStyles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        paddingTop: 20,
        backgroundColor: '#E72C2C',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffffff',
    },
    content: {
        padding: 15,
    },
    mapContainer: {
        height: 200,
        backgroundColor: '#EAEAEA',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#CCC',
    },
    mapText: {
        color: '#666',
        marginTop: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    input: {
        backgroundColor: '#FFF',
        height: 50,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    feeResult: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFD700', // Amarelo
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#E72C2C',
    },
    feeLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E72C2C',
    },
    feeValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E72C2C',
    },
    saveButton: {
        backgroundColor: '#E72C2C', // Vermelho
        paddingVertical: 18,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
        elevation: 3,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    // --- Estilos da Tab Bar ---
    tabBar: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#E72C2C',
        borderTopWidth: 1,
        borderTopColor: '#DDD',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AdicionarLocalizacaoScreen;