import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, ScrollView, Keyboard, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// Dados de Exemplo
const TAXA_ENTREGA = 5.00;
const SUB_TOTAL = 45.00; 
const TOTAL_FINAL = SUB_TOTAL + TAXA_ENTREGA;

const PagamentoDinheiroScreen: React.FC = () => {
    const [needsChange, setNeedsChange] = useState(false);
    const [changeAmount, setChangeAmount] = useState('');

    const calculateChange = () => {
        const amount = parseFloat(changeAmount.replace(',', '.'));
        if (isNaN(amount) || amount < TOTAL_FINAL) {
            return 'R$ 0,00';
        }
        const change = amount - TOTAL_FINAL;
        return `R$ ${change.toFixed(2).replace('.', ',')}`;
    };

    const handleFinishOrder = () => {
        // Validação do troco
        if (needsChange) {
            const amount = parseFloat(changeAmount.replace(',', '.'));
            if (isNaN(amount) || amount < TOTAL_FINAL) {
                Alert.alert('Atenção', 'O valor para troco deve ser maior que o total do pedido.');
                return;
            }
        }
        
        // ✅ CORREÇÃO: Removemos o Alert e mandamos direto para a tela de TUDO CERTO!
        router.replace('/confirmacao-pedido');
    };

    return (
        <View style={dinheiroStyles.fullContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 

            {/* --- CABEÇALHO VERMELHO --- */}
            <View style={dinheiroStyles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={dinheiroStyles.headerTitle}>PAGAMENTO</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* --- CARD BRANCO ARREDONDADO --- */}
            <View style={dinheiroStyles.whiteCard}>
                <ScrollView 
                    contentContainerStyle={dinheiroStyles.content} 
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    
                    {/* RESUMO DO VALOR */}
                    <View style={dinheiroStyles.summaryCard}>
                        <Text style={dinheiroStyles.summaryLabel}>Total a Pagar</Text>
                        <Text style={dinheiroStyles.summaryValue}>R$ {TOTAL_FINAL.toFixed(2).replace('.', ',')}</Text>
                    </View>

                    {/* SELETOR DE PAGAMENTO (Abas) */}
                    <View style={dinheiroStyles.paymentTabs}>
                        <TouchableOpacity 
                            style={dinheiroStyles.tabInactive} 
                            onPress={() => router.replace('/pagamento-pix')}
                        >
                            <Ionicons name="qr-code-outline" size={20} color="#666" />
                            <Text style={dinheiroStyles.tabTextInactive}>PIX</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={dinheiroStyles.tabActive}>
                            <Ionicons name="cash-outline" size={20} color="#E72C2C" />
                            <Text style={dinheiroStyles.tabTextActive}>DINHEIRO</Text>
                        </TouchableOpacity>
                    </View>

                    {/* OPÇÃO DE TROCO */}
                    <Text style={dinheiroStyles.sectionTitle}>Precisa de troco?</Text>
                    
                    <View style={dinheiroStyles.changeOptionsRow}>
                        <TouchableOpacity 
                            style={[dinheiroStyles.optionButton, !needsChange && dinheiroStyles.optionButtonActive]}
                            onPress={() => {setNeedsChange(false); setChangeAmount(''); Keyboard.dismiss();}}
                        >
                            <Text style={[dinheiroStyles.optionText, !needsChange && dinheiroStyles.optionTextActive]}>Não preciso</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[dinheiroStyles.optionButton, needsChange && dinheiroStyles.optionButtonActive]}
                            onPress={() => setNeedsChange(true)}
                        >
                            <Text style={[dinheiroStyles.optionText, needsChange && dinheiroStyles.optionTextActive]}>Sim, preciso</Text>
                        </TouchableOpacity>
                    </View>

                    {/* CAMPO DE VALOR DO TROCO */}
                    {needsChange && (
                        <View style={dinheiroStyles.changeInputContainer}>
                            <Text style={dinheiroStyles.inputLabel}>Troco para quanto?</Text>
                            <View style={dinheiroStyles.inputWrapper}>
                                <Text style={dinheiroStyles.currencyPrefix}>R$</Text>
                                <TextInput
                                    style={dinheiroStyles.input}
                                    placeholder="0,00"
                                    placeholderTextColor="#CCC"
                                    keyboardType="numeric"
                                    value={changeAmount}
                                    onChangeText={setChangeAmount}
                                />
                            </View>
                            
                            <View style={dinheiroStyles.resultBox}>
                                <Text style={dinheiroStyles.resultLabel}>Seu troco será:</Text>
                                <Text style={dinheiroStyles.resultValue}>{calculateChange()}</Text>
                            </View>
                        </View>
                    )}

                    {/* BOTÃO FINALIZAR (Dourado) */}
                    <TouchableOpacity 
                        style={dinheiroStyles.finishButton}
                        onPress={handleFinishOrder}
                        activeOpacity={0.8}
                    >
                        <Text style={dinheiroStyles.finishButtonText}>FINALIZAR PEDIDO</Text>
                        <Ionicons name="checkmark-circle" size={24} color="#78350F" style={{marginLeft: 10}} />
                    </TouchableOpacity>

                    {/* Espaço extra para barra flutuante */}
                    <View style={{height: 100}} />

                </ScrollView>
            </View>

            {/* --- BARRA FLUTUANTE --- */}
            <View style={dinheiroStyles.floatingTabBar}>
                <TouchableOpacity style={dinheiroStyles.tabItem} onPress={() => router.replace('/(tabs)')}>
                    <Ionicons name="home-outline" size={24} color="#fff" />
                    <Text style={dinheiroStyles.tabLabel}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={dinheiroStyles.tabItem} onPress={() => router.push('/(tabs)/buscar')}>
                    <Ionicons name="search-outline" size={24} color="#fff" />
                    <Text style={dinheiroStyles.tabLabel}>Buscar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={dinheiroStyles.centerTabItem} 
                    onPress={() => router.push('/carrinho')}
                    activeOpacity={0.9}
                >
                    <Ionicons name="cart" size={32} color="#E72C2C" />
                </TouchableOpacity>

                <TouchableOpacity style={dinheiroStyles.tabItem} onPress={() => router.push('/(tabs)/menu')}>
                    <Ionicons name="fast-food-outline" size={24} color="#fff" />
                    <Text style={dinheiroStyles.tabLabel}>Menu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={dinheiroStyles.tabItem} onPress={() => router.push('/(tabs)/minha-conta')}>
                    <Ionicons name="person-outline" size={24} color="#fff" />
                    <Text style={dinheiroStyles.tabLabel}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Estilos ---
const dinheiroStyles = StyleSheet.create({
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
    // 2. Card Branco
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
    // Card de Resumo
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
    // Abas de Pagamento
    paymentTabs: {
        flexDirection: 'row',
        backgroundColor: '#E5E7EB',
        borderRadius: 12,
        padding: 4,
        marginBottom: 25
    },
    tabInactive: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 10,
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
    tabTextInactive: {
        marginLeft: 8,
        fontWeight: 'bold',
        color: '#6B7280'
    },
    tabTextActive: {
        marginLeft: 8,
        fontWeight: 'bold',
        color: '#E72C2C'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 15,
    },
    // Opções de Troco (Botões lado a lado)
    changeOptionsRow: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 20
    },
    optionButton: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    optionButtonActive: {
        backgroundColor: '#FFF0F0',
        borderColor: '#E72C2C',
    },
    optionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6B7280'
    },
    optionTextActive: {
        color: '#E72C2C',
        fontWeight: 'bold'
    },
    // Input de Troco
    changeInputContainer: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20
    },
    inputLabel: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 10,
        fontWeight: '600'
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#E72C2C',
        marginBottom: 15
    },
    currencyPrefix: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 5
    },
    input: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        paddingVertical: 5
    },
    resultBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFBEB', // Amarelo claro
        padding: 15,
        borderRadius: 10,
    },
    resultLabel: {
        fontWeight: '600',
        color: '#B45309'
    },
    resultValue: {
        fontWeight: 'bold',
        color: '#B45309',
        fontSize: 16
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

export default PagamentoDinheiroScreen;