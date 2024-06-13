export default function pegarDadosDeCompras(){
    const dataConteudoCompras = document.querySelector("[data-conteudo-compras]")
    const idUsuario = window.localStorage.getItem("username")
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
            <div class="produtos-comprados-container">
                <div>
                    
                </div>
                <div class="card-produtos-comprados">
                    <p class="preco-produto-comprado">R$ ${novoString},00</p>
                    <p class="nome-produto">R$${produtosComprados.produto.nome}</p>
                    <p><span class="vendedor-nome">vendedor</span> ${produtosComprados.produto.usuario_id}</p>
                </div>
            </div>
            `
            if(dataConteudoCompras !== null){
                dataConteudoCompras.appendChild(criarDivParaOsElementosDeCompra)
            }
          }else{
            criarDivParaOsElementosDeCompra.innerHTML = `
            <div class="produtos-comprados-container">
                <div>
                    <img src="${produtosComprados.produto.fotos[0].src}" alt="${produtosComprados.titulo}"/>
                </div>
                <div class="card-produtos-comprados">
                    <p class="preco-produto-comprado">R$ ${novoString},00</p>
                    <p class="nome-produto">R$${produtosComprados.produto.nome}</p>
                    <p><span class="vendedor-nome">vendedor</span> ${produtosComprados.produto.usuario_id}</p>
                </div>
            </div>
            `
          }
        if(dataConteudoCompras !== null){
            dataConteudoCompras.appendChild(criarDivParaOsElementosDeCompra)
        }
    })
   }

   pegarDadosDeCompras(`https://ranekapi.origamid.dev/json/api/transacao?tipo=comprador_id=${idUsuario}`)

}