import { Card, Grid } from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/router";

const FavoriteCardPokemon = ({ id }: { id: number }) => {
    const router = useRouter();

    return (
        <Grid onClick={() => router.push(`/pokemon/${id}`)} xs={6} sm={3} md={2} xl={1} key={id}>
            <Card isHoverable={true} css={{ padding: 10 }}>
                <Card.Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                    width='100%'
                    height={140}
                />
            </Card>
        </Grid>);
}

export const FavoritePokemons = ({ pokemons }: { pokemons: number[] }) => (
    <Grid.Container gap={2} direction='row' justify="flex-start">
        {
            pokemons.map(id => (
                <FavoriteCardPokemon key={`pokemon-card-${id}`} id={id}/>
            ))
        }
    </Grid.Container>
);

