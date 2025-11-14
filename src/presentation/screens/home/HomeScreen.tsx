import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';

export const HomeScreen = () => {

  const { isLoading, data } = useQuery({
    queryKey: [], // identificador para poder manejarlo en caché
    queryFn: () => getPokemons(), // promesa 
    staleTime: 100 * 60 * 60, // tiempo que va a mantener fresca la respuesta de la petición 
  });

  return (
    <View>
        <Text variant='displayMedium'>HomeScreen</Text>

        { 
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <Button
              mode="contained"
              onPress={() => console.log('Pressed')}
            >
              Press me
            </Button>
          )
        }

    </View>
  );
};
