export default function produtosUsuario(){
    const IdUsuario = window.localStorage.getItem("idUsuario")
    const dataConteudoMeusProdutos = document.querySelector("[data-conteudo-meus-produtos]")
    fetch(`https://ranekapi.origamid.dev/json/api/produto?usuario_id=lobo@origamid.com`).then(response => response.json()).then(dados => {
        dados.forEach(itemProdutos =>{
            const createDivProdutos = document.createElement("div")
            createDivProdutos.innerHTML = `
            <div class="container-produtos">
                <div class="imagem-meu-produto">
                    <img src="${itemProdutos.fotos[0].src}" />
                </div>
                <div class="infos-produto">
                <p>R$  ${itemProdutos.preco}</p>
                <p>${itemProdutos.nome}</p>
                <p>${itemProdutos.descricao}</p>
                </div>
            </div>
            `
            if(dataConteudoMeusProdutos !== null){

                dataConteudoMeusProdutos.appendChild(createDivProdutos)
            }
        })
    })
}