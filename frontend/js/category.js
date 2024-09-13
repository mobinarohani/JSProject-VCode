import { getAndShowCategoryCourses, templateCourses } from "./funcs/shared.js";

window.addEventListener("load", () => {
  getAndShowCategoryCourses().then((responseCources) => {
    let courses = [...responseCources];
    let showCourses = "row";
    const coursesContentContainer = document.getElementById(
      "courses-content__container"
    );

    if (courses.length) {
      templateCourses(courses, showCourses, coursesContentContainer);
    } else {
      coursesContentContainer.insertAdjacentHTML(
        "beforeend",
        `<div class='NoCourses'>دوره ای وجود ندارد</div>`
      );
    }

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
          templateCourses(courses, showCourses, coursesContentContainer);
        } else {
          showCourses = "column";
          templateCourses(courses, showCourses, coursesContentContainer);
        }
      });
    });
  });
});
