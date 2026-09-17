function emergencia() {
    if (!navigator.geolocation) {
        alert("Seu navegador não suporta geolocalização.");
        return;
    }

    const botao = document.querySelector("button");
    botao.disabled = true;
    botao.innerText = "Obtendo localização...";

    navigator.geolocation.getCurrentPosition(
        function (posicao) {
            const latitude = posicao.coords.latitude;
            const longitude = posicao.coords.longitude;
            const precisao = posicao.coords.accuracy;

            const dados = {
                latitude,
                longitude,
                precisao,
                horario: new Date().toISOString()
            };

            // Envia para o servidor
            fetch("https://seusite.com/api/emergencia", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            })
            .then(resposta => {
                if (!resposta.ok) {
                    throw new Error("Erro ao enviar.");
                }

                alert("Localização enviada com sucesso!");
            })
            .catch(erro => {
                console.error(erro);
                alert("Não foi possível enviar a localização.");
            })
            .finally(() => {
                botao.disabled = false;
                botao.innerText = "🚨 Emergência";
            });
        },

        function (erro) {
            alert("Não foi possível obter sua localização.\n\n" + erro.message);
            botao.disabled = false;
            botao.innerText = "🚨 Emergência";
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}