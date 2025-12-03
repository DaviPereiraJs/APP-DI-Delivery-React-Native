import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 



// Dados de Exemplo do Usuário
const USER_NAME = 'Davi Nascimento';
const USER_EMAIL = 'davi.nascimento@gmail.com';
const USER_PHONE = '(88) 98152-2318';

// Imagem de Perfil do Usuário
const USER_ICON = require('../assets/Imagem do WhatsApp de 2025-11-25 à(s) 13.38.50_f195118b.jpg'); 

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
        // CORRIGIDO: Substituir alert() por uma navegação ou modal
        console.log('Navegar para a tela de edição de perfil');
    };
    
    // CORRIGIDO: Substituir alert() por uma navegação ou modal
    const handlePaymentMethods = () => {
        console.log('Navegar para Métodos de Pagamento');
    };

    // CORRIGIDO: Substituir alert() por uma navegação ou modal
    const handleAddresses = () => {
        console.log('Navegar para Endereços Salvos');
    };

    return (
        <View style={contaStyles.fullContainer}>
            {/* CORRIGIDO: BarStyle deve ser light-content pois o header é vermelho */}
            <StatusBar barStyle="light-content" backgroundColor="#E72C2C" /> 

            {/* --- CABEÇALHO --- */}
            <View style={contaStyles.header}>
                <TouchableOpacity onPress={() => router.back()}> 
                    {/* Ícone branco no fundo vermelho */}
                    <Ionicons name="arrow-back" size={28} color="#ffffffff" /> 
                </TouchableOpacity>

                {/* Título branco no fundo vermelho */}
                <Text style={contaStyles.headerTitle}>MINHA CONTA</Text> 
                <View style={{ width: 28}} /> 
                
            </View>

            {/* --- CONTEÚDO PRINCIPAL --- */}
            <ScrollView contentContainerStyle={contaStyles.content}>
                
                {/* Seção de Perfil/Dados */}
                <View style={contaStyles.profileSection}>
                    
                    {/* NOVO CONTÊINER ENVOLVENDO A IMAGEM PARA O EFEITO CIRCULAR */}
                    <View style={contaStyles.avatarWrapper}>
                        {/* Imagem Local Corrigida */}
                        <Image 
                            source={USER_ICON} 
                            style={contaStyles.profileImage} 
                            // ESSENCIAL: Garante que a imagem preencha o contêiner.
                            resizeMode="cover" 
                        />
                    </View>

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
                        onPress={() => router.push('/adicionar-localizacao')} 
                    />
                    
                    <SettingsItem 
                        icon="receipt-outline"
                        label="Histórico de Pedidos"
                        onPress={() => router.push('./historico')} 
                    />

                    <SettingsItem 
                        icon="help-circle-outline"
                        label="Ajuda e Suporte"
                        onPress={() => console.log('Navegar para Ajuda')}
                    />

                    <SettingsItem 
                        icon="document-text-outline"
                        label="Termos de Serviço"
                        onPress={() => console.log('Navegar para Termos')}
                    />
                </View>

                {/* Botão de Logout */}
                <TouchableOpacity style={contaStyles.logoutButton} onPress={() => router.replace('/login')}>
                    <Text style={contaStyles.logoutText}>Sair da Conta</Text>
                </TouchableOpacity>

            </ScrollView>

         <View style={contaStyles.tabBar}>
                        <TouchableOpacity style={contaStyles.tabItem} onPress={() => router.replace('/(tabs)')}>
                            <Ionicons name="home" size={24} color="#edededff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={contaStyles.tabItem} onPress={() => router.push('/(tabs)/buscar')}>
                            <Ionicons name="search-outline" size={24} color="#ffffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={contaStyles.tabItem} onPress={() => router.push('/carrinho')}>
                            <Ionicons name="cart-outline" size={24} color="#ffffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={contaStyles.tabItem} onPress={() => router.push('/(tabs)/minha-conta')}>
                            <Ionicons name="person-outline" size={24} color="#FFD700" />
                        </TouchableOpacity>
                    </View>

        </View>
    );
};

// --- Estilos ---
const AVATAR_SIZE = 80;

const contaStyles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: '#E72C2C',
        elevation: 2,
        color: '#000000ff'
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000ff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        // CORRIGIDO: Usar paddingTop condicionalmente em produção ou Expo SDK 50+
        paddingTop: 20, // Ajuste para acomodar a StatusBar
        backgroundColor: '#E72C2C', // Fundo vermelho
        // Removido borderBottom para visual limpo
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffffff', // Título branco
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
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    // NOVO ESTILO: Contêiner do Círculo Vermelho (o aro)
    avatarWrapper: {
        width: AVATAR_SIZE + 10, // Um pouco maior que a imagem para fazer o aro
        height: AVATAR_SIZE + 10,
        borderRadius: (AVATAR_SIZE + 10) / 2,
        backgroundColor: '#E72C2C', // Cor do aro vermelho
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        overflow: 'hidden', // ESSENCIAL: Garante que a borda da imagem seja cortada
    },
    profileImage: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2, 
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
        // CORRIGIDO: Não precisa de borderWidth se o fundo é a mesma cor da borda
        backgroundColor: '#E72C2C', 
    },
    editButtonText: {
        color: '#ffffffff',
        fontWeight: 'bold',
    },
    settingsSection: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
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
        elevation: 3,
        shadowColor: '#E72C2C',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    logoutText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    tabBar: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#E72C2C',
        borderTopWidth: 1,
        borderTopColor: '#DDD',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MinhaContaScreen;