import { showSwal, saveIntoLocalStorage } from "./utils.js";

let $ = document;

const register = () => {
  const nameInput = $.querySelector("#name");
  const usernameInput = $.querySelector("#username");
  const emailInput = $.querySelector("#email");
  const phoneInput = $.querySelector("#phone");
  const passwordInput = $.querySelector("#password");

  const newUserInfos = {
    name: nameInput.value.trim(),
    username: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    password: passwordInput.value.trim(),
    confirmPassword: passwordInput.value.trim(),
  };

  fetch(`http://127.0.0.1:4000/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserInfos),
  })
    .then((res) => {
      if (res.status === 201) {
        showSwal(
          "ثبت نام با موفقیت انجام شد",
          "success",
          "ورود به پنل",
          (result) => {
            location.href = "index.html";
          }
        );
      } else if (res.status === 409) {
        showSwal(
          "نام کاربری یا ایمیل قبلا استفاده شده",
          "error",
          "تصحیح اطلاعات",
          () => {}
        );
      }
      return res.json();
    })
    .then((result) => {
      saveIntoLocalStorage("user", { token: result.accessToken });
    });
};

const login = () => {
  const identifierInput = $.querySelector("#identifier");
  const passwordInput = $.querySelector("#password");

  const userInfos = {
    identifier: identifierInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  fetch(`http://127.0.0.1:4000/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfos),
  })
    .then((res) => {
      if (res.status === 401) {
        showSwal(
          "کابری با این اطلاعات یافت نشد",
          "error",
          "تصحیح اطلاعات",
          () => {}
        );
      } else if (res.status === 200) {
        showSwal("با موفقیت وارد شدید", "success", "ورود به پنل", () => {
          location.href = "index.html";
        });
      }
      return res.json();
    })
    .then((result) => {
      saveIntoLocalStorage("user", { token: result.accessToken});
    });
};

export { register, login };
