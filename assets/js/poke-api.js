
const pokeApi = {}
const listPokemon = new Map();
var pokemonSelect = null;

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.weight = pokeDetail.weight
    pokemon.height = pokeDetail.height

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    //Abilidades:
    pokemon.abilities = pokeDetail.abilities.map((ability) => ability.ability.name)

    //Espécies (URL) -> Vamos precisar buscar as espécies que são separadas por lingua, vamos considerar apenas a "en"
    pokemon.urlSpecie = pokeDetail.species.url

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    //Carrega Specie (URL):
    pokeApi.getPokemonSpecies(pokemon);

    //Carrega Base Status
    chargedBaseStatus(pokemon, pokeDetail.stats);
    
    //Alimenta nosso Map para buscar informações para o dialog depois:
    //Como o id é único, vamos utiliza-lo como chave do map.
    listPokemon.set(pokeDetail.id, pokemon);
    return pokemon
}

function chargedBaseStatus(pokemon, stats) {
    //Base Status:
    let total = 0;
    for (let i = 0; i < stats.length; i++) {
        switch (stats[i].stat.name) {
            case "hp":
                pokemon.base_status.hp = stats[i].base_stat;
                total += stats[i].base_stat;
                break;
            case "attack":
                pokemon.base_status.atack = stats[i].base_stat;
                total += stats[i].base_stat;
                break;
            case "defense":
                pokemon.base_status.defense = stats[i].base_stat;
                total += stats[i].base_stat;
                break;
            case "special-attack":
                pokemon.base_status.special_attack = stats[i].base_stat;
                total += stats[i].base_stat;
                break;
            case "special-defense":
                pokemon.base_status.special_defense = stats[i].base_stat;
                total += stats[i].base_stat;
                break;
            case "speed":
                pokemon.base_status.speed = stats[i].base_stat;
                total += stats[i].base_stat;
                break;
            default:
                break;
        }
    }

    pokemon.base_status.total = total;
}


function chargedSpecieGeneraGenusLanguageEn(pokemon) {
    //Specie.Genera.Genus:
    for (let i = 0; i < pokemon.specie.genera.length; i++) {
        if (pokemon.specie.genera[i].language.name === 'en') {
            pokemon.specieGenus = pokemon.specie.genera[i].genus;
            break;
        }
    }

    //Specie.egg_groups:
    pokemon.egg_groups = pokemon.specie.egg_groups.map((egg) => egg.name)
}

/**
 * Executa URL Specie e alimenta no VO - Pokemon.specie
 * 
 * @param {} pokemon 
 */
pokeApi.getPokemonSpecies = (pokemon) => {
    // Após retorno da promise ele carrega os dados de espécie no VO (Pokemon)
    if (pokemon !== null) {
        if (pokemon !== undefined) {
            fetch(pokemon.urlSpecie)
                .then((response) => response.json())
                .then((pokemonsDetails) => pokemonsDetails)
                .then((result) => chargedSpeciePokemon(pokemon, result))
        }
    }
}

function chargedSpeciePokemon(pokemon, specie) {
    if (pokemon !== null) {
        if (pokemon !== undefined) {
            pokemon.specie = specie;
            chargedSpecieGeneraGenusLanguageEn(pokemon);
        }
    }

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
