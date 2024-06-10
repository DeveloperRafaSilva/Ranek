export default function pegarProdutoApi(){
const dataProdutosItem = document.querySelector("[data-produtos-item]")
const loadingDiv = document.querySelector(".loading-div")

  async function fazerFetch(url){
      const resposta = await fetch(url);
      const pegarResposta = await resposta.json()
        await pegarResposta.forEach(itemProduto =>{
            if(itemProduto.fotos === null){
             let criarEstruturaHtml =  document.createElement("div") 
             criarEstruturaHtml.innerHTML = `
             <div data-index-produto class="card-item-produtos">
            <div class="imagem-api">
            </div>
            <div class="conteudo-produto-texto">
                <p class="preco-produto2">R$${itemProduto.preco}</p>
                <h2 class="nome-produto">${itemProduto.nome}</h2>
                <p class="descricao-produtos">${itemProduto.descricao}</p>
            </div>
            </div>
            `    
        if(dataProdutosItem !== null){
            dataProdutosItem.appendChild(criarEstruturaHtml)
        }
        }else{
            let criarEstruturaHtml =  document.createElement("div") 
        criarEstruturaHtml.innerHTML = `
        <div data-index-produto class="card-item-produtos">
       <div class="imagem-api">
           <img src="${itemProduto.fotos[0].src}" alt="Produto eletrônicos" />
       </div>
        <div class="conteudo-produto-texto">
            <p class="preco-produto2">R$${itemProduto.preco}</p>
            <h2 class="nome-produto">${itemProduto.nome}</h2>
            <p class="descricao-produtos">${itemProduto.descricao}</p>
        </div>
       </div>
       `   
       if(dataProdutosItem !== null){
           dataProdutosItem.appendChild(criarEstruturaHtml)
       }
    }
        })
        const indexProdutoAoClick = document.querySelectorAll("[data-index-produto]")
        indexProdutoAoClick.forEach((itemClick,index)=>{
            itemClick.addEventListener("click",(e)=>{
                e.preventDefault()
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
        if(loadingDiv !== null){
            loadingDiv.style.display = "none"
        }
    }finally{
        if(loadingDiv !== null){
            loadingDiv.style.display = "none"
        }
    }


}