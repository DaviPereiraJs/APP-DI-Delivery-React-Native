import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView, FlatList } from 'react-native';
import { useRouter, useNavigation } from 'expo-router'; // Adicionado useNavigation
import { Ionicons } from '@expo/vector-icons'; 
import { DrawerActions } from '@react-navigation/native'; // Necessário para abrir o menu

// --- INTERFACES DE TIPAGEM ---
interface BurgerData {
    id: string;
    name: string;
    price: string;
}

interface RenderItemProps {
    item: BurgerData;
}
// ----------------------------

// Dados de exemplo
const DUMMY_BURGERS: BurgerData[] = [
    { id: '1', name: 'X-Burguer Simples', price: 'R$ 15,00' },
    { id: '2', name: 'X-Salada Tradicional', price: 'R$ 18,00' },
    { id: '3', name: 'X-Bacon Especial', price: 'R$ 22,00' },
    { id: '4', name: 'X-Egg', price: 'R$ 16,00' },
];

const HomeScreen: React.FC = () => {
    const router = useRouter();
    const navigation = useNavigation(); // Hook para controlar o Drawer

    const renderItem = ({ item }: { item: BurgerData }) => (
        <TouchableOpacity 
            style={styles.productCard}
            // Se a tela de detalhe não existir, comente a linha abaixo para não travar
            // onPress={() => router.push('/(tabs)/detalhe-produto')} 
        >
            {/* CORREÇÃO: Usando a imagem local ./logo.png */}
            <Image source={require('../assets/LogoInicialApp.png')} style={styles.productImage} /> 
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.fullContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" /> 

            {/* --- NOVO CABEÇALHO COM BOTÃO MENU --- */}
            <View style={styles.topHeader}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Ionicons name="menu" size={30} color="#000000ff" />
                </TouchableOpacity>
                <Text style={styles.logoText}>DI DELIVERY</Text>
                <TouchableOpacity onPress={() => router.push('/carrinho')}>
                     <Ionicons name="cart-outline" size={28} color="#000000ff" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.contentContainer}>
                
                <Text style={styles.headerTitle}>Tudo pra facilitar o seu dia</Text>
                <Text style={styles.headerSubtitle}>Aquilo que você mais procura está aqui!</Text>
                
                {/* Seção dos círculos de hambúrguer */}
                <View style={styles.circleContainer}>
                    {DUMMY_BURGERS.slice(0, 5).map(burger => (
                        <View key={burger.id} style={styles.productCircle}>
                            {/* CORREÇÃO: Usando a imagem local ./logo.png */}
                            <Image source={require('../assets/imgPizza.png')} style={styles.circleImage} />
                        </View>
                    ))}
                </View>

                {/* Área de Busca e Localização */}
                <View style={styles.searchArea}>
                    <View style={styles.locationInput}>
                        <Ionicons name="location-outline" size={20} color="#E72C2C" />
                        <Text style={styles.locationText}>Buscar endereço de entrega</Text>
                    </View>
                    
                    <TouchableOpacity 
                        style={styles.searchButton}
                        onPress={() => router.push('/(tabs)/buscar')} 
                    >
                        <Text style={styles.searchButtonText}>Buscar</Text>
                    </TouchableOpacity>
                </View>

                {/* Seção PEÇA JÁ O SEU! */}
                <Text style={styles.sectionTitle}>PEÇA JÁ O SEU!</Text>

                {/* Listagem de Produtos */}
                <FlatList
                    data={DUMMY_BURGERS}
                    renderItem={renderItem} 
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    scrollEnabled={false} 
                />

                {/* Banner de Desconto */}
                <View style={styles.discountBanner}>
                    <Text style={styles.discountText}>50% de desconto na 1ª compra!</Text>
                </View>

            </ScrollView>

            {/* --- FOOTER/TAB BAR --- */}
            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem} onPress={() => router.replace('/(tabs)')}>
                    <Ionicons name="home" size={24} color="#FFD000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/(tabs)/buscar')}>
                    <Ionicons name="search-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/carrinho')}>
                    <Ionicons name="cart-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => router.push('/(tabs)/minha-conta')}>
                    <Ionicons name="person-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Estilos ---
const styles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    // Estilo novo para o Cabeçalho Superior
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: '#E72C2C',
        elevation: 2,
        color: '#000000ff'
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000ff',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    circleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
    },
    productCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E72C2C',
    },
    circleImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    searchArea: {
        marginVertical: 15,
        alignItems: 'center',
    },
    locationInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 25,
        padding: 10,
        width: '100%',
        marginBottom: 10,
    },
    locationText: {
        marginLeft: 10,
        color: '#999',
    },
    searchButton: {
        width: '100%',
        backgroundColor: '#E72C2C',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E72C2C',
        textAlign: 'center',
        marginVertical: 20,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    productCard: {
        width: '48%', 
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 3,
        alignItems: 'center',
        marginBottom: 5,
    },
    productImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 5,
        textAlign: 'center',
    },
    productPrice: {
        color: '#E72C2C',
        fontWeight: 'bold',
        marginTop: 2,
    },
    discountBanner: {
        backgroundColor: '#FFD700',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 20,
    },
    discountText: {
        color: '#E72C2C',
        fontWeight: 'bold',
        fontSize: 16,
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

export default HomeScreen;