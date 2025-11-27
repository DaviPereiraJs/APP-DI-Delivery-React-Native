import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'; // useRouter é mais seguro que router solto
import { Ionicons } from '@expo/vector-icons'; 

// Dados de Exemplo do Usuário
const USER_NAME = 'Davi Nascimento';
const USER_EMAIL = 'davi.nascimento@gmail.com';
const USER_PHONE = '(88) 98152-2318';

// CORREÇÃO CRÍTICA: Usando a imagem local ./logo.png
const USER_ICON = require('../assets/LogoInicialApp.png'); 

// Definição da interface
interface SettingsItemProps {
    icon: keyof typeof Ionicons.glyphMap; 
    label: string;
    onPress: () => void;
}

// Componente de Item de Configuração
const SettingsItem: React.FC<SettingsItemProps> = ({ icon, label, onPress }) => (
    <TouchableOpacity style={contaStyles.settingItem} onPress={onPress}>
        <View style={contaStyles.itemLeft}>
            <Ionicons name={icon} size={24} color="#E72C2C" />
            <Text style={contaStyles.itemLabel}>{label}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
    </TouchableOpacity>
);

const MinhaContaScreen: React.FC = () => {
    const router = useRouter(); // Instância do router

    const handleEditProfile = () => {
        alert('Navegar para a tela de edição de perfil');
    };
    
    const handlePaymentMethods = () => {
        alert('Navegar para Métodos de Pagamento');
    };

    const handleAddresses = () => {
        alert('Navegar para Endereços Salvos');
    };

    return (
        <View style={contaStyles.fullContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" /> 

            {/* --- CABEÇALHO --- */}
            <View style={contaStyles.header}>
                <TouchableOpacity onPress={() => router.back()}> 
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={contaStyles.headerTitle}>Minha Conta</Text>
                <View style={{ width: 28 }} /> 
            </View>

            {/* --- CONTEÚDO PRINCIPAL --- */}
            <ScrollView contentContainerStyle={contaStyles.content}>
                
                {/* Seção de Perfil/Dados */}
                <View style={contaStyles.profileSection}>
                    {/* Imagem Local Corrigida */}
                    <Image source={USER_ICON} style={contaStyles.profileImage} />
                    <Text style={contaStyles.userName}>{USER_NAME}</Text>
                    <Text style={contaStyles.userEmail}>{USER_EMAIL}</Text>
                    <Text style={contaStyles.userPhone}>{USER_PHONE}</Text>
                    
                    <TouchableOpacity style={contaStyles.editButton} onPress={handleEditProfile}>
                        <Text style={contaStyles.editButtonText}>Editar Perfil</Text>
                    </TouchableOpacity>
                </View>

                {/* Seção de Opções/Configurações */}
                <View style={contaStyles.settingsSection}>
                    <Text style={contaStyles.sectionTitle}>Configurações da Conta</Text>

                    <SettingsItem 
                        icon="location-outline"
                        label="Meus Endereços"
                        onPress={() => router.replace('./adicionar-localização')} 
                    />
                    
                    <SettingsItem 
                        icon="receipt-outline"
                        label="Histórico de Pedidos"
                        onPress={() => router.push('./historico')} 
                    />

                    <SettingsItem 
                        icon="help-circle-outline"
                        label="Ajuda e Suporte"
                        onPress={() => alert('Navegar para Ajuda')}
                    />

                    <SettingsItem 
                        icon="document-text-outline"
                        label="Termos de Serviço"
                        onPress={() => alert('Navegar para Termos')}
                    />
                </View>

                {/* Botão de Logout */}
                <TouchableOpacity style={contaStyles.logoutButton} onPress={() => router.replace('/')}>
                    <Text style={contaStyles.logoutText}>Sair da Conta</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

// --- Estilos ---
const contaStyles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        paddingTop: 20,
        backgroundColor: '#E72C2C',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    content: {
        padding: 15,
    },
    profileSection: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E72C2C',
        resizeMode: 'contain',
        marginBottom: 10,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#E72C2C',
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    userPhone: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    editButton: {
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FFD700',
        backgroundColor: '#FFD700',
    },
    editButtonText: {
        color: '#E72C2C',
        fontWeight: 'bold',
    },
    settingsSection: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 15,
        color: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemLabel: {
        fontSize: 16,
        marginLeft: 15,
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#E72C2C',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 30,
    },
    logoutText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default MinhaContaScreen;