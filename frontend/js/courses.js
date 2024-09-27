import { getAllCourses, templateCourses } from "./funcs/shared.js";
import { getUrlParams,paginateItem,addParamToUrl } from "./funcs/utils.js";
window.addParamToUrl=addParamToUrl
window.addEventListener('load',()=>{
    getAllCourses().then(courses=>{
        const coursesWrapper = document.querySelector("#courses-wrapper");
        const paginationWrapper=document.querySelector('.courses__pagination-list')

        const currentpage=getUrlParams('page')

        let coursesPagination=paginateItem([...courses],3,currentpage,paginationWrapper)
        templateCourses([...coursesPagination],'row',coursesWrapper)
    })

})