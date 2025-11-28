import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// Dados de Exemplo do Produto
const PRODUCT_DATA = {
    id: '1',
    name: 'X-Bacon Supremo',
    description: 'Carne bovina de 180g grelhada na churrasqueira, fatias de bacon crocante, queijo cheddar derretido, cebola caramelizada e molho especial DI Delivery no pão brioche.',
    price: 25.00,
    ingredients: ['Pão Brioche', 'Carne 180g', 'Bacon', 'Queijo Cheddar', 'Cebola Caramelizada', 'Molho Especial'],
};

const DetalheProdutoScreen: React.FC = () => {
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        const total = (PRODUCT_DATA.price * quantity).toFixed(2);
        alert(`${quantity}x ${PRODUCT_DATA.name} (R$ ${total.replace('.', ',')}) adicionado ao carrinho!`);
        // Aqui você adicionaria a lógica para adicionar ao estado global do carrinho
        router.back(); // Volta para a tela anterior (Menu ou Home)
    };
    
    const totalPrice = (PRODUCT_DATA.price * quantity).toFixed(2).replace('.', ',');

    return (
        <View style={detailStyles.fullContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 

            {/* --- CABEÇALHO --- */}
            <View style={detailStyles.header}>
                <TouchableOpacity onPress={() => router.back()} style={detailStyles.iconButton}>
                    <Ionicons name="arrow-back" size={30} color="#000000ff"/>
                </TouchableOpacity>
                <Text style={detailStyles.logoText}>SOBRE O PRODUTO</Text>
                <TouchableOpacity onPress={() => router.replace('/(tabs)/carrinho')} style={detailStyles.iconButton}>
                    <Ionicons name="cart-outline" size={30} color="#000000ff" />
                </TouchableOpacity>
                
            </View>

            {/* --- CONTEÚDO PRINCIPAL --- */}
            <ScrollView style={detailStyles.content}>
                
                {/* Imagem do Produto */}
                <Image 
                    source={require('../assets/LogoInicialApp.png')} 
                    style={detailStyles.productImage} 
                />
                
                {/* Informações do Produto */}
                <View style={detailStyles.infoContainer}>
                    <Text style={detailStyles.productName}>{PRODUCT_DATA.name}</Text>
                    <Text style={detailStyles.productPrice}>R$ {PRODUCT_DATA.price.toFixed(2).replace('.', ',')}</Text>
                    
                    <Text style={detailStyles.sectionTitle}>Descrição:</Text>
                    <Text style={detailStyles.productDescription}>{PRODUCT_DATA.description}</Text>

                    <Text style={detailStyles.sectionTitle}>Ingredientes Principais:</Text>
                    <View style={detailStyles.ingredientsContainer}>
                        {PRODUCT_DATA.ingredients.map((item, index) => (
                            <View key={index} style={detailStyles.ingredientPill}>
                                <Text style={detailStyles.ingredientText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                    
                    {/* Seção de Opções/Customizações (Aqui ficariam checkboxes de opcionais) */}
                    <Text style={detailStyles.sectionTitle}>Opções (Adicionar Molho?)</Text>
                    <View style={detailStyles.optionRow}>
                         <Text style={detailStyles.optionLabel}>Maionese Extra</Text>
                         <Text style={detailStyles.optionExtra}>+ R$ 2,00</Text>
                         <Ionicons name="add-circle-outline" size={28} color="#E72C2C" />
                    </View>

                </View>

            </ScrollView>

            {/* --- FOOTER / ADICIONAR AO CARRINHO --- */}
            <View style={detailStyles.footer}>
                <View style={detailStyles.quantityControls}>
                    <TouchableOpacity onPress={decrementQuantity}>
                        <Ionicons name="remove-circle-outline" size={30} color="#E72C2C" />
                    </TouchableOpacity>
                    <Text style={detailStyles.quantityText}>{quantity}</Text>
                    <TouchableOpacity onPress={incrementQuantity}>
                        <Ionicons name="add-circle" size={30} color="#E72C2C" />
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                    style={detailStyles.addToCartButton}
                    onPress={handleAddToCart}
                >
                    <Text style={detailStyles.addToCartText}>Adicionar ao Carrinho</Text>
                    <Text style={detailStyles.addToCartTotal}>R$ {totalPrice}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Estilos ---
const detailStyles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#E72C2C',
        
    },
    header: {
        backgroundColor: '#E72C2C',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        paddingTop: 18,
        zIndex: 10, // Garante que o header fique acima da imagem
    },
    iconButton: {
    
        borderRadius: 20,
        padding: 6,
    },
     logoText: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000ff',
    },
    content: {
        flex: 1,
    },
    productImage: {
        backgroundColor: 'black',
        width: '100%',
        height: 300, // Altura grande para destaque
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 20,
        backgroundColor: '#FFF',
        // Cria um efeito de 'subir' sobre a imagem
       
        marginTop: -20, 
    },
    productName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#E72C2C',
    },
    productPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 15,
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingBottom: 5,
    },
    productDescription: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    // Estilos de Ingredientes (Pills)
    ingredientsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    ingredientPill: {
        backgroundColor: '#FFD700', // Amarelo
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    ingredientText: {
        fontSize: 14,
        color: '#E72C2C',
        fontWeight: 'bold',
    },
    // Estilos de Opções
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    optionLabel: {
        fontSize: 19,
        flex: 1,
    },
    optionExtra: {
        fontSize: 14,
        color: '#666',
        marginRight: 10,
    },
    // Footer (Adicionar ao Carrinho)
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        backgroundColor: '#FFF',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    addToCartButton: {
        backgroundColor: '#E72C2C', // Vermelho
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 13,
        borderRadius: 8,
        elevation: 3,
    },
    addToCartText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 10,
    },
    addToCartTotal: {
        backgroundColor: '#FFD700', // Amarelo
        padding: 5,
        borderRadius: 9,
        color: '#E72C2C',
        fontWeight: 'bold',
    },
});

export default DetalheProdutoScreen;