export default function filtrarProdutos(){
   const dataImagemBusca = document.querySelector("[data-imagem-busca]")
   const dataProdutosItem = document.querySelector("[data-produtos-item]")
   const loadingDiv = document.querySelector(".loading-div")
   function pesquisarProduto(){
      try{
      const Pesquisa = document.getElementById("Pesquisa")
       fetch(`https://ranekapi.origamid.dev/json/api/produto/?q=${Pesquisa.value}`).then(response => response.json()).then(dados => {
         const transformarEmArray = Array.from(dados)
         dataProdutosItem.innerHTML = ""
         transformarEmArray.forEach(itemProdutos =>{        
            let criarEstruturaHtml =  document.createElement("div") 
            criarEstruturaHtml.innerHTML = `
            <div data-index-produto class="card-item-produtos">
            <div>
               <img src="${itemProdutos.fotos[0].src}" alt="Produto eletrônicos" />
            </div>
            <p class="preco-produto2">R$${itemProdutos.preco}</p>
            <h2 class="nome-produto">${itemProdutos.nome}</h2>
            <p class="descricao-produtos2">${itemProdutos.descricao}</p>
            </div>
         `   
         dataProdutosItem.appendChild(criarEstruturaHtml)
      })

      if(transformarEmArray.length === 0){
         const criarElemento = document.createElement("span")
         criarElemento.classList.add("menssagem-produtos")
         criarElemento.innerHTML = "Busca sem resultados. Tente buscar outro termo."
         dataProdutosItem.style.display = "flex"
         dataProdutosItem.appendChild(criarElemento)
      }
      const dataIndexProdutos = document.querySelectorAll("[data-index-produto]")
      dataIndexProdutos.forEach((itemClick,index) =>{
         itemClick.addEventListener("click",()=>{
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

   dataImagemBusca.addEventListener("click",()=>{
    pesquisarProduto()
   })
}