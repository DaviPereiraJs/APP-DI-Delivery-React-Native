import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- IMPORTAÇÃO DO FIREBASE ---
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig"; 

interface MenuItemData {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  imagem_url?: string;
}

const MenuScreen: React.FC = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [products, setProducts] = useState<MenuItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const list: MenuItemData[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        list.push({
          id: doc.id,
          nome: data.name || data.nome || "Produto sem nome",
          descricao: data.description || data.descricao || "Sem descrição",
          preco: Number(data.price || data.preco || 0),
          imagem_url: data.image_url || data.imagem_url || null,
        });
      });
      setProducts(list);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={menuStyles.fullContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#E72C2C" />

      {/* --- CABEÇALHO VERMELHO --- */}
      <View style={menuStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        
        <Text style={menuStyles.headerTitle}>CARDÁPIO</Text>
        
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* --- CARD BRANCO ARREDONDADO --- */}
      <View style={menuStyles.whiteCard}>
        
        {loading ? (
           <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
             <ActivityIndicator size="large" color="#E72C2C" />
             <Text style={{marginTop: 10, color: '#999'}}>Carregando delícias...</Text>
           </View>
        ) : (
           <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
             
             {/* BANNER DENTRO DO CARD */}
             <View style={menuStyles.bannerContainer}>
               <Image
                 source={require("../assets/logo.png")} // Ajuste se quiser usar imgLogo1.png
                 style={menuStyles.bannerImage}
               />
               <View style={menuStyles.overlayText}>
                 <Text style={menuStyles.overlayTitle}>OS MELHORES LANCHES</Text>
                 <Text style={menuStyles.overlaySubtitle}>VOCÊ ENCONTRA AQUI!</Text>
               </View>
             </View>

             <Text style={menuStyles.sectionTitle}>Hambúrgueres</Text>

             {products.length === 0 && (
                <View style={menuStyles.emptyState}>
                   <Ionicons name="fast-food-outline" size={50} color="#DDD" />
                   <Text style={{ textAlign: "center", color: "#999", marginTop: 10 }}>
                     Nenhum produto encontrado.
                   </Text>
                </View>
             )}

             {products.map((item) => (
               <TouchableOpacity
                 key={item.id}
                 style={menuStyles.menuItemContainer}
                 activeOpacity={0.7}
               >
                 {/* IMAGEM DO PRODUTO */}
                 <Image
                   source={
                     item.imagem_url
                       ? { uri: item.imagem_url }
                       : require("../assets/logo.png")
                   }
                   style={menuStyles.burgerImage}
                 />
                 
                 {/* TEXTOS */}
                 <View style={menuStyles.textContainer}>
                   <Text style={menuStyles.itemName}>{item.nome}</Text>
                   <Text style={menuStyles.itemDesc} numberOfLines={2}>
                     {item.descricao}
                   </Text>
                   <Text style={menuStyles.itemPrice}>
                     R$ {item.preco.toFixed(2).replace(".", ",")}
                   </Text>
                 </View>

                 {/* BOTÃO ADICIONAR (+) */}
                 <TouchableOpacity style={menuStyles.addButton}>
                   <Ionicons name="add-circle" size={35} color="#E72C2C" />
                 </TouchableOpacity>
               </TouchableOpacity>
             ))}
           </ScrollView>
        )}

        {/* --- BOTÃO FLUTUANTE DOURADO --- */}
        {!loading && (
          <View style={menuStyles.floatingButtonContainer}>
             <TouchableOpacity
               style={menuStyles.floatingButton}
               onPress={() => router.push("/carrinho")}
               activeOpacity={0.9}
             >
               <Text style={menuStyles.floatingButtonText}>VER CARRINHO</Text>
               <View style={menuStyles.iconContainer}>
                  <Ionicons name="cart" size={20} color="#78350F" />
               </View>
             </TouchableOpacity>
          </View>
        )}

      </View>
    </View>
  );
};

const menuStyles = StyleSheet.create({
  fullContainer: { 
    flex: 1, 
    backgroundColor: "#E72C2C" // 1. Fundo Vermelho
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { 
    color: "#fff", 
    fontSize: 22, 
    fontWeight: "900", 
    fontStyle: 'italic',
    letterSpacing: 1
  },
  // 2. Card Branco Arredondado
  whiteCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    overflow: 'hidden', // Garante que o banner respeite as bordas redondas
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  bannerContainer: { 
    width: "100%", 
    height: 160, 
    position: "relative",
    marginBottom: 10
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.8,
  },
  overlayText: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.3)' // Escurece um pouco para ler o texto
  },
  overlayTitle: { 
    fontSize: 24, 
    fontWeight: "900", 
    color: "#FFF", 
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  overlaySubtitle: { 
    fontSize: 14, 
    color: "#FFD700", // Dourado no subtítulo
    fontWeight: 'bold',
    marginTop: 5,
    letterSpacing: 1
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
    paddingHorizontal: 20,
    color: "#E72C2C",
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 30,
    padding: 20
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  burgerImage: {
    width: 70,
    height: 60,
    resizeMode: "contain",
    borderRadius: 10,
    backgroundColor: '#F9FAFB'
  },
  textContainer: { flex: 1, marginLeft: 15 },
  itemName: { fontSize: 16, fontWeight: "bold", color: "#1F2937" },
  itemDesc: { fontSize: 13, color: "#6B7280", marginVertical: 4 },
  itemPrice: { fontSize: 16, color: "#E72C2C", fontWeight: "bold" },
  addButton: { padding: 5 },
  
  // 3. Botão Flutuante Dourado
  floatingButtonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: 'center',
    paddingHorizontal: 20
  },
  floatingButton: {
    backgroundColor: "#FFD700", // Amarelo Dourado
    paddingVertical: 15,
    width: "100%",
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingButtonText: { 
    fontSize: 16, 
    fontWeight: "900", 
    color: "#78350F", // Marrom
    letterSpacing: 0.5,
    marginRight: 10
  },
  iconContainer: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      padding: 5,
      borderRadius: 15
  }
});

export default MenuScreen;