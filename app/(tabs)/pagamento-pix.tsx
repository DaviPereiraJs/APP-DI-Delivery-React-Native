import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// Dados de Exemplo do Pagamento
const TAXA_ENTREGA = 5.00;
const SUB_TOTAL = 45.00; // Valor fixo para o exemplo
const TOTAL_FINAL = SUB_TOTAL + TAXA_ENTREGA;

const PIX_KEY = '88981522318'; // Chave PIX de exemplo
const PIX_NOME = 'Davi Nascimento';
const PIX_BANCO = 'Pic Pay';

const PagamentoPixScreen: React.FC = () => {

    // Função para simular a cópia do código PIX
    const handleCopyPix = () => {
        // Lógica real usaria Clipboard do React Native:
        // Clipboard.setString(PIX_KEY);
        alert('Código PIX copiado!');
    };

    // Função para simular o envio do comprovante e finalizar o pedido
    const handleFinishOrder = () => {
        console.log('Finalizando pedido via PIX...');
        // Navegaria para a tela de confirmação de pedido e status
        router.replace('./confirmacao-pedido'); // Criaremos essa tela depois
    };

    return (
        <View style={pixStyles.fullContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" /> 

            {/* --- CABEÇALHO --- */}
            <View style={pixStyles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={pixStyles.headerTitle}>Pagamento</Text>
                <View style={{ width: 28 }} /> {/* Espaçador */}
            </View>

            {/* --- CONTEÚDO PRINCIPAL --- */}
            <ScrollView contentContainerStyle={pixStyles.content}>
                
                {/* Seção de Resumo da Entrega (Topo) */}
                <View style={pixStyles.summarySection}>
                    <Text style={pixStyles.summaryText}>Taxa de entrega:</Text>
                    <Text style={pixStyles.summaryValue}>Taxa: X</Text>
                </View>
                <View style={pixStyles.summarySection}>
                    <Text style={pixStyles.summaryText}>Total Final:</Text>
                    <Text style={pixStyles.summaryValue}>R$ {TOTAL_FINAL.toFixed(2).replace('.', ',')} + X</Text>
                </View>

                {/* --- FORMAS DE PAGAMENTO --- */}
                <Text style={pixStyles.paymentTitle}>Forma de Pagamento:</Text>
                
                {/* Botão PIX Ativo */}
                <TouchableOpacity style={[pixStyles.paymentOption, pixStyles.activeOption]}>
                    <Text style={pixStyles.paymentOptionTextActive}>PIX</Text>
                </TouchableOpacity>
                
                {/* Opção Dinheiro (Desabilitada nesta tela, mas visível) */}
                <TouchableOpacity style={pixStyles.paymentOption} onPress={() => router.replace('/pagamento-dinheiro')} >
                    <Text style={pixStyles.paymentOptionText}>Dinheiro</Text>
                    
                </TouchableOpacity>

                {/* --- DETALHES DO PIX --- */}
                <View style={pixStyles.pixDetailsContainer}>
                    <Text style={pixStyles.pixLabel}>Valor:</Text>
                    <Text style={pixStyles.pixValue}>R$ {TOTAL_FINAL.toFixed(2).replace('.', ',')}</Text>

                    <Text style={pixStyles.pixLabel}>Pix:</Text>
                    <View style={pixStyles.pixKeyRow}>
                        <Text style={pixStyles.pixKeyText}>{PIX_KEY}</Text>
                        <TouchableOpacity onPress={handleCopyPix}>
                            <Text style={pixStyles.copyButtonText}>Copiar</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={pixStyles.pixLabel}>Nome:</Text>
                    <Text style={pixStyles.pixValue}>{PIX_NOME}</Text>

                    <Text style={pixStyles.pixLabel}>Banco:</Text>
                    <Text style={pixStyles.pixValue}>{PIX_BANCO}</Text>

                    {/* QR Code (Simulação visual) */}
                    <View style={pixStyles.qrCodeContainer}>
                         <Ionicons name="qr-code-outline" size={100} color="#000" />
                         <Text style={pixStyles.qrCodeText}>[QR Code PIX]</Text>
                    </View>
                </View>
                
                {/* Botão ENVIAR COMPROVANTE */}
                <TouchableOpacity 
                    style={pixStyles.sendProofButton}
                    onPress={handleFinishOrder}
                >
                    <Text style={pixStyles.sendProofButtonText}>ENVIAR COMPROVANTE</Text>
                </TouchableOpacity>

                <Text style={pixStyles.finalMessage}>Pedido Finalizado!</Text>

            </ScrollView>

            {/* BARRA DE NAVEGAÇÃO INFERIOR (Replicada da Home) */}
            <View style={pixStyles.tabBar}>
                <TouchableOpacity style={pixStyles.tabItem} onPress={() => router.replace('./home')}>
                    <Ionicons name="home-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={pixStyles.tabItem}>
                    <Ionicons name="search-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={pixStyles.tabItem} onPress={() => router.push('./carrinho')}>
                    <Ionicons name="cart-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={pixStyles.tabItem}>
                    <Ionicons name="person-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Estilos ---
const pixStyles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#F0F0F0', // Fundo cinza claro para o conteúdo
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
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
        backgroundColor: '#FFD700', // Amarelo para PIX ativo
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
    pixDetailsContainer: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
    },
    pixLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
    },
    pixValue: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    pixKeyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    pixKeyText: {
        fontSize: 16,
        fontWeight: 'bold',
        flexShrink: 1,
    },
    copyButtonText: {
        color: '#E72C2C',
        fontWeight: 'bold',
        marginLeft: 10,
        textDecorationLine: 'underline',
    },
    qrCodeContainer: {
        alignItems: 'center',
        marginVertical: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    qrCodeText: {
        marginTop: 5,
        fontSize: 12,
        color: '#666',
    },
    sendProofButton: {
        backgroundColor: '#FFD700', // Amarelo
        paddingVertical: 18,
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 20,
        elevation: 3,
    },
    sendProofButtonText: {
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

export default PagamentoPixScreen;