import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, StatusBar, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';

// SOLUÇÃO DEFINITIVA DE IMAGEM:
// Usamos uma URL da internet para o App nunca mais travar procurando arquivo local
const LOGO_URL = 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png';

const LoginScreen: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        // 1. Validação básica
        // if (!email || !password) {
        //    Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        //    return;
        // }

        setIsLoading(true);

        // 2. SIMULAÇÃO DE LOGIN (Para funcionar sem API por enquanto)
        setTimeout(() => {
            setIsLoading(false);
            console.log('Login autorizado. Entrando...');
            
            // 3. NAVEGAÇÃO PARA AS ABAS (HOME)
            // O replace impede que o usuário volte para o login ao apertar "Voltar"
            router.replace('/(tabs)'); 
            
        }, 1500); // Espera 1.5 segundos para simular carregamento
    };
    
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 
            
            {/* Imagem Online (Segura) */}
            <Image source={{ uri: LOGO_URL }} style={styles.burgerImage} />
            
            <Text style={styles.titleText}>Login</Text>
            
            {/* Campo E-mail */}
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={!isLoading}
            />
            
            {/* Campo Senha */}
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#666"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                editable={!isLoading}
            />

            {/* Botão Login Principal */}
            <TouchableOpacity 
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#E72C2C" />
                ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                )}
            </TouchableOpacity>

            {/* Opções de navegação secundárias */}
            <View style={styles.secondaryActions}>
                <Text style={styles.textWhite}>Ainda não tem conta? </Text>
                <TouchableOpacity onPress={() => router.push('/cadastro')} disabled={isLoading}>
                    <Text style={styles.linkText}>Cadastre-se já!</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                style={styles.forgotPassword}
                // Se não tiver a tela recuperar-senha, comente a linha abaixo
                // onPress={() => router.push('/recuperar-senha')}
                disabled={isLoading}
            >
                <Text style={styles.linkText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
            
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
        width: 150, 
        height: 150, 
        resizeMode: 'contain',
        marginBottom: 20,
    },
    titleText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF', 
        marginTop: 30,
        marginBottom: 10
    },
    input: {
        marginTop: 30,
        width: '80%',
        height: 60,
        backgroundColor: '#FFF', // Mudei para branco para ficar mais limpo
        borderRadius: 8,
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 20,
        color: '#000',
    },
    loginButton: {
        width: '80%',
        backgroundColor: '#FFD700', // Botão amarelo
        paddingVertical: 15,
        borderRadius: 8,
        marginTop: 30,
        marginBottom: 40,
        alignItems: 'center',
        elevation: 3, 
    },
    loginButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#E72C2C', // Texto vermelho no botão
        textTransform: 'uppercase',
    },
    secondaryActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
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
    forgotPassword: {
        marginTop: 5,
    }
});

export default LoginScreen;