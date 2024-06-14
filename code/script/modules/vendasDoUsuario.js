document.addEventListener("DOMContentLoaded",function(){
    const token = window.localStorage.getItem("token")
    const dataVendasContainer = document.querySelector("[data-vendas-container]")
    const usuarioQueComprou = localStorage.getItem("idUsuario");
    const vendedorProduto = localStorage.getItem("vendedorId");
   async function pegarVendasDoUsuario(){
    const corpoApi = {
        method:"GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    const response = await fetch(`https://ranekapi.origamid.dev/json/api/transacao?tipo=vendedor_id10696`,corpoApi)
    const dados = await response.json()
    const produtosArray = Array.from(dados)
    try{
        produtosArray.forEach(ProdutosVendas =>{
        const transformarPreco = ProdutosVendas.produto.preco
        const novoString = transformarPreco.slice(0,1) + "." +  transformarPreco.slice(1) 
        const criarElementoParaVendas  = document.createElement("div")
        criarElementoParaVendas.classList.add("container-vendas")
        criarElementoParaVendas.innerHTML = `
           <div class="produtos-comprados-container2">
            <div>
                <img src="${ProdutosVendas.produto.fotos[0].src}" alt="${ProdutosVendas.titulo}"/>
            </div>
            <div class="card-produtos-comprados">
                <p class="preco-produto-comprado">R$ ${novoString},00</p>
                <p class="nome-produto">${ProdutosVendas.produto.nome}</p>
                <p><span class="vendedor-nome">Comprador</span> ${ProdutosVendas.comprador_id}</p>
            </div>
            <div class="titulo-de-entrega">
                <h3>Entrega:</h3>
            </div>
            <div class="infos-da-entrega">
                <p>CEP: ${ProdutosVendas.endereco.cep}</p>
                <p>Rua: ${ProdutosVendas.endereco.rua}</p>
                <p>Numero: ${ProdutosVendas.endereco.numero}</p>
                <p>Bairro: ${ProdutosVendas.endereco.bairro}</p>
                <p>Cidade: ${ProdutosVendas.endereco.cidade}</p>
                <p>Estado: ${ProdutosVendas.endereco.estado}</p>
            </div>
        </div>
        `       
        dataVendasContainer.appendChild(criarElementoParaVendas)
    })
    }catch(erro){
        console.log(erro)
    }finally{       
      
    } 
}
pegarVendasDoUsuario()

})