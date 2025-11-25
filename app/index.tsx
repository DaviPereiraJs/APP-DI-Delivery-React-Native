import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router'; // Importação necessária para navegação

// Certifique-se de que o caminho para sua imagem está correto
const burgerImage = require('../app/assets/LogoInicialApp.png'); 

const PresentationScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Configura a barra de status com fundo vermelho e ícones claros */}
      <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 
      
      {/* Imagem do Hambúrguer */}
      <Image source={burgerImage} style={styles.burgerImage} />
      
      {/* Texto DI DELIVERY */}
      <Text style={styles.logoText}>DI DELIVERY</Text>
      
      {/* Botão Entrar, que agora navega para a tela '/login' */}
      <TouchableOpacity 
        style={styles.button}
        // Usamos 'router.replace' para que, ao fazer login, o usuário não possa voltar para esta tela de apresentação
        onPress={() => router.replace('./login')} 
      >
        <Text style={styles.buttonText}>Entre</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E72C2C', // Fundo vermelho
    alignItems: 'center',
    justifyContent: 'space-around', // Distribui os elementos verticalmente
    paddingVertical: 50,
  },
  burgerImage: {
    width: 250, 
    height: 200, 
    resizeMode: 'contain',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF', // Texto branco
    letterSpacing: 2,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFD700', // Botão amarelo
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 8,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E72C2C', // Texto vermelho no botão
    textTransform: 'uppercase',
  },
});

export default PresentationScreen;