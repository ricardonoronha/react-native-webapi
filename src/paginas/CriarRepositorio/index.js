import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { criarRepositorio } from '../services/api';

export default function CriarRepositorio({ route, navigation }) {
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');
    const [criando, setCriando] = useState(false);

    const postId = route.params?.usuario?.id;

    async function onCriarRepositorio() {
        setCriando(true);
        try {
            await criarRepositorio(postId, nome, data);
            Alert.alert("Repositório criado com sucesso");
            navigation.navigate("Repositorios", { usuario: route.params.usuario });
        }
        catch (error) {
            Alert.alert(error.message);
        }
        finally {
            setCriando(false);
        }
    }

    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                editable={!criando}
                onChangeText={setNome}
                value={nome}
            />
            <TextInput
                placeholder="Data de criação"
                autoCapitalize="none"
                style={estilos.entrada}
                editable={!criando}
                onChangeText={setData}
                value={data}
            />
            <TouchableOpacity style={estilos.botao} onPress={onCriarRepositorio} disabled={criando}>
                <Text style={estilos.textoBotao}>
                    {criando ? "Criando..." : "Criar"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
