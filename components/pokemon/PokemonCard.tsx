import { Card, Grid, Row, Text } from "@nextui-org/react";
import {SmallPokemon} from "../../interfaces/SmallPokemon";
import { useRouter } from "next/router";
import {usePrefetch} from "../../api/pokeApi2";

interface Props {
    pokemon: SmallPokemon
    namePath: string
    prefetch?: boolean
}

export const PokemonCard = ({ pokemon, namePath, prefetch = false }: Props) => {
    const prefetchPokemon = usePrefetch('getPokemonByName')
    const router = useRouter();

    const handleClick = () => {
        router.push(`${namePath}/${pokemon.name}`);
    }

    return (
        <Grid onClick={handleClick} onMouseEnter={() => prefetch && prefetchPokemon(pokemon.name)} xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
            <Card isHoverable>
                <Card.Body css={{ p: 1 }}>
                    <Card.Image src={pokemon.img} width="100%" height={140}/>
                </Card.Body>
                <Card.Footer>
                    <Row justify="space-between">
                        <Text transform="capitalize">{pokemon.name}</Text>
                        <Text>#{pokemon.id}</Text>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    );
};

export default PokemonCard;
