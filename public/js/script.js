const modalLogin = document.getElementById("modalLogin");
const modalCadastro = document.getElementById("modalCadastro");

const abrirLogin = document.getElementById("abrirLogin");
const abrirLoginTraduz = document.getElementById("abrirLoginTraduz");
const abrirLoginAprender = document.getElementById("abrirLoginAprender");

const fecharLogin = document.getElementById("fecharLogin");
const fecharCadastro = document.getElementById("fecharCadastro");

const abrirCadastro = document.getElementById("abrirCadastro");
const voltarLogin = document.getElementById("voltarLogin");


function mostrarLogin() {
    modalCadastro.style.display = "none";
    modalLogin.style.display = "flex";
}


function mostrarCadastro() {
    modalLogin.style.display = "none";
    modalCadastro.style.display = "flex";
}


abrirLogin.addEventListener("click", function(event) {
    event.preventDefault();
    mostrarLogin();
});


abrirLoginTraduz.addEventListener("click", function(event) {
    event.preventDefault();
    mostrarLogin();
});


abrirLoginAprender.addEventListener("click", function(event) {
    event.preventDefault();
    mostrarLogin();
});


fecharLogin.addEventListener("click", function() {
    modalLogin.style.display = "none";
});


fecharCadastro.addEventListener("click", function() {
    modalCadastro.style.display = "none";
});


abrirCadastro.addEventListener("click", function(event) {
    event.preventDefault();
    mostrarCadastro();
});


voltarLogin.addEventListener("click", function(event) {
    event.preventDefault();
    mostrarLogin();
});