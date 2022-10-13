import React from 'react';
import PokemonDescription from "../../components/pokemon/PokemonDescription";
import {useRouter} from "next/router";
import {Loading} from "@nextui-org/react";
import Navbar from "../../components/Navbar";
import {useGetPokemonByNameQuery} from "../../api/pokeApi2";

// Example with RTK Query
const PokemonByNamePage = () => {
    const router = useRouter()
    const name = router.query.name as string

    const {data: pokemon, isLoading, isError} = useGetPokemonByNameQuery(name, {
        skip: !name
    })

    return (
        <>
            <Navbar home="/pokemons2"/>
            <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
                {isLoading && <Loading size="xl" css={{flex: 1, justifyContent: 'center'}}>Loading</Loading>}
                {isError && <h1>Error</h1>}
                {pokemon && <PokemonDescription pokemon={pokemon}/>}
            </div>
        </>
    )
};


export default PokemonByNamePage;
