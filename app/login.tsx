import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Ícones
import {
  ArrowLeft,
  KeyRound,
  Lock,
  Mail,
  ShoppingBag,
  UserPlus,
} from "lucide-react-native";

// Importações do Firebase
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// ✅ Caminho para sua pasta services (ajuste os .. se necessário)
import { auth, db } from "../services/firebaseConfig";

export default function LoginScreen() {
  const router = useRouter();

  // Estados
  const [view, setView] = useState<"login" | "cadastro" | "recuperar">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // --- 1. FUNÇÃO MÁGICA DE ALERTA (CORREÇÃO) ---
  // Isso garante que você veja o erro tanto no PC quanto no Celular
  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // --- FUNÇÃO DE LOGIN ---
  const handleLogin = async () => {
    if (!email || !password)
      return showAlert("Erro", "Preencha e-mail e senha.");

    setLoading(true);
    try {
      console.log("Tentando logar com:", email); // Debug

      // é aqui que ocorre a verificação do usuario
      await signInWithEmailAndPassword(auth, email, password); // envia pra o firebaze
      
      console.log("LOGIN SUCESSO! Redirecionando..."); // Debug
      
      // essa rota so vai funcionar caso a função await der certo
      router.replace("/(tabs)"); 
      
    } catch (error: any) {
      console.log("Erro Login:", error.code); 

      const code = error.code;

      if (
        code === "auth/invalid-credential" ||
        code === "auth/user-not-found" ||
        code === "auth/wrong-password"
      ) {
        showAlert("Atenção", "E-mail ou senha incorretos.");
      } else if (code === "auth/invalid-email") {
        showAlert("Erro", "O formato do e-mail é inválido.");
      } else if (code === "auth/too-many-requests") {
        showAlert("Bloqueado", "Muitas tentativas falhas. Aguarde.");
      } else {
        showAlert("Erro no Login", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // --- FUNÇÃO DE CADASTRO ---
  const handleRegister = async () => {
    if (!name || !email || !password)
      return showAlert("Erro", "Preencha todos os campos.");

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        role: "cliente",
        createdAt: new Date().toISOString(),
      });

      showAlert("Sucesso", "Conta criada com sucesso!");
      router.replace("/(tabs)");
    } catch (error: any) {
      console.log("Erro Cadastro:", error.code);
      const code = error.code;
      if (code === "auth/email-already-in-use") {
        showAlert("Atenção", "Este e-mail já está sendo usado.");
      } else if (code === "auth/weak-password") {
        showAlert("Senha Fraca", "A senha deve ter pelo menos 6 caracteres.");
      } else if (code === "auth/invalid-email") {
        showAlert("Erro", "E-mail inválido.");
      } else {
        showAlert("Erro no Cadastro", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // --- FUNÇÃO DE RECUPERAR SENHA ---
  const handleRecover = async () => {
    if (!email)
      return showAlert("Erro", "Digite seu e-mail para recuperar a senha.");

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      showAlert("Enviado!", "Verifique seu e-mail.");
      setView("login");
    } catch (error: any) {
      console.log("Erro Recover:", error.code);
      const code = error.code;
      if (code === "auth/user-not-found") {
        showAlert("Erro", "E-mail não cadastrado.");
      } else if (code === "auth/invalid-email") {
        showAlert("Erro", "E-mail inválido.");
      } else {
        showAlert("Erro", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Helpers de Texto
  const getTitle = () => {
    if (view === "login") return "Fazer Login";
    if (view === "cadastro") return "Criar Conta";
    return "Recuperar Senha";
  };

  const getButtonText = () => {
    if (view === "login") return "ENTRAR AGORA";
    if (view === "cadastro") return "FINALIZAR CADASTRO";
    return "ENVIAR LINK";
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* LOGO E TÍTULO */}
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <ShoppingBag color="#DC2626" size={40} />
          </View>
          <Text style={styles.appTitle}>DI DELIVERY</Text>
          <Text style={styles.appSubtitle}>O SABOR QUE VOCÊ MERECE</Text>
        </View>

        {/* CARD DO FORMULÁRIO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{getTitle()}</Text>

          {/* CAMPO NOME */}
          {view === "cadastro" && (
            <View style={styles.inputContainer}>
              <UserPlus color="#9CA3AF" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
              />
            </View>
          )}

          {/* CAMPO EMAIL */}
          <View style={styles.inputContainer}>
            <Mail color="#9CA3AF" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Seu melhor e-mail"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* CAMPO SENHA */}
          {view !== "recuperar" && (
            <View style={styles.inputContainer}>
              <Lock color="#9CA3AF" size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Sua senha secreta"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
          )}

          {/* BOTÃO DE AÇÃO */}
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => {
              if (view === "login") handleLogin();
              else if (view === "cadastro") handleRegister();
              else handleRecover();
            }}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#78350F" />
            ) : (
              <Text style={styles.mainButtonText}>{getButtonText()}</Text>
            )}
          </TouchableOpacity>

          {/* RODAPÉ DO CARD */}
          {view === "recuperar" ? (
            <TouchableOpacity
              onPress={() => setView("login")}
              style={{
                marginTop: 15,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArrowLeft size={16} color="#9CA3AF" />
              <Text style={[styles.linkText, { marginLeft: 5 }]}>
                Voltar para o login
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setView(view === "login" ? "cadastro" : "login")}
              style={{ marginTop: 15 }}
            >
              <Text style={styles.linkText}>
                {view === "login"
                  ? "Não tem conta? Crie uma aqui"
                  : "Já tem conta? Voltar ao login"}
              </Text>
            </TouchableOpacity>
          )}

          {view === "login" && (
            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() => setView("recuperar")}
            >
              <KeyRound size={14} color="#EF4444" />
              <Text style={styles.forgotText}>Esqueci minha senha</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.footerText}>POWERED BY FIREBASE</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DC2626",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoBox: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    transform: [{ rotate: "-3deg" }],
    elevation: 8,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "white",
    fontStyle: "italic",
  },
  appSubtitle: {
    color: "#FECACA",
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 25,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#1F2937",
    fontWeight: "500",
  },
  mainButton: {
    backgroundColor: "#FBBF24",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    borderBottomWidth: 4,
    borderBottomColor: "#D97706",
  },
  mainButtonText: {
    color: "#78350F",
    fontWeight: "900",
    fontSize: 16,
  },
  linkText: {
    color: "#9CA3AF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 13,
  },
  forgotButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5,
  },
  forgotText: {
    color: "#EF4444",
    fontWeight: "bold",
    fontSize: 12,
  },
  footerText: {
    textAlign: "center",
    color: "rgba(255,255,255,0.6)",
    marginTop: 30,
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 2,
  },
});