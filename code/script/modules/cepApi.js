export default function cepApi(){

    const dataCep  = document.querySelector("[data-cep]")
    const dataRua = document.querySelector("[data-Rua]")
    const dataNumero = document.querySelector("[data-Numero]")
    const dataCidade = document.querySelector("[data-Cidade]")
    const dataEstado  = document.querySelector("[data-Estado]")   
    const dataBairro  = document.querySelector("[data-Bairro]")   

  async  function pegarDadosCep(){
        const response =  await fetch(`https://viacep.com.br/ws/${dataCep.value}/json/`)
        const dados =  await response.json()
        dataBairro.value =   dados.bairro 
        dataCidade.value =   dados.localidade 
        dataRua.value =   dados.logradouro 
        dataEstado.value =   dados.uf 
        dataNumero.value =   dados.complemento 
    }
    if(dataCep !== null){
        dataCep.addEventListener("change",() =>{
            pegarDadosCep()
        })
    }
}