async function bookData() {
    const REST_API_KEY = '7b2300fc6315bb65035d1a3c7b49b161';
    const params = new URLSearchParams({
        target: "title",
        query: "미움받을 용기"
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





