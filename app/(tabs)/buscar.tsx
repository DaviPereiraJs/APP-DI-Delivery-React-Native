import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, ScrollView, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// --- INTERFACES ---
type IconName = keyof typeof Ionicons.glyphMap;

interface CategoryData {
    id: string;
    name: string;
    icon: IconName;
}

interface RestaurantData {
    id: string;
    name: string;
    rating: number;
    time: string;
    category: string;
}

interface ComponentProps<T> {
    item: T;
}

// --- DADOS (MOCK) ---
const popularCategories: CategoryData[] = [
    { id: '1', name: 'Hambúrgueres', icon: 'fast-food-outline' },
    { id: '2', name: 'Pizzas', icon: 'pizza-outline' },
    { id: '3', name: 'Japonesa', icon: 'restaurant-outline' },
    { id: '4', name: 'Sobremesas', icon: 'ice-cream-outline' },
    { id: '5', name: 'Brasileira', icon: 'leaf-outline' },
    // ✅ CORREÇÃO 1: Ícone válido (nutrition-outline) para não dar erro vermelho
    { id: '6', name: 'Lanches', icon: 'nutrition-outline' }, 
];

const searchResults: RestaurantData[] = [
    { id: 'r1', name: 'DI Delivery', rating: 4.9, time: '20-30 min', category: 'Lanches' },
    { id: 'r2', name: 'Mega Bacon House', rating: 4.5, time: '35-45 min', category: 'Hambúrgueres' },
    { id: 'r3', name: 'Rei do Hambúrguer', rating: 3.9, time: '15-25 min', category: 'Lanches' },
];

// --- COMPONENTES ---
const CategoryCard: React.FC<ComponentProps<CategoryData>> = ({ item }) => (
    <TouchableOpacity style={searchStyles.categoryCard}>
        <View style={searchStyles.iconCircle}>
            <Ionicons name={item.icon} size={24} color="#E72C2C" />
        </View>
        <Text style={searchStyles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
);

const RestaurantResult: React.FC<ComponentProps<RestaurantData>> = ({ item }) => (
    <TouchableOpacity style={searchStyles.resultCard}>
        <View style={searchStyles.resultIcon}>
             <Ionicons name="storefront-outline" size={24} color="#FFF" />
        </View>
        <View style={searchStyles.resultInfo}>
            <View style={searchStyles.resultHeader}>
                <Text style={searchStyles.restaurantName}>{item.name}</Text>
                <View style={searchStyles.ratingBox}>
                    <Ionicons name="star" size={10} color="#FFF" />
                    <Text style={searchStyles.ratingText}>{item.rating}</Text>
                </View>
            </View>
            <View style={searchStyles.resultFooter}>
                <Text style={searchStyles.resultCategory}>{item.category} • {item.time}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const BuscarScreen: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [isSearching, setIsSearching] = useState(false); 

    const handleSearch = () => {
        if (searchText.trim() === '') {
            setIsSearching(false);
        } else {
            setIsSearching(true);
        }
    };

    return (
        <View style={searchStyles.fullContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 

            {/* --- CABEÇALHO VERMELHO --- */}
            <View style={searchStyles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                
                <Text style={searchStyles.headerTitle}>BUSCAR</Text>

                <View style={{width: 28}} /> 
            </View>

            {/* --- CARD BRANCO ARREDONDADO --- */}
            <View style={searchStyles.whiteCard}>
                
                {/* INPUT DE BUSCA */}
                <View style={searchStyles.searchContainer}>
                    <Ionicons name="search" size={20} color="#999" style={{marginLeft: 15}} />
                    <TextInput
                        style={searchStyles.searchInput}
                        placeholder="O que vamos comer hoje?"
                        placeholderTextColor="#999"
                        value={searchText}
                        onChangeText={setSearchText}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />
                </View>

                <ScrollView 
                    style={searchStyles.content} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }} 
                >
                    
                    {/* RESULTADOS OU CATEGORIAS */}
                    {isSearching ? (
                        <View>
                            <Text style={searchStyles.sectionTitle}>Resultados para {searchText}</Text>
                            <FlatList
                                data={searchResults}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <RestaurantResult item={item} />}
                                scrollEnabled={false}
                                ListEmptyComponent={<Text style={searchStyles.emptyText}>Nenhum resultado encontrado.</Text>}
                            />
                        </View>
                    ) : (
                        <View>
                            <Text style={searchStyles.sectionTitle}>Categorias Populares</Text>
                            <FlatList
                                data={popularCategories}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <CategoryCard item={item} />}
                                numColumns={3}
                                columnWrapperStyle={searchStyles.categoryRow}
                                scrollEnabled={false}
                            />

                            <Text style={searchStyles.sectionTitle}>Sugestões para você</Text>
                            <FlatList
                                data={searchResults}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <RestaurantResult item={item} />}
                                scrollEnabled={false}
                            />
                        </View>
                    )}

                </ScrollView>
            </View>

            {/* --- BARRA FLUTUANTE --- */}
            <View style={searchStyles.floatingTabBar}>
                
                {/* 1. Início */}
                <TouchableOpacity style={searchStyles.tabItem} onPress={() => router.replace('/(tabs)')}>
                    <Ionicons name="home-outline" size={24} color="#fff" />
                    <Text style={searchStyles.tabLabel}>Início</Text>
                </TouchableOpacity>

                {/* 2. Buscar (ATIVO - AMARELO) */}
                <TouchableOpacity style={searchStyles.tabItem} onPress={() => {}}>
                    {/* Ícone Amarelo */}
                    <Ionicons name="search" size={24} color="#FFD700" />
                    {/* Texto Amarelo e Negrito */}
                    <Text style={[searchStyles.tabLabel, { color: '#FFD700', fontWeight: 'bold' }]}>Buscar</Text>
                </TouchableOpacity>

                {/* 3. Carrinho */}
                <TouchableOpacity 
                    style={searchStyles.centerTabItem} 
                    onPress={() => router.push('/carrinho')}
                    activeOpacity={0.9}
                >
                    <Ionicons name="cart" size={32} color="#E72C2C" />
                </TouchableOpacity>

                {/* 4. Menu */}
                <TouchableOpacity style={searchStyles.tabItem} onPress={() => router.push('/(tabs)/menu')}>
                    <Ionicons name="fast-food-outline" size={24} color="#fff" />
                    <Text style={searchStyles.tabLabel}>Menu</Text>
                </TouchableOpacity>

                {/* 5. Perfil */}
                <TouchableOpacity style={searchStyles.tabItem} onPress={() => router.push('/(tabs)/minha-conta')}>
                    <Ionicons name="person-outline" size={24} color="#fff" />
                    <Text style={searchStyles.tabLabel}>Perfil</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

// --- Estilos ---
const searchStyles = StyleSheet.create({
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
        paddingTop: 20,
        overflow: 'hidden',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        borderRadius: 15,
        height: 50,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        marginBottom: 10
    },
    searchInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#333'
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        marginTop: 15,
    },
    categoryRow: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    categoryCard: {
        width: '31%',
        height: 100,
        backgroundColor: '#FFF',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF0F0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    categoryText: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: '600',
        color: '#555',
    },
    resultCard: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        marginBottom: 12,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    resultIcon: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#E72C2C',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15
    },
    resultInfo: {
        flex: 1,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFD700',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 5,
    },
    ratingText: {
        marginLeft: 3,
        fontWeight: 'bold',
        color: '#78350F',
        fontSize: 12,
    },
    resultFooter: {
        marginTop: 5,
    },
    resultCategory: {
        color: '#999',
        fontSize: 13,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 16,
        color: '#666',
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

export default BuscarScreen;