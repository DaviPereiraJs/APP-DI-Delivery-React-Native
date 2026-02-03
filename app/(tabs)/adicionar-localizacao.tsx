import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, ScrollView, Alert, Keyboard } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// --- 1. Lógica Mock (Mantida) ---
const calculateDeliveryFee = (address: string): number => {
    const lowerCaseAddress = address.toLowerCase();
    if (lowerCaseAddress.includes('centro') || lowerCaseAddress.includes('principal')) return 5.00;
    if (lowerCaseAddress.includes('periferia') || lowerCaseAddress.includes('longa')) return 12.00;
    if (lowerCaseAddress.includes('condominio') || lowerCaseAddress.includes('elite')) return 8.00;
    return 6.50;
};

const AdicionarLocalizacaoScreen: React.FC = () => {
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [reference, setReference] = useState('');
    const [deliveryFee, setDeliveryFee] = useState<number | null>(null);

    const handleCheckFeeAndSave = () => {
        if (!street || !number) {
            Alert.alert('Atenção', 'Por favor, preencha a rua e o número.');
            return;
        }

        const fullAddress = `${street}, ${number}`;
        const fee = calculateDeliveryFee(fullAddress);
        setDeliveryFee(fee);
        Keyboard.dismiss();

        Alert.alert(
            'Localização Salva!',
            `Endereço cadastrado com sucesso.\nTaxa estimada: R$ ${fee.toFixed(2).replace('.', ',')}`,
            [{ text: 'OK', onPress: () => router.back() }]
        );
    };

    return (
        <View style={locationStyles.fullContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 

            {/* --- CABEÇALHO VERMELHO --- */}
            <View style={locationStyles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={locationStyles.headerTitle}>NOVO ENDEREÇO</Text>
                <View style={{ width: 28 }} /> 
            </View>

            {/* --- CARD BRANCO ARREDONDADO --- */}
            <View style={locationStyles.whiteCard}>
                <ScrollView 
                    contentContainerStyle={locationStyles.content} 
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    
                    {/* MAPA ESTILIZADO */}
                    <View style={locationStyles.mapContainer}>
                        <Ionicons name="map" size={60} color="#E72C2C" style={{opacity: 0.8}} />
                        <Text style={locationStyles.mapText}>Arraste o mapa para ajustar o pino</Text>
                        {/* Botãozinho fake de "Usar minha localização" */}
                        <TouchableOpacity style={locationStyles.gpsButton}>
                            <Ionicons name="locate" size={16} color="#FFF" />
                            <Text style={locationStyles.gpsText}>Usar localização atual</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={locationStyles.sectionTitle}>Dados do Endereço</Text>

                    {/* INPUTS MODERNOS (Cinza claro) */}
                    <View style={locationStyles.inputGroup}>
                        <View style={locationStyles.inputContainer}>
                            <Ionicons name="navigate-outline" size={20} color="#9CA3AF" style={{marginRight: 10}}/>
                            <TextInput
                                style={locationStyles.input}
                                placeholder="Rua / Avenida"
                                placeholderTextColor="#9CA3AF"
                                value={street}
                                onChangeText={setStreet}
                            />
                        </View>

                        <View style={locationStyles.row}>
                            <View style={[locationStyles.inputContainer, {flex: 0.4, marginRight: 10}]}>
                                <TextInput
                                    style={locationStyles.input}
                                    placeholder="Nº"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="numeric"
                                    value={number}
                                    onChangeText={setNumber}
                                />
                            </View>
                            <View style={[locationStyles.inputContainer, {flex: 0.6}]}>
                                <TextInput
                                    style={locationStyles.input}
                                    placeholder="Complemento"
                                    placeholderTextColor="#9CA3AF"
                                    value={complement}
                                    onChangeText={setComplement}
                                />
                            </View>
                        </View>

                        <View style={locationStyles.inputContainer}>
                            <Ionicons name="flag-outline" size={20} color="#9CA3AF" style={{marginRight: 10}}/>
                            <TextInput
                                style={locationStyles.input}
                                placeholder="Ponto de Referência"
                                placeholderTextColor="#9CA3AF"
                                value={reference}
                                onChangeText={setReference}
                            />
                        </View>
                    </View>
                    
                    {/* RESULTADO DA TAXA (Box Amarelo) */}
                    {deliveryFee !== null && (
                        <View style={locationStyles.feeResult}>
                            <View>
                                <Text style={locationStyles.feeLabel}>Taxa de Entrega:</Text>
                                <Text style={locationStyles.feeSubLabel}>Calculada para esta região</Text>
                            </View>
                            <Text style={locationStyles.feeValue}>R$ {deliveryFee.toFixed(2).replace('.', ',')}</Text>
                        </View>
                    )}

                    {/* BOTÃO SALVAR (Dourado) */}
                    <TouchableOpacity 
                        style={locationStyles.saveButton}
                        onPress={handleCheckFeeAndSave}
                        activeOpacity={0.8}
                    >
                        <Text style={locationStyles.saveButtonText}>SALVAR ENDEREÇO</Text>
                    </TouchableOpacity>

                    {/* Espaço para a barra flutuante não cobrir o botão */}
                    <View style={{height: 100}} />

                </ScrollView>
            </View>
            
            {/* --- BARRA FLUTUANTE --- */}
            <View style={locationStyles.floatingTabBar}>
                <TouchableOpacity style={locationStyles.tabItem} onPress={() => router.replace('/(tabs)')}>
                    <Ionicons name="home-outline" size={24} color="#fff" />
                    <Text style={locationStyles.tabLabel}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={locationStyles.tabItem} onPress={() => router.replace('/(tabs)/buscar')}>
                    <Ionicons name="search-outline" size={24} color="#fff" />
                    <Text style={locationStyles.tabLabel}>Buscar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={locationStyles.centerTabItem} 
                    onPress={() => router.replace('/carrinho')}
                    activeOpacity={0.9}
                >
                    <Ionicons name="cart" size={32} color="#E72C2C" />
                </TouchableOpacity>

                <TouchableOpacity style={locationStyles.tabItem} onPress={() => router.replace('/(tabs)/menu')}>
                    <Ionicons name="fast-food-outline" size={24} color="#fff" />
                    <Text style={locationStyles.tabLabel}>Menu</Text>
                </TouchableOpacity>

                {/* Perfil Ativo (pois Endereço é sub-item de Perfil) */}
                <TouchableOpacity style={locationStyles.tabItem} onPress={() => router.replace('/(tabs)/minha-conta')}>
                    <Ionicons name="person" size={24} color="#fff" />
                    <Text style={[locationStyles.tabLabel, {fontWeight: 'bold'}]}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Estilos ---
const locationStyles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#E72C2C', // 1. Fundo Vermelho
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 25,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 1,
        fontStyle: 'italic'
    },
    // 2. Card Branco "Subindo"
    whiteCard: {
        flex: 1,
        backgroundColor: '#F9FAFB', 
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        overflow: 'hidden',
    },
    content: {
        padding: 20,
    },
    // Mapa
    mapContainer: {
        height: 180,
        backgroundColor: '#E5E7EB',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        overflow: 'hidden'
    },
    mapText: {
        color: '#6B7280',
        marginTop: 10,
        fontWeight: '500'
    },
    gpsButton: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E72C2C',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    gpsText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 5
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#1F2937',
    },
    // Inputs Modernos
    inputGroup: {
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 55,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#333',
    },
    // Resultado da Taxa
    feeResult: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFBEB', // Amarelo bem clarinho fundo
        padding: 15,
        borderRadius: 12,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#FFD700',
    },
    feeLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#B45309', // Tom de dourado escuro
    },
    feeSubLabel: {
        fontSize: 12,
        color: '#92400E',
    },
    feeValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#B45309',
    },
    // 3. Botão Salvar Dourado
    saveButton: {
        backgroundColor: '#FFD700', 
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 20,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#78350F', // Marrom
        letterSpacing: 0.5
    },
    
    // --- 4. Barra Flutuante ---
    floatingTabBar: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        height: 70,
        backgroundColor: '#E72C2C',
        borderRadius: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
    },
    tabLabel: {
        fontSize: 9,
        color: '#FFF',
        marginTop: 2
    },
    centerTabItem: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        backgroundColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 35, 
        borderWidth: 5,
        borderColor: '#F2F2F2', 
        elevation: 5
    }
});

export default AdicionarLocalizacaoScreen;