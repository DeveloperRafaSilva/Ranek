export default function produtosUsuario(){
    const IdUsuario = window.localStorage.getItem("username")
    const token = window.localStorage.getItem("token")
    const dataConteudoMeusProdutos = document.querySelector("[data-conteudo-meus-produtos]")
     async function peagrProdutosUsuarioPostado(url){
        const corpoApi = {
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const response = await fetch(url,corpoApi)
        const dados = await response.json()
        console.log(dados)
        dados.forEach(itemProdutos =>{
            const createDivProdutos = document.createElement("div")
            createDivProdutos.innerHTML = `
            <div class="container-produtos">
                <div class="imagem-meu-produto">
                    <img src="${itemProdutos.fotos[0].src}" />
                </div>
                <div class="infos-produto">
                <p>R$  ${itemProdutos.preco}</p>
                <p>${itemProdutos.nome}</p>
                <p>${itemProdutos.descricao}</p>
                </div>
            </div>
            `
        if(dataConteudoMeusProdutos !== null){
            dataConteudoMeusProdutos.appendChild(createDivProdutos)
        }
        }) 
      }
    peagrProdutosUsuarioPostado(`https://ranekapi.origamid.dev/json/api/produto?tipo=usuario_id=${IdUsuario}`)
}