export default function rotaProtegida(){
    const token = window.localStorage.getItem("token")
    const urlAtual = window.location.href
    const rotaLogin = "http://127.0.0.1:5500/code/PageLogin/PageLogin.html#"
    const rotaConta ="http://127.0.0.1:5500/code/PageConta/conta.html#"
    
        if(token){
            if(urlAtual !== rotaConta)
            window.location.href.replace(rotaConta)
         }else{      
            if(urlAtual !== rotaLogin)
            window.location.replace(rotaLogin)   
        }

}