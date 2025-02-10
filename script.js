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
    const startTime = Date.now();
    const lista = document.getElementById('pokemon-list');

    for (let i = 1; i <= 48; i++) {
        const consulta = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const result = await consulta.json();

        const foto = result.sprites.front_default;

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        const img = document.createElement('img');
        img.src = foto;
        img.alt = result.name;

        await new Promise((resolve) => {
            img.onload = resolve;
        });

        const link = document.createElement('a');
        link.href = `pokemon.html?name=${result.name}`; // Link correto
        link.classList.add('pokemon-link');

        const name = document.createElement('p');
        name.textContent = result.name;

        link.appendChild(img);
        link.appendChild(name);
        pokemonCard.appendChild(link);

        lista.appendChild(pokemonCard);
    }

    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, 5000 - elapsedTime);

    setTimeout(() => {
        document.querySelector(".loading-screen").style.display = "none";
        document.querySelector(".main").style.display = "block";
    }, remainingTime);
}

fotos();


document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
});

