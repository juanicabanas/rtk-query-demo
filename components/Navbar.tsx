import {useTheme, Text, Spacer, Link, Loading} from "@nextui-org/react";
import NextLink from "next/link";

const Navbar = ({home = '/pokemons', isFetching = false}: {home?: string; isFetching?: boolean}) => {
    const {theme} = useTheme()

    return (
        <div style={{
            display: "flex",
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0px 20px',
            backgroundColor: theme?.colors.gray100.value
        }}>
            <img
                alt="App icon"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
                width={70} height={70}
            />
            <NextLink href={home} passHref>
                <Link css={{alignItems: 'baseline'}}>
                    <Text color="white" h2 css={{margin: 0}}>P</Text>
                    <Text color="white" h3 css={{margin: 0}}>ókemon</Text>
                </Link>
            </NextLink>
            {isFetching && <Loading css={{marginLeft: 15}} size="sm" />}
            <Spacer css={{flex: 1}}/>
            <Link>
                <Text color="white">Favorites</Text>
            </Link>
        </div>
    );
};

export default Navbar;
