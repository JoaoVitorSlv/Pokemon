async function getPokemonDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get("name");

    if (!pokemonName) {
        document.getElementById("pokemon-info").innerHTML = "<p>Pokémon não encontrado.</p>";
        return;
    }

    try {
        const consulta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        const result = await consulta.json();

        const types = result.types.map(t => 
            `<span class="type ${t.type.name}">${t.type.name}</span>`
        ).join(" ");

        const stats = result.stats.map(stat => {
            return `
                <div class="stat">
                    ${stat.stat.name.replace("-", " ")}: ${stat.base_stat}
                    <div class="stat-bar">
                        <div class="${stat.stat.name}" style="width: ${stat.base_stat}%;"></div>
                    </div>
                </div>
            `;
        }).join("");
        document.getElementById("pokemon-info").innerHTML = `
            <h1>${result.name}</h1>
            <div class="pokemon">
                <img src="${result.sprites.front_default}" alt="${result.name}">
            </div>
            <p class="info"><strong>Altura:</strong> ${result.height / 10} m</p>
            <p class="info"><strong>Peso:</strong> ${result.weight / 10} kg</p>
            <div class="types">${types}</div>
            <div class="stats">${stats}</div>
            <a href="index.html" class="back-button">Voltar</a>
        `;
    } catch (error) {
        document.getElementById("pokemon-info").innerHTML = "<p>Erro ao carregar Pokémon.</p>";
    }
}

document.addEventListener("DOMContentLoaded", getPokemonDetails);
