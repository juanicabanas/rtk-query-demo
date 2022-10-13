import React from 'react';
import {useGetPokemonsQuery} from "../../api/pokeApi2";
import Navbar from "../../components/Navbar";
import {Grid, Loading} from '@nextui-org/react';
import PokemonCard from "../../components/pokemon/PokemonCard";

function Pokemons2() {
    const {data: pokemons, isLoading, isError, isFetching} = useGetPokemonsQuery(60);

    return (
        <div className="App" style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Navbar isFetching={isFetching}/>
            {isLoading && <Loading size="xl" css={{flex: 1, justifyContent: 'center'}}>Loading</Loading>}
            {isError && <h1>Error</h1>}
            {pokemons &&
                <Grid.Container gap={2} justify="flex-start">
                    {pokemons.map(pokemon =>
                        <PokemonCard namePath="/pokemons2" prefetch key={pokemon.id} pokemon={pokemon}/>)}
                </Grid.Container>
            }
        </div>
    );
}

export default Pokemons2;
