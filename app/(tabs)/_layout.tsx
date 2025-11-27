import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// --- SEU COMPONENTE CUSTOMIZADO (Integrado aqui para funcionar) ---
function CustomDrawerContent(props: DrawerContentComponentProps) {
    
    // Caminho da imagem (Usando o local ./logo.png que já sabemos que funciona)
    const LOGO_PATH = require('../assets/LogoInicialApp.png'); 
    const USER_NAME = 'Davi';

    const handleLogout = () => {
        console.log('[AUTH] Usuário deslogado.');
        router.replace('/'); 
    };

    const HIDDEN_ROUTES = [
        'pagamento-pix', 
        'pagamento-dinheiro',  
        'confirmacao-pedido'// Carrinho também costuma ser ocultado do Drawer principal
    ];

    const filteredProps = {
        ...props,
        state: {
            ...props.state,
            routes: props.state.routes.filter(route => !HIDDEN_ROUTES.includes(route.name)),
        },
    };

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
                {/* Ícone de carrinho no menu */}
            </View>

            {/* --- Lista de Links (Home, Menu, Conta...) --- */}
            <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
                {/* O {...props} aqui é essencial para evitar o erro 'reading routes' */}
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
  return (
    <Drawer
      // AQUI ESTAVA O SEGREDO DO ERRO:
      // Precisamos passar '{...props}' para o componente customizado receber as rotas
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      
      screenOptions={{
        headerShown: false, // Esconde cabeçalho padrão
        drawerActiveTintColor: '#E72C2C', // Cor do ícone ativo
        drawerInactiveTintColor: '#333',  // Cor do ícone inativo
        drawerLabelStyle: {
            marginLeft: 8,
            fontWeight: 'bold',
        },
      }}
    >
        {/* Telas do Menu */}
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
        
        

        
        {/* Telas ocultas (mas registradas) */}
            
        <Drawer.Screen
            name="pagamento-pix"
            options={{
                title: 'Pagamento PIX',
               //  href: null, 
            }}
        />

        <Drawer.Screen
            name="pagamento-dinheiro"
            options={{
                title: 'Pagamento em Dinheiro',
                // href: null, 
            }}
        />
        {/* Se tiver telas como 'buscar', adicione aqui */}
    </Drawer>
  );
}

// --- SEUS ESTILOS ---
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
        marginLeft: 28, // Ajuste para alinhar com o texto dos itens padrão
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