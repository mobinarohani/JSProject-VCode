import { getMe } from "./auth.js";
import {
  isLogin,
  getUrlParams,
  getUrlParamsWithSplit,
  getToken,
} from "./utils.js";

// get class and return element
function getClassAndReturnElement(className) {
  return document.querySelector(`.${className}`);
}

// get id and return element
function getIdAndReturnElement(className) {
  return document.querySelector(`#${className}`);
}

const showUserNmaeInNavbar = () => {
  const userNmaeProfile = getClassAndReturnElement("main-header__profile");
  const loginValue = isLogin();

  if (loginValue) {
    userNmaeProfile.setAttribute("href", "index.html");
    getMe().then((data) => {
      userNmaeProfile.innerHTML = `<span class="main-header__profile-text">${data.name}</span>`;
    });
  } else {
    userNmaeProfile.setAttribute("href", "login.html");
    userNmaeProfile.innerHTML =
      '<span class="main-header__profile-text">ثبت نام / ورود</span>';
  }
};

const renderTopbarMenus = async () => {
  const topbarList = getClassAndReturnElement("top-bar__menu");

  topbarList.innerHTML = "";

  const res = await fetch("http://127.0.0.1:4000/v1/menus/topbar");

  const topbarMenus = await res.json();

  const shuffedArray = topbarMenus.sort((a, b) => 0.5 - Math.random());

  shuffedArray.splice(0, 6).map((item) => {
    topbarList.innerHTML += ` <li class="top-bar__item">
                                <a href="" class="top-bar__item-link">${item.title}</a>
                            </li>`;
  });
};

