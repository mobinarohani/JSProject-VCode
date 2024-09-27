import { getCourseDetails , getAndShowRelatedCourse,submitComment} from "./funcs/shared.js";

window.addEventListener('load',()=>{
    getCourseDetails() 
    getAndShowRelatedCourse()

    const btnSubmitComment=document.querySelector('.comments__respond-btn')

    btnSubmitComment.addEventListener('click',()=>{
        submitComment()
    })
})