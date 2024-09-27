import {
  getAndShowCategoryCourses,
  templateCourses,
  coursesFiltering,
} from "./funcs/shared.js";

import { searchInArray ,  paginateItem, getUrlParams,addParamToUrl} from "./funcs/utils.js";

window.addParamToUrl=addParamToUrl

window.addEventListener("load", () => {
  getAndShowCategoryCourses().then((responseCources) => {
    let courses = [...responseCources];
    let showCourses = "row";
    const coursesContentContainer = document.getElementById(
      "courses-content__container"
    );

    // show courses by defualt
    if (courses.length) {
      templateCourses(courses, showCourses, coursesContentContainer);
    } else {
      coursesContentContainer.insertAdjacentHTML(
        "beforeend",
        `<div class='NoCourses'>دوره ای وجود ندارد</div>`
      );
    }

    // set how to display courses
    let changeShowCourses = document.querySelectorAll(
      ".courses-top-bar__parent-icone"
    );

    changeShowCourses.forEach((item) => {
      item.addEventListener("click", (event) => {
        changeShowCourses.forEach((icon) =>
          icon.classList.remove("courses-top-bar__icon--active")
        );
        item.classList.add("courses-top-bar__icon--active");
        if (String(item.classList).includes("row")) {
          showCourses = "row";
          templateCourses([...coursePagination], showCourses, coursesContentContainer);
        } else {
          showCourses = "column";
          templateCourses([...coursePagination], showCourses, coursesContentContainer);
        }
      });
    });

    // Show courses based on the selected filter

    const coursesItemSelections = document.querySelectorAll(
      ".courses-top-bar__selection-item"
    );
    const coursesItemSelectionsTitle = document.querySelector(
      ".courses-top-bar__selection-title"
    );

    coursesItemSelections.forEach((item) => {
      item.addEventListener("click", (event) => {
        coursesItemSelections.forEach((courses) =>
          courses.classList.remove("courses-top-bar__selection-item--active")
        );
        event.target.classList.add("courses-top-bar__selection-item--active");

        coursesItemSelectionsTitle.innerHTML = "";
        coursesItemSelectionsTitle.insertAdjacentHTML(
          "beforeend",
          `
          ${event.target.innerHTML}
          <i class="fas fa-angle-down courses-top-bar__selection-icon"></i>
          `
        );

        let filterKey = event.target.dataset.key;
        let showCoursesFiltering = coursesFiltering([...courses], filterKey);
        templateCourses(
          showCoursesFiltering,
          showCourses,
          coursesContentContainer
        );
      });
    });

    // Show courses based on search

    let inputSearchCourses = document.querySelector(".courses-top-bar__input");

    inputSearchCourses.addEventListener("input", (event) => {
      let showCoursesSearch = searchInArray(
        [...responseCources],
        "name",
        event.target.value
      );
      if (showCoursesSearch.length) {
        templateCourses(
          showCoursesSearch,
          showCourses,
          coursesContentContainer
        );
      } else {
        coursesContentContainer.innerHTML = "";
        coursesContentContainer.insertAdjacentHTML(
          "beforeend",
          `<div class='NoCourses'>دوره ای وجود ندارد</div>`
        );
      }
    });

    // show pagination

    let containerpagination=document.querySelector('.courses__pagination-list')
    const currentPage=getUrlParams('page')
    const coursePagination=paginateItem([...responseCources],3,currentPage,containerpagination)
    templateCourses([...coursePagination], showCourses, coursesContentContainer);
  });
});
