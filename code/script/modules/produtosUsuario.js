export default function produtosUsuario(){
    const IdUsuario = window.localStorage.getItem("idUsuario")
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
        const arrayDados = Array.from(dados)
        arrayDados.forEach(itemProdutos =>{
            const createDivProdutos = document.createElement("div")
            if(itemProdutos.fotos !== null){  
            createDivProdutos.innerHTML = `
            <div class="container-produtos">
                <div class="imagem-meu-produto">
                    <img src="${itemProdutos.fotos ? itemProdutos.fotos[0].src : ""}" />
                </div>
                <div class="infos-produto">
                <p>R$  ${itemProdutos.preco}</p>
                <p>${itemProdutos.nome}</p>
                <p>${itemProdutos.descricao}</p>
                </div>
                <button data-btn-deletar-produto  class="botao-deletar">-</button>
            </div>
            `
        }else{
            createDivProdutos.innerHTML = `
            <div class="container-produtos">
                <div class="container-grid">
                    <div></div>
                </div>
                <div class="infos-produto">
                    <p>R$  ${itemProdutos.preco}</p>
                    <p>${itemProdutos.nome}</p>
                    <p>${itemProdutos.descricao}</p>
                </div>
                <button data-btn-deletar-produto class="botao-deletar">-</button>
            </div>
            `
        }
        if(dataConteudoMeusProdutos !== null){
            dataConteudoMeusProdutos.appendChild(createDivProdutos)
        }

        const dataBtnDeletarProduto = document.querySelectorAll("[data-btn-deletar-produto]")
       dataBtnDeletarProduto.forEach((btnDeletar,index) =>{
        btnDeletar.addEventListener("click",()=>{
            deletarProduto(index)
        })
       })

      async  function deletarProduto(index){
            const corpoApi = {
                method:"DELETE",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            const produtoId  = dados[index].id
            const resposta = await fetch(`https://ranekapi.origamid.dev/json/api/produto/${produtoId}`,corpoApi)
            const dadosResponse = await resposta.json()
        }

        }) 
      }
    peagrProdutosUsuarioPostado(`https://ranekapi.origamid.dev/json/api/produto?usuario_id=${IdUsuario}`)
}