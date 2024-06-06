export default function pegarProdutoApi(){
const dataProdutosItem = document.querySelector("[data-produtos-item]")
const loadingDiv = document.querySelector(".loading-div")

// FAZER REQUISISÃO NA API


  async function fazerFetch(url){
      const resposta = await fetch(url);
      const pegarResposta = await resposta.json()
        await pegarResposta.forEach(itemProduto =>{
         let criarEstruturaHtml =  document.createElement("div") 
          criarEstruturaHtml.innerHTML = `
          <div data-index-produto class="card-item-produtos">
            <div>
                <img src="${itemProduto.fotos[0].src}" alt="Produto eletrônicos" />
            </div>
            <p class="preco-produto2">R$${itemProduto.preco}</p>
            <h2 class="nome-produto">${itemProduto.nome}</h2>
            <p class="descricao-produtos">${itemProduto.descricao}</p>
          </div>
          `    
          if(dataProdutosItem !== null){
              dataProdutosItem.appendChild(criarEstruturaHtml)
            }
        })
        const indexProdutoAoClick = document.querySelectorAll("[data-index-produto]")
        indexProdutoAoClick.forEach((itemClick,index)=>{
            itemClick.addEventListener("click",()=>{
                window.localStorage.setItem("indexProdutoItem",pegarResposta[index].id)
                window.location.href =  "http://127.0.0.1:5500/code/pageProduto/pageProduto.html"
            })
        })
        if(loadingDiv !== null){
            loadingDiv.style.display = "none"
        }
    }

    try{
        fazerFetch(`https://ranekapi.origamid.dev/json/api/produto`)
    }catch(erro){
        console.log(erro)
    }finally{
    }


}