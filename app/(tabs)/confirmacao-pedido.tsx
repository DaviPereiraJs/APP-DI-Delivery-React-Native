import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

const ConfimacaoPedidoScreen: React.FC = () => {
    
    // Dados de exemplo
    const ORDER_ID = '#1005';
    const ESTIMATED_TIME = '30 - 40 minutos';

    return (
        <View style={confirmStyles.fullContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 

            {/* --- CABEÇALHO VERMELHO (Celebration) --- */}
            <View style={confirmStyles.header}>
                <Ionicons name="checkmark-circle" size={100} color="#FFD700" style={confirmStyles.iconShadow} />
                <Text style={confirmStyles.mainTitle}>TUDO CERTO!</Text>
                <Text style={confirmStyles.subTitle}>Seu pedido foi recebido.</Text>
            </View>

            {/* --- CARD BRANCO ARREDONDADO --- */}
            <View style={confirmStyles.whiteCard}>
                
                {/* CAIXA DE INFORMAÇÃO */}
                <View style={confirmStyles.infoBox}>
                    <Text style={confirmStyles.orderIdLabel}>Número do Pedido</Text>
                    <Text style={confirmStyles.orderIdValue}>{ORDER_ID}</Text>
                    
                    <View style={confirmStyles.divider} />
                    
                    <View style={confirmStyles.timeRow}>
                        <Ionicons name="time-outline" size={24} color="#E72C2C" />
                        <View style={{marginLeft: 10}}>
                            <Text style={confirmStyles.timeLabel}>Tempo estimado</Text>
                            <Text style={confirmStyles.timeValue}>{ESTIMATED_TIME}</Text>
                        </View>
                    </View>
                </View>

                {/* IMAGEM DECORATIVA (Opcional - Motoqueira/Entregador) */}
                <View style={confirmStyles.illustrationContainer}>
                    <Ionicons name="bicycle" size={80} color="#E5E7EB" />
                </View>

                <View style={{flex: 1}} />

                {/* BOTÕES DE AÇÃO */}
                
                {/* 1. Acompanhar (Dourado - Principal) */}
                <TouchableOpacity 
                    style={confirmStyles.trackButton}
                    onPress={() => router.replace('/historico')} // Vai para Meus Pedidos
                >
                    <Text style={confirmStyles.trackButtonText}>ACOMPANHAR PEDIDO</Text>
                </TouchableOpacity>

                {/* 2. Voltar (Texto simples) */}
                <TouchableOpacity 
                    style={confirmStyles.backHomeButton}
                    onPress={() => router.replace('/(tabs)')} 
                >
                    <Text style={confirmStyles.backHomeText}>Voltar para o Início</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

// --- Estilos ---
const confirmStyles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#E72C2C', // Fundo Vermelho
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        paddingBottom: 40,
    },
    iconShadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
        marginBottom: 10
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 1,
        fontStyle: 'italic'
    },
    subTitle: {
        fontSize: 16,
        color: '#FFD700', // Dourado
        marginTop: 5,
        fontWeight: '600'
    },
    // Card Branco que "sobe"
    whiteCard: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        padding: 30,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
    },
    // Caixa de Detalhes
    infoBox: {
        backgroundColor: '#FFF',
        width: '100%',
        padding: 25,
        borderRadius: 20,
        alignItems: 'center',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    orderIdLabel: {
        fontSize: 14,
        color: '#9CA3AF',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    orderIdValue: {
        fontSize: 32,
        fontWeight: '900',
        color: '#1F2937',
        marginTop: 5
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: 20
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeLabel: {
        fontSize: 14,
        color: '#6B7280'
    },
    timeValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E72C2C'
    },
    illustrationContainer: {
        marginTop: 40,
        opacity: 0.5
    },
    // Botão Principal (Dourado)
    trackButton: {
        backgroundColor: '#FFD700',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 15,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    trackButtonText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#78350F', // Marrom
        letterSpacing: 0.5
    },
    // Botão Secundário
    backHomeButton: {
        paddingVertical: 10,
    },
    backHomeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#9CA3AF',
    }
});

export default ConfimacaoPedidoScreen;