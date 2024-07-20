const $=document;


const landingTitle=$.querySelector('.landing__title')


const landingCoursescount=$.querySelector('#corses__count')
const landingMinutescount=$.querySelector('#minutes__cont')
const landingRegistercount=$.querySelector('#register__count')

// typeWriter

window.addEventListener('load',()=>{
    let landingText='ما به هر قیمتی دوره آموزشی تولید نمی کنیم !'
    let typeindex=0

    tyoewriter(landingText,typeindex)
    makeCounter(40,landingCoursescount)
    makeCounter(3320,landingMinutescount)
    makeCounter(3071,landingRegistercount)
})

function tyoewriter(text , index){
    if(index<text.length){
        landingTitle.innerHTML+=text[index]
        index++
    }

    setTimeout(()=>{
        tyoewriter(text , index)
    },100);
}

// Number count Effect

function makeCounter(max ,elem){
    let Counter=0
const interval=setInterval(()=>{
    if(Counter==max){
        clearInterval(interval)
    }
    elem.innerHTML=Counter
    Counter++

},0.5)
}

