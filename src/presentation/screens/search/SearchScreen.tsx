import React, { useMemo, useState } from 'react';
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
  const [term, setTerm] = useState('');

  const { isLoading, data: pokemonNameList = [] } = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonNamesWithId(),
  });

  const pokemonNameIdList = useMemo( () => {
    // es número
    if( !isNaN(Number(term)) ) {
      const pokemon = pokemonNameList.find( pokemon => pokemon.id === Number(term) );
      return pokemon ? [pokemon] : [];
    }

    if( term.length === 0 ) return [];
    if( term.length < 3 ) return [];

    return pokemonNameList.filter( pokemon => 
      pokemon.name.includes(term.toLocaleLowerCase()),
    );

  }, []);

  return (
    <View style={[ globalTheme.globalMargin, { paddingTop: top + 10 } ]}>
      <TextInput
        placeholder='Buscar Pokémon'
        mode='flat'
        autoFocus
        autoCorrect={false}
        onChangeText={ setTerm }
        value={ term }
      />

      <ActivityIndicator style={{ paddingTop: 20 }} />

      <Text style={{color: 'white'}}>{JSON.stringify(pokemonNameIdList, null, 2)}</Text>

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
