import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  StatusBar, 
  ScrollView, 
  ActivityIndicator, 
  Alert,
  Platform // Importante para o alerta na Web
} from 'react-native';
import { router } from 'expo-router';

// --- 1. NOVAS IMPORTAÇÕES DO FIREBASE ---
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConfig'; // Verifique se o caminho ".." está certo

// Certifique-se de que o caminho para sua imagem está correto
const burgerImage = require('../app/assets/imgLogo1.png'); 

const CadastroScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- 2. ALERTAS QUE FUNCIONAM NA WEB E NO CELULAR ---
  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleCadastro = async () => {
    if (!name || !email || !password) {
        return showAlert('Erro', 'Por favor, preencha todos os campos.');
    }

    setIsLoading(true);

    try {
        // PASSO A: Cria o usuário no Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // PASSO B: Atualiza o nome do perfil
        await updateProfile(user, { displayName: name });

        // PASSO C: Salva os dados no Banco de Dados (Firestore)
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            role: "cliente",
            createdAt: new Date().toISOString(),
        });

        showAlert('Sucesso', 'Cadastro realizado! Bem-vindo.');
        
        // Redireciona direto para o App (não precisa fazer login de novo)
        router.replace('/(tabs)'); 

    } catch (error: any) {
        console.log("Erro Cadastro:", error.code);
        
        const code = error.code;
        if (code === 'auth/email-already-in-use') {
            showAlert('Erro', 'Este e-mail já está cadastrado.');
        } else if (code === 'auth/weak-password') {
            showAlert('Senha Fraca', 'A senha deve ter pelo menos 6 caracteres.');
        } else if (code === 'auth/invalid-email') {
            showAlert('Erro', 'Formato de e-mail inválido.');
        } else {
            showAlert('Erro', 'Não foi possível cadastrar. Tente novamente.');
        }
    } finally {
        setIsLoading(false);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 
        
        <Image source={burgerImage} style={styles.burgerImage} />
        
        <Text style={styles.titleText}>CADASTRO</Text>
        
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

// --- Estilos (Mantidos Iguais) ---
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#E72C2C', 
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
    backgroundColor: '#fffefeff', 
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#000', 
  },
  registerButton: {
    width: '80%',
    backgroundColor: '#FFD700', 
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
    color: '#E72C2C', 
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
    color: '#FFD700', 
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default CadastroScreen;