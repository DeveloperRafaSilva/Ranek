export default function pegarDadosDoUsuario(){
        const nome = document.getElementById("nome-user")
        const email  = document.getElementById("email-user")
        const cep  = document.getElementById("cep-user")
        const Rua  = document.getElementById("Rua-user")
        const Numero  = document.getElementById("Numero-user")
        const Bairro  = document.getElementById("Bairro-user")
        const Cidade  = document.getElementById("Cidade-user")
        const Estado  = document.getElementById("Estado-user")
         const token  = localStorage.getItem("token")

    async function fazerFetch(){
    const response = await fetch("https://ranekapi.origamid.dev/json/api/usuario",{
        method:"GET",
        headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer   ${token}`
        }
    })
        const dados = await response.json()
        if(dados){
            nome.value = dados.nome
            email.value = dados.email
            cep.value = dados.cep
            Rua.value = dados.rua
            Numero.value = dados.numero
            Bairro.value = dados.bairro
            Cidade.value = dados.cidade
            Estado.value = dados.estado
        } 
    }  
    fazerFetch()
}