const getAndShowAllCourses = async () => {
  const coursesContainer = getIdAndReturnElement("coursesContainer");
  const res = await fetch("http://127.0.0.1:4000/v1/courses");

  const courses = await res.json();

  courses.slice(0, 6).map((item) => {
    coursesContainer.insertAdjacentHTML(
      "beforeend",
      `             <div class="course__item">
                      <div class="course-box">
                        <a href="course.html?name=${item.shortName}">
                          <img src=http://127.0.0.1:4000/courses/covers/${
                            item.cover
                          } alt="Course img" class="course-box__img" />
                        </a>
                        <div class="course-box__main">
                          <a href="course.html?name=${
                            item.shortName
                          }" class="course-box__title">${item.name}</a>
      
                          <div class="course-box__rating-teacher">
                            <div class="course-box__teacher">
                              <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                              <a href="#" class="course-box__teacher-link">${
                                item.creator
                              }</a>
                            </div>
                            <div class="course-box__rating">
                             ${Array(5 - item.courseAverageScore)
                               .fill(0)
                               .map(
                                 (score) =>
                                   `<img src="images/svgs/star.svg" alt="rating" class="course-box__star">`
                               )
                               .join("")}
                             
                            ${Array(item.courseAverageScore)
                              .fill(0)
                              .map(
                                (score) =>
                                  `<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">`
                              )
                              .join("")}
                            </div>
                          </div>
      
                          <div class="course-box__status">
                            <div class="course-box__users">
                              <i class="fas fa-users course-box__users-icon"></i>
                              <span class="course-box__users-text">${
                                item.registers
                              }</span>
                            </div>
                            <span class="course-box__price">${
                              item.price === 0
                                ? "رایگان"
                                : item.price.toLocaleString()
                            }</span>
                          </div>
                        </div>
      
                        <div class="course-box__footer">
                          <a href="#" class="course-box__footer-link">
                            مشاهده اطلاعات
                            <i class="fas fa-arrow-left course-box__footer-icon"></i>
                          </a>
                        </div>
      
                      </div>
                    </div>`
    );
  });

  return courses;
};

const getAndShowPopulareCouses = async () => {
  const popularCoursesContainer = getIdAndReturnElement(
    "popularCoursesContainer"
  );

  const res = await fetch("http://127.0.0.1:4000/v1/courses/popular");

  const populareCourses = await res.json();

  populareCourses.forEach((item) => {
    popularCoursesContainer.insertAdjacentHTML(
      "beforeend",
      ` <div class="swiper-slide sw-slide">
    <div class="course-box">
      <a href="#">
        <img src=http://127.0.0.1:4000/courses/covers/${
          item.cover
        } alt="Course img" class="course-box__img" />
      </a>
      <div class="course-box__main">
        <a href="#" class="course-box__title">${item.name}</a>

        <div class="course-box__rating-teacher">
          <div class="course-box__teacher">
            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
            <a href="#" class="course-box__teacher-link">${item.creator}</a>
          </div>
          <div class="course-box__rating">
          ${Array(5 - item.courseAverageScore)
            .fill(0)
            .map(
              (score) =>
                `<img src="images/svgs/star.svg" alt="rating" class="course-box__star">`
            )
            .join("")}
          
         ${Array(item.courseAverageScore)
           .fill(0)
           .map(
             (score) =>
               `<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">`
           )
           .join("")}
          </div>
        </div>

        <div class="course-box__status">
          <div class="course-box__users">
            <i class="fas fa-users course-box__users-icon"></i>
            <span class="course-box__users-text">${item.registers}</span>
          </div>
          <span class="course-box__price">${
            item.price === 0 ? "رایگان" : item.price.toLocaleString()
          }</span>
        </div>
      </div>

      <div class="course-box__footer">
        <a href="#" class="course-box__footer-link">
          مشاهده اطلاعات
          <i class="fas fa-arrow-left course-box__footer-icon"></i>
        </a>
      </div>

    </div>
  </div>`
    );
  });

  return populareCourses;
};

const getAndShowPresellCourses = async () => {
  const presellCoursesContainer = getIdAndReturnElement(
    "presellCoursesContainer"
  );

  const res = await fetch("http://127.0.0.1:4000/v1/courses/presell");
  const presellCourses = await res.json();

  presellCourses.forEach((item) => {
    presellCoursesContainer.insertAdjacentHTML(
      "beforeend",
      `
       <div class="swiper-slide sw-slide">
                <div class="course-box">
                  <a href="#">
                    <img src=http://127.0.0.1:4000/courses/covers/${
                      item.cover
                    } alt="Course img" class="course-box__img" />
                  </a>
                  <div class="course-box__main">
                    <a href="#" class="course-box__title">${item.name}</a>

                    <div class="course-box__rating-teacher">
                      <div class="course-box__teacher">
                        <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                        <a href="#" class="course-box__teacher-link">${
                          item.creator
                        }</a>
                      </div>
                      <div class="course-box__rating">
                      ${Array(5 - item.courseAverageScore)
                        .fill(0)
                        .map(
                          (score) =>
                            `<img src="images/svgs/star.svg" alt="rating" class="course-box__star">`
                        )
                        .join("")}
                      
                     ${Array(item.courseAverageScore)
                       .fill(0)
                       .map(
                         (score) =>
                           `<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">`
                       )
                       .join("")}
                      </div>
                    </div>

                    <div class="course-box__status">
                      <div class="course-box__users">
                        <i class="fas fa-users course-box__users-icon"></i>
                        <span class="course-box__users-text">${
                          item.registers
                        }</span>
                      </div>
                      <span class="course-box__price">${
                        item.price === 0
                          ? "رایگان"
                          : item.price.toLocaleString()
                      }</span>
                    </div>
                  </div>

                  <div class="course-box__footer">
                    <a href="#" class="course-box__footer-link">
                      مشاهده اطلاعات
                      <i class="fas fa-arrow-left course-box__footer-icon"></i>
                    </a>
                  </div>

                </div>
              </div>
      `
    );
  });
};

const getAndShowArticles = async () => {
  const articleContentContainer = getIdAndReturnElement(
    "articles__content-container"
  );

  const res = await fetch("http://127.0.0.1:4000/v1/articles");

  const articles = await res.json();

  articles.slice(0, 6).forEach((item) => {
    articleContentContainer.insertAdjacentHTML(
      "beforeend",
      `            <div class="articles__content-item">
              <div class="article-card">
                <div class="article-card__header">
                  <a href="#" class="article-card__link-img">
                    <img src=http://127.0.0.1:4000/courses/covers/${item.cover} alt="Article Cover" />
                  </a>
                </div>
                <div class="article-card__content">
                  <a href="#" class="article-card__link">
                   ${item.title}
                  </a>
                  <p class="article-card__text">
                    ${item.description}
                  </p>
                  <a href="#" class="article-card__btn">بیشتر بخوانید</a>
                </div>
              </div>
            </div>`
    );
  });

  return articles;
};

const getAndShowNavbarMenu = async () => {
  const mainHeaderMenu = getClassAndReturnElement("main-header__menu");
  const res = await fetch("http://127.0.0.1:4000/v1/menus");
  const menus = await res.json();

  menus.forEach((item) => {
    mainHeaderMenu.insertAdjacentHTML(
      "beforeend",
      `<li class="main-header__item">
          <a href="category.html?cat=${item.href}" class="main-header__link">${
        item.title
      }
          ${
            item.submenus.length !== 0
              ? `<i class="fas fa-angle-down main-header__link-icon"></i>
            <ul class="main-header__dropdown">
                ${item.submenus
                  .map(
                    (sub) =>
                      `<li class="main-header__dropdown-item"><a href="" class="main-header__dropdown-link">${sub.title}</a></li>`
                  )
                  .join("")}
            </ul>`
              : ""
          }
        </a>
    </li>`
    );
  });

  return menus;
};

const getAndShowCategoryCourses = async () => {
  const urlParam = getUrlParamsWithSplit("cat");

  const res = await fetch(
    `http://127.0.0.1:4000/v1/courses/category/${urlParam}`
  );

  const param = await res.json();

  return param;
};

