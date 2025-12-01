import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, ScrollView, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// --- INTERFACES DE TIPAGEM ---
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
// ----------------------------------------------------

// Dados de Exemplo para Categorias Populares (Tipados)
const popularCategories: CategoryData[] = [
    { id: '1', name: 'Hambúrgueres', icon: 'fast-food-outline' as IconName },
    { id: '2', name: 'Pizzas', icon: 'pizza-outline' as IconName },
    { id: '3', name: 'Japonesa', icon: 'restaurant-outline' as IconName },
    { id: '4', name: 'Sobremesas', icon: 'ice-cream-outline' as IconName },
    { id: '5', name: 'Brasileira', icon: 'leaf-outline' as IconName },
    { id: '6', name: 'Lanches', icon: 'sandwich-outline' as IconName },
];

// Dados de Exemplo para Resultados de Busca (Mock)
const searchResults: RestaurantData[] = [
    { id: 'r1', name: 'DI Delivery', rating: 4.9, time: '20-30 min', category: 'Lanches' },
    { id: 'r2', name: 'Mega Bacon House', rating: 4.5, time: '35-45 min', category: 'Hambúrgueres' },
    { id: 'r3', name: 'Rei do Hambúrguer', rating: 3.9, time: '15-25 min', category: 'Lanches' },
];

// Componente para renderizar um card de categoria (Tipagem corrigida)
const CategoryCard: React.FC<ComponentProps<CategoryData>> = ({ item }) => (
    <TouchableOpacity style={searchStyles.categoryCard}>
        <Ionicons name={item.icon} size={30} color="#E72C2C" />
        <Text style={searchStyles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
);

// Componente para renderizar um resultado de restaurante (Tipagem corrigida)
const RestaurantResult: React.FC<ComponentProps<RestaurantData>> = ({ item }) => (
    <TouchableOpacity style={searchStyles.resultCard}>
        <View style={searchStyles.resultHeader}>
            <Text style={searchStyles.restaurantName}>{item.name}</Text>
            <View style={searchStyles.ratingBox}>
                <Ionicons name="star" size={14} color="#FFF" />
                <Text style={searchStyles.ratingText}>{item.rating}</Text>
            </View>
        </View>
        <View style={searchStyles.resultFooter}>
            <Text style={searchStyles.resultTime}>{item.time}</Text>
            <Text style={searchStyles.resultCategory}>{item.category}</Text>
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
            console.log('Buscando por:', searchText);
        }
    };

    return (
        <View style={searchStyles.fullContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" /> 

            {/* --- CABEÇALHO E BARRA DE BUSCA --- */}
            <View style={searchStyles.header}>

                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
                
                <Text style={searchStyles.sectionTitle1}>BUSCAR</Text>

              
                <TouchableOpacity style={searchStyles.searchIcon} onPress={handleSearch}>
                    <Ionicons name="search" size={24} color="#000000ff" />
                </TouchableOpacity>
            </View>

            {/* --- CONTEÚDO PRINCIPAL --- */}
            <ScrollView style={searchStyles.content}>
                
                {/* Seção de Resultados da Busca */}
                {isSearching ? (
                    <View>
                        <Text style={searchStyles.sectionTitle}>{`Resultados para "&{searchText}"`}</Text>
                        <FlatList
                            data={searchResults}
                            keyExtractor={item => item.id}
                            // CORREÇÃO FINAL: Usando Type Assertion no renderItem para forçar o tipo.
                            renderItem={({ item }) => <RestaurantResult item={item as RestaurantData} />}
                            scrollEnabled={false}
                            ListEmptyComponent={() => <Text style={searchStyles.emptyText}>Nenhum resultado encontrado.</Text>}
                        />
                    </View>
                ) : (
                    /* Seção de Categorias Populares (quando não está buscando) */
                    <View>

                          <TextInput
                    style={searchStyles.searchInput}
                    placeholder="Busque por pratos, restaurantes ou cozinhas..."
                    placeholderTextColor="#999"
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={handleSearch}
                />

                        <Text style={searchStyles.sectionTitle}>Categorias Populares</Text>
                        <FlatList
                            data={popularCategories}
                            keyExtractor={item => item.id}
                            // CORREÇÃO FINAL: Usando Type Assertion no renderItem para forçar o tipo.
                            renderItem={({ item }) => <CategoryCard item={item as CategoryData} />}
                            numColumns={3}
                            columnWrapperStyle={searchStyles.categoryRow}
                            scrollEnabled={false}
                        />

                        <Text style={searchStyles.sectionTitle}>Restaurantes Recomendados</Text>
                        <FlatList
                            data={searchResults}
                            keyExtractor={item => item.id}
                            // CORREÇÃO FINAL: Usando Type Assertion no renderItem para forçar o tipo.
                            renderItem={({ item }) => <RestaurantResult item={item as RestaurantData} />}
                            scrollEnabled={false}
                        />
                    </View>
                )}

            </ScrollView>

            {/* BARRA DE NAVEGAÇÃO INFERIOR */}
            <View style={searchStyles.tabBar}>
                {/* Home: '/(tabs)' é o caminho correto para o index */}
                <TouchableOpacity style={searchStyles.tabItem} onPress={() => router.replace('/(tabs)')}>
                    <Ionicons name="home-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={searchStyles.tabItem}>
                    <Ionicons name="search" size={24} color="#FFD700" /> {/* Ativo */}
                </TouchableOpacity>
                <TouchableOpacity style={searchStyles.tabItem} onPress={() => router.push('/(tabs)/carrinho')}>
                    <Ionicons name="cart-outline" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={searchStyles.tabItem} onPress={() => router.push('/(tabs)/minha-conta')}>
                    <Ionicons name="person-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Estilos ---
const searchStyles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingTop: 10,
        backgroundColor: '#E72C2C',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 13,
        padding: 20
    },
    searchIcon: {
        padding: 5,
    },
    content: {
        flex: 1,
        padding: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        marginTop: 20,
    },

     sectionTitle1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000ff',
        marginBottom: 10,
        marginTop: 5,
        marginLeft: 120,
        marginRight: 115
    },

    // Estilos de Categoria
    categoryRow: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    categoryCard: {
        width: '30%',
        height: 100,
        backgroundColor: '#F7F7F7',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    categoryText: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    // Estilos de Resultado
    resultCard: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#EEE',
        elevation: 1,
    },
    resultHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E72C2C',
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFD700', // Amarelo
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
    },
    ratingText: {
        marginLeft: 5,
        fontWeight: 'bold',
        color: '#E72C2C',
        fontSize: 14,
    },
    resultFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    resultTime: {
        color: '#666',
    },
    resultCategory: {
        color: '#999',
        fontSize: 12,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 30,
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

export default BuscarScreen;