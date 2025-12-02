import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native'; 
import { router, useNavigation } from 'expo-router'; // 1. Importar useNavigation
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native'; // 2. Importar Ações do Drawer

// --- INTERFACES DE TIPAGEM ---
interface CartItemData {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartItemProps {
    item: CartItemData;
}


// Dados de exemplo do carrinho
const cartItems: CartItemData[] = [
    { id: '1', name: 'A Moda da Casa', price: 25.00, quantity: 1 },
    { id: '2', name: 'X-Tudão', price: 20.00, quantity: 1 },
];

// cauculo automatico
const TAXA_ENTREGA = 5.00;
const SUB_TOTAL = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const TOTAL_FINAL = SUB_TOTAL + TAXA_ENTREGA;


// Componente para renderizar cada item do carrinho
const CartItem: React.FC<CartItemProps> = ({ item }) => (
    <View style={cartStyles.cartItemContainer}>
        {/* Imagem do Produto */}
        <Image
            source={require('../assets/LogoInicialApp.png')}
            style={cartStyles.burgerImage}
        />
        
        {/* Nome do Item */}
        <View style={cartStyles.textContainer}>
            <Text style={cartStyles.itemName}>{item.name}</Text>
        </View>

        {/* Preço e Botões de Quantidade */}
        <View style={cartStyles.priceQuantityContainer}>
            <Text style={cartStyles.itemPrice}>R$ {item.price.toFixed(2).replace('.', ',')}</Text>
            <View style={cartStyles.quantityControls}>
                 <TouchableOpacity><Ionicons name="remove-circle-outline" size={24} color="#666" /></TouchableOpacity>
                 <Text style={cartStyles.quantityText}>{item.quantity}</Text>
                 <TouchableOpacity><Ionicons name="add-circle-outline" size={24} color="#E72C2C" /></TouchableOpacity>
            </View>
        </View>
    </View>
);

// controlodor do Drawer 
const CarrinhoScreen: React.FC = () => {
    // Hook de navegação para controlar o Drawer
    const navigation = useNavigation(); 

    return (
        <View style={cartStyles.fullContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

            {/* --- CABEÇALHO --- */}
            <View style={cartStyles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
                
                <Text style={cartStyles.headerTitle}>MEU CARRINHO</Text>
                
                {/* CORREÇÃO DO BOTÃO MENU */}
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Ionicons name="menu" size={30} color="#000000ff" />
                </TouchableOpacity>
            </View>

            {/* --- CONTEÚDO PRINCIPAL --- */}
            <ScrollView style={cartStyles.listContainer}>
                
                {/* Lista de Itens */}
                {/* percorre os itens do carrinho e mostra cada um usando o componente */}

                {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
                
                
                
                
                {/* Sub Total */}
                <View style={cartStyles.summaryRow}>
                    <Text style={cartStyles.summaryText}>Sub Total:</Text>
                    <Text style={cartStyles.summaryValue}>R$ {SUB_TOTAL.toFixed(2).replace('.', ',')}</Text>
                </View>
                
                {/* Taxa de Entrega */}
                <View style={cartStyles.summaryRow}>
                    <Text style={cartStyles.summaryText}>Taxa de entrega:</Text>
                    <Text style={cartStyles.summaryValue}>R$ {TAXA_ENTREGA.toFixed(2).replace('.', ',')}</Text>
                </View>
                
                {/* Total Final */}
                <View style={[cartStyles.summaryRow, cartStyles.totalRow]}>
                    <Text style={cartStyles.totalText}>Total Final:</Text>
                    <Text style={cartStyles.totalValue}>R$ {TOTAL_FINAL.toFixed(2).replace('.', ',')}</Text>
                </View>

            </ScrollView>

            {/* --- FOOTER / BOTÃO DE PAGAMENTO --- */}
            <TouchableOpacity
                style={cartStyles.checkoutButton}
                onPress={() => router.push('/pagamento-pix')}
            >
                <Text style={cartStyles.checkoutButtonText}>Escolher Forma de Pagamento</Text>
            </TouchableOpacity>

             <View style={cartStyles.tabBar}>
                            <TouchableOpacity style={cartStyles.tabItem} onPress={() => router.replace('/(tabs)')}>
                                <Ionicons name="home" size={24} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity style={cartStyles.tabItem} onPress={() => router.push('/(tabs)/buscar')}>
                                <Ionicons name="search-outline" size={24} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity style={cartStyles.tabItem} onPress={() => router.push('/carrinho')}>
                                <Ionicons name="cart-outline" size={24} color="#FFD000" />
                            </TouchableOpacity>
                            <TouchableOpacity style={cartStyles.tabItem} onPress={() => router.push('/(tabs)/minha-conta')}>
                                <Ionicons name="person-outline" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>

        </View>
    );
};

// --- Estilos ---
const cartStyles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        backgroundColor: '#E72C2C'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    burgerImage: {
        width: 60,
        height: 50,
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    priceQuantityContainer: {
        alignItems: 'flex-end',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityText: {
        marginHorizontal: 8,
        fontSize: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    summaryText: {
        fontSize: 16,
        color: '#333',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: '600',
    },
    totalRow: {
        borderTopWidth: 2,
        borderTopColor: '#E72C2C',
        marginTop: 10,
        paddingTop: 10,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E72C2C',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E72C2C',
    },
    checkoutButton: {
        backgroundColor: '#FFD700', 
        paddingVertical: 18,
        borderRadius: 10,
        marginBottom: 30,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
    },
    checkoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E72C2C',
    },
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

export default CarrinhoScreen;