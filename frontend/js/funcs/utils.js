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




export{ showSwal ,saveIntoLocalStorage , getFromLocalStorage , getToken ,isLogin}