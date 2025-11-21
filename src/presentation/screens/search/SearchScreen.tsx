import React from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalTheme } from '../../../config/theme/global-theme';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/pokemon';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNamesWithId } from '../../../actions/pokemons';

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();

  const { isLoading, data: pokemonNameList = [] } = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonNamesWithId(),
  });

  return (
    <View style={[ globalTheme.globalMargin, { paddingTop: top + 10 } ]}>
      <TextInput
        placeholder='Buscar Pokémon'
        mode='flat'
        autoFocus
        autoCorrect={false}
        onChangeText={ value => console.log(value) }
        value='Holaaaa'
      />

      <ActivityIndicator style={{ paddingTop: 20 }} />

      <FlatList
        data={[] as Pokemon[]}
        keyExtractor={ (pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={ 2 }
        style={{ paddingTop: top + 20 }}
        renderItem={ ({item}) => <PokemonCard pokemon={ item } />}
        showsVerticalScrollIndicator={ false }
      />
    </View>
  );
};
