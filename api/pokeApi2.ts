import {createApi, retry} from '@reduxjs/toolkit/query/react'
import {PokemonListResponse, SmallPokemon} from "../interfaces/SmallPokemon";
import {toast} from "react-toastify";
import {axiosBaseQuery} from "./pokeApi";
import {Pokemon} from "../interfaces/PokemonFull";
// refetchOnMountOrArgChange: true,
// retry()
// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: retry(axiosBaseQuery({baseUrl: 'https://pokeapi.co/api/v2'}), {maxRetries: 2}),
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getPokemons: builder.query<SmallPokemon[], number>({
            query: (limit) => ({url: `/pokemon?limit=${limit}`, method: 'get'}),
            transformResponse: (response: PokemonListResponse) =>
                response.results.map((pokemon, idx) => ({
                    ...pokemon,
                    id: idx + 1,
                    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idx + 1}.svg`
                })),
            async onQueryStarted(arg,{queryFulfilled}) {
                try {
                    await queryFulfilled
                } catch (e) {
                    toast.error("There was an error");
                }
            },
        }),
        getPokemonByName: builder.query<Pokemon, string>({
            query: (name) => ({url: `/pokemon/${name}`, method: 'get'})
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetPokemonsQuery, useGetPokemonByNameQuery, usePrefetch} = pokemonApi