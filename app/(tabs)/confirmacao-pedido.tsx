import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

const ConfimacaoPedidoScreen: React.FC = () => {
    
    // Dados de exemplo da confirmação
    const ORDER_ID = '#1005';
    const ESTIMATED_TIME = '30 - 40 minutos';

    return (
        <View style={confirmStyles.fullContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 

            {/* --- CONTEÚDO PRINCIPAL (FUNDO VERMELHO) --- */}
            <View style={confirmStyles.contentArea}>
                
                <Ionicons name="checkmark-circle-outline" size={100} color="#ffffffff" />
                
                <Text style={confirmStyles.mainTitle}>Pedido Realizado com Sucesso!</Text>
                <Text style={confirmStyles.orderIdText}>Seu pedido {ORDER_ID} foi enviado para a cozinha.</Text>
                
                <View style={confirmStyles.timeBox}>
                    <Ionicons name="time-outline" size={28} color="#E72C2C" />
                    <Text style={confirmStyles.timeText}>Tempo Estimado de Entrega:</Text>
                    <Text style={confirmStyles.timeValue}>{ESTIMATED_TIME}</Text>
                </View>

                {/* Botão para Acompanhar (Simulação de Mapa) */}
                <TouchableOpacity 
                    style={confirmStyles.trackButton}
                    onPress={() => alert('Abrir rastreamento em tempo real!')}
                >
                    <Text style={confirmStyles.trackButtonText}>ACOMPANHAR PEDIDO</Text>
                </TouchableOpacity>

            </View>

            {/* --- FOOTER / VOLTAR PARA HOME --- */}
            <TouchableOpacity 
                style={confirmStyles.backHomeButton}
                // Limpa a pilha e volta para a tela inicial (Home)
                onPress={() => router.replace('/(tabs)')} 
            >
                <Text style={confirmStyles.backHomeText}>Voltar para o Início</Text>
            </TouchableOpacity>

        </View>
    );
};

// --- Estilos ---
const confirmStyles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#E72C2C', // Fundo Principal Vermelho
    },
    contentArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    mainTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    orderIdText: {
        fontSize: 18,
        color: '#ffffffff', // Amarelo
        textAlign: 'center',
        marginBottom: 30,
    },
    timeBox: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
        width: '85%',
        borderWidth: 2,
        borderColor: '#FFD700',
    },
    timeText: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    timeValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E72C2C',
        marginTop: 5,
    },
    trackButton: {
        backgroundColor: '#ffffffff', // Amarelo
        paddingVertical: 18,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
        width: '85%',
        elevation: 3,
    },
    trackButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E72C2C',
    },
    // Footer
    backHomeButton: {
        backgroundColor: '#FFF',
        paddingVertical: 20,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#DDD',
    },
    backHomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E72C2C',
    }
});

export default ConfimacaoPedidoScreen;