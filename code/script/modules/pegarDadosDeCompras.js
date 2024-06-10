export default function pegarDadosDeCompras(){
    const dataConteudoCompras = document.querySelector("[data-conteudo-compras]")
    const idUsuario = window.localStorage.getItem("idUsuario")
    const token = window.localStorage.getItem("token")
   async function pegarDadosDeCompras(url){
    const corpoApi = {
        method:"GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    const response = await fetch(url,corpoApi)
    const dados = await response.json()
    const arrayProdutosComprados = Array.from(dados)
    console.log(dados)
   }

   pegarDadosDeCompras(`https://ranekapi.origamid.dev/json/api/transacao?comprador_id${idUsuario}`)

}