document.addEventListener("DOMContentLoaded", function() {
    const loadingDiv = document.querySelector(".loading-div")
    const indexProduto = localStorage.getItem("indexProdutoItem");
    const dataProdutosItem = document.querySelector("[data-produtos-item]");

    

    async function fazerFetch(url) {
        try{
            const resposta = await fetch(url);
            const pegarResposta = await resposta.json();
            const respostaIndex = pegarResposta;
            let criarEstruturaHtml = document.createElement("div"); 
            if(respostaIndex.fotos[1] === undefined){
                criarEstruturaHtml.innerHTML = `
                <div class="flex-item heigth">
                <div>
                <img src="${respostaIndex.fotos[0].src}" alt="Produto eletrônicos" />
                </div>
                <div class="produto-page">
                    <h2 class="nome-produto">${respostaIndex.nome}</h2>
                    <p class="preco-produto">${respostaIndex.preco}</p>
                    <p class="descricao-produtos">${respostaIndex.descricao}</p>
                    <a class="btn-principal stick" href="#">Comprar</a>
                    </div>
                    </div>
                    `;
                }else{
                    criarEstruturaHtml.innerHTML = `
                    <div class="flex-item heigth2">
                    <div>
                    <img src="${respostaIndex.fotos[0].src}" alt="Produto eletrônicos" />
                    <img src="${respostaIndex.fotos[1].src}" alt="Produto eletrônicos" />
                    </div>
                    <div class="produto-page">
                        <h2 class="nome-produto">${respostaIndex.nome}</h2>
                        <p class="preco-produto">${respostaIndex.preco}</p>
                        <p class="descricao-produtos">${respostaIndex.descricao}</p>
                        <a class="btn-principal stick" href="#">Comprar</a>
                        </div>
                        </div>
                        `; 
                }
        dataProdutosItem.appendChild(criarEstruturaHtml);     
        loadingDiv.style.display = "none"
        }catch(erro){
            console.log(erro)
        }finally{
    
        }     
    }

    fazerFetch(`https://ranekapi.origamid.dev/json/api/produto/${indexProduto}`);
});

