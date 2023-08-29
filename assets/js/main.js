const pokemonList = document.getElementById('pokemonList')
const pnlDialogPokemon = document.getElementById('pnlDialogPokemon')
const loadMoreButton = document.getElementById('loadMoreButton')
const dialogPokemonDetail = document.getElementById('dialogPokemonDetail')

const maxRecords = 151
const limit = 10
let offset = 0;
var pokemonDetail;

function addEventClickDialogPokemon() {
    let listLinksPokemonDetail = document.getElementsByClassName('linkPokemonDetail');

    if (listLinksPokemonDetail !== null) {
        if (listLinksPokemonDetail !== undefined) {
            // Varrendo array dos elementos <a> e setando evento de click para abrir modal!
            Array.from(listLinksPokemonDetail).map((linkPokeDetail) => linkPokeDetail.addEventListener("click", addEventoClickShowModal));
        }
    }
}

function addEventoClickShowModal(event) {
    // Coloque aqui o código que será executado quando o link for clicado

    dialogPokemonDetail.showModal();
    // Setar informações no Dialog, passando por parâmetro o ID do pokemon:
    chargedDialogPokemon(Number(event.currentTarget.id.split("_")[1]));

    addEventClickClosedDialogPokemon();
    // Evitar que o link execute o comportamento padrão (navegar para outra página)                
    event.preventDefault();
}

function chargedDialogPokemon(id) {
    if (id !== null) {
        if (id !== undefined) {
            let txtTitDialogPokemonNome = document.getElementById('txtTitDialogPokemonNome')
            txtTitDialogPokemonNome.textContent = listPokemon.get(id).name;

            let txtIdDialogPokemon = document.getElementById('txtIdDialogPokemon')
            txtIdDialogPokemon.textContent = "#" + listPokemon.get(id).number;

            while (dialogPokemonDetail.classList.length > 0) {
                dialogPokemonDetail.classList.remove(dialogPokemonDetail.classList.item(0));
            }

            dialogPokemonDetail.classList.add("pokemonDetailDialogModal", listPokemon.get(id).type);
        }
    }
}


function addEventClickClosedDialogPokemon() {
    let btnClosedDialogPokemonDetail = document.getElementById('btnClosedDialogPokemonDetail');

    if (btnClosedDialogPokemonDetail !== null) {
        if (btnClosedDialogPokemonDetail !== undefined) {
            if (dialogPokemonDetail !== null) {
                if (dialogPokemonDetail !== undefined) {
                    btnClosedDialogPokemonDetail.addEventListener('click', () => {
                        dialogPokemonDetail.close();
                    });
                }
            }
        }
    }
}

function convertPokemonToLi(pokemon) {
    return `
    <a id="linkPokemonDetalhe_${pokemon.number}" class="linkPokemonDetail">        
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    </a>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHtml = pokemons.map(convertPokemonToLi).join('')
            pokemonList.innerHTML += newHtml
        }).then(() => addEventClickDialogPokemon());
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})