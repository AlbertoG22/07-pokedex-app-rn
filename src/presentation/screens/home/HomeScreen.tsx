import { useQuery } from '@tanstack/react-query';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets();

  const { isLoading, data: pokemons = [] } = useQuery({
    queryKey: [], // identificador para poder manejarlo en caché
    queryFn: () => getPokemons(0), // promesa 
    staleTime: 100 * 60 * 60, // tiempo que va a mantener fresca la respuesta de la petición 
  });

  return (
    <View style={ globalTheme.globalMargin }>
      <PokeballBg style={ styles.imgPosition } />

      <FlatList
        data={ pokemons }
        keyExtractor={ (pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={ 2 }
        style={{ paddingTop: top + 20 }}
        ListHeaderComponent={ () => (
          <Text variant='displayMedium'>Pokédex</Text>
        )}
        renderItem={ ({item}) => <PokemonCard pokemon={ item } />}
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