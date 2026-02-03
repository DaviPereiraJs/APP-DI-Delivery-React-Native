import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Alert, Clipboard } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// Dados de Exemplo
const TAXA_ENTREGA = 5.00;
const SUB_TOTAL = 45.00;
const TOTAL_FINAL = SUB_TOTAL + TAXA_ENTREGA;

const PIX_KEY = '88981522318'; 
const PIX_NOME = 'Davi Nascimento';
const PIX_BANCO = 'PicPay';

const PagamentoPixScreen: React.FC = () => {
    
    // Função para copiar o código (Simulada)
    const handleCopyPix = () => {
        // Clipboard.setString(PIX_KEY); // Funciona no celular real
        Alert.alert("Sucesso", "Chave PIX copiada para a área de transferência!");
    };

    const handleFinishOrder = () => {
        // Vai para a tela de confirmação
        router.replace('/confirmacao-pedido');
    };

    return (
        <View style={pixStyles.fullContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 

            {/* --- CABEÇALHO VERMELHO --- */}
            <View style={pixStyles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={pixStyles.headerTitle}>PAGAMENTO</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* --- CARD BRANCO ARREDONDADO --- */}
            <View style={pixStyles.whiteCard}>
                <ScrollView 
                    contentContainerStyle={pixStyles.content} 
                    showsVerticalScrollIndicator={false}
                >
                    
                    {/* RESUMO DO VALOR */}
                    <View style={pixStyles.summaryCard}>
                        <Text style={pixStyles.summaryLabel}>Total a Pagar</Text>
                        <Text style={pixStyles.summaryValue}>R$ {TOTAL_FINAL.toFixed(2).replace('.', ',')}</Text>
                    </View>

                    {/* SELETOR DE PAGAMENTO (Abas) */}
                    <View style={pixStyles.paymentTabs}>
                        <TouchableOpacity style={pixStyles.tabActive}>
                            <Ionicons name="qr-code-outline" size={20} color="#E72C2C" />
                            <Text style={pixStyles.tabTextActive}>PIX</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={pixStyles.tabInactive}
                            onPress={() => router.replace('/pagamento-dinheiro')}
                        >
                            <Ionicons name="cash-outline" size={20} color="#666" />
                            <Text style={pixStyles.tabTextInactive}>DINHEIRO</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={pixStyles.sectionTitle}>Dados para Transferência</Text>

                    {/* BOX DO QR CODE */}
                    <View style={pixStyles.qrCodeBox}>
                        <Ionicons name="qr-code" size={120} color="#333" />
                        <Text style={pixStyles.qrCodeInstruction}>Escaneie o QR Code ou copie a chave abaixo</Text>
                    </View>

                    {/* CHAVE PIX E COPIAR */}
                    <View style={pixStyles.keyContainer}>
                        <View style={{flex: 1}}>
                            <Text style={pixStyles.keyLabel}>Chave PIX (Celular):</Text>
                            <Text style={pixStyles.keyValue}>{PIX_KEY}</Text>
                        </View>
                        <TouchableOpacity style={pixStyles.copyButton} onPress={handleCopyPix}>
                            <Ionicons name="copy-outline" size={20} color="#E72C2C" />
                            <Text style={pixStyles.copyButtonText}>Copiar</Text>
                        </TouchableOpacity>
                    </View>

                    {/* DETALHES DO RECEBEDOR */}
                    <View style={pixStyles.receiverDetails}>
                        <View style={pixStyles.detailRow}>
                            <Text style={pixStyles.detailLabel}>Nome:</Text>
                            <Text style={pixStyles.detailValue}>{PIX_NOME}</Text>
                        </View>
                        <View style={pixStyles.divider} />
                        <View style={pixStyles.detailRow}>
                            <Text style={pixStyles.detailLabel}>Banco:</Text>
                            <Text style={pixStyles.detailValue}>{PIX_BANCO}</Text>
                        </View>
                    </View>
                    
                    {/* BOTÃO FINALIZAR (Dourado) */}
                    <TouchableOpacity 
                        style={pixStyles.finishButton}
                        onPress={handleFinishOrder}
                        activeOpacity={0.8}
                    >
                        <Text style={pixStyles.finishButtonText}>JÁ FIZ O PIX</Text>
                        <Ionicons name="checkmark-done-circle" size={24} color="#78350F" style={{marginLeft: 10}} />
                    </TouchableOpacity>

                </ScrollView>
            </View>

            {/* --- BARRA FLUTUANTE --- */}
            <View style={pixStyles.floatingTabBar}>
                <TouchableOpacity style={pixStyles.tabItem} onPress={() => router.replace('/(tabs)')}>
                    <Ionicons name="home-outline" size={24} color="#fff" />
                    <Text style={pixStyles.tabLabel}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={pixStyles.tabItem} onPress={() => router.push('/(tabs)/buscar')}>
                    <Ionicons name="search-outline" size={24} color="#fff" />
                    <Text style={pixStyles.tabLabel}>Buscar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={pixStyles.centerTabItem} 
                    onPress={() => router.push('/carrinho')}
                    activeOpacity={0.9}
                >
                    <Ionicons name="cart" size={32} color="#E72C2C" />
                </TouchableOpacity>

                <TouchableOpacity style={pixStyles.tabItem} onPress={() => router.push('/(tabs)/menu')}>
                    <Ionicons name="fast-food-outline" size={24} color="#fff" />
                    <Text style={pixStyles.tabLabel}>Menu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={pixStyles.tabItem} onPress={() => router.push('/(tabs)/minha-conta')}>
                    <Ionicons name="person-outline" size={24} color="#fff" />
                    <Text style={pixStyles.tabLabel}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Estilos ---
const pixStyles = StyleSheet.create({
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
    whiteCard: {
        flex: 1,
        backgroundColor: '#F9FAFB', 
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        overflow: 'hidden',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
        // ✅ CORREÇÃO: Aumentei muito o paddingBottom para o botão "flutuar" acima da barra
        paddingBottom: 150, 
    },
    // Resumo
    summaryCard: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#6B7280',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: 5
    },
    summaryValue: {
        fontSize: 32,
        fontWeight: '900',
        color: '#E72C2C',
    },
    // Abas
    paymentTabs: {
        flexDirection: 'row',
        backgroundColor: '#E5E7EB',
        borderRadius: 12,
        padding: 4,
        marginBottom: 25
    },
    tabActive: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: '#FFF',
        borderRadius: 10,
        elevation: 2,
    },
    tabInactive: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 10,
    },
    tabTextActive: {
        marginLeft: 8,
        fontWeight: 'bold',
        color: '#E72C2C'
    },
    tabTextInactive: {
        marginLeft: 8,
        fontWeight: 'bold',
        color: '#6B7280'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 15,
    },
    // QR Code
    qrCodeBox: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#E72C2C',
        borderStyle: 'dashed'
    },
    qrCodeInstruction: {
        marginTop: 10,
        color: '#666',
        fontSize: 12,
        textAlign: 'center'
    },
    // Chave PIX
    keyContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        elevation: 1
    },
    keyLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 2
    },
    keyValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    copyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0F0',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8
    },
    copyButtonText: {
        color: '#E72C2C',
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 5
    },
    // Detalhes Recebedor
    receiverDetails: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 25
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: 10
    },
    detailLabel: {
        color: '#6B7280',
        fontSize: 14
    },
    detailValue: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 14
    },
    // Botão Finalizar
    finishButton: {
        backgroundColor: '#FFD700', 
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    finishButtonText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#78350F',
        letterSpacing: 0.5
    },

    // --- Barra Flutuante ---
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

export default PagamentoPixScreen;