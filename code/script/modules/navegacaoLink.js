export default function navegacaoLink(){
    const clickNoLinkDiferentesRotas = document.querySelector("[data-btn-conta-ou-login]")
    const tokenVerificar = window.localStorage.getItem("token")
    function navegacaoLink2(){
        if(!!tokenVerificar){
            clickNoLinkDiferentesRotas.setAttribute("href","/code/PageConta/conta.html")  
        }else{
            clickNoLinkDiferentesRotas.setAttribute("href","/code/PageLogin/PageLogin.html")
        }
    }
    
    clickNoLinkDiferentesRotas.addEventListener("click",(e)=>{
        navegacaoLink2()
    })
    navegacaoLink2()
}