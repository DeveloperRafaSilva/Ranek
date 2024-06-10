export default function logOut(){
    const dataBtnLogof = document.querySelector("[data-btn-logof]")

    if(dataBtnLogof !== null){
        dataBtnLogof.addEventListener("click",(e)=>{
            e.preventDefault()
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("dados")
            window.localStorage.removeItem("dadosUsuario")
            window.location.href = "http://127.0.0.1:5500/code/PageLogin/PageLogin.html#"
        })
    }
}