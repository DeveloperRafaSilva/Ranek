export default function ModalClick(){
   const dataBtnCriarContaModal = document.querySelector("[data-btn-criar-conta-modal]");
   const dataModalCriarConta = document.querySelector("[data-modal-criar-conta]");


   if(dataModalCriarConta !== null){
      dataModalCriarConta.style.display = "none"      
   }
   if(dataBtnCriarContaModal !== null){

      dataBtnCriarContaModal.addEventListener("click",(e)=>{
         e.preventDefault()
         dataModalCriarConta.style.display = "block"
         dataBtnCriarContaModal.style.display = "none"
      })
   }
}