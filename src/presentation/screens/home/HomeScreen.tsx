import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { PokeballBg } from '../../components/ui/PokeballBg';

export const HomeScreen = () => {

  const { isLoading, data = [] } = useQuery({
    queryKey: [], // identificador para poder manejarlo en caché
    queryFn: () => getPokemons(0), // promesa 
    staleTime: 100 * 60 * 60, // tiempo que va a mantener fresca la respuesta de la petición 
  });

  return (
    <View>

      <PokeballBg style={ styles.imgPosition } />

    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  }
});