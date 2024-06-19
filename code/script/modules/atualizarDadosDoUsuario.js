export default function atualizarDados(){
    const dataBtnAtualizarUsuario  = document.querySelector("[data-btn-atualizar-usuario]")
    async function atualizarDados(url){
        const nome = document.querySelector("[data-nome]").value;
        const email = document.querySelector("[data-email]").value;
        const senha = document.querySelector("[data-senha]").value;
        const cep = document.querySelector("[data-cep]").value;
        const rua = document.querySelector("[data-Rua]").value;
        const numero = document.querySelector("[data-Numero]").value;
        const bairro = document.querySelector("[data-Bairro]").value;
        const cidade = document.querySelector("[data-Cidade]").value;
        const estado = document.querySelector("[data-Estado]").value;
        const infosDados = {
            id:email,
            nome:nome,
            email:email,
            senha:senha,
            cep:cep,
            rua:rua,
            numero:numero,
            bairro:bairro,
            cidade:cidade,
            estado:estado,    
        }
        const token = window.localStorage.getItem("token")
    
        const corpoApi = {
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(infosDados)
        }
        const response = await fetch(url,corpoApi)
        const dados = await response.json()
        console.log(dados)
    }

    if(dataBtnAtualizarUsuario !== null){
        dataBtnAtualizarUsuario.addEventListener("click",(e)=>{
            e.preventDefault()
        atualizarDados(`https://ranekapi.origamid.dev/json/api/usuario/`)
    })
}

    
}