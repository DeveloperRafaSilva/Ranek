export default function criarUsuarioApi() {
    const dataBtnCriarUsuario = document.querySelector("[data-btn-criar-usuario]");
    const dataMenssagemDeErroUsuario = document.querySelector("[data-menssagem-de-erro-cadastro]");
    const botarNome = document.querySelector("[data-btn-conta-ou-login]");
    const urlApi = "https://ranekapi.origamid.dev/json/api/usuario";

    function criarUsuario(url) {
        const nome = document.querySelector("[data-nome]").value;
        const email = document.querySelector("[data-email]").value;
        const senha = document.querySelector("[data-senha]").value;
        const cep = document.querySelector("[data-cep]").value;
        const rua = document.querySelector("[data-Rua]").value;
        const numero = document.querySelector("[data-Numero]").value;
        const bairro = document.querySelector("[data-Bairro]").value;
        const cidade = document.querySelector("[data-Cidade]").value;
        const estado = document.querySelector("[data-Estado]").value;

        const dados = {
            id:email,
            nome: nome,
            email: email,
            senha: senha,
            cep: cep,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            estado: estado
        };

        window.localStorage.setItem("idUsuario", dados.id);
        const corpoAPI = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        };

        fetch(url, corpoAPI)
            .then(response => response.json())
            .then(dados => {
                if (!!dados.data) {
                    dataMenssagemDeErroUsuario.innerHTML = dados.message;
                } else {
                    window.localStorage.setItem("dadosUsuario", dados.display_name);
                    window.localStorage.setItem("id", dados.display_name);
                    console.log(dados)
                    fazerLoginAutomatico("https://ranekapi.origamid.dev/json/jwt-auth/v1/token", email, senha);
                }
            });
    }

    function fazerLoginAutomatico(url, email, senha) {
        const dadosLogin = {
            username: email,
            password: senha,
        };

        const corpoAPILogin = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosLogin)
        };

        fetch(url, corpoAPILogin)
            .then(response => response.json())
            .then(dados => {
                console.log(dados);
                window.localStorage.setItem("token", dados.token);
                window.localStorage.setItem("username", dados.user_email);
                window.location.href = "http://127.0.0.1:5500/code/PageConta/conta.html#"
            });
    }

    const name = window.localStorage.getItem("dadosUsuario");
    const name2 = window.localStorage.getItem("dados");
    if (name !== null) {
        botarNome.innerHTML = name;
    } else if (name2) {
        botarNome.innerHTML = name2;
    } else {
        botarNome.innerHTML = "Login / Vender";
    }

    if (dataBtnCriarUsuario !== null) {
        dataBtnCriarUsuario.addEventListener("click", (e) => {
            e.preventDefault()
            criarUsuario(urlApi);
        });
    }
}
