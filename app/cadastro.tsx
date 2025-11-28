import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, StatusBar, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { registerUser } from '../api/auth'; // Importa a API simulada

// Certifique-se de que o caminho para sua imagem está correto
// const burgerImage = require('../app/assets/LogoInicialApp.png'); 
// const LOGO_URL = 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'
const burgerImage = require('../app/assets/imgLogo1.png'); 


const CadastroScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Novo estado de carregamento

  const handleCadastro = async () => {
    if (!name || !email || !password) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
    }

    setIsLoading(true);

    try {
        const result = await registerUser(name, email, password);

        if (result === true) {
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Faça login para continuar.');
            router.replace('/login'); 
        } else {
            // Exibe mensagem de erro da API simulada (email já existe, senha curta, etc.)
            Alert.alert('Erro no Cadastro', result);
        }
    } catch (error) {
        Alert.alert('Erro de Rede', 'Não foi possível conectar ao servidor. Tente novamente.');
    } finally {
        setIsLoading(false);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 
        
        <Image source={burgerImage} style={styles.burgerImage} />
        
        <Text style={styles.titleText}>Cadastro</Text>
        
        {/* Campos de Input */}
        <TextInput
            style={styles.input}
            placeholder="Seu Nome"
            placeholderTextColor="#999"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
            editable={!isLoading}
        />
        
        <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
        />
        
        <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
        />

        {/* Botão Cadastrar Principal */}
        <TouchableOpacity 
            style={styles.registerButton}
            onPress={handleCadastro}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator color="#E72C2C" />
            ) : (
                <Text style={styles.registerButtonText}>Cadastrar</Text>
            )}
        </TouchableOpacity>

        {/* Link para Login */}
        <View style={styles.secondaryActions}>
            <Text style={styles.textWhite}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => router.back()} disabled={isLoading}>
                <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
        </View>
        
    </ScrollView>
  );
};

// --- Estilos ---
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
    color: '#000', // Cor do texto digitado
  },
  registerButton: {
    width: '80%',
    backgroundColor: '#FFD700', // Botão amarelo
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3, 
  },
  registerButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E72C2C', // Texto vermelho no botão
    textTransform: 'uppercase',
  },
  secondaryActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWhite: {
    color: '#FFF',
    fontSize: 14,
  },
  linkText: {
    color: '#FFD700', // Texto amarelo para links
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default CadastroScreen;