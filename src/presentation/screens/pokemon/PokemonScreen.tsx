import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { RootStackParams } from '../../navigator/StackNavigator';
import { useQuery } from '@tanstack/react-query';
import { getPokemonById } from '../../../actions/pokemons';
import { ThemeContext } from '../../context/ThemeContext';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

export const PokemonScreen = ({ navigation, route }: Props) => {
  const { isDark } = useContext(ThemeContext);
  const { pokemonId } = route.params;

  const { isLoading, data: pokemon } = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    staleTime: 1000 * 60 * 60 // 1 hr
  });

  return (
    <View>
      <Text style={{ color: isDark ? 'white' : 'dark' }}>{ pokemon?.name }</Text>
    </View>
  );
};
