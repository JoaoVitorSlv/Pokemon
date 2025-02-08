async function getPokemons() {
    const consulta = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151');
    const result = await consulta.json();

    const lista = document.getElementById('pokemon-list'); 

    result.results.forEach(pokemon => {
        const a = document.createElement('a');  
        a.textContent = pokemon.name;           
        a.href = pokemon.url;                   
        a.target = "_blank";                    
        a.classList.add('pokemon-link');        

        lista.appendChild(a);
    });
}

async function fotos() {
    for (let i = 1; i <= 150; i++) {
        const consulta = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const result = await consulta.json();
        
        const foto = result.sprites.front_default;
        
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        const img = document.createElement('img');
        img.src = foto;
        img.alt = `Pokemon ${i}`;

        await new Promise((resolve) => {
            img.onload = resolve;
        });

        pokemonCard.appendChild(img);

        const name = document.createElement('p');
        name.textContent = result.name;
        pokemonCard.appendChild(name);

        document.getElementById('pokemon-list').appendChild(pokemonCard);
    }

    document.querySelector(".loading-screen").style.display = "none";
    document.querySelector(".main").style.display = "block";
}

fotos();
