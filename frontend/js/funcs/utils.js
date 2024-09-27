const showSwal = (title, icon, buttons, calback) => {
  swal({
    title,
    icon,
    buttons,
  }).then((result) => calback(result));
};

const saveIntoLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  return JSON.stringify(localStorage.getItem(key));
};

const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  return userInfo ? userInfo.token : null;
};

const isLogin = () => {
  const login = localStorage.getItem("user");
  return login ? true : false;
};

const getUrlParamsWithSplit = (key) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key).split("/")[2];
};

const getUrlParams = (key) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};

const searchInArray = (array, searchProperty, searchValue) => {
  let searchArray = array.filter((item) =>
    item[searchProperty].includes(searchValue)
  );

  return searchArray;
};

const addParamToUrl = (page, value) => {
  console.log(page, value);

  let url=new URL(location.href)
  let searchParams=url.searchParams
  searchParams.set(page,value)
  url.search=searchParams.toString()
  location.href=url.toString()
  
};

const paginateItem = (
  itemsArray,
  itemsPrePage,
  currentpage,
  paginateLayout
) => {
  paginateLayout.innerHTML = "";
  let endIndex = itemsPrePage * currentpage;
  let startIndex = endIndex - itemsPrePage;
  let paginateItemArray = itemsArray.slice(startIndex, endIndex);
  let paginatedCountPage = Math.ceil(itemsArray.length / itemsPrePage);

  for (let i = 1; i < paginatedCountPage + 1; i++) {
    paginateLayout.insertAdjacentHTML(
      "beforeend",
      `
      ${
        i === Number(currentpage)
      ? 
      `<li class="courses__pagination-item">
          <a onclick="addParamToUrl('page',${i})" class="courses__pagination-link courses-top-bar__icon--active">
            ${i}
          </a>
      </li>`
      :
       `<li class="courses__pagination-item">
          <a onclick="addParamToUrl('page',${i})" class="courses__pagination-link">
            ${i}
          </a>
      </li>`
      }
      
      `
    );
  }

  return paginateItemArray;
};

export {
  showSwal,
  saveIntoLocalStorage,
  getFromLocalStorage,
  getToken,
  isLogin,
  getUrlParamsWithSplit,
  getUrlParams,
  searchInArray,
  paginateItem,
  addParamToUrl,
};
