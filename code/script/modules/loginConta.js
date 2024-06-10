export default function loginUsuario(){
    const dataBtnLogin = document.querySelector("[data-btn-login]")
    const urlApiLogin = "https://ranekapi.origamid.dev/json/jwt-auth/v1/token"
    const botarNome = document.querySelector("[data-btn-conta-ou-login]")
    const dataMenssagemDeErroLogin = document.querySelector("[data-menssagem-de-erro-login]")

    function fazerLogin(url){
        const email = document.querySelector("[data-email-login]").value
        const senha = document.querySelector("[data-senha-login]").value
        const dadosLogin = {
            username:email,
            password:senha,
        }
        const corpoAPI = {
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(dadosLogin)
        }
        fetch(url,corpoAPI).then(response => response.json()).then(dados => {
            if(!!dados.token){
                window.localStorage.setItem("token",dados.token)
                window.localStorage.setItem("dados",dados.user_display_name)
                botarNome.innerHTML = dados.user_display_name 
                 window.location.href = "http://127.0.0.1:5500/code/PageConta/conta.html#"
            }
            if(!!dados.message){
                dataMenssagemDeErroLogin.innerHTML = dados.message
            }
        })
    }
    if(dataBtnLogin !== null){
        dataBtnLogin.addEventListener("click",(e)=>{
            e.preventDefault()
            fazerLogin(urlApiLogin)
        })
    }
}