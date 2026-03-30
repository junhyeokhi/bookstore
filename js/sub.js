async function bookData() {
    const REST_API_KEY = '7b2300fc6315bb65035d1a3c7b49b161';
    const params = new URLSearchParams({
        target: "title",
        query: "파이썬"
    });
            
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${REST_API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();

        // 요소 선택
        const subBox = document.querySelector(".sub_box");
        const contextBox = document.querySelector(".contextbox");
        const priceNum = document.querySelector(".price");
        const authorEl = document.querySelector(".author");
        const titleEl = document.querySelector(".book_title");

        // 데이터
        const book = data.documents[0];
        const { title, thumbnail, authors, price, contents } = book;

        // 이미지
        subBox.innerHTML = `
            <div class="img_wrap">
                <img src="${thumbnail}" alt="${title}">
            </div>
        `

        // 텍스트
        titleEl.textContent = title;
        authorEl.textContent = authors[0];
        priceNum.textContent = price.toLocaleString() + "원";

        // 설명만 따로
        contextBox.innerHTML = `
            <p class="desc">${contents}</p>
            <span>자세히 보기</span>
        `
        
    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData();

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("./sub_txt/txt1.txt");
        const data = await response.text();

        document.querySelector(".contextbox").innerHTML = data;

    } catch (error) {
        console.error(error);
    }
});


async function bookData2() {
    const params = new URLSearchParams({
        target: "title",
        query: "파이썬",
        size: 10
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: "KakaoAK 7b2300fc6315bb65035d1a3c7b49b161"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        // .box 요소 전체 선택
        const boxElements = document.querySelectorAll("#slider .swiper-slide");
        console.log(boxElements)

        // documents 데이터를 각 box에 대응하여 렌더링
        boxElements.forEach((box, i) => {
            const doc = data.documents[i];

            if (!doc) return; // 데이터가 부족할 경우 생략

            // 요소 생성 및 추가
            box.innerHTML = `<img src="${data.documents[i].thumbnail}">
            <div class='slider_content'>
                <h3>${data.documents[i].title}</h3>
                <h6>${data.documents[i].authors}</h6>
                <p>${data.documents[i].price}</p>
            </div>
                    `
        });

        // #slider swiper
        var slider_swiper = new Swiper(".sliderSwiper", {
            navigation: {
                nextEl: "#slider .swiper-button-next",
                prevEl: "#slider .swiper-button-prev",
            },
            pagination: {
                el: "#slider .swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                    // 데이터가 있을 때만 이미지를 넣도록 예외 처리
                    const imgUrl = data.documents[index] ? data.documents[index].thumbnail : '';
                    return `<img class="${className}" src="${imgUrl}" style="width:40px; height:auto; opacity:0.5;">`;
                },
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });

    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData2();

const wrapper = document.querySelector(".subSwiper .swiper-wrapper");

books.forEach(book => {
    wrapper.innerHTML += `
        <div class="swiper-slide">
            <div class="book_card">
                <img src="${book.thumbnail}">
                <div class="book_info">
                    <p class="book_title">${book.title}</p>
                    <p class="book_author">${book.authors[0]}</p>
                    <p class="book_price">${book.price}원</p>
                    <p class="book_desc">${book.contents}</p>
                </div>
            </div>
        </div>
    `;
});


