import React, {useEffect, useState} from 'react';
import {Grid, Loading} from '@nextui-org/react';
import {PokemonListResponse, SmallPokemon} from "../../interfaces/SmallPokemon";
import Navbar from "../../components/Navbar";
import PokemonCard from "../../components/pokemon/PokemonCard";
import {toast} from "react-toastify";
import {pokeApi} from "../../api/pokeApi";

//Example without RTK Query
function Pokemons() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [pokemons, setPokemons] = useState<SmallPokemon[]>([]);

    useEffect(() => {
        const getPokemons = async () => {
            try {
                setIsLoading(true);
                const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=60')
                const pokemons: SmallPokemon[] = data.results.map((pokemon, idx) => ({
                    ...pokemon,
                    id: idx + 1,
                    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idx + 1}.svg`
                }));
                setPokemons(pokemons);
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                setIsError(true);
                toast.error("There was an error");
            }
        }

        getPokemons();

    }, []);

    return (
        <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Navbar/>
            {isLoading && <Loading size="xl" css={{flex: 1, justifyContent: 'center'}}>Loading</Loading>}
            {isError && <h1>Error</h1>}
            {!!pokemons.length &&
                <Grid.Container gap={2} justify="flex-start">
                    {pokemons.map(pokemon =>
                        <PokemonCard namePath="/pokemons" key={pokemon.id} pokemon={pokemon}/>)}
                </Grid.Container>
            }
        </div>
    );
}

export default Pokemons;
