import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView, Alert } from 'react-native'; 
import { router, useNavigation } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native'; 

// --- INTERFACES ---
interface CartItemData {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

// Dados iniciais (Simulando o Banco de Dados)
const INITIAL_ITEMS: CartItemData[] = [
    { id: '1', name: 'A Moda da Casa', price: 25.00, quantity: 1 },
    { id: '2', name: 'X-Tudão', price: 20.00, quantity: 1 },
];

const TAXA_ENTREGA = 5.00;

export default function CarrinhoScreen() {
    const navigation = useNavigation(); 
    
    // Estados
    const [cartItems, setCartItems] = useState<CartItemData[]>(INITIAL_ITEMS);
    const [subTotal, setSubTotal] = useState(0);
    const [totalFinal, setTotalFinal] = useState(0);

    // --- CÁLCULO AUTOMÁTICO ---
    useEffect(() => {
        const novoSubTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setSubTotal(novoSubTotal);
        setTotalFinal(novoSubTotal + TAXA_ENTREGA);
    }, [cartItems]);

    // --- FUNÇÕES DE CONTROLE ---
    const increaseQuantity = (id: string) => {
        setCartItems(currentItems => 
            currentItems.map(item => 
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id: string) => {
        setCartItems(currentItems => {
            return currentItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: Math.max(1, item.quantity - 1) };
                }
                return item;
            });
        });
    };

    const removeItem = (id: string) => {
        Alert.alert("Remover", "Deseja tirar este item do carrinho?", [
            { text: "Não" },
            { 
                text: "Sim", 
                onPress: () => setCartItems(items => items.filter(item => item.id !== id)) 
            }
        ]);
    };

    return (
        <View style={cartStyles.fullContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#E72C2C" />

            {/* --- CABEÇALHO VERMELHO --- */}
            <View style={cartStyles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                
                <Text style={cartStyles.headerTitle}>MEU CARRINHO</Text>
                
                {/* Botão Menu Lateral */}
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Ionicons name="menu" size={30} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* --- CARD BRANCO ARREDONDADO --- */}
            <View style={cartStyles.whiteCard}>
                <ScrollView 
                    style={cartStyles.listContainer}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }} // Espaço para a barra flutuante
                >
                    
                    {cartItems.length === 0 ? (
                        <View style={cartStyles.emptyContainer}>
                            <Ionicons name="cart-outline" size={80} color="#DDD" />
                            <Text style={cartStyles.emptyText}>Seu carrinho está vazio.</Text>
                            <TouchableOpacity onPress={() => router.push('/(tabs)/menu')}>
                                <Text style={cartStyles.linkText}>Ir para o Cardápio</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        // Lista de Itens
                        <View>
                            {cartItems.map(item => (
                                <View key={item.id} style={cartStyles.cartItemContainer}>
                                    {/* Imagem do Produto */}
                                    <Image
                                        source={require('../assets/logo.png')} 
                                        style={cartStyles.burgerImage}
                                    />
                                    
                                    {/* Info e Controles */}
                                    <View style={cartStyles.itemContent}>
                                        <View style={cartStyles.itemTopRow}>
                                            <Text style={cartStyles.itemName}>{item.name}</Text>
                                            <TouchableOpacity onPress={() => removeItem(item.id)}>
                                                <Ionicons name="trash-outline" size={20} color="#EF4444" />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={cartStyles.itemBottomRow}>
                                            <Text style={cartStyles.itemPrice}>R$ {item.price.toFixed(2).replace('.', ',')}</Text>
                                            
                                            {/* Botões + e - */}
                                            <View style={cartStyles.quantityControls}>
                                                <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={cartStyles.qtyBtn}>
                                                    <Ionicons name="remove" size={18} color="#E72C2C" />
                                                </TouchableOpacity>
                                                
                                                <Text style={cartStyles.quantityText}>{item.quantity}</Text>
                                                
                                                <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={cartStyles.qtyBtn}>
                                                    <Ionicons name="add" size={18} color="#E72C2C" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}

                            {/* RESUMO DE VALORES */}
                            <View style={cartStyles.summaryContainer}>
                                <View style={cartStyles.summaryRow}>
                                    <Text style={cartStyles.summaryText}>Subtotal</Text>
                                    <Text style={cartStyles.summaryValue}>R$ {subTotal.toFixed(2).replace('.', ',')}</Text>
                                </View>
                                
                                <View style={cartStyles.summaryRow}>
                                    <Text style={cartStyles.summaryText}>Taxa de entrega</Text>
                                    <Text style={cartStyles.summaryValue}>R$ {TAXA_ENTREGA.toFixed(2).replace('.', ',')}</Text>
                                </View>
                                
                                <View style={cartStyles.divider} />

                                <View style={cartStyles.totalRow}>
                                    <Text style={cartStyles.totalLabel}>TOTAL</Text>
                                    <Text style={cartStyles.totalValue}>R$ {totalFinal.toFixed(2).replace('.', ',')}</Text>
                                </View>
                            </View>

                            {/* BOTÃO DE PAGAMENTO */}
                            <TouchableOpacity
                                style={cartStyles.checkoutButton}
                                onPress={() => router.push('/pagamento-pix')}
                                activeOpacity={0.8}
                            >
                                <Text style={cartStyles.checkoutButtonText}>FINALIZAR COMPRA</Text>
                                <Ionicons name="arrow-forward" size={24} color="#78350F" />
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </View>

            {/* --- BARRA FLUTUANTE (Padronizada) --- */}
            <View style={cartStyles.floatingTabBar}>
                <TouchableOpacity style={cartStyles.tabItem} onPress={() => router.replace('/(tabs)')}>
                    <Ionicons name="home-outline" size={24} color="#fff" />
                    <Text style={cartStyles.tabLabel}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={cartStyles.tabItem} onPress={() => router.push('/(tabs)/buscar')}>
                    <Ionicons name="search-outline" size={24} color="#fff" />
                    <Text style={cartStyles.tabLabel}>Buscar</Text>
                </TouchableOpacity>

                {/* Ícone Central Ativo (Carrinho) */}
                <TouchableOpacity 
                    style={cartStyles.centerTabItem} 
                    onPress={() => {}} // Já estamos na tela
                    activeOpacity={1}
                >
                    <Ionicons name="cart" size={32} color="#E72C2C" />
                </TouchableOpacity>

                <TouchableOpacity style={cartStyles.tabItem} onPress={() => router.push('/(tabs)/menu')}>
                    <Ionicons name="fast-food-outline" size={24} color="#fff" />
                    <Text style={cartStyles.tabLabel}>Menu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={cartStyles.tabItem} onPress={() => router.push('/(tabs)/minha-conta')}>
                    <Ionicons name="person-outline" size={24} color="#fff" />
                    <Text style={cartStyles.tabLabel}>Perfil</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

// --- Estilos ---
const cartStyles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#E72C2C', // Fundo Vermelho
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
        color: '#fff',
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: 1,
        fontStyle: 'italic'
    },
    // O Card Branco Principal
    whiteCard: {
        flex: 1,
        backgroundColor: '#F9FAFB', 
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        overflow: 'hidden',
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        opacity: 0.6
    },
    emptyText: {
        fontSize: 18,
        marginTop: 15,
        fontWeight: 'bold',
        color: '#333'
    },
    linkText: {
        color: '#E72C2C',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    // Item do Carrinho
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    burgerImage: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
        backgroundColor: '#FFF0F0',
        borderRadius: 12
    },
    itemContent: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
        height: 70
    },
    itemTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
        width: '85%'
    },
    itemBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E72C2C'
    },
    // Botões + e -
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        padding: 2
    },
    qtyBtn: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: 14,
        elevation: 1
    },
    quantityText: {
        marginHorizontal: 12,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333'
    },
    // Resumo
    summaryContainer: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        marginTop: 10,
        marginBottom: 20,
        elevation: 2
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryText: {
        fontSize: 15,
        color: '#6B7280',
    },
    summaryValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333'
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 10
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '900',
        color: '#1F2937',
    },
    totalValue: {
        fontSize: 22,
        fontWeight: '900',
        color: '#E72C2C',
    },
    // Botão Finalizar
    checkoutButton: {
        backgroundColor: '#FFD700', 
        paddingVertical: 16,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom: 20
    },
    checkoutButtonText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#78350F',
        letterSpacing: 0.5,
        marginRight: 10
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
        borderColor: '#F2F2F2', // Borda da cor do fundo
        elevation: 5
    }
});