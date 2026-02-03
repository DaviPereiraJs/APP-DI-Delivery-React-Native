import { useEffect } from 'react';
import { LogBox, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { AuthProvider } from './contexts/auth';

export default function RootLayout() {

  useEffect(() => {
    // 1. Silencia o aviso chato "GO_BACK" que só aparece em desenvolvimento
    LogBox.ignoreLogs([
      'The action \'GO_BACK\' was not handled',
      'The action \'POP\' was not handled',
    ]);
  }, []);

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="index" /> 
        <Stack.Screen name="login" /> 
        
        {/* 2. Configuração Híbrida (Web e Mobile) */}
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            // Bloqueia o gesto de voltar no iPhone/Android para não quebrar a navegação
            gestureEnabled: false, 
            // Garante que não tenha animação estranha na Web
            animation: Platform.OS === 'web' ? 'none' : 'default'
          }} 
        /> 
      </Stack>
    </AuthProvider>
  );
}