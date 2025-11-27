import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// Dados de Exemplo do Histórico de Pedidos
const DUMMY_ORDERS = [
    { id: '1001', date: '2025-11-20', total: 50.00, status: 'Entregue', restaurant: 'O Rei do Hambúrguer' },
    { id: '1002', date: '2025-11-15', total: 72.50, status: 'Cancelado', restaurant: 'Esfiha Árabe' },
    { id: '1003', date: '2025-11-10', total: 35.00, status: 'Entregue', restaurant: 'A Moda da Casa' },
    { id: '1004', date: '2025-11-05', total: 60.00, status: 'Entregue', restaurant: 'O Rei do Hambúrguer' },
];

// Componente para renderizar um item do pedido
const OrderItem = ({ item }) => {
    
    // Define a cor com base no status
    const getStatusColor = (status: string) => {
        if (status === 'Entregue') return '#28a745'; // Verde
        if (status === 'Cancelado') return '#dc3545'; // Vermelho
        return '#ffc107'; // Amarelo (Em processamento)
    };

    return (
        <TouchableOpacity 
            style={historyStyles.orderCard}
            onPress={() => alert(`Ver detalhes do Pedido #${item.id}`)}
        >
            <View style={historyStyles.cardHeader}>
                <Text style={historyStyles.orderId}>Pedido #{item.id}</Text>
                <Text style={historyStyles.orderDate}>{item.date}</Text>
            </View>
            
            <Text style={historyStyles.restaurantName}>{item.restaurant}</Text>
            
            <View style={historyStyles.cardFooter}>
                <View style={[historyStyles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={historyStyles.statusText}>{item.status}</Text>
                </View>
                <Text style={historyStyles.orderTotal}>Total: R$ {item.total.toFixed(2).replace('.', ',')}</Text>
            </View>
        </TouchableOpacity>
    );
};

const HistoricoScreen: React.FC = () => {

    return (
        <View style={historyStyles.fullContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" /> 

            {/* --- CABEÇALHO --- */}
            <View style={historyStyles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={historyStyles.headerTitle}>Histórico de Pedidos</Text>
                <View style={{ width: 28 }} /> 
            </View>

            {/* --- LISTA DE PEDIDOS --- */}
            <FlatList
                data={DUMMY_ORDERS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <OrderItem item={item} />}
                contentContainerStyle={historyStyles.listContent}
                ListEmptyComponent={() => (
                    <Text style={historyStyles.emptyText}>Você ainda não fez nenhum pedido.</Text>
                )}
            />

            {/* BARRA DE NAVEGAÇÃO INFERIOR */}
            <View style={historyStyles.tabBar}>
                <TouchableOpacity style={historyStyles.tabItem} onPress={() => router.replace('./home')}>
                    <Ionicons name="home-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={historyStyles.tabItem}>
                    <Ionicons name="search-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={historyStyles.tabItem} onPress={() => router.push('./carrinho')}>
                    <Ionicons name="cart-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={historyStyles.tabItem}>
                    <Ionicons name="person-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Estilos ---
const historyStyles = StyleSheet.create({
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
    listContent: {
        padding: 15,
    },
    orderCard: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    orderDate: {
        fontSize: 14,
        color: '#999',
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#E72C2C',
        marginBottom: 10,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        paddingTop: 10,
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    statusText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#666',
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

export default HistoricoScreen;