export default function criarUsuarioApi(){
    const dataBtnCriarUsuario = document.querySelector("[data-btn-criar-usuario]")
    const dataMenssagemDeErroUsuario = document.querySelector("[data-menssagem-de-erro-cadastro]")
    const botarNome = document.querySelector("[data-btn-conta-ou-login]")
    const urlApi = "https://ranekapi.origamid.dev/json/api/usuario"
    function criarUsuario(url){
        const nome = document.querySelector("[data-nome]").value
        const email = document.querySelector("[data-email]").value
        const senha = document.querySelector("[data-senha]").value
        const cep = document.querySelector("[data-cep]").value
        const Rua = document.querySelector("[data-Rua]").value
        const Numero = document.querySelector("[data-Numero]").value
        const Bairro = document.querySelector("[data-Bairro]").value
        const Cidade = document.querySelector("[data-Cidade]").value
        const Estado = document.querySelector("[data-Estado]").value

    const dados = {
        nome:nome,
        email:email,
        senha:senha,
        cep:cep,
        rua:Rua,
        numero:Numero,
        bairro:Bairro,
        cidade:Cidade,
        estado:Estado
    }
    const corpoAPI = {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(dados)
    }
    fetch(url,corpoAPI).then(response => response.json()).then(dados => {
        if(!!dados.data){
            console.log(dados)
            dataMenssagemDeErroUsuario.innerHTML = dados.message
        }else{
            window.localStorage.setItem("dadosUsuario",dados.display_name)
            window.localStorage.setItem("idUsuario",dados.ID)
            console.log(dados)
            window.location.href = "http://127.0.0.1:5500/code/PageConta/conta.html#"
        }
    })
}
    const name =    window.localStorage.getItem("dadosUsuario")
    const name2 =    window.localStorage.getItem("dados")
    if(name !== null){
        botarNome.innerHTML = name
    }else if(name2){
        botarNome.innerHTML = name2
    }else{
        botarNome.innerHTML = "Login / Vender"

    }

    if(dataBtnCriarUsuario !== null){   
        dataBtnCriarUsuario.addEventListener("click",()=>{
            criarUsuario(urlApi)
        })
    }
}