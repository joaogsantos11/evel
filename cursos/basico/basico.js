let acertos=0;

function verificarResposta() {

    let resposta = document.getElementById("resposta").value;

    document.getElementById("resultado").innerText = "Resposta enviada!";

    document.getElementById("botao1").disabled = true;

}

function verificarResposta2(){
    let resposta= document.getElementById("resposta2").value;
    resposta=resposta.toLowerCase();

if (resposta === "libras") {

    document.getElementById("resultado2").innerText = "Resposta correta!";

    acertos = acertos + 1;

    document.getElementById("botao2").disabled = true;

    if (acertos === 2) {
        document.getElementById("pontuacaototal").innerText =
            "Você terminou! Acertou 2 questões.";
    }

} else {

    document.getElementById("resultado2").innerText =
        "Resposta incorreta. Tente de novo.";

}
};

function enviarResposta() {
    let resposta =document.getElementById("resposta3").value;
    document.getElementById("resultado3").innerText="Resposta enviada!"
}

function mostrarPontuacaototal(){

    if (acertos===1){
        document.getElementById("pontuacaototal").innerText=
        "Você acertou 1 questão";
    }else {
        document.getElementById("pontuacaototal").innerText=
        "Você acertou " + acertos + " questões.";
    }


    
}