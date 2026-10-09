const formPokemon = document.querySelector("#form-pokemon");
const inputPokemon = document.querySelector("#input-pokemon");
const btnPokemon = document.querySelector("#btn-pokemon");
const statusPokemon = document.querySelector("#status-pokemon");
const resultadoPokemon = document.querySelector("#resultado-pokemon");

formPokemon.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nomePokemon = inputPokemon.value.trim().toLowerCase();

    if (nomePokemon === "") {
        statusPokemon.textContent = "Informe o nome de um Pokémon.";
        resultadoPokemon.replaceChildren();
        return;
    }

    statusPokemon.textContent = "Buscando...";
    btnPokemon.disabled = true;
    resultadoPokemon.replaceChildren();

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Pokémon não encontrado.");
            }
            throw new Error("Erro ao buscar dados na PokéAPI.");
        }

        const data = await response.json();

        statusPokemon.textContent = "";

        const titulo = document.createElement("h3");
        titulo.textContent = data.name.toUpperCase();

        const img = document.createElement("img");
        img.src = data.sprites.front_default;
        img.alt = data.name;

        const pTipos = document.createElement("p");
        const tipos = data.types.map(t => t.type.name).join(", ");
        pTipos.textContent = `Tipo(s): ${tipos}`;

        resultadoPokemon.replaceChildren(titulo, img, pTipos);

    } catch (error) {
        statusPokemon.textContent = error.message || "Erro de conexão ao buscar o Pokémon.";
    } finally {
        btnPokemon.disabled = false;
    }
});