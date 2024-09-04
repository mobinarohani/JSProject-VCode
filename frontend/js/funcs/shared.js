import { getMe } from "./auth.js";
import { isLogin } from "./utils.js";

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
                        <a href="#">
                          <img src="images/courses/fareelancer.png" alt="Course img" class="course-box__img" />
                        </a>
                        <div class="course-box__main">
                          <a href="#" class="course-box__title">${item.name}</a>
      
                          <div class="course-box__rating-teacher">
                            <div class="course-box__teacher">
                              <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                              <a href="#" class="course-box__teacher-link">${item.creator}</a>
                            </div>
                            <div class="course-box__rating">
                              <img src="images/svgs/star.svg" alt="rating" class="course-box__star">
                              <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                              <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                              <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                              <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">
                            </div>
                          </div>
      
                          <div class="course-box__status">
                            <div class="course-box__users">
                              <i class="fas fa-users course-box__users-icon"></i>
                              <span class="course-box__users-text">${item.registers}</span>
                            </div>
                            <span class="course-box__price">${item.price===0?'رایگان':item.price.toLocaleString()}</span>
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

  return courses
};

export { showUserNmaeInNavbar, renderTopbarMenus, getAndShowAllCourses };
