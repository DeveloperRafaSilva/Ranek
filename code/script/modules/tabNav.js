export default function tabNav(){
    const dataLinksTabNav = document.querySelectorAll("[data-links-tabNav]")
    const dataContainerModal = document.querySelectorAll("[data-container-modal]")

    dataLinksTabNav.forEach((itemClikc,index)=>{
        itemClikc.addEventListener("click",(e)=>{
            e.preventDefault()
            aparecerModal(index)
        })
    })

    function aparecerModal(index){
        dataContainerModal.forEach((itemAdd)=>{
            itemAdd.classList.remove("on")
        })
        
        dataLinksTabNav.forEach((itemAdd)=>{
            itemAdd.classList.remove("ativo")
        })
        
        dataLinksTabNav[index].classList.add("ativo")
        dataContainerModal[index].classList.add("on")
    }
}