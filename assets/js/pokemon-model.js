
class Pokemon {
    number;
    name;
    type;
    types = [];
    abilities = [];
    weight;
    height;
    urlSpecie; //URL Specie
    base_happiness;
    specie; // Objeto Especie com todos os recursos dele
    specieGenus;
    egg_groups = [];
    photo;
    base_status = {
        hp: 0,
        atack: 0,
        defense: 0,
        special_attack: 0,
        special_defense: 0,
        speed: 0,
        total: 0
    };
}
