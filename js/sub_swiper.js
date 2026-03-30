// #sub swiper
var subswiper = new Swiper(".subSwiper", {
    slidesPerView: 2,     // 한 화면에 2개
    spaceBetween: 40,     // 간격 (사진처럼)
    
    slidesPerGroup: 2,    // 버튼 누르면 2개씩 이동
    
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});