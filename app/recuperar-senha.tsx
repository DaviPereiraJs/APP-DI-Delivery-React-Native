import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, StatusBar, ScrollView } from 'react-native';
import { router } from 'expo-router'; // Importa a função de navegação do Expo Router

// Certifique-se de que o caminho para sua imagem está correto
const burgerImage = require('../app/assets/imgLogo1.png'); 

const RecuperarSenhaScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRecover = () => {
    // 1. Verificar se as senhas são iguais
    if (newPassword !== confirmPassword) {
      console.log('Erro: As senhas não coincidem!');
      alert('As senhas não coincidem!'); // Alerta simples para feedback
      return;
    }
    
    console.log('Tentativa de Recuperar Senha para:', email);
    // 2. Lógica de recuperação real (API call)
    
    // Se bem-sucedido, volta para a tela de login
    alert('Senha redefinida com sucesso!');
    router.replace('./login'); 
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 
        
        <Image source={burgerImage} style={styles.burgerImage} />
        
        <Text style={styles.titleText}>Recuperar Senha</Text>

        {/* Campo E-mail (Para confirmar a conta) */}
        <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
        />
        
        {/* Campo Nova Senha */}
        <TextInput
            style={styles.input}
            placeholder="Nova Senha"
            placeholderTextColor="#999"
            secureTextEntry={true}
            value={newPassword}
            onChangeText={setNewPassword}
        />
        
        {/* Campo Confirmar Senha */}
        <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            placeholderTextColor="#999"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
        />

        {/* Botão Nova Senha Principal */}
        <TouchableOpacity 
            style={styles.recoverButton}
            onPress={handleRecover}
        >
            <Text style={styles.recoverButtonText}>Nova Senha</Text>
        </TouchableOpacity>

        {/* Voltar para Login */}
        <TouchableOpacity 
            style={styles.backToLogin}
            onPress={() => router.back()} // Volta para a tela anterior (Login)
        >
            <Text style={styles.linkText}>Voltar para Login</Text>
        </TouchableOpacity>
        
    </ScrollView>
  );
};

// --- Estilos (Reutiliza a maioria dos estilos das telas anteriores) ---
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#E72C2C', // Fundo vermelho
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
  },
  burgerImage: {
    width: 200, 
    height: 160, 
    resizeMode: 'contain',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF', 
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#D3D3D3', // Fundo cinza claro
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#000', 
  },
  recoverButton: {
    width: '80%',
    backgroundColor: '#FFD700', // Botão amarelo
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3, 
  },
  recoverButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E72C2C', // Texto vermelho no botão
    textTransform: 'uppercase',
  },
  backToLogin: {
    marginTop: 5,
  },
  linkText: {
    color: '#FFD700', // Texto amarelo para links
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default RecuperarSenhaScreen;