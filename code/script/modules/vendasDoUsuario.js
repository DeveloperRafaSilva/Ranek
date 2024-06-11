document.addEventListener("DOMContentLoaded",function(){
    const token = window.localStorage.getItem("token")
    const dataVendasContainer = document.querySelector("[data-vendas-container]")
    const usuarioQueComprou = localStorage.getItem("username");
    const vendedorProduto = localStorage.getItem("vendedorId");
   async function pegarVendasDoUsuario(){

    const corpoApi = {
        method:"GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }

    const response = await fetch(`https://ranekapi.origamid.dev/json/api/transacao?vendedor_iddev@gmail.com`,corpoApi)
    const dados = await response.json()
    
    dados.forEach(ProdutosVendas =>{
        const criarElementoParaVendas  = document.createElement("div")
        criarElementoParaVendas.classList.add("container-vendas")
        console.log(ProdutosVendas)
        criarElementoParaVendas.innerHTML = `
           <div class="produtos-comprados-container2">
            <div>
                <img src="${ProdutosVendas.produto.fotos[0].src}" alt="${ProdutosVendas.titulo}"/>
            </div>
            <div class="card-produtos-comprados">
                <p class="preco-produto-comprado">R$ ${ProdutosVendas.produto.preco}</p>
                <p class="nome-produto">${ProdutosVendas.produto.nome}</p>
                <p><span class="vendedor-nome">Comprador</span> ${ProdutosVendas.comprador_id}</p>
            </div>
            <div class="titulo-de-entrega">
                <h3>Entrega:</h3>
            </div>
            <div class="infos-da-entrega">
                <p>CEP: ${ProdutosVendas.endereco[0].dadosdeCompra.cep}</p>
                <p>Rua: ${ProdutosVendas.endereco[0].dadosdeCompra.rua}</p>
                <p>Numero: ${ProdutosVendas.endereco[0].dadosdeCompra.numero}</p>
                <p>Bairro: ${ProdutosVendas.endereco[0].dadosdeCompra.bairro}</p>
                <p>Cidade: ${ProdutosVendas.endereco[0].dadosdeCompra.cidade}</p>
                <p>Estado: ${ProdutosVendas.endereco[0].dadosdeCompra.estado}</p>
            </div>
        </div>
        `
        dataVendasContainer.appendChild(criarElementoParaVendas)
    })

   }
pegarVendasDoUsuario()

})