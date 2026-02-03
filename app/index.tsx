import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  StatusBar, 
  ActivityIndicator,
  Dimensions,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { useAuth } from './contexts/auth'; 
import { Ionicons } from '@expo/vector-icons';

const burgerImage = require('../app/assets/logo.png'); 
const { width } = Dimensions.get('window');

export default function PresentationScreen() {
  const router = useRouter();
  const { user, loading } = useAuth(); 

  useEffect(() => {
    if (!loading && user) {
      router.replace('/(tabs)');
    }
  }, [user, loading]);

  if (loading) {
    return (
        <View style={styles.loadingContainer}>
             <ActivityIndicator size="large" color="#FFD700" />
        </View>
    );
  }

  if (user) return null;

  return (
    // CAMADA 1: Fundo Vermelho que ocupa a tela toda
    <View style={styles.backgroundContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 
      
      {/* CAMADA 2: O Conteúdo do App (Centralizado e com largura máxima no PC) */}
      <View style={styles.appContent}>
        
        {/* PARTE DE CIMA */}
        <View style={styles.topSection}>
           <View style={styles.imageCircleBackground}>
               <Image source={burgerImage} style={styles.burgerImage} />
           </View>
        </View>
        
        {/* PARTE DE BAIXO (Cartão) */}
        <View style={styles.bottomCard}>
           <View style={styles.contentArea}>
              <Text style={styles.logoText}>DI DELIVERY</Text>
              <Text style={styles.subtitleText}>
                  O sabor que você ama, entregue rápido e quentinho na sua porta.
              </Text>

              <TouchableOpacity 
                  style={styles.button}
                  onPress={() => router.push('/login')} 
                  activeOpacity={0.8}
              >
                  <Text style={styles.buttonText}>ENTRAR AGORA</Text>
                  <Ionicons name="arrow-forward" size={20} color="#E72C2C" style={{marginLeft: 10}} />
              </TouchableOpacity>

              <Text style={styles.footerText}>Versão 1.0.0</Text>
           </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 1. Container que pega a tela inteira (fundo vermelho)
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#E72C2C',
    alignItems: 'center', // Centraliza o app no meio da tela do PC
    justifyContent: 'center',
    width: '100%', // Força pegar a largura total
  },
  
  // 2. O App em si (Simula o tamanho de um celular no PC)
  appContent: {
    flex: 1,
    width: '100%',
    maxWidth: 500, // No PC, não deixa passar de 500px (fica parecendo um celular)
    backgroundColor: '#E72C2C', 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: Platform.OS === 'web' ? 0.3 : 0, // Sombra só no PC pra dar destaque
    shadowRadius: 20,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#E72C2C',
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  topSection: {
    flex: 0.55, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCircleBackground: {
    width: 280, 
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  burgerImage: {
    width: '100%', // Adapta ao tamanho do pai
    height: '100%',
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  bottomCard: {
    flex: 0.45, 
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 20,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  contentArea: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#E72C2C', 
    letterSpacing: 1,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: '#6B7280', 
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFD700', 
    width: '100%',
    height: 60,
    borderRadius: 30, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#78350F', 
    letterSpacing: 1,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 10
  }
});