import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// --- 1. CRIANDO A TIPAGEM (O Molde) ---
interface OrderData {
    id: string;
    date: string;
    total: number;
    status: string;
    restaurant: string;
    items: string;
}

// --- DADOS (MOCK) ---
const DUMMY_ORDERS: OrderData[] = [
    { id: '1001', date: '20/11/2025', total: 50.00, status: 'Entregue', restaurant: 'O Rei do Hambúrguer', items: '2x X-Bacon, 1x Coca-Cola' },
    { id: '1002', date: '15/11/2025', total: 72.50, status: 'Cancelado', restaurant: 'Esfiha Árabe', items: '10x Esfiha Carne, 1x Kibe' },
    { id: '1003', date: '10/11/2025', total: 35.00, status: 'Entregue', restaurant: 'A Moda da Casa', items: '1x Pizza Broto' },
    { id: '1004', date: '05/11/2025', total: 60.00, status: 'Entregue', restaurant: 'O Rei do Hambúrguer', items: '2x Combo Família' },
];

// --- 2. APLICANDO A TIPAGEM NO COMPONENTE ---
const OrderItem = ({ item }: { item: OrderData }) => {
    
    const getStatusColor = (status: string) => {
        if (status === 'Entregue') return '#10B981'; 
        if (status === 'Cancelado') return '#EF4444'; 
        return '#F59E0B'; 
    };

    const getStatusIcon = (status: string): keyof typeof Ionicons.glyphMap => {
        if (status === 'Entregue') return 'checkmark-circle';
        if (status === 'Cancelado') return 'close-circle';
        return 'time';
    };

    return (
        <TouchableOpacity 
            style={historyStyles.orderCard}
            onPress={() => {}}
            activeOpacity={0.7}
        >
            {/* Cabeçalho do Card */}
            <View style={historyStyles.cardHeader}>
                <View style={historyStyles.storeInfo}>
                    <View style={historyStyles.storeIcon}>
                        <Ionicons name="storefront" size={20} color="#E72C2C" />
                    </View>
                    <View>
                        <Text style={historyStyles.restaurantName}>{item.restaurant}</Text>
                        <Text style={historyStyles.orderDate}>{item.date} • #{item.id}</Text>
                    </View>
                </View>
                <Text style={historyStyles.orderTotal}>R$ {item.total.toFixed(2).replace('.', ',')}</Text>
            </View>
            
            <View style={historyStyles.divider} />

            {/* Resumo dos Itens */}
            <Text style={historyStyles.itemsText} numberOfLines={1}>
                {item.items}
            </Text>
            
            {/* Status e Ação */}
            <View style={historyStyles.cardFooter}>
                <View style={historyStyles.statusRow}>
                    <Ionicons name={getStatusIcon(item.status)} size={16} color={getStatusColor(item.status)} />
                    <Text style={[historyStyles.statusText, { color: getStatusColor(item.status) }]}>
                        {item.status}
                    </Text>
                </View>
                
                <TouchableOpacity style={historyStyles.repeatButton}>
                    <Text style={historyStyles.repeatButtonText}>Pedir de novo</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const HistoricoScreen: React.FC = () => {

    return (
        <View style={historyStyles.fullContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 

            {/* --- CABEÇALHO VERMELHO --- */}
            <View style={historyStyles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={historyStyles.headerTitle}>MEUS PEDIDOS</Text>
                <View style={{ width: 28 }} /> 
            </View>

            {/* --- CARD BRANCO ARREDONDADO --- */}
            <View style={historyStyles.whiteCard}>
                <FlatList
                    data={DUMMY_ORDERS}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <OrderItem item={item} />}
                    contentContainerStyle={historyStyles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={historyStyles.emptyContainer}>
                            <Ionicons name="receipt-outline" size={60} color="#DDD" />
                            <Text style={historyStyles.emptyText}>Você ainda não fez nenhum pedido.</Text>
                        </View>
                    )}
                    ListFooterComponent={<View style={{height: 100}} />}
                />
            </View>

            {/* --- BARRA FLUTUANTE --- */}
            <View style={historyStyles.floatingTabBar}>
                <TouchableOpacity style={historyStyles.tabItem} onPress={() => router.replace('/(tabs)')}>
                    <Ionicons name="home-outline" size={24} color="#fff" />
                    <Text style={historyStyles.tabLabel}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={historyStyles.tabItem} onPress={() => router.replace('/(tabs)/buscar')}>
                    <Ionicons name="search-outline" size={24} color="#fff" />
                    <Text style={historyStyles.tabLabel}>Buscar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={historyStyles.centerTabItem} 
                    onPress={() => router.replace('/carrinho')}
                    activeOpacity={0.9}
                >
                    <Ionicons name="cart" size={32} color="#E72C2C" />
                </TouchableOpacity>

                <TouchableOpacity style={historyStyles.tabItem} onPress={() => router.replace('/(tabs)/menu')}>
                    <Ionicons name="fast-food-outline" size={24} color="#fff" />
                    <Text style={historyStyles.tabLabel}>Menu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={historyStyles.tabItem} onPress={() => router.replace('/(tabs)/minha-conta')}>
                    <Ionicons name="person" size={24} color="#fff" />
                    <Text style={[historyStyles.tabLabel, {fontWeight: 'bold'}]}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Estilos ---
const historyStyles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#E72C2C', 
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
    listContent: {
        padding: 20,
        paddingTop: 25
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    orderCard: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: '#F3F4F6'
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    storeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    storeIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF0F0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    orderDate: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 2
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: 10
    },
    itemsText: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 12
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    statusText: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    repeatButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E72C2C'
    },
    repeatButtonText: {
        color: '#E72C2C',
        fontSize: 12,
        fontWeight: 'bold'
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 16,
        color: '#9CA3AF',
    },
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

export default HistoricoScreen;