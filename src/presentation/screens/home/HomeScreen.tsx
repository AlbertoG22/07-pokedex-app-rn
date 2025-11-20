import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets();
  const { isDark } = useContext(ThemeContext);
  const queryClient = useQueryClient();

  //* FORMA BÁSICA DE UNA PETICIÓN HTTP
  // const { isLoading, data: pokemons = [] } = useQuery({
  //   queryKey: ['pokemons'], // identificador para poder manejarlo en caché
  //   queryFn: () => getPokemons(0), // promesa 
  //   staleTime: 100 * 60 * 60, // tiempo que va a mantener fresca la respuesta de la petición 
  // });

  //* FORMA DE HACER UNA PETICIÓN HTTP PARA INFINITE SCROLL
  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: async (params) => {
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach( pokemon => {
        queryClient.setQueryData( ['pokemon', pokemon.id], pokemon);
      });
      
      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
    staleTime: 100 * 60 * 60,
  });

  return (
    <View style={ globalTheme.globalMargin }>
      <PokeballBg style={ styles.imgPosition } />

      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={ (pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={ 2 }
        style={{ paddingTop: top + 20 }}
        ListHeaderComponent={ () => (
          <Text style={{ color: isDark ? 'white' : 'black' }} variant='displayMedium'>Pokédex</Text>
        )}
        renderItem={ ({item}) => <PokemonCard pokemon={ item } />}
        onEndReachedThreshold={ 0.6 }
        onEndReached={ () => fetchNextPage() }
        showsVerticalScrollIndicator={ false }
      />

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