export default function filtrarProdutos(){
   const dataImagemBusca = document.querySelector("[data-imagem-busca]")
   const dataProdutosItem = document.querySelector("[data-produtos-item]")
   const loadingDiv = document.querySelector(".loading-div")
   const dataPaginationContainer = document.querySelector("[data-pagination-container]");
   function pesquisarProduto(){
      try{
      const Pesquisa = document.getElementById("Pesquisa")
       fetch(`https://ranekapi.origamid.dev/json/api/produto/?q=${Pesquisa.value}`).then(response => response.json()).then(dados => {
         const transformarEmArray = Array.from(dados)
         dataProdutosItem.innerHTML = ""
         transformarEmArray.forEach(itemProdutos =>{    
            const transformarPreco = itemProdutos.preco
            const stringPreco = transformarPreco.slice(0,1) + "." +  transformarPreco.slice(1) + ",00"
         if(itemProdutos.fotos === null){
            let criarEstruturaHtml =  document.createElement("div") 
            criarEstruturaHtml.innerHTML = `
            <div data-index-produto class="card-item-produtos">
            <div>
            </div>
            <div class="conteudo-produto-texto"> 
               <p class="preco-produto2">R$ ${itemProdutos.preco}</p>
               <h2 class="nome-produto">${itemProdutos.nome}</h2>
               <p class="descricao-produtos2">${itemProdutos.descricao}</p>
            </div>
            </div>
            `   
         dataProdutosItem.appendChild(criarEstruturaHtml)
      }else{
         let criarEstruturaHtml =  document.createElement("div") 
         criarEstruturaHtml.innerHTML = `
         <div data-index-produto class="card-item-produtos">
         <div>
         <img src="${itemProdutos.fotos[0].src}" alt="Produto eletrônicos" />
         </div>
         <p class="preco-produto">R$${stringPreco}</p>
         <h2 class="nome-produto">${itemProdutos.nome}</h2>
         <p class="descricao-produtos2">${itemProdutos.descricao}</p>
         </div>
         `   
      dataProdutosItem.appendChild(criarEstruturaHtml)
   }
   })

      console.log(transformarEmArray)

      if(transformarEmArray.length === 0){
         const criarElemento = document.createElement("span")
         criarElemento.classList.add("menssagem-produtos")
         criarElemento.innerHTML = "Busca sem resultados. Tente buscar outro termo."
         dataProdutosItem.style.display = "flex"
         dataProdutosItem.appendChild(criarElemento)
      }else{
         dataProdutosItem.style.display = "grid"
         
      }
      const dataIndexProdutos = document.querySelectorAll("[data-index-produto]")
      dataIndexProdutos.forEach((itemClick,index) =>{
         itemClick.addEventListener("click",(e)=>{
            e.preventDefault()
          pegarIdProduto(index)
         })
      })
      function pegarIdProduto(index){
         window.localStorage.setItem("indexProdutoItem",dados[index].id)
           window.location.href =  "http://127.0.0.1:5500/code/pageProduto/pageProduto.html"
      }
       })
       if(loadingDiv !== null){
         loadingDiv.style.display = "none"
     }
   }catch(erro){
      console.log(erro)
   }finally{

   }
   }

   if(dataImagemBusca !== null){
      dataImagemBusca.addEventListener("click",(e)=>{
         e.preventDefault()
         pesquisarProduto()
      })
   }
}