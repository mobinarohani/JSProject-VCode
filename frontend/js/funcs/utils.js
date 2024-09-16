const showSwal = (title, icon, buttons, calback) => {
  swal({
    title,
    icon,
    buttons,
  }).then(result=>calback(result))
};


const saveIntoLocalStorage=(key,value)=>{
    return localStorage.setItem(key,JSON.stringify(value))
}

const getFromLocalStorage=(key)=>{
    return JSON.stringify(localStorage.getItem(key)) 
}

const getToken=()=>{
    const userInfo = JSON.parse(localStorage.getItem('user'))
    return userInfo ? userInfo.token : null;
}


const isLogin=()=>{
  const login = localStorage.getItem('user')
  return login ? true:false;
}


const getUrlParamsWithSplit=(key)=>{
  const urlParams=new URLSearchParams(window.location.search)
  return urlParams.get(key).split('/')[2];
}

const getUrlParams=(key)=>{
  const urlParams=new URLSearchParams(window.location.search)
  return urlParams.get(key);
}


const searchInArray=(array,searchProperty,searchValue)=>{
  let searchArray=array.filter(item=>item[searchProperty].includes(searchValue))

  return searchArray
}

export{ showSwal ,saveIntoLocalStorage , getFromLocalStorage , getToken ,isLogin ,getUrlParamsWithSplit , getUrlParams , searchInArray}