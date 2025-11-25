// Este arquivo simula a comunicação com o backend e o banco de dados.

// Simula um banco de dados de usuários
const users = [
    { email: 'teste@di.com.br', password: '123' },
];

// Simula um atraso de rede (2 segundos)
const networkDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Simula o processo de Cadastro de um novo usuário.
 * Retorna true em sucesso, ou uma mensagem de erro em falha.
 */
export async function registerUser(name: string, email: string, password: string): Promise<true | string> {
    await networkDelay(2000); // Simula atraso

    if (users.some(user => user.email === email)) {
        return 'Email já cadastrado. Tente fazer login.';
    }

    if (password.length < 3) {
        return 'A senha deve ter pelo menos 3 caracteres.';
    }

    // Adiciona o novo usuário ao "banco de dados" simulado
    users.push({ email, password });
    console.log(`[AUTH MOCK] Novo usuário cadastrado: ${email}`);
    
    return true;
}

/**
 * Simula o processo de Login de um usuário.
 * Retorna um token de usuário (simulado) em sucesso, ou uma mensagem de erro em falha.
 */
export async function loginUser(email: string, password: string): Promise<string | string> {
    await networkDelay(2000); // Simula atraso

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Retorna um token de sucesso simulado
        return 'token_simulado_12345';
    } else {
        return 'Email ou senha inválidos. Verifique suas credenciais.';
    }
}