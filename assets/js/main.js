const pokemonList = document.getElementById('pokemonList')
const pnlDialogPokemon = document.getElementById('pnlDialogPokemon')
const loadMoreButton = document.getElementById('loadMoreButton')
const dialogPokemonDetail = document.getElementById('dialogPokemonDetail')

const maxRecords = 151
const limit = 10
let offset = 0;

function addEventClickMenuDetalhePokemonBottomDialog() {
    let linkMenuAboutDialog = document.getElementById('linkMenuAboutDialog');
    let linkMenuBaseStatsDialog = document.getElementById('linkMenuBaseStatsDialog');

    linkMenuAboutDialog.addEventListener("click", addEventoClickZoomAbout)
    linkMenuBaseStatsDialog.addEventListener("click", addEventoClickZoomStats)
}

function addEventoClickZoomAbout(event) {
    setAbaAtivaZoomDetalhesPokemonDialog("about");

    let divDetalhePokemonBottom = document.getElementById('divDetalhePokemonBottom');
    divDetalhePokemonBottom.innerHTML = convertDivPokemonDetalheAbout(pokemonSelect);

    // Evitar que o link execute o comportamento padrão (navegar para outra página)                
    event.preventDefault();
}

function addEventoClickZoomStats(event) {
    //Converte Zoom detalhes pokemons Dialog:
    setAbaAtivaZoomDetalhesPokemonDialog("stats");

    let divDetalhePokemonBottom = document.getElementById('divDetalhePokemonBottom');
    divDetalhePokemonBottom.innerHTML = convertDivPokemonDetalheStats(pokemonSelect);

    // Evitar que o link execute o comportamento padrão (navegar para outra página)                
    event.preventDefault();
}

function convertDivPokemonDetalheAbout(pokemon) {
    return `
    <div class="divDetalheAboutPokemonBottom">
        <div class="divDetalheAboutSuperior">
            <span class="divDetalheZoomTitColuns">Species</span>
            <span class="divDetalheZoomValueColuns">${pokemon.specieGenus}</span>
        </div>

        <div class="divDetalheAboutSuperior">
            <span class="divDetalheZoomTitColuns">Height</span>
            <span class="divDetalheZoomValueColuns">${pokemon.height / 10} cm</span>
        </div>

        <div class="divDetalheAboutSuperior">
            <span class="divDetalheZoomTitColuns">Weight</span>
            <span class="divDetalheZoomValueColuns">${pokemon.weight / 10} kg</span>
        </div>

        <div class="divDetalheAboutSuperior">
            <span class="divDetalheZoomTitColuns">Abilities</span>
            <span class="divDetalheZoomValueColuns">${pokemon.abilities.map((ability) => ability).join(', ')}</span>
        </div>

        <div class="divDetalheAboutSuperior">
            <span class="divDetalheZoomTitGroupColuns">Breeding</span>
        </div>

        <div class="divDetalheAboutSuperior">
            <span class="divDetalheZoomTitColuns">Egg Groups</span>
            <span class="divDetalheZoomValueColuns">${pokemon.egg_groups.map((egg) => egg).join(', ')}</span>
        </div>
    </div>
    `
}

function convertDivPokemonDetalheStats(pokemon) {
    return `
    <div class="divDetalheStatsPokemonBottom">
        <span class="name">Stats Rei!</span>
    </div>
    `
}

function setAbaAtivaZoomDetalhesPokemonDialog(link) {
    if (link !== null) {
        if (link !== undefined) {
            let linkMenuAboutDialog = document.getElementById('linkMenuAboutDialog');
            let linkMenuBaseStatsDialog = document.getElementById('linkMenuBaseStatsDialog');

            //Retira class dos menus:
            while (linkMenuAboutDialog.classList.length > 0) {
                linkMenuAboutDialog.classList.remove(linkMenuAboutDialog.classList.item(0));
            }

            while (linkMenuBaseStatsDialog.classList.length > 0) {
                linkMenuBaseStatsDialog.classList.remove(linkMenuBaseStatsDialog.classList.item(0));
            }

            if (link === "about") {
                linkMenuAboutDialog.classList.add("abaAtiva");
            } else if (link === "stats") {
                linkMenuBaseStatsDialog.classList.add("abaAtiva");
            }
        }
    }
}

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
    dialogPokemonDetail.showModal();
    //Seta o Pokemon Selecionado para trabalhar com ele depois:
    pokemonSelect = listPokemon.get(Number(event.currentTarget.id.split("_")[1]));

    // Setar informações no Dialog:
    chargedDialogPokemon();

    //Evento Close Dialog 'click':
    addEventClickClosedDialogPokemon();

    //Converte Zoom detalhes pokemons Dialog:
    setAbaAtivaZoomDetalhesPokemonDialog("about");
    let divDetalhePokemonBottom = document.getElementById('divDetalhePokemonBottom');
    divDetalhePokemonBottom.innerHTML = convertDivPokemonDetalheAbout(pokemonSelect);

    //Adicionar evento para 'click' nas abas detalhes:
    addEventClickMenuDetalhePokemonBottomDialog();

    // Evitar que o link execute o comportamento padrão (navegar para outra página)                
    event.preventDefault();
}

function chargedDialogPokemon() {
    //Nome:
    let txtTitDialogPokemonNome = document.getElementById('txtTitDialogPokemonNome')
    txtTitDialogPokemonNome.textContent = pokemonSelect.name;

    //Id:
    let txtIdDialogPokemon = document.getElementById('txtIdDialogPokemon')
    txtIdDialogPokemon.textContent = "#" + pokemonSelect.number;

    //Tipos:
    let listTypesDialog = document.getElementById('listTypesDialogPokemonDetail');
    listTypesDialog.innerHTML = convertTypesPokemonToLiDialog(pokemonSelect);

    //Cor Fundo:
    while (dialogPokemonDetail.classList.length > 0) {
        dialogPokemonDetail.classList.remove(dialogPokemonDetail.classList.item(0));
    }

    dialogPokemonDetail.classList.add("pokemonDetailDialogModal", pokemonSelect.type);

    //Imagem Pokemon:
    let imgDialogPokemonDetail = document.getElementById('imgDialogPokemonDetail');
    imgDialogPokemonDetail.innerHTML = convertImgPokemonToDialog(pokemonSelect)
}

function convertTypesPokemonToLiDialog(pokemon) {
    return `
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
    `;
}

function convertImgPokemonToDialog(pokemon) {
    return `
        <img src="${pokemon.photo}" alt="${pokemon.name}">
    `;
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