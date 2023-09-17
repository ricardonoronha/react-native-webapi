import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import estilos from './estilos';
import { buscarRepositorios } from '../services/api';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const usuarioId = route.params?.usuario?.id ;

    console.log("usuario", route.params?.usuario);
    console.log("usuarioId", usuarioId);

    const isFocused = useIsFocused();

    useEffect(() => {
        updateRepositorios();
    }, [usuarioId, isFocused]);


    async function updateRepositorios() {
        const repositorios = await buscarRepositorios(usuarioId);
        console.log("repos", repositorios);
        setRepo(repositorios);
    }

    function renderItem({ item }) {
        return <View style={estilos.repositorio}>
            <Text style={estilos.repositorioNome}>{item.name}</Text>
            <Text style={estilos.repositorioData}>{item.data}</Text>
        </View>

    }

    return (
        <View style={estilos.container}>
            <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
            <TouchableOpacity
                style={estilos.botao}
                onPress={() => navigation.navigate('CriarRepositorio', { usuario: route.params?.usuario })}
            >
                <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
            </TouchableOpacity>
            <FlatList
                data={repo}
                renderItem={renderItem}
               
            />

        </View>
    );
}