const templateCourses = (courses, showType, container) => {
  if (showType === "row") {
    container.style.display = "flex";
    container.innerHTML = "";
    if (courses.length) {
      courses.forEach((item) => {
        container.insertAdjacentHTML(
          "beforeend",
          `
                            <div class="course__item">
                                  <div class="course-box">
                                    <a href="course.html?name=${item.shortName}">
                                      <img src=http://127.0.0.1:4000/courses/covers/${
                                        item.cover
                                      }  alt="Course img" class="course-box__img" />
                                    </a>
                                    <div class="course-box__main">
                                      <a href="#" class="course-box__title">${
                                        item.name
                                      }</a>
                  
                                      <div class="course-box__rating-teacher">
                                        <div class="course-box__teacher">
                                          <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                                          <a href="#" class="course-box__teacher-link">${
                                            item.creator
                                          }</a>
                                        </div>
                                        <div class="course-box__rating">
                                        ${Array(5 - item.courseAverageScore)
                                          .fill(0)
                                          .map(
                                            (score) =>
                                              `<img src="images/svgs/star.svg" alt="rating" class="course-box__star">`
                                          )
                                          .join("")}
                                        
                                       ${Array(item.courseAverageScore)
                                         .fill(0)
                                         .map(
                                           (score) =>
                                             `<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">`
                                         )
                                         .join("")}
                                        </div>
                                      </div>
                  
                                      <div class="course-box__status">
                                        <div class="course-box__users">
                                          <i class="fas fa-users course-box__users-icon"></i>
                                          <span class="course-box__users-text">${
                                            item.registers
                                          }</span>
                                        </div>
                                        <span class="course-box__price">${
                                          item.price === 0
                                            ? "رایگان"
                                            : item.price.toLocaleString()
                                        }</span>
                                      </div>
                                    </div>
                  
                                    <div class="course-box__footer">
                                      <a href="#" class="course-box__footer-link">
                                        مشاهده اطلاعات
                                        <i class="fas fa-arrow-left course-box__footer-icon"></i>
                                      </a>
                                    </div>
                  
                                  </div>
                        `
        );
      });
    } else {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class='NoCourses'>دوره ای وجود ندارد</div>`
      );
    }
  } else {
    container.style.display = "block";
    container.innerHTML = "";
    if (courses.length) {
      courses.forEach((item) => {
        container.insertAdjacentHTML(
          "beforeend",
          `
                            <div class="course__item">
                                  <div class="course-box" style="display: flex">
                                    <a href="#">
                                      <img src=http://127.0.0.1:4000/courses/covers/${
                                        item.cover
                                      }  alt="Course img" class="course-box__img" style=" border-radius: 0 1rem 1rem 0;    height: 100%;"/>
                                    </a>
                                    <div style="width: 70%;">
                                    <div class="course-box__main">
                                      <a href="#" class="course-box__title">${
                                        item.name
                                      }</a>
                  
                                      <div class="course-box__rating-teacher">
                                        <div class="course-box__teacher">
                                          <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                                          <a href="#" class="course-box__teacher-link">${
                                            item.creator
                                          }</a>
                                        </div>
                                        <div class="course-box__rating">
                                        ${Array(5 - item.courseAverageScore)
                                          .fill(0)
                                          .map(
                                            (score) =>
                                              `<img src="images/svgs/star.svg" alt="rating" class="course-box__star">`
                                          )
                                          .join("")}
                                        
                                       ${Array(item.courseAverageScore)
                                         .fill(0)
                                         .map(
                                           (score) =>
                                             `<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">`
                                         )
                                         .join("")}
                                        </div>
                                      </div>
                  
                                      <div class="course-box__status">
                                        <div class="course-box__users">
                                          <i class="fas fa-users course-box__users-icon"></i>
                                          <span class="course-box__users-text">${
                                            item.registers
                                          }</span>
                                        </div>
                                        <span class="course-box__price">${
                                          item.price === 0
                                            ? "رایگان"
                                            : item.price.toLocaleString()
                                        }</span>
                                      </div>
                                    </div>
                  
                                    <div class="course-box__footer">
                                      <a href="#" class="course-box__footer-link">
                                        مشاهده اطلاعات
                                        <i class="fas fa-arrow-left course-box__footer-icon"></i>
                                      </a>
                                    </div>
                  
                                  </div>
                                </div>
                        `
        );
      });
    } else {
      container.insertAdjacentHTML(
        "beforeend",
        `<div class='NoCourses'>دوره ای وجود ندارد</div>`
      );
    }
  }
};

const coursesFiltering = (array, filterKey) => {
  let outArray = [];

  switch (filterKey) {
    case "first": {
      outArray = [...array].reverse();
      break;
    }
    case "last": {
      outArray = array;
      break;
    }
    case "free": {
      outArray = array.filter((course) => course.price === 0);
      break;
    }
    case "money": {
      outArray = array.filter((course) => course.price !== 0);
      break;
    }
    case "score": {
      outArray = array.sort(
        (a, b) => b.courseAverageScore - a.courseAverageScore
      );
      break;
    }
    case "defualt": {
      outArray = array;
      break;
    }
    default: {
      outArray = array;
    }
  }

  return outArray;
};

const getCourseDetails = () => {
  let coursesShortName = getUrlParams("name");

  let courseLinkInfo = getClassAndReturnElement("course-info__link");
  let courseTitle = getClassAndReturnElement("course-info__title");
  let courseDescription = getClassAndReturnElement("course-info__text");
  let courseStatus = getClassAndReturnElement("boxes_right-item-subtitle");
  let courseSupport = getClassAndReturnElement("boxes_right-item-support");
  let courseLastUpdate = getClassAndReturnElement(
    "boxes_right-item-last-update"
  );
  let courseTime = getClassAndReturnElement("boxes_right-item-time");
  let courseRegisterInfo = getClassAndReturnElement(
    "course-info__register-title"
  );
  let courseComments = getClassAndReturnElement(
    "course-info__total-bottom-comment-text"
  );
  let courseStudents = getClassAndReturnElement(
    "course-info__total-top-sale-count"
  );
  let courseSessionWrapper = getClassAndReturnElement("course-session-wrapper");

  fetch(`http://127.0.0.1:4000/v1/courses/${coursesShortName}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      courseLinkInfo.innerHTML = "آموزش " + data.categoryID.title;
      courseTitle.innerHTML = data.name;
      courseDescription.innerHTML = data.description;
      courseStatus.innerHTML = data.isComplete ? "تکمیل شده" : "در حال برگزاری";
      courseLastUpdate.innerHTML = data.updatedAt.slice(0, 10);
      courseSupport.innerHTML = data.support;
      courseRegisterInfo.insertAdjacentHTML(
        "beforeend",
        data.isUserRegisteredToThisCourse
          ? "دانشجو دوره هستید"
          : "ثبت نام در دوره"
      );

      let timeMin = 0;
      let timesecond = 0;
      let allTime = 0;
      data.sessions.forEach((item) => {
        timeMin += Number(item.time.slice(0, 2));
        timesecond += Number(item.time.slice(3, 5));
      });

      if (timeMin > 60) {
        allTime += Math.floor(timeMin / 60);
      } else {
        allTime += timeMin;
      }

      if (timesecond > 60) {
        allTime += Math.floor(timesecond / 60);
      } else {
        allTime += String(":" + timesecond);
      }

      courseTime.innerHTML = allTime;

      courseComments.innerHTML = `دیدگاه ${data.comments.length}`;
      courseStudents.innerHTML = data.courseStudentsCount;

      if (data.sessions.length) {
        data.sessions.forEach((item, index) => {
          courseSessionWrapper.insertAdjacentHTML(
            "beforeend",
            `
            <div class="accordion-body introduction__accordion-body">
                      <div class="introduction__accordion-right">
                        <span class="introduction__accordion-count">${
                          index + 1
                        }</span>
                        <i class="fab fa-youtube introduction__accordion-icon"></i>
                        <a href="#" class="introduction__accordion-link">
                          ${item.title}
                        </a>
                      </div>
                      <div class="introduction__accordion-left">
                        <span class="introduction__accordion-time">
                        ${item.time}
                        ${
                          item.free
                            ? '<i class="fa fa-lock" aria-hidden="true"></i>'
                            : ""
                        }
  
                        </span>
                      </div>
                    </div>
            `
          );
        });
      } else {
        courseSessionWrapper.insertAdjacentHTML(
          "beforeend",
          `
          <div class="accordion-body introduction__accordion-body">
                    <div class="introduction__accordion-right">
                      <span class="introduction__accordion-count">--</span>
                      <i class="fab fa-youtube introduction__accordion-icon"></i>
                      <a href="#" class="introduction__accordion-link">
                        هنوز جلسه ای وجود ندارد
                      </a>
                    </div>
                    <div class="introduction__accordion-left">
                      <span class="introduction__accordion-time">
                      00:00
                      </span>
                    </div>
                  </div>
          `
        );
      }
    });
};

const getAndShowRelatedCourse = async () => {
  let coursesShortName = getUrlParams("name");

  let coursesRelatedWrapper = getClassAndReturnElement(
    "courses-info__course-list"
  );

  const res = await fetch(
    `http://127.0.0.1:4000/v1/courses/related/${coursesShortName}`
  );

  const relatedCourse = await res.json();

  if (relatedCourse.length) {
    relatedCourse.forEach((item) => {
      coursesRelatedWrapper.insertAdjacentHTML(
        "beforeend",
        `
                      <li class="courses-info__course-list-item">
                <a href="course.html?name=${item.shortName}" class="courses-info__course-item-url">
                  <img src="http://127.0.0.1:4000/courses/covers/${item.cover}" alt="" class="courses-info__course-item-cover">
                  <span class="courses-info__course-item-text">${item.name}</span>
                </a>
              </li>
        `
      );
    });
  } else {
    coursesRelatedWrapper.insertAdjacentHTML(
      "beforeend",
      `
                    <li class="courses-info__course-list-item">
              <a href="" class="courses-info__course-item-url">
                <img src="" alt="" class="courses-info__course-item-cover">
                <span class="courses-info__course-item-text">دوره ای وجود ندارد</span>
              </a>
            </li>
      `
    );
  }

  return relatedCourse;
};

export {
  showUserNmaeInNavbar,
  renderTopbarMenus,
  getAndShowAllCourses,
  getAndShowPopulareCouses,
  getAndShowPresellCourses,
  getAndShowArticles,
  getAndShowNavbarMenu,
  getAndShowCategoryCourses,
  templateCourses,
  coursesFiltering,
  getCourseDetails,
  getAndShowRelatedCourse,
};
