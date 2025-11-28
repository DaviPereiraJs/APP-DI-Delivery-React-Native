import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, StatusBar, ScrollView, Keyboard } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// Dados de Exemplo do Pagamento
const TAXA_ENTREGA = 5.00;
const SUB_TOTAL = 45.00; // Valor fixo para o exemplo
const TOTAL_FINAL = SUB_TOTAL + TAXA_ENTREGA;

const PagamentoDinheiroScreen: React.FC = () => {
    const [needsChange, setNeedsChange] = useState(false);
    const [changeAmount, setChangeAmount] = useState('');

    // Função para calcular o troco
    const calculateChange = () => {
        const amount = parseFloat(changeAmount.replace(',', '.'));
        if (isNaN(amount) || amount < TOTAL_FINAL) {
            return 'R$ 0,00';
        }
        const change = amount - TOTAL_FINAL;
        return `R$ ${change.toFixed(2).replace('.', ',')}`;
    };

    // Função para finalizar o pedido
    const handleFinishOrder = () => {
        // Lógica de validação do troco
        if (needsChange) {
            const amount = parseFloat(changeAmount.replace(',', '.'));
            if (isNaN(amount) || amount < TOTAL_FINAL) {
                alert('Por favor, informe um valor igual ou superior ao total final para o troco.');
                return;
            }
        }
        
        console.log('Finalizando pedido em dinheiro...');
        // Navegaria para a tela de confirmação de pedido e status
        router.replace('./confirmacao-pedido'); 
    };

    return (
        <View style={dinheiroStyles.fullContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" /> 

            {/* --- CABEÇALHO --- */}
            <View style={dinheiroStyles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={dinheiroStyles.headerTitle}>Pagamento</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* --- CONTEÚDO PRINCIPAL --- */}
            <ScrollView contentContainerStyle={dinheiroStyles.content} keyboardShouldPersistTaps="handled">
                
                {/* Seção de Resumo da Entrega (Topo) */}
                <View style={dinheiroStyles.summarySection}>

                </View>
                <View style={dinheiroStyles.summarySection}>
                    <Text style={dinheiroStyles.summaryText}>Valor Final:</Text>
                    <Text style={dinheiroStyles.summaryValue}>R$ {TOTAL_FINAL.toFixed(2).replace('.', ',')}</Text>
                </View>

                {/* --- FORMAS DE PAGAMENTO --- */}
                <Text style={dinheiroStyles.paymentTitle}>Forma de Pagamento:</Text>
                
                {/* Opção PIX (Desabilitada) */}
                <TouchableOpacity style={dinheiroStyles.paymentOption} onPress={() => router.replace('./pagamento-pix')}>
                    <Text style={dinheiroStyles.paymentOptionText}>PIX</Text>
                </TouchableOpacity>
                
                {/* Botão DINHEIRO Ativo */}
                <TouchableOpacity style={[dinheiroStyles.paymentOption, dinheiroStyles.activeOption]}>
                    <Text style={dinheiroStyles.paymentOptionTextActive}>Dinheiro</Text>
                </TouchableOpacity>

                {/* --- SEÇÃO DE TROCO --- */}
                <View style={dinheiroStyles.changeContainer}>
                    <Text style={dinheiroStyles.changeQuestion}>Precisa de Troco?</Text>
                    
                    {/* Botões Sim / Não */}
                    <View style={dinheiroStyles.changeButtons}>
                        <TouchableOpacity 
                            style={[dinheiroStyles.changeButton, needsChange && dinheiroStyles.changeButtonActive]}
                            onPress={() => setNeedsChange(true)}
                        >
                            <Text style={[dinheiroStyles.changeButtonText, needsChange && dinheiroStyles.changeButtonTextActive]}>Sim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[dinheiroStyles.changeButton, !needsChange && dinheiroStyles.changeButtonActive]}
                            onPress={() => {setNeedsChange(false); setChangeAmount('');}}
                        >
                            <Text style={[dinheiroStyles.changeButtonText, !needsChange && dinheiroStyles.changeButtonTextActive]}>Não</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* CAMPO DE QUANTO DINHEIRO */}
                {needsChange && (
                    <View style={dinheiroStyles.inputContainer}>
                        <Text style={dinheiroStyles.inputLabel}>Pra quanto?</Text>
                        <TextInput
                            style={dinheiroStyles.input}
                            placeholder={`Ex: ${Math.ceil(TOTAL_FINAL)}`}
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            value={changeAmount}
                            onChangeText={setChangeAmount}
                            onBlur={Keyboard.dismiss}
                        />
                         <View style={dinheiroStyles.changeResultRow}>
                            <Text style={dinheiroStyles.changeResultLabel}>Troco será:</Text>
                            <Text style={dinheiroStyles.changeResultValue}>{calculateChange()}</Text>
                        </View>
                    </View>
                )}
                
                {/* Botão FINALIZAR PEDIDO */}
                <TouchableOpacity 
                    style={dinheiroStyles.finishOrderButton}
                    onPress={handleFinishOrder}
                    disabled={needsChange && (parseFloat(changeAmount.replace(',', '.')) < TOTAL_FINAL || isNaN(parseFloat(changeAmount.replace(',', '.'))))}
                >
                    <Text style={dinheiroStyles.finishOrderButtonText}>FINALIZAR PEDIDO</Text>
                </TouchableOpacity>

                <Text style={dinheiroStyles.finalMessage}>Pedido Finalizado!</Text>

            </ScrollView>

            {/* BARRA DE NAVEGAÇÃO INFERIOR */}
            <View style={dinheiroStyles.tabBar}>
                <TouchableOpacity style={dinheiroStyles.tabItem} onPress={() => router.replace('/(tabs)')}>
                    <Ionicons name="home-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={dinheiroStyles.tabItem} onPress={() => router.push('/(tabs)/buscar')}>
                    <Ionicons name="search-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={dinheiroStyles.tabItem} onPress={() => router.push('./carrinho')}>
                    <Ionicons name="cart-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={dinheiroStyles.tabItem} onPress={() => router.replace('/minha-conta')}>
                    <Ionicons name="person-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Estilos ---
const dinheiroStyles = StyleSheet.create({
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
        color: '#000',
    },
    content: {
        padding: 20,
    },
    summarySection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    summaryText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    paymentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    paymentOption: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#CCC',
    },
    activeOption: {
        backgroundColor: '#FFD700', // Amarelo para Dinheiro ativo
        borderColor: '#E72C2C',
        borderWidth: 2,
    },
    paymentOptionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    paymentOptionTextActive: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E72C2C', // Texto vermelho para opção ativa
    },
    changeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    changeQuestion: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    changeButtons: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        borderRadius: 5,
    },
    changeButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    changeButtonActive: {
        backgroundColor: '#E72C2C',
    },
    changeButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
    changeButtonTextActive: {
        color: '#FFF',
    },
    inputContainer: {
        marginTop: 15,
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 8,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#F0F0F0',
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 18,
    },
    changeResultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    changeResultLabel: {
        fontSize: 16,
        color: '#333',
    },
    changeResultValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E72C2C',
    },
    finishOrderButton: {
        backgroundColor: '#FFD700', // Amarelo
        paddingVertical: 18,
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 20,
        elevation: 3,
    },
    finishOrderButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E72C2C',
    },
    finalMessage: {
        textAlign: 'center',
        fontSize: 16,
        color: '#E72C2C',
        fontWeight: 'bold',
        marginBottom: 10,
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

export default PagamentoDinheiroScreen;