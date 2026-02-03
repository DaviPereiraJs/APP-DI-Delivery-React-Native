import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

// ✅ CORREÇÃO 1: Ajuste do caminho da importação (subindo 2 níveis para garantir)
import { useAuth } from '../contexts/auth';

// Componente de Item de Menu (Lista)
interface SettingsItemProps {
    icon: keyof typeof Ionicons.glyphMap; 
    label: string;
    onPress: () => void;
    color?: string;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, label, onPress, color = "#E72C2C" }) => (
    <TouchableOpacity style={contaStyles.settingItem} onPress={onPress}>
        <View style={contaStyles.itemLeft}>
            <View style={contaStyles.iconContainer}>
                <Ionicons name={icon} size={22} color={color} />
            </View>
            <Text style={[contaStyles.itemLabel, { color: color === "#E72C2C" ? "#333" : color }]}>
                {label}
            </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#CCC" />
    </TouchableOpacity>
);

const MinhaContaScreen: React.FC = () => {
    const router = useRouter();
    const { user, logout } = useAuth(); 

    // Pega os dados reais ou usa o placeholder se estiver carregando
    const displayName = user?.displayName || "Cliente VIP";
    const displayEmail = user?.email || "email@didelivery.com";

    // ✅ LÓGICA DE LOGOUT FUNCIONAL
    const handleLogout = async () => {
        // Função para executar o logout
        const performLogout = async () => {
            try {
                await logout(); // Limpa Firebase e AsyncStorage
                router.replace('/login'); // Redireciona para login (sem botão de voltar)
            } catch (error) {
                console.error("Erro ao sair:", error);
                Alert.alert("Erro", "Não foi possível sair da conta.");
            }
        };

        // Verifica se é Web ou Celular para mostrar o alerta correto
        if (Platform.OS === 'web') {
            if (window.confirm("Deseja realmente sair da sua conta?")) {
                performLogout();
            }
        } else {
            Alert.alert("Sair", "Deseja realmente sair da sua conta?", [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Sair", 
                    style: "destructive",
                    onPress: performLogout
                }
            ]);
        }
    };

    return (
        <View style={contaStyles.fullContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 

            {/* --- CABEÇALHO --- */}
            <View style={contaStyles.header}>
                <TouchableOpacity onPress={() => router.back()}> 
                    <Ionicons name="arrow-back" size={28} color="#fff" /> 
                </TouchableOpacity>

                <Text style={contaStyles.headerTitle}>MEU PERFIL</Text> 
                
                <View style={{ width: 28}} /> 
            </View>

            {/* --- CONTEÚDO (CARD BRANCO) --- */}
            <View style={contaStyles.whiteCard}>
                <ScrollView contentContainerStyle={contaStyles.content} showsVerticalScrollIndicator={false}>
                    
                    {/* PERFIL */}
                    <View style={contaStyles.profileHeader}>
                        <View style={contaStyles.avatarWrapper}>
                            <Image 
                                source={require('../assets/logo.png')} 
                                style={contaStyles.profileImage} 
                                resizeMode="cover" 
                            />
                            <View style={contaStyles.editIconBadge}>
                                <Ionicons name="camera" size={14} color="#FFF" />
                            </View>
                        </View>

                        <Text style={contaStyles.userName}>{displayName}</Text>
                        <Text style={contaStyles.userEmail}>{displayEmail}</Text>
                        
                        <TouchableOpacity style={contaStyles.editProfileButton}>
                            <Text style={contaStyles.editProfileText}>Editar Dados</Text>
                        </TouchableOpacity>
                    </View>

                    {/* OPÇÕES */}
                    <Text style={contaStyles.sectionTitle}>Minha Conta</Text>
                    <View style={contaStyles.settingsList}>
                        <SettingsItem icon="location-outline" label="Meus Endereços" onPress={() => router.push('/adicionar-localizacao')} />
                        <SettingsItem icon="receipt-outline" label="Meus Pedidos" onPress={() => router.push('./historico')} />
                        <SettingsItem icon="wallet-outline" label="Formas de Pagamento" onPress={() => {}} />
                    </View>

                    <Text style={contaStyles.sectionTitle}>Suporte</Text>
                    <View style={contaStyles.settingsList}>
                        <SettingsItem icon="help-circle-outline" label="Ajuda e Suporte" onPress={() => {}} />
                        {/* Botão Sair com a função corrigida */}
                        <SettingsItem icon="log-out-outline" label="Sair da Conta" color="#E72C2C" onPress={handleLogout} />
                    </View>
                    
                    <View style={{height: 120}} />
                </ScrollView>
            </View>

            {/* --- BARRA FLUTUANTE --- */}
            <View style={contaStyles.floatingTabBar}>
                <TouchableOpacity style={contaStyles.tabItem} onPress={() => router.replace('/(tabs)')}>
                    <Ionicons name="home-outline" size={24} color="#fff" />
                    <Text style={contaStyles.tabLabel}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={contaStyles.tabItem} onPress={() => router.push('/(tabs)/buscar')}>
                    <Ionicons name="search-outline" size={24} color="#fff" />
                    <Text style={contaStyles.tabLabel}>Buscar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={contaStyles.centerTabItem} 
                    onPress={() => router.push('/carrinho')}
                    activeOpacity={0.9}
                >
                    <Ionicons name="cart" size={32} color="#E72C2C" />
                </TouchableOpacity>

                <TouchableOpacity style={contaStyles.tabItem} onPress={() => router.push('/(tabs)/menu')}>
                    <Ionicons name="fast-food-outline" size={24} color="#fff" />
                    <Text style={contaStyles.tabLabel}>Menu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={contaStyles.tabItem} onPress={() => {}}>
                    <Ionicons name="person" size={24} color="#fff" />
                    <Text style={[contaStyles.tabLabel, { fontWeight: 'bold' }]}>Perfil</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Estilos ---
const AVATAR_SIZE = 100;

const contaStyles = StyleSheet.create({
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
        backgroundColor: '#F2F2F2', 
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        overflow: 'hidden',
    },
    content: {
        padding: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10
    },
    avatarWrapper: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 4,
        borderColor: '#FFF',
        elevation: 5,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: AVATAR_SIZE / 2,
    },
    editIconBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#FFD700',
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FFF'
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    userEmail: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },
    editProfileButton: {
        marginTop: 15,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    editProfileText: {
        color: '#333',
        fontWeight: '600',
        fontSize: 13
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#9CA3AF',
        textTransform: 'uppercase',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5
    },
    settingsList: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        paddingHorizontal: 5,
        marginBottom: 20,
        elevation: 2,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 35,
        alignItems: 'center'
    },
    itemLabel: {
        fontSize: 16,
        marginLeft: 10,
        fontWeight: '500',
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
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

export default MinhaContaScreen;