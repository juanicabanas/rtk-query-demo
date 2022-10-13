import React, {useEffect, useState} from 'react';
import PokemonDescription from "../../components/pokemon/PokemonDescription";
import {Pokemon} from "../../interfaces/PokemonFull";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {Loading} from "@nextui-org/react";
import {pokeApi} from "../../api/pokeApi";
import Navbar from "../../components/Navbar";

// Example without RTK Query
const PokemonByNamePage = () => {
    const router = useRouter()
    const name = router.query.name as string

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [pokemon, setPokemon] = useState<Pokemon>();

    useEffect(() => {
        const getPokemon = async (name: string) => {
            try {
                setIsLoading(true);
                const {data} = await pokeApi.get<Pokemon>(`/pokemon/${name}`);
                setPokemon(data);
                setIsLoading(false);
            } catch (e) {
                setIsLoading(false);
                setIsError(true);
                toast.error("There was an error");
            }
        }

        name && getPokemon(name);
    }, [name]);

    return (
        <>
            <Navbar/>
            <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
                {isLoading && <Loading size="xl" css={{flex: 1, justifyContent: 'center'}}>Loading</Loading>}
                {isError && <h1>Error</h1>}
                {pokemon && <PokemonDescription pokemon={pokemon}/>}
            </div>
        </>
    )
};


export default PokemonByNamePage;
