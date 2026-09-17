async function emergencia() {

    navigator.geolocation.getCurrentPosition(async function(posicao) {

        const latitude = posicao.coords.latitude;
        const longitude = posicao.coords.longitude;

        await fetch("http://localhost:3000/api/emergencia", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                latitude: latitude,
                longitude: longitude
            })

        });

        alert("Sua localização foi enviada com sucesso!");

    }, function() {

        alert("Não foi possível obter sua localização.");

    });

}

