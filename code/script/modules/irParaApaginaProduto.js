document.addEventListener("DOMContentLoaded", function() {
    const loadingDiv = document.querySelector(".loading-div")
    const usuarioQueComprou = localStorage.getItem("username");
    const indexProduto = localStorage.getItem("indexProdutoItem");
    const dataProdutosItem = document.querySelector("[data-produtos-item2 ]")
    const token = window.localStorage.getItem("token")      
    // CODIGO DO PRODUTO PARA COLOCAR NA PÁGINA
    async function criarAPaginaDosProdutos(url){
        loadingDiv.style.display = "none"
        const corpoApiProduto = {
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            
        }

        const response = await fetch(url,corpoApiProduto)
        const dadosProdutos = await response.json()
        criarHtmlDoProdutoItem(dadosProdutos)
    }

    function criarHtmlDoProdutoItem(dadosProdutos){
        console.log(dadosProdutos)
        if(dadosProdutos.fotos === null || dadosProdutos.fotos === undefined){
            const criarImagemDoProduto = document.createElement("div")
            criarImagemDoProduto.classList.add("colum-1")
            criarImagemDoProduto.innerHTML = `
            <div>
            
            </div>
            `
            dataProdutosItem.appendChild(criarImagemDoProduto)
            }else if(dadosProdutos.fotos[1] === undefined){
                const criarImagemDoProduto = document.createElement("div")
                criarImagemDoProduto.innerHTML = `
                <div>
                    <img src="${dadosProdutos.fotos[0].src}" alt="${dadosProdutos.fotos[0].titulo}" />
                </div>
                `
                dataProdutosItem.appendChild(criarImagemDoProduto)
                }else{
                    const criarImagemDoProduto = document.createElement("div")
                    criarImagemDoProduto.innerHTML = `
                <div>
                    <img src="${dadosProdutos.fotos[0].src}" alt="${dadosProdutos.fotos[0].titulo}" />
                    <img src="${dadosProdutos.fotos[1].src}" alt="${dadosProdutos.fotos[1].titulo}" />
                </div>
            `
            dataProdutosItem.appendChild(criarImagemDoProduto)
         }
        const criarCorpoDoProduto = document.createElement("div")
        criarCorpoDoProduto.innerHTML = `
            <div>
                <h1 class="nome-produto-page">${dadosProdutos.nome}</h1 class="preco-produto-page">
                <p class="preco-produto-page">R$ ${dadosProdutos.preco}</p>
                <p class="descricao-produto-page">${dadosProdutos.descricao}</p>
                <div>
                    <a data-abrir-formulario class="btn-principal" href="#">Comprar</a>
                </div>
            </div>
        `
        dataProdutosItem.appendChild(criarCorpoDoProduto)

        const botaoAbrirFormularo = document.querySelector("[data-abrir-formulario]")

        abrirFormularioDeCompra(botaoAbrirFormularo,criarCorpoDoProduto,dadosProdutos)
        
        }
        
        function abrirFormularioDeCompra(btnFormulario,criarCorpoDoProduto,dadosProdutos){
            const corpoDoFormularioDeCompra = document.createElement("div")
            
            corpoDoFormularioDeCompra.innerHTML = `
            <form data-formulario-abrir action="get">
            <h1>Endereço de Envio</h1>
                <div class="login-campo-item">
                    <label for="Nome">Nome</label>
                    <input data-nome type="Nome" name="Nome" id="nome-user">
                </div>
                <div class="login-campo-item">
                    <label for="email">Email</label>
                    <input data-email type="email" name="Email" id="email-user">
                </div>
                <div class="login-campo-item">
                    <label for="Senha">Senha</label>
                    <input data-senha type="Senha" name="Senha" id="senha-user">
                </div>
                <div class="login-campo-item">
                    <label for="Cep">Cep</label>
                    <input data-cep type="Cep" name="Cep" id="cep-user">
                </div>
                <div class="login-campo-item">
                    <label for="Rua">Rua</label>
                    <input data-Rua type="Rua" name="Rua" id="Rua-user">
                </div>
                <div class="login-campo-item">
                    <label for="Numero">Numero</label>
                    <input data-Numero type="Numero" name="Numero" id="Numero-user">
                </div>
                <div class="login-campo-item">
                    <label for="Bairro">Bairro</label>
                    <input data-Bairro type="Bairro" name="Bairro" id="Bairro-user">
                </div>
                <div class="login-campo-item">
                    <label for="Cidade">Cidade</label>
                    <input data-Cidade type="Cidade" name="Cidade" id="Cidade-user">
                </div>
                <div class="login-campo-item">
                    <label for="Estado">Estado</label>
                    <input data-Estado type="Estado" name="Estado" id="Estado-user">
                </div>
                <div  class="btn-div btn">
                    <a data-btn-comprar-produto class="btn-comprar" href="#">Finalizar compra</a>
                </div>
            </form>
            `
            criarCorpoDoProduto.appendChild(corpoDoFormularioDeCompra)
            const formularioDeCompra = document.querySelector("[data-formulario-abrir]")

            const dadosDoFormulario = {
                nome:document.querySelector("[data-nome]"),
                email:document.querySelector("[data-email ]"),
                cep:document.querySelector("[data-cep]"),
                rua:document.querySelector("[data-rua]"),
                numero:document.querySelector("[data-Numero]"),
                bairro:document.querySelector("[data-Bairro]"),
                cidade:document.querySelector("[data-Cidade]"),
                estado:document.querySelector("[data-Estado]"),
            }

            btnFormulario.addEventListener("click",(e)=>{
                e.preventDefault()
                formularioDeCompra.style.display = "block"
                btnFormulario.style.display = "none"
                })
            formularioDeCompra.style.display = "none"

            pegarDadosDoUsuario(dadosDoFormulario,dadosProdutos)
        }
        
       async function pegarDadosDoUsuario(dadosDoFormulario,dadosProdutos){
            const corpoApi = {
                method:"GET",
                headers:{
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }

            const response = await fetch("https://ranekapi.origamid.dev/json/api/usuario/",corpoApi)
            const dados = await response.json()
            dadosDoFormulario.nome.value = dados.nome
            dadosDoFormulario.email.value = dados.email
            dadosDoFormulario.cep.value = dados.cep
            dadosDoFormulario.numero.value = dados.numero
            dadosDoFormulario.bairro.value = dados.bairro
            dadosDoFormulario.cidade.value = dados.cidade
            dadosDoFormulario.estado.value = dados.estado
            dadosDoFormulario.rua.value = dados.rua          

            const dataComprarProduto = document.querySelector("[data-btn-comprar-produto ]")
            dataComprarProduto.addEventListener("click",()=>{
                comprarProduto(dadosProdutos,dados)
                })
                }  
                async   function comprarProduto(produtoAComprar,dadosdeCompra){
         console.log(produtoAComprar)

            const dadosDeCompras = {
                comprador_id:usuarioQueComprou,
                vendedor_id:produtoAComprar.usuario_id,
                endereco:dadosdeCompra,
                produto:produtoAComprar,
            }
            window.localStorage.setItem("vendedorId",produtoAComprar.usuario_id)

            const corpoApi = {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body:JSON.stringify(dadosDeCompras)
            }
            const response = await fetch("https://ranekapi.origamid.dev/json/api/transacao",corpoApi)
            const dados = await response.json()

        }

        criarAPaginaDosProdutos(`https://ranekapi.origamid.dev/json/api/produto/${indexProduto}`);
})

