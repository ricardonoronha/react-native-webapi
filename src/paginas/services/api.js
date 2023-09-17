import axios from "axios";





const api = axios.create({
    baseURL: "http://192.168.157.139:3000"
});


export async function buscarUsuario(nome) {

    if (nome) {
        const response = await api.get(`users?login=${nome}`);
        const usuarios = response.data;
        if (usuarios.length == 1) {
            return usuarios[0];
        }
        else if (usuarios.length == 0) {
            throw new Error("Nenhum usuário encontrado");
        }
        else {
            throw new Error("Muitos usuários encontrados");
        }
    }

    throw new Error("Informe o login");
}

export async function buscarRepositorios(usuarioId) {
    const response = await api.get(`repos?postId=${usuarioId}`);
    return response.data;
}

export function criarRepositorio(postId, name, data) {
    return api.post("repos", {
        name,
        data,
        postId,
    });
}

