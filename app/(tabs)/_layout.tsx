import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// --- SEU COMPONENTE CUSTOMIZADO (Com Filtro Removido) ---
function CustomDrawerContent(props: DrawerContentComponentProps) {
    
    // Caminho da imagem (Ajuste o caminho se necessário)
    const LOGO_PATH = require('../assets/LogoInicialApp.png'); 
    const USER_NAME = 'Davi';

    const handleLogout = () => {
        console.log('[AUTH] Usuário deslogado.');
        router.replace('/'); 
    };

    // A LÓGICA DE FILTRO FOI REMOVIDA DAQUI PARA EVITAR ERROS NO DrawerItemList.

    return (
        <View style={drawerStyles.container}>
            {/* --- Cabeçalho do Menu --- */}
            <View style={drawerStyles.header}>
                <View style={drawerStyles.profileContainer}>
                    <Image 
                        source={LOGO_PATH} 
                        style={drawerStyles.profileImage} 
                    />
                    <Text style={drawerStyles.greetingText}>Olá, {USER_NAME}!</Text>
                </View>
            </View>

            {/* --- Lista de Links --- */}
            <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
                {/* O PROPS COMPLETO É PASSADO NOVAMENTE PARA EVITAR O ERRO 'KEY' */}
                <DrawerItemList {...props} /> 

                {/* --- Botão Sair --- */}
                <TouchableOpacity onPress={handleLogout} style={drawerStyles.logoutButton}>
                    <View style={drawerStyles.logoutRow}>
                        <Ionicons name="log-out-outline" size={24} color="#E72C2C" />
                        <Text style={drawerStyles.logoutText} onPress={() => router.push('/login')}>Sair da conta</Text>
                    </View>
                </TouchableOpacity>

                {/* --- Rodapé --- */}
                <View style={drawerStyles.footer}>
                    <Text style={drawerStyles.footerText}>DI DELIVERY</Text>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

// --- CONFIGURAÇÃO DO DRAWER (LAYOUT) ---
export default function DrawerLayout() {
    
    // Estilo que OCULTA visualmente o item do Drawer
    const HIDDEN_ITEM_STYLE = { height: 0, paddingVertical: 0, marginVertical: 0 };

    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            
            screenOptions={{
                headerShown: false, // Esconde cabeçalho padrão
                drawerActiveTintColor: '#E72C2C', // Cor do ícone ativo
                drawerInactiveTintColor: '#333',  // Cor do ícone inativo
                drawerLabelStyle: {
                    marginLeft: 8,
                    fontWeight: 'bold',
                },
            }}
        >
            {/* 1. TELAS DE NAVEGAÇÃO PRINCIPAL (Visíveis) */}
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: 'Início',
                    title: 'Início',
                    drawerIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="carrinho"
                options={{
                    drawerLabel: 'Meu Carrinho',
                    title: 'Carrinho',
                    drawerIcon: ({ color, size }) => <Ionicons name="cart-outline" color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="menu"
                options={{
                    drawerLabel: 'Cardápio',
                    title: 'Cardápio',
                    drawerIcon: ({ color, size }) => <Ionicons name="fast-food-outline" color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="minha-conta"
                options={{
                    drawerLabel: 'Minha Conta',
                    title: 'Perfil',
                    drawerIcon: ({ color, size }) => <Ionicons name="person-circle-outline" color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="buscar" // BUSCAR
                options={{
                    drawerLabel: 'Buscar',
                    title: 'Buscar',
                    drawerIcon: ({ color, size }) => <Ionicons name="search-outline" color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="historico" // HISTÓRICO
                options={{
                    drawerLabel: 'Histórico',
                    title: 'Histórico de Pedidos',
                    drawerIcon: ({ color, size }) => <Ionicons name="receipt-outline" color={color} size={size} />,
                }}
            />
            <Drawer.Screen
                name="adicionar-localizacao" // ADICIONAR LOCALIZAÇÃO (Visível)
                options={{
                    drawerLabel: 'Adicionar Localização',
                    title: 'Localização',
                    drawerIcon: ({ color, size }) => <Ionicons name="location-outline" color={color} size={size} />,
                }}
            />
            
            

            {/* 2. TELAS OCULTAS (Fluxo de Compra e Detalhes) */}

            <Drawer.Screen
                name="detalhe-produto" // OCULTO
                options={{
                    title: 'Detalhes do Produto',
                    // href: null,
                    drawerIcon: ({ color, size }) => <Ionicons name="eye-outline" color={color} size={size} />,
                    // OCULTA VISUALMENTE PARA NÃO QUEBRAR O DRAWER
                    // drawerItemStyle: HIDDEN_ITEM_STYLE,
                }}
            />

            <Drawer.Screen
                name="pagamento-pix" // OCULTO
                options={{
                    title: 'Pagamento PIX',
                   //  href: null,
                    // OCULTA VISUALMENTE PARA NÃO QUEBRAR O DRAWER
                    drawerItemStyle: HIDDEN_ITEM_STYLE,
                }}
            />

            <Drawer.Screen
                name="pagamento-dinheiro" // OCULTO
                options={{
                    title: 'Pagamento em Dinheiro',
                    // href: null,
                    // OCULTA VISUALMENTE PARA NÃO QUEBRAR O DRAWER
                    drawerItemStyle: HIDDEN_ITEM_STYLE,
                }}
            />
            
            <Drawer.Screen
                name="confirmacao-pedido" // OCULTO
                options={{
                    title: 'Confirmação de Pedido',
                   // href: null,
                    // OCULTA VISUALMENTE PARA NÃO QUEBRAR O DRAWER
                    drawerItemStyle: HIDDEN_ITEM_STYLE,
                }}
            />
        </Drawer>
    );
}

// --- SEUS ESTILOS --- (Mantidos)
const drawerStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        backgroundColor: '#FFF', 
        padding: 20,
        paddingTop: 50, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E72C2C', 
        resizeMode: 'contain',
        marginRight: 10,
    },
    greetingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E72C2C', 
    },
    logoutButton: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        marginTop: 10,
    },
    logoutRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 16,
        marginLeft: 28, 
        color: '#E72C2C',
        fontWeight: 'bold',
    },
    footer: {
        padding: 20,
        marginTop: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E72C2C',
    }
});