import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useRouter, useNavigation } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons'; 
import { DrawerActions } from '@react-navigation/native'; 

// --- INTERFACES DE TIPAGEM ---
interface MenuItemData {
    id: string;
    name: string;
    price: string;
    quantity: number;
}

interface MenuItemProps {
    item: MenuItemData;
}
// ----------------------------

// Dados de exemplo para os produtos na lista
const menuItems: MenuItemData[] = [
    { id: '1', name: 'A Moda da Casa', price: 'R$ 25,00', quantity: 0 },
    { id: '2', name: 'X-Tudão', price: 'R$ 20,00', quantity: 0 },
    { id: '3', name: 'X-Salada', price: 'R$ 10,00', quantity: 0 },
    { id: '4', name: 'X-Salada', price: 'R$ 5,00', quantity: 0 },
];

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
    
    return (
        <TouchableOpacity 
            style={menuStyles.menuItemContainer} 
            // onPress={() => router.push('/detalhe-produto')} 
        >
            {/* CORREÇÃO 1: Usando a imagem local ./logo.png */}
            <Image 
                source={require('../assets/LogoInicialApp.png')} 
                style={menuStyles.burgerImage} 
            />
            
            <View style={menuStyles.textContainer}>
                <Text style={menuStyles.itemName}>{item.name}</Text>
                <Text style={menuStyles.itemPrice}>{item.price}</Text>
            </View>

            <TouchableOpacity style={menuStyles.addButton}>
                <Ionicons name="add-circle-outline" size={30} color="#E72C2C" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const MenuScreen: React.FC = () => {
    const router = useRouter();
    const navigation = useNavigation(); 

    return (
        <View style={menuStyles.fullContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 

            {/* --- CABEÇALHO --- */}
            <View style={menuStyles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#000000ff" />
                </TouchableOpacity>
                
                {/* Botão Menu */}
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Ionicons name="menu" size={28} color="#000000ff" /> 
                </TouchableOpacity>
            </View>

            {/* --- IMAGEM DE DESTAQUE --- */}
            <Image 
                // CORREÇÃO 2: Usando a imagem local ./logo.png
                source={require('../assets/LogoInicialApp.png')} 
                style={menuStyles.bannerImage} 
            />
            <View style={menuStyles.overlayText}>
                <Text style={menuStyles.overlayTitle}>OS MELHORES LANCHES</Text>
                <Text style={menuStyles.overlaySubtitle}>VOCÊ ENCONTRA AQUI!</Text>
            </View>

            {/* --- CONTEÚDO DA LISTA --- */}
            <ScrollView style={menuStyles.listContainer}>
                
                <Text style={menuStyles.sectionTitle}>Hambúrgueres</Text>

                {menuItems.map(item => (
                    <MenuItem key={item.id} item={item} />
                ))}
                
            </ScrollView>

            {/* --- FOOTER/BOTÃO FLUTUANTE --- */}
            <TouchableOpacity 
                style={menuStyles.floatingButton}
                onPress={() => router.push('/carrinho')} 
            >
                <Text style={menuStyles.floatingButtonText}>Finalizar pedido? (2 itens)</Text>
            </TouchableOpacity>
        </View>
    );
};

// --- Estilos ---
const menuStyles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        backgroundColor: '#E72C2C',
        padding: 15,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bannerImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        opacity: 0.8, 
        backgroundColor: 'black'
    },
    overlayText: {
        position: 'absolute',
        top: 100,
        width: '100%',
        alignItems: 'center',
    },
    overlayTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffffff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    overlaySubtitle: {
        fontSize: 16,
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#E72C2C',
    },
    menuItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
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
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
        color: '#E72C2C',
        fontWeight: 'bold',
    },
    addButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 30, 
        width: '90%',
        alignSelf: 'center',
        borderRadius: 8,
        elevation: 5,
    },
    floatingButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E72C2C',
    }
});

export default MenuScreen;