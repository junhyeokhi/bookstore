 // #slider swiper
var swiper = new Swiper(".mySwiper", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// #new swiper
var newswiper = new Swiper(".newSwiper", {
      slidesPerView: 5,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    slidesPerGroup: 3
});
