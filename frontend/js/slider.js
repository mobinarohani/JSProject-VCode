const swiperslider=new Swiper('.swiper',{
    loop:true,
    slidesPerView:'auto',
    breakpoints: {
        576: {
            slidesPerView: 1
        },
        650: {
            slidesPerView: 2
        },
        768: {
            slidesPerView: 2
        },
        1200: {
            slidesPerView: 3
        }
    },
    pagination: {
        el: ".swiper-pagination",
    },
    spaceBetween:40,
    centeredSlides: true,
})