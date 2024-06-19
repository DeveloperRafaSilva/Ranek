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
        arrayProdutosComprados.forEach(produtosComprados =>{
        const transformarPreco = produtosComprados.produto.preco
        const novoString = transformarPreco.slice(0,1) + "." +  transformarPreco.slice(1) 
        const criarDivParaOsElementosDeCompra = document.createElement("div")
        if(produtosComprados.produto.fotos === null){
            criarDivParaOsElementosDeCompra.innerHTML = `
            <div data-index-produto class="produtos-comprados-container">
                <div>
                    
                </div>
                <div class="card-produtos-comprados">
                    <p class="preco-produto-comprado">R$ ${novoString},00</p>
                    <p class="nome-produto">${produtosComprados.produto.nome}</p>
                    <p><span class="vendedor-nome">vendedor</span> ${produtosComprados.produto.usuario_id}</p>
                </div>
            </div>
            `
            if(dataConteudoCompras !== null){
                dataConteudoCompras.appendChild(criarDivParaOsElementosDeCompra)
            }
          }else{
            criarDivParaOsElementosDeCompra.innerHTML = `
            <div data-index-produto class="produtos-comprados-container">
                <div>
                    <img src="${produtosComprados.produto.fotos[0].src}" alt="${produtosComprados.titulo}"/>
                </div>
                <div class="card-produtos-comprados">
                    <p class="preco-produto-comprado">R$ ${novoString},00</p>
                    <p class="nome-produto">${produtosComprados.produto.nome}</p>
                    <p><span class="vendedor-nome">vendedor</span> ${produtosComprados.produto.usuario_id}</p>
                </div>
            </div>
            `
          }
        if(dataConteudoCompras !== null){
            dataConteudoCompras.appendChild(criarDivParaOsElementosDeCompra)
        }

        const dataIndexProdutos = document.querySelectorAll(`[data-index-produto]`)
        dataIndexProdutos.forEach((itemClick,index) =>{
           itemClick.addEventListener("click",(e)=>{
              e.preventDefault()
            pegarIdProduto(index)
            const produtoId = dados[index].produto.id

           window.localStorage.removeItem("indexProdutoItem2")
           window.localStorage.setItem("indexProdutoItem",produtoId)
           })
        })
        function pegarIdProduto(index){
             window.location.href =  "http://127.0.0.1:5500/code/pageProduto/pageProduto.html"
        }
    })
   }

   pegarDadosDeCompras(`https://ranekapi.origamid.dev/json/api/transacao?comprador_id=${idUsuario}`)

}