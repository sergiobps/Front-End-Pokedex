const fetchPokemon = () => {
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value;

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput.toLowerCase()}`;
    fetch(url).then((res) => {
        if(res.status != "200") {
            /* No se encontro el pokemon */
            console.log("estatus: " + res);
            pokeImage("./img/nofound.png");
            const nombre = document.getElementById("nombre");
            nombre.innerHTML = "¡No encontrado!";
            setDatos("");
        }
        else {
            console.log(res);
            return res.json();
        }
    }).then((data) => {
        console.log(data);
        /* CARGAR DATOS DESDE POKEAPI */
        let pokeImg = data.sprites.front_default;

        let pokeTipo = "";
        let cantTipos = Object.keys(data.types).length;
        for(let i = 0; i < cantTipos ; i++)
        {
            pokeTipo += data.types[i].type.name + " ";
        }

        let pokeEstadisticas = "";
        let cantEstadisticas = Object.keys(data.stats).length;
        for(let i = 0; i < cantEstadisticas ; i++)
        {
            pokeEstadisticas += data.stats[i].stat.name + " ";
        }

        let pokeMovs = "";
        let cantMovs = Object.keys(data.moves).length;
        for(let i = 0; i < cantMovs ; i++)
        {
            pokeMovs += data.moves[i].move.name + "\n";
        }

        pokeImage(pokeImg);
        nombre.innerHTML = pokeInput.toUpperCase();
        setDatos(
            "Tipo(s): " + pokeTipo + "\n\n" + 
            "Estadisticas: " +  pokeEstadisticas + "\n\n" + 
            "Movimientos: " + pokeMovs);
    });
}

const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

const setDatos = (texto) => {
    const txtDatos = document.getElementById("txtDatos");
    txtDatos.textContent = texto;
}