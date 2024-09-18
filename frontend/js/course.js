import { getCourseDetails , getAndShowRelatedCourse} from "./funcs/shared.js";

window.addEventListener('load',()=>{
    getCourseDetails() 
    getAndShowRelatedCourse().then(data=>{
        console.log(data);
        
    })
})