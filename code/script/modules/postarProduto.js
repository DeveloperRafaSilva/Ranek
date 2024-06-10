export default function postarProduto(){
    const token = window.localStorage.getItem("token")
    async function postarProduto(url){
        const nomeProduto = document.getElementById("nome-produto")
        const precoProduto = document.getElementById("preco-produto")
        const fotosProduto = document.getElementById("fotos-produto")
        const descricaoProduto = document.getElementById("descricao-produto")

        const formData = new FormData()
        formData.append("nome",nomeProduto.value)
        formData.append("preco",precoProduto.value)
        formData.append("fotos",fotosProduto.files[0])
        formData.append("descricao",descricaoProduto.value)

        

        const corpoApi = {
            method:"POST",
            headers:{
                "Authorization": `Bearer ${token}`
            },
            body:formData
        } 

        const resposta = await fetch(url,corpoApi)
        const dados = await resposta.json()
        console.log(dados)
    }

    const dataBtnPostar = document.querySelector("[data-btn-postar]")
    if(dataBtnPostar !== null){
        dataBtnPostar.addEventListener("click",(e)=>{
            e.preventDefault()
            postarProduto("https://ranekapi.origamid.dev/json/api/produto")
        })
}
}
