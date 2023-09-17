import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import estilos from './estilos';
import { buscarUsuario } from '../services/api';
import { useIsFocused } from '@react-navigation/native';

export default function Principal({ navigation }) {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [usuario, setUsuario] = useState({});
    const [buscando, setBuscando] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (nomeUsuario) {
            pesquisarUsuario();
        }

    }, [isFocused]);

    async function pesquisarUsuario() {
        try {
            setBuscando(true);
            const usuario = await buscarUsuario(nomeUsuario);
            setUsuario(usuario);
            setNomeUsuario("");

        }
        catch (error) {
            Alert.alert(error.message);
        }
        finally {
            setBuscando(false);
        }

    }



    return (
        <ScrollView>
            <View style={estilos.container}>
                {usuario?.name && <>
                    <View style={estilos.fundo} />
                    <View style={estilos.imagemArea}>
                        <Image source={{ uri: usuario.avatar_url }} style={estilos.imagem} />
                    </View>
                    <Text style={estilos.textoNome}>{usuario.name}</Text>
                    <Text style={estilos.textoEmail}>{usuario.email}</Text>
                    <View style={estilos.seguidoresArea}>
                        <View style={estilos.seguidores}>
                            <Text style={estilos.seguidoresNumero}>{usuario.followers}</Text>
                            <Text style={estilos.seguidoresTexto}>Seguidores</Text>
                        </View>
                        <View style={estilos.seguidores}>
                            <Text style={estilos.seguidoresNumero}>{usuario.following}</Text>
                            <Text style={estilos.seguidoresTexto}>Seguindo</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Repositorios')}>
                        <Text style={estilos.repositorios}>
                            Ver os repositórios
                        </Text>
                    </TouchableOpacity>
                </>}

                <TextInput
                    placeholder="Busque por um usuário"
                    autoCapitalize="none"
                    style={estilos.entrada}
                    value={nomeUsuario}
                    onChangeText={setNomeUsuario}
                />

                <TouchableOpacity style={estilos.botao} onPress={pesquisarUsuario} disabled={buscando}>
                    <Text style={estilos.textoBotao}>
                        {buscando ? "Buscando..." : "Buscar"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
