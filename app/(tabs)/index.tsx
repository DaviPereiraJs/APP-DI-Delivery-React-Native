import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

// --- IMPORTAÇÃO DO FIREBASE ---
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

const { width } = Dimensions.get("window");

interface BurgerData {
  id: string;
  nome: string;
  preco: number;
  imagem_url?: string;
}

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [highlights, setHighlights] = useState<BurgerData[]>([]);
  const [loading, setLoading] = useState(true);

  // --- CARREGAMENTO DE DADOS DO FIREBASE ---
  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const q = query(collection(db, "products"), limit(4));
        const querySnapshot = await getDocs(q);

        const productsList: BurgerData[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          productsList.push({
            id: doc.id,
            nome: data.name || data.nome || "Produto sem nome",
            preco: Number(data.price || data.preco || 0),
            imagem_url: data.image_url || data.imagem_url || null,
          });
        });

        setHighlights(productsList);
      } catch (error) {
        console.error("Erro ao buscar destaques do Firebase:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHighlights();
  }, []);

  const renderHeader = () => (
    <View>
      {/* CABEÇALHO CURVO */}
      <View style={styles.curvedHeader}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={styles.iconButton}
          >
            <Ionicons name="menu" size={28} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.headerTitles}>
            <Text style={styles.appTitle}>DI DELIVERY</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-sharp" size={14} color="#FFD700" />
              <Text style={styles.locationText}>Boa Viagem, CE</Text>
              <Ionicons name="chevron-down" size={12} color="#FFF" />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/carrinho")}
            style={styles.iconButton}
          >
            <Ionicons name="cart-outline" size={28} color="#FFF" />
            {/* Bolinha de notificação fake para charme */}
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        {/* Título de Boas Vindas */}
        <Text style={styles.welcomeText}>O que vamos comer hoje?</Text>
      </View>

      {/* BUSCA FLUTUANTE (Sobrepõe o header) */}
      <View style={styles.floatingSearchContainer}>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => router.push("/buscar")} // Ajuste a rota se necessário
          activeOpacity={0.9}
        >
          <Ionicons name="search" size={20} color="#E72C2C" />
          <Text style={styles.searchPlaceholder}>
            Buscar lanches, pizzas...
          </Text>
        </TouchableOpacity>
      </View>

      {/* CATEGORIAS */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categorias</Text>
        <View style={styles.categoriesRow}>
          {[1, 2, 3, 4].map((id, index) => (
            <TouchableOpacity key={id} style={styles.categoryItem}>
              <View
                style={[
                  styles.categoryCircle,
                  index === 0 && styles.categoryCircleActive,
                ]}
              >
                <Image
                  source={require("../assets/imgPizza.png")}
                  style={styles.categoryImage}
                />
              </View>
              <Text
                style={[
                  styles.categoryText,
                  index === 0 && styles.categoryTextActive,
                ]}
              >
                {index === 0 ? "Pizzas" : "Lanches"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* BANNER PROMOCIONAL (Estilo Ticket) */}
      <View style={styles.promoBanner}>
        <View style={styles.promoContent}>
          <Text style={styles.promoTitle}>50% OFF</Text>
          <Text style={styles.promoSubtitle}>Na sua primeira compra!</Text>
        </View>
        <View style={styles.promoIconBox}>
          <Ionicons name="ticket-outline" size={30} color="#E72C2C" />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Destaques da Semana</Text>
    </View>
  );

  const renderItem = ({ item }: { item: BurgerData }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push("/menu")}
      activeOpacity={0.9}
    >
      <View style={styles.cardImageContainer}>
        <Image
          source={
            item.imagem_url
              ? { uri: item.imagem_url }
              : require("../assets/logo.png")
          }
          style={styles.cardImage}
        />
        {/* Botãozinho de + flutuante */}
        <View style={styles.addBtn}>
          <Ionicons name="add" size={20} color="#78350F" />
        </View>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardName} numberOfLines={1}>
          {item.nome}
        </Text>
        <Text style={styles.cardPrice}>
          R$ {item.preco.toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E72C2C" />

      {loading ? (
        <View style={styles.centerLoading}>
          <ActivityIndicator size="large" color="#E72C2C" />
        </View>
      ) : (
        <FlatList
          data={highlights}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          ListHeaderComponent={renderHeader}
          columnWrapperStyle={styles.listColumnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
            </View>
          }
        />
      )}

      {/* TAB BAR FLUTUANTE */}
      <View style={styles.floatingTabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.replace("/")}
        >
          <Ionicons name="home" size={24} color="#FFD700" />
          <Text style={[styles.tabLabel, { color: "#FFD700" }]}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/buscar")}
        >
          <Ionicons name="search-outline" size={24} color="#FFF" />
          <Text style={styles.tabLabel}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItemMain}
          onPress={() => router.push("/carrinho")}
        >
          <View style={styles.mainTabCircle}>
            <Ionicons name="cart" size={28} color="#E72C2C" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/menu")}
        >
          <Ionicons name="fast-food-outline" size={24} color="#FFF" />
          <Text style={styles.tabLabel}>Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push("/minha-conta")}
        >
          <Ionicons name="person-outline" size={24} color="#FFF" />
          <Text style={styles.tabLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA", // Fundo cinza bem clarinho para destacar os cards brancos
  },
  centerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // --- HEADER CURVO ---
  curvedHeader: {
    backgroundColor: "#E72C2C",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40, // Espaço extra para a curva
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitles: {
    alignItems: "center",
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFF",
    fontStyle: "italic",
    letterSpacing: 0.5,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  locationText: {
    color: "#FFF",
    fontSize: 12,
    marginHorizontal: 4,
    fontWeight: "500",
  },
  iconButton: {
    padding: 5,
  },
  badge: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFD700",
    borderWidth: 1,
    borderColor: "#E72C2C",
  },
  welcomeText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    width: "70%",
    lineHeight: 28,
  },

  // --- BUSCA FLUTUANTE ---
  floatingSearchContainer: {
    paddingHorizontal: 20,
    marginTop: -25, // Faz sobrepor o header
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 15,
    elevation: 5, // Sombra Android
    shadowColor: "#000", // Sombra iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: "#9CA3AF",
    fontSize: 15,
  },

  // --- CATEGORIAS ---
  categoriesContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 15,
    marginLeft: 20,
  },
  categoriesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryItem: {
    alignItems: "center",
    width: width / 4 - 20,
  },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 8,
  },
  categoryCircleActive: {
    backgroundColor: "#FEF3C7", // Amarelo bem claro
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  categoryImage: {
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  categoryText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#E72C2C",
    fontWeight: "bold",
  },

  // --- BANNER ---
  promoBanner: {
    marginHorizontal: 20,
    backgroundColor: "#FFD700", // Amarelo
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#78350F", // Marrom escuro para contraste no amarelo
  },
  promoSubtitle: {
    color: "#92400E",
    fontSize: 14,
    marginTop: 2,
  },
  promoIconBox: {
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 10,
    borderRadius: 12,
  },

  // --- LISTA DE PRODUTOS ---
  listContent: {
    paddingBottom: 120, // Espaço extra para a Tab Bar flutuante não cobrir
  },
  listColumnWrapper: {
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  emptyText: {
    color: "#9CA3AF",
  },

  // --- CARDS MODERNOS ---
  card: {
    width: width / 2 - 30, // 2 colunas com margem
    backgroundColor: "#FFF",
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImageContainer: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6", // Fundo cinza suave atrás da imagem
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "relative",
  },
  cardImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  addBtn: {
    position: "absolute",
    bottom: -15,
    right: 15,
    backgroundColor: "#FFD700",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  cardInfo: {
    padding: 12,
    paddingTop: 20,
  },
  cardName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "900",
    color: "#E72C2C",
  },

  // --- TAB BAR FLUTUANTE ---
  floatingTabBar: {
    position: "absolute",
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: "#E72C2C", // Fundo vermelho
    height: 65,
    borderRadius: 35,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    paddingHorizontal: 5,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabLabel: {
    fontSize: 9,
    color: "#FFF",
    marginTop: 2,
    fontWeight: "500",
  },
  tabItemMain: {
    top: -25, // Sobe o botão do meio
    alignItems: "center",
    justifyContent: "center",
  },
  mainTabCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFD700", // Botão central amarelo
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    borderWidth: 4,
    borderColor: "#F8F9FA", // Borda da cor do fundo da tela para "cortar" a barra
  },
});

export default HomeScreen;
