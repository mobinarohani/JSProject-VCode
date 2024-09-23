import { showUserNmaeInNavbar , renderTopbarMenus ,  getAndShowNavbarMenu ,newsLetterEmailObj} from "./funcs/shared.js";

window.addEventListener('load',()=>{
    showUserNmaeInNavbar()
    renderTopbarMenus()
    getAndShowNavbarMenu()

    const btnSubmitNewsLetter=document.querySelector('#btnSubmit__newLetter')

    btnSubmitNewsLetter.addEventListener('click',()=>{
        newsLetterEmailObj()
    })
})