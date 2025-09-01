 async function getPokemon() {
      const input = document.getElementById("pokemon__input").value.toLowerCase();
      const url = `https://pokeapi.co/api/v2/pokemon/${input}`;
      const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${input}`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Pokémon não encontrado!");
        
        const data = await res.json();


        //descrição
        const speciesRes = await fetch(speciesUrl)
        const speciesData = await speciesRes.json()

        // pega descrição em portugues
        let descriptionEntry = speciesData.flavor_text_entries.find(
            entry => entry.language.name === "pt"
        )

        // se não tiver em portugues pega em ingles
        if (!descriptionEntry) {
            descriptionEntry = speciesData.flavor_text_entries.find(
                entry => entry.language.name === "en"
            )
        }

        const description = descriptionEntry ? descriptionEntry.flavor_text.replace(/\n|\f/g, " ") : "Descrição não encontrada";

        document.getElementById("pokemonCard").innerHTML = `
          <div class="card">
            <h2>${data.name.toUpperCase()} (#${data.id})</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p><strong>Tipo:</strong> 
            ${data.types
                .map(t => `<span class="type ${t.type.name}">${t.type.name}</span>`)
                .join(" ")}
            </p>
            <p><strong>Altura:</strong> ${data.height / 10} m</p>
            <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
            <p><strong>Descrição</strong> ${description}</p>
          </div>
        `;
      } catch (err) {
        document.getElementById("pokemonCard").innerHTML = `<p style="color:red;">${err.message}</p>`;
      }
    }