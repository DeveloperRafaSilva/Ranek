export default function paginacaoProdutos() {
    const token = window.localStorage.getItem("token");
    const dataProdutosItem = document.querySelector("[data-produtos-item]");
    const dataPaginationContainer = document.querySelector("[data-pagination-container]");
    const loadingdiv = document.querySelector(".loading-div");

    let produtosLimite = 9; // Variável global para o limite de produtos
    async function produtosPagina(pagina) {
        const url = `https://ranekapi.origamid.dev/json/api/produto?_page=${pagina}&_limit=${produtosLimite}&_=${new Date().getTime()}`;

        const corpoApi = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        };

        try {
            loadingdiv.style.display = "flex";
            const resposta = await fetch(url, corpoApi);
            const totalProdutos = resposta.headers.get('x-total-count');
            const total = Math.ceil(totalProdutos / produtosLimite);
            const dados = await resposta.json();
            // Limpar os produtos existentes
            if (dataProdutosItem !== null) {
                dataProdutosItem.innerHTML = "";
            }

            dados.forEach(itemProduto => {
                const transformarPreco = itemProduto.preco
                const preco = transformarPreco.slice(0,1) + "." + transformarPreco.slice(1) + ",00"
                const criarElemento = document.createElement("div");
                if(itemProduto.fotos !== null){
                    criarElemento.innerHTML = `
                    <div data-index-produto-paginacao class="card-item-produtos">
                        <div class="imagem-api">
                            <img src="${itemProduto.fotos[0].src}" alt="Produto eletrônicos" />
                        </div>
                        <div class="conteudo-produto-texto">
                            <p class="preco-produto">R$ ${preco}</p>
                            <h2 class="nome-produto">${itemProduto.nome}</h2>
                            <p class="descricao-produtos">${itemProduto.descricao}</p>
                        </div>
                    </div>
                `;
                if (dataProdutosItem !== null) {
                    dataProdutosItem.appendChild(criarElemento);
                }
            }else{
                criarElemento.innerHTML = `
                <div data-index-produto-paginacao class="card-item-produtos">
                    <div class="imagem-api">
                     
                    </div>
                    <div class="conteudo-produto-texto">
                        <p class="preco-produto2">R$${itemProduto.preco}</p>
                        <h2 class="nome-produto">${itemProduto.nome}</h2>
                        <p class="descricao-produtos">${itemProduto.descricao}</p>
                    </div>
                </div>
            `;
            if (dataProdutosItem !== null) {
                dataProdutosItem.appendChild(criarElemento);
            }
            }

            const dataIndexProdutos = document.querySelectorAll("[data-index-produto-paginacao]")
            dataIndexProdutos.forEach((itemClick,index) =>{
               itemClick.addEventListener("click",(e)=>{
                  e.preventDefault()
                pegarIdProduto(index)
               })
            })
            function pegarIdProduto(index){
               window.localStorage.removeItem("indexProdutoItem")
               window.localStorage.setItem("indexProdutoItem2",dados[index].id)
               console.log(dados[index].id)
                 window.location.href =  "http://127.0.0.1:5500/code/pageProduto/pageProduto.html"
            }
               
            });
            criarPaginacao(total, pagina);

        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        } finally {
            loadingdiv.style.display = "none"; 
        }
    }

    function criarPaginacao(total, paginaAtual) {
        if (dataPaginationContainer !== null) {
            dataPaginationContainer.innerHTML = "";
        }

        for (let i = 1; i <= total; i++) {
            const criarNumeros = document.createElement("span");
            criarNumeros.textContent = i;
            criarNumeros.style.cursor = 'pointer';
            criarNumeros.style.margin = '0 5px';
            criarNumeros.style.padding = '5px';
            criarNumeros.style.border = '1px solid #ccc';
            criarNumeros.style.borderRadius = '3px';

            if (i === paginaAtual) {
                criarNumeros.style.backgroundColor = '#ccc'; 
            }

            (function (pagina) {
                criarNumeros.addEventListener("click", () => produtosPagina(pagina));
            })(i);

            if (dataPaginationContainer !== null) {
                dataPaginationContainer.appendChild(criarNumeros);
            }
        }
    }

    produtosPagina(1);
}
