import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Definição das informações do usuário de exemplo
const USER_NAME = 'Davi';
// CORREÇÃO DE CAMINHO: Deve ser o caminho correto da raiz
const LOGO_PATH = require('../assets/LogoInicialApp.png'); 

// Este componente é o conteúdo que aparece ao abrir o menu lateral
const CustomDrawerContent = (props: any) => {

    const handleLogout = () => {
        // Lógica de desautenticação real
        console.log('[AUTH MOCK] Usuário deslogado.');
        
        // NAVEGAÇÃO: Volta para a pilha de autenticação (Presentation Screen),
        // o que o _layout.tsx interpreta como desautenticação.
        router.replace('/'); 
    };

    return (
        <View style={drawerStyles.container}>
            {/* --- Seção do Cabeçalho do Drawer (Foto e Nome) --- */}
            <View style={drawerStyles.header}>
                <View style={drawerStyles.profileContainer}>
                    <Image 
                        source={LOGO_PATH} 
                        style={drawerStyles.profileImage} 
                    />
                    <Text style={drawerStyles.greetingText}>Olá, {USER_NAME}!</Text>
                </View>
                {/* Ícone de carrinho no topo do menu lateral */}
                <TouchableOpacity onPress={() => router.push('/carrinho')}>
                    <Ionicons name="cart-outline" size={28} color="#E72C2C" />
                </TouchableOpacity>
            </View>

            {/* --- Lista de Itens de Navegação Padrão --- */}
            <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
                {/* Renderiza todos os itens que você configurou no _layout.tsx (Home, Minha Conta, etc.) */}
                <DrawerItemList {...props} /> 

                {/* --- Ação de Sair da Conta (Ação separada) --- */}
                <TouchableOpacity onPress={handleLogout} style={drawerStyles.logoutButton}>
                    <View style={drawerStyles.logoutRow}>
                        <Ionicons name="log-out-outline" size={24} color="#E72C2C" />
                        <Text style={drawerStyles.logoutText}>Sair da conta</Text>
                    </View>
                </TouchableOpacity>

                {/* --- Rodapé (DI DELIVERY) --- */}
                <View style={drawerStyles.footer}>
                    <Text style={drawerStyles.footerText}>DI DELIVERY</Text>
                </View>
            </DrawerContentScrollView>
        </View>
    );
};

// --- Estilos ---
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
        marginTop: 'auto',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E72C2C',
    }
});

export default CustomDrawerContent;