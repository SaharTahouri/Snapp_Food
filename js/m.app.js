//hide and show search bar based on scroll position

let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        document.querySelector(".search").style.transform = "translate3d(0px, -140px, 0px)";
        document.querySelector(".user-menu").style.borderBottom = "1px solid rgba(19, 20, 31, .08)";
    } else {
        document.querySelector(".search").style.transform = "translate3d(0px, 0px, 0px)";
        document.querySelector(".user-menu").style.borderBottom = "none";
    }

    lastScrollTop = scrollTop;
});

//close map

const map = document.querySelector(".map-wrapper");
const innerMap = document.querySelector(".map-container");

map.addEventListener("click", (event) => {
    if (event.target == event.currentTarget) {
        innerMap.style.transform = "translate3d(0, 100%, 0)";
        setTimeout(() => {
            map.style.display = "none";
        }, 250);
        document.body.style.overflow = "unset";
    }
});

// close install app

const closeInstall = document.querySelector(".install-app-close");

closeInstall.addEventListener("click", () => {
    document.querySelector(".install-app").style.display = "none";
});

//pick address open map

const pickAddress = document.querySelector(".pick-address-container");

pickAddress.addEventListener("click", () => {
    map.style.display = "unset";
    setTimeout(() => {
        innerMap.style.transform = "translate3d(0, 0, 0)";
    }, 1);
    document.body.style.overflow = "clip";
});

//countdown

let countDownDate = new Date().getTime() + 5 * 60 * 60 * 1000;

let x = setInterval(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("hour").innerHTML = hours;
    document.getElementById("minute").innerHTML = minutes;
    document.getElementById("second").innerHTML = seconds;

    if (hours < 10) {
        document.getElementById("hour").innerHTML = "0" + hours;
    }
    if (minutes < 10) {
        document.getElementById("minute").innerHTML = "0" + minutes;
    }
    if (seconds < 10) {
        document.getElementById("second").innerHTML = "0" + seconds;
    }

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("hour").innerHTML = "00";
        document.getElementById("minute").innerHTML = "00";
        document.getElementById("second").innerHTML = "00";
    }
}, 1000);

//load data

function loadFoodPartyData() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "js/data.json", true);
    xhr.onload = function () {
        if (this.status === 200) {
            let data = JSON.parse(xhr.responseText);
            let foodParty = data.foodParty;
            let output = ``;
            for (let key in foodParty) {
                let item = foodParty[key];
                output += `<section class="off-item">
                    <div class="off-item-first-row">
                        <img src="images/${item.img}" alt="food-party-${key}" loading="lazy">
                        <div class="off-item-descr">
                            <h3>
                                <div class="off-item-name">
                                    ${item.name}
                                </div>
                                <div class="off-item-rate">
                                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path
                                                d="M5.55159 0.9086C5.735 0.536977 6.26492 0.536977 6.44833 0.9086L7.76331 3.57306L10.7037 4.00032C11.1138 4.05991 11.2776 4.5639 10.9808 4.85317L8.85313 6.92716L9.35541 9.85568C9.42546 10.2641 8.99675 10.5756 8.62993 10.3828L5.99996 9.00011L3.36998 10.3828C3.00317 10.5756 2.57445 10.2641 2.64451 9.85568L3.14679 6.92716L1.01909 4.85317C0.722336 4.5639 0.88609 4.05991 1.2962 4.00032L4.2366 3.57306L5.55159 0.9086Z"
                                                fill="#404040"></path>
                                            <path
                                                d="M5.55159 0.9086C5.735 0.536977 6.26492 0.536977 6.44833 0.9086L7.76331 3.57306L10.7037 4.00032C11.1138 4.05991 11.2776 4.5639 10.9808 4.85317L8.85313 6.92716L9.35541 9.85568C9.42546 10.2641 8.99675 10.5756 8.62993 10.3828L5.99996 9.00011L3.36998 10.3828C3.00317 10.5756 2.57445 10.2641 2.64451 9.85568L3.14679 6.92716L1.01909 4.85317C0.722336 4.5639 0.88609 4.05991 1.2962 4.00032L4.2366 3.57306L5.55159 0.9086Z"
                                                fill="#404040"></path>
                                        </g>
                                    </svg>
                                    <span>
                                        ${item.rate}
                                    </span>
                                </div>
                            </h3>
                            <h4 class="off-item-address">
                                ${item.address}
                            </h4>
                            <div class="off-item-remaining">
                                <span>
                                    ${item.remaining}
                                </span>
                                <span>
                                    عدد باقی‌مانده
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="w100-line"></div>
                    <div class="off-item-second-row">
                        <div class="off-item-delivery">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M6.56458 14.6235C4.54422 15.4091 2.37821 14.101 2.04426 12.052L3.02097 11.8195L8.61581 10.4874C8.84104 10.4338 9 10.2325 9 10.001V6.50098C9 6.3551 8.93629 6.21649 8.82557 6.1215C8.71484 6.02651 8.56816 5.98461 8.42397 6.00679L2 6.9951L1 7.17285V7.00099C1 5.07355 1.90398 3.61626 3.23965 2.65732C4.56052 1.70899 6.29365 1.25098 8 1.25098C9.70635 1.25098 11.4395 1.709 12.7604 2.65732C14.096 3.61627 15 5.07356 15 7.001V9.63284C15 10.6639 14.367 11.5892 13.4061 11.9629L6.56458 14.6235ZM1 8.2041L2 8.00105C2.02508 8.00102 2.05048 7.9991 2.07603 7.99517L8 7.08379V9.60605L2 11.0346L1 11.2314V8.2041ZM11.25 9.00098C11.25 8.58677 11.5858 8.25098 12 8.25098C12.4142 8.25098 12.75 8.58677 12.75 9.00098C12.75 9.41519 12.4142 9.75098 12 9.75098C11.5858 9.75098 11.25 9.41519 11.25 9.00098Z"
                                        fill="#A3A3A3"></path>
                                    </g>
                                </svg>
                            <span>
                                ${item.delivery}
                            </span>
                        </div>
                        <div class="off-item-price-container">
                            <span class="off-item-off">
                                ${item.off}
                                <svg width="8" height="13" viewBox="0 0 8 13" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.78075 2.9956C6.98191 2.63352 6.85146 2.17691 6.48937 1.97575C6.12728 1.77459 5.67068 1.90505 5.46952 2.26714L1.71952 9.01714C1.51836 9.37923 1.64882 9.83583 2.0109 10.037C2.37299 10.2381 2.82959 10.1077 3.03075 9.7456L6.78075 2.9956Z"
                                        fill="white"></path>
                                    <path
                                        d="M1.62514 2.81887C1.62514 2.3011 2.04487 1.88137 2.56264 1.88137C3.0804 1.88137 3.50014 2.3011 3.50014 2.81887C3.50014 3.33664 3.0804 3.75637 2.56264 3.75637C2.04487 3.75637 1.62514 3.33664 1.62514 2.81887Z"
                                        fill="white"></path>
                                    <path
                                        d="M5.00014 9.19387C5.00014 8.6761 5.41987 8.25637 5.93764 8.25637C6.4554 8.25637 6.87514 8.6761 6.87514 9.19387C6.87514 9.71164 6.4554 10.1314 5.93764 10.1314C5.41987 10.1314 5.00014 9.71164 5.00014 9.19387Z"
                                        fill="white"></path>
                                </svg>
                            </span>
                            <s>${item.s}</s>
                            <div class="off-item-price">
                                <span>
                                    ${item.price}
                                </span>
                                <span>
                                    تومان
                                </span>
                            </div>
                        </div>
                    </div>
                </section>`;
            }
            outputNode = document.createElement("div");
            outputNode.innerHTML = output;
            while (outputNode.firstChild) {
                document.querySelectorAll(".off-items")[0].insertBefore(outputNode.firstChild, document.querySelector(".see-all"));
            }
        } else {
            console.log("error");
        }
    }
    xhr.send();
}

loadFoodPartyData();

function loadEconomicData() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "js/data.json", true);
    xhr.onload = function () {
        if (this.status === 200) {
            let data = JSON.parse(xhr.responseText);
            let economic = data.economic;
            let output = ``;
            for (let key in economic) {
                let item = economic[key];
                output += `<section class="off-item">
                    <div class="off-item-first-row">
                        <img src="images/${item.img}" alt="eco-${key}"  loading="lazy">
                        <div class="off-item-descr">
                            <h3>
                                <div class="off-item-name">
                                    ${item.name}
                                </div>
                                <div class="off-item-rate">
                                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path
                                                d="M5.55159 0.9086C5.735 0.536977 6.26492 0.536977 6.44833 0.9086L7.76331 3.57306L10.7037 4.00032C11.1138 4.05991 11.2776 4.5639 10.9808 4.85317L8.85313 6.92716L9.35541 9.85568C9.42546 10.2641 8.99675 10.5756 8.62993 10.3828L5.99996 9.00011L3.36998 10.3828C3.00317 10.5756 2.57445 10.2641 2.64451 9.85568L3.14679 6.92716L1.01909 4.85317C0.722336 4.5639 0.88609 4.05991 1.2962 4.00032L4.2366 3.57306L5.55159 0.9086Z"
                                                fill="#404040"></path>
                                            <path
                                                d="M5.55159 0.9086C5.735 0.536977 6.26492 0.536977 6.44833 0.9086L7.76331 3.57306L10.7037 4.00032C11.1138 4.05991 11.2776 4.5639 10.9808 4.85317L8.85313 6.92716L9.35541 9.85568C9.42546 10.2641 8.99675 10.5756 8.62993 10.3828L5.99996 9.00011L3.36998 10.3828C3.00317 10.5756 2.57445 10.2641 2.64451 9.85568L3.14679 6.92716L1.01909 4.85317C0.722336 4.5639 0.88609 4.05991 1.2962 4.00032L4.2366 3.57306L5.55159 0.9086Z"
                                                fill="#404040"></path>
                                        </g>
                                    </svg>
                                    <span>
                                        ${item.rate}
                                    </span>
                                </div>
                            </h3>
                            <h4 class="off-item-address">
                                ${item.address}
                            </h4>`;
                if (item.hasOwnProperty("remaining")) {
                    output += `<div class="off-item-remaining">
                                    <span>
                                        ${item.remaining}
                                    </span>
                                    <span>
                                        عدد باقی‌مانده
                                    </span>
                                </div>`;
                }
                output += `</div>
                    </div>
                    <div class="w100-line"></div>
                    <div class="off-item-second-row">
                        <div class="off-item-delivery">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M6.56458 14.6235C4.54422 15.4091 2.37821 14.101 2.04426 12.052L3.02097 11.8195L8.61581 10.4874C8.84104 10.4338 9 10.2325 9 10.001V6.50098C9 6.3551 8.93629 6.21649 8.82557 6.1215C8.71484 6.02651 8.56816 5.98461 8.42397 6.00679L2 6.9951L1 7.17285V7.00099C1 5.07355 1.90398 3.61626 3.23965 2.65732C4.56052 1.70899 6.29365 1.25098 8 1.25098C9.70635 1.25098 11.4395 1.709 12.7604 2.65732C14.096 3.61627 15 5.07356 15 7.001V9.63284C15 10.6639 14.367 11.5892 13.4061 11.9629L6.56458 14.6235ZM1 8.2041L2 8.00105C2.02508 8.00102 2.05048 7.9991 2.07603 7.99517L8 7.08379V9.60605L2 11.0346L1 11.2314V8.2041ZM11.25 9.00098C11.25 8.58677 11.5858 8.25098 12 8.25098C12.4142 8.25098 12.75 8.58677 12.75 9.00098C12.75 9.41519 12.4142 9.75098 12 9.75098C11.5858 9.75098 11.25 9.41519 11.25 9.00098Z"
                                        fill="#A3A3A3"></path>
                                    </g>
                                </svg>
                            <span>
                                ${item.delivery}
                            </span>
                        </div>
                        <div class="off-item-price-container">`;
                if (item.hasOwnProperty("off")) {
                    output += `<span class="off-item-off">
                                ${item.off}
                                <svg width="8" height="13" viewBox="0 0 8 13" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.78075 2.9956C6.98191 2.63352 6.85146 2.17691 6.48937 1.97575C6.12728 1.77459 5.67068 1.90505 5.46952 2.26714L1.71952 9.01714C1.51836 9.37923 1.64882 9.83583 2.0109 10.037C2.37299 10.2381 2.82959 10.1077 3.03075 9.7456L6.78075 2.9956Z"
                                        fill="white"></path>
                                    <path
                                        d="M1.62514 2.81887C1.62514 2.3011 2.04487 1.88137 2.56264 1.88137C3.0804 1.88137 3.50014 2.3011 3.50014 2.81887C3.50014 3.33664 3.0804 3.75637 2.56264 3.75637C2.04487 3.75637 1.62514 3.33664 1.62514 2.81887Z"
                                        fill="white"></path>
                                    <path
                                        d="M5.00014 9.19387C5.00014 8.6761 5.41987 8.25637 5.93764 8.25637C6.4554 8.25637 6.87514 8.6761 6.87514 9.19387C6.87514 9.71164 6.4554 10.1314 5.93764 10.1314C5.41987 10.1314 5.00014 9.71164 5.00014 9.19387Z"
                                        fill="white"></path>
                                </svg>
                            </span>
                            <s>${item.s}</s>`;
                }
                output += `<div class="off-item-price">
                                <span>
                                    ${item.price}
                                </span>
                                <span>
                                    تومان
                                </span>
                            </div>
                        </div>
                    </div>
                </section>`;
            }
            document.querySelectorAll(".off-items")[1].innerHTML = output;
        } else {
            console.log("error");
        }
    }
    xhr.send();
}

loadEconomicData();

function loadFoodStoryData() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "js/data.json", true);
    xhr.onload = function () {
        if (this.status === 200) {
            let data = JSON.parse(xhr.responseText);
            let foodStory = data.foodStory;
            let output = ``;
            for (let key in foodStory) {
                let item = foodStory[key];
                output += `<div class="food-story-item">
                    <div class="food-story-pictures">
                        <div class="food-story-img-not-loaded">
                            <svg width="114" height="114" viewBox="0 0 160 160" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.03"
                                    d="M80 141C119.765 141 152 136.523 152 131C152 125.477 119.765 121 80 121C40.2355 121 8 125.477 8 131C8 136.523 40.2355 141 80 141Z"
                                    fill="black"></path>
                                <path
                                    d="M29 44C29 39.5817 32.5817 36 37 36H127C131.418 36 135 39.5817 135 44V115C135 123.837 127.837 131 119 131H45C36.1634 131 29 123.837 29 115V44Z"
                                    fill="#D2D3D6"></path>
                                <path
                                    d="M29 52H125V115C125 123.837 117.837 131 109 131H45C36.1634 131 29 123.837 29 115V52Z"
                                    fill="#EDEEF0"></path>
                                <path
                                    d="M39 60H115V115C115 118.314 112.314 121 109 121H45C41.6863 121 39 118.314 39 115V60Z"
                                    fill="white"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M62 88C62 89.105 61.105 90 60 90C58.895 90 58 89.105 58 88C58 86.895 58.895 86 60 86C61.105 86 62 86.895 62 88Z"
                                    fill="#B5B8BD"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M94 88C94 89.105 93.105 90 92 90C90.895 90 90 89.105 90 88C90 86.895 90.895 86 92 86C93.105 86 94 86.895 94 88Z"
                                    fill="#B5B8BD"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M72 95L71.2929 95.7071C70.9024 95.3166 70.9024 94.6834 71.2929 94.2929C71.6826 93.9032 72.3139 93.9024 72.7046 94.2904L72.7065 94.2922L72.7072 94.2929C72.7109 94.2965 72.7182 94.3036 72.7291 94.3137C72.7507 94.3339 72.7862 94.3664 72.8346 94.4084C72.9317 94.4925 73.079 94.6132 73.2687 94.7488C73.6522 95.0227 74.1879 95.3419 74.8162 95.5513C75.4404 95.7594 76.136 95.853 76.8664 95.7069C77.5894 95.5623 78.4166 95.1692 79.2929 94.2929C79.6834 93.9024 80.3166 93.9024 80.7071 94.2929C81.0976 94.6834 81.0976 95.3166 80.7071 95.7071C79.5834 96.8308 78.4106 97.4377 77.2586 97.6681C76.114 97.897 75.0596 97.7406 74.1838 97.4487C73.3121 97.1581 72.5978 96.7273 72.1063 96.3762C71.8585 96.1993 71.6621 96.0388 71.5248 95.9198C71.456 95.8601 71.4016 95.8106 71.3627 95.7742C71.3433 95.756 71.3277 95.7411 71.316 95.7298L71.3014 95.7156L71.2964 95.7106L71.2945 95.7087L71.2936 95.7078C71.2936 95.7078 71.2929 95.7071 72 95Z"
                                    fill="#B5B8BD"></path>
                                <path
                                    d="M109 131C117.837 131 125 123.837 125 115H135C135 123.837 127.837 131 119 131H109Z"
                                    fill="#B5B8BD"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M34.5897 119.701C35.3072 119.287 36.2246 119.533 36.6388 120.25C37.3848 121.542 38.4578 122.615 39.75 123.361C41.0422 124.107 42.5079 124.5 44 124.5C44.8284 124.5 45.5 125.172 45.5 126C45.5 126.828 44.8284 127.5 44 127.5C41.9813 127.5 39.9982 126.969 38.25 125.959C36.5018 124.95 35.05 123.498 34.0407 121.75C33.6265 121.033 33.8723 120.115 34.5897 119.701Z"
                                    fill="white"></path>
                                <path
                                    d="M32.5 116C32.5 115.172 33.1716 114.5 34 114.5C34.8284 114.5 35.5 115.172 35.5 116C35.5 116.828 34.8284 117.5 34 117.5C33.1716 117.5 32.5 116.828 32.5 116Z"
                                    fill="white"></path>
                                <g opacity="0.4" style="mix-blend-mode: multiply;">
                                    <path
                                        d="M29 52V70H31C33.7205 70 36 66.5736 36 63.5C36 67.0899 38.9102 70 42.5 70C46.0898 70 49 67.0899 49 63.5C49 67.0899 51.9102 70 55.5 70C59.0898 70 62 67.0899 62 63.5C62 67.0899 64.9102 70 68.5 70C72.0898 70 75 67.0899 75 63.5C75 67.0899 77.9102 70 81.5 70C85.0898 70 88 67.0899 88 63.5C88 67.0899 90.9102 70 94.5 70C98.0898 70 101 67.0899 101 63.5C101 67.0899 103.91 70 107.5 70C111.09 70 114 67.0899 114 63.5C114 67.0899 116.91 70 120.5 70C122.246 70 123.832 69.3112 125 68.1904V52H29Z"
                                        fill="#D2D3D6"></path>
                                </g>
                                <path d="M107 36L99 52H86L94 36H107Z" fill="white"></path>
                                <path d="M81 36L73 52H60L68 36H81Z" fill="white"></path>
                                <path d="M55 36L47 52H34L42 36H55Z" fill="white"></path>
                                <path d="M120 36L112 52H99L107 36H120Z" fill="#EDEEF0"></path>
                                <path d="M94 36L86 52H73L81 36H94Z" fill="#EDEEF0"></path>
                                <path d="M68 36L60 52H47L55 36H68Z" fill="#EDEEF0"></path>
                                <path d="M42 36L34 52H21L27.3416 39.3167C28.358 37.284 30.4356 36 32.7082 36H42Z"
                                    fill="#EDEEF0"></path>
                                <path d="M127 36H120L112 52H125L132.087 37.8256C130.705 36.6851 128.932 36 127 36Z"
                                    fill="white"></path>
                                <path
                                    d="M34 61.5V52H21V61.5C21 65.0899 23.9101 68 27.5 68C31.0899 68 34 65.0899 34 61.5Z"
                                    fill="#D2D3D6"></path>
                                <path
                                    d="M125 61.5V52H112V61.5C112 65.0899 114.91 68 118.5 68C122.09 68 125 65.0899 125 61.5Z"
                                    fill="#EDEEF0">
                                </path>
                                <path
                                    d="M112 61.5V52H99V61.5C99 65.0899 101.91 68 105.5 68C109.09 68 112 65.0899 112 61.5Z"
                                    fill="#D2D3D6"></path>
                                <path
                                    d="M99 61.5V52H86V61.5C86 65.0899 88.9101 68 92.5 68C96.0899 68 99 65.0899 99 61.5Z"
                                    fill="#EDEEF0"></path>
                                <path
                                    d="M86 61.5V52H73V61.5C73 65.0899 75.9101 68 79.5 68C83.0899 68 86 65.0899 86 61.5Z"
                                    fill="#D2D3D6"></path>
                                <path
                                    d="M73 61.5V52H60V61.5C60 65.0899 62.9101 68 66.5 68C70.0899 68 73 65.0899 73 61.5Z"
                                    fill="#EDEEF0"></path>
                                <path
                                    d="M60 61.5V52H47V61.5C47 65.0899 49.9101 68 53.5 68C57.0899 68 60 65.0899 60 61.5Z"
                                    fill="#D2D3D6"></path>
                                <path
                                    d="M47 61.5V52H34V61.5C34 65.0899 36.9101 68 40.5 68C44.0899 68 47 65.0899 47 61.5Z"
                                    fill="#EDEEF0"></path>
                            </svg>
                        </div>
                        <img src="images/${item.img}" alt="food-story-${key}">
                        <div class="food-story-overlay"></div>
                        <div class="food-story-logo">
                            <div class="food-story-logo-inner">
                                <span class="food-story-logo-not-loaded">
                                    <svg width="40" height="40" viewBox="0 0 160 160" fill="none"
                                        xmlns="http://www.w3.org/2000/svg" class="">
                                         <path opacity="0.03"
                                             d="M80 141C119.765 141 152 136.523 152 131C152 125.477 119.765 121 80 121C40.2355 121 8 125.477 8 131C8 136.523 40.2355 141 80 141Z"
                                            fill="black"></path>
                                      <path
                                             d="M29 44C29 39.5817 32.5817 36 37 36H127C131.418 36 135 39.5817 135 44V115C135 123.837 127.837 131 119 131H45C36.1634 131 29 123.837 29 115V44Z"
                                             fill="#D2D3D6"></path>
                                        <path
                                            d="M29 52H125V115C125 123.837 117.837 131 109 131H45C36.1634 131 29 123.837 29 115V52Z"
                                         fill="#EDEEF0"></path>
                                     <path
                                          d="M39 60H115V115C115 118.314 112.314 121 109 121H45C41.6863 121 39 118.314 39 115V60Z"
                                            fill="white"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                           d="M62 88C62 89.105 61.105 90 60 90C58.895 90 58 89.105 58 88C58 86.895 58.895 86 60 86C61.105 86 62 86.895 62 88Z"
                                          fill="#B5B8BD"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                           d="M94 88C94 89.105 93.105 90 92 90C90.895 90 90 89.105 90 88C90 86.895 90.895 86 92 86C93.105 86 94 86.895 94 88Z"
                                            fill="#B5B8BD"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M72 95L71.2929 95.7071C70.9024 95.3166 70.9024 94.6834 71.2929 94.2929C71.6826 93.9032 72.3139 93.9024 72.7046 94.2904L72.7065 94.2922L72.7072 94.2929C72.7109 94.2965 72.7182 94.3036 72.7291 94.3137C72.7507 94.3339 72.7862 94.3664 72.8346 94.4084C72.9317 94.4925 73.079 94.6132 73.2687 94.7488C73.6522 95.0227 74.1879 95.3419 74.8162 95.5513C75.4404 95.7594 76.136 95.853 76.8664 95.7069C77.5894 95.5623 78.4166 95.1692 79.2929 94.2929C79.6834 93.9024 80.3166 93.9024 80.7071 94.2929C81.0976 94.6834 81.0976 95.3166 80.7071 95.7071C79.5834 96.8308 78.4106 97.4377 77.2586 97.6681C76.114 97.897 75.0596 97.7406 74.1838 97.4487C73.3121 97.1581 72.5978 96.7273 72.1063 96.3762C71.8585 96.1993 71.6621 96.0388 71.5248 95.9198C71.456 95.8601 71.4016 95.8106 71.3627 95.7742C71.3433 95.756 71.3277 95.7411 71.316 95.7298L71.3014 95.7156L71.2964 95.7106L71.2945 95.7087L71.2936 95.7078C71.2936 95.7078 71.2929 95.7071 72 95Z"
                                           fill="#B5B8BD"></path>
                                         <path
                                            d="M109 131C117.837 131 125 123.837 125 115H135C135 123.837 127.837 131 119 131H109Z"
                                            fill="#B5B8BD"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M34.5897 119.701C35.3072 119.287 36.2246 119.533 36.6388 120.25C37.3848 121.542 38.4578 122.615 39.75 123.361C41.0422 124.107 42.5079 124.5 44 124.5C44.8284 124.5 45.5 125.172 45.5 126C45.5 126.828 44.8284 127.5 44 127.5C41.9813 127.5 39.9982 126.969 38.25 125.959C36.5018 124.95 35.05 123.498 34.0407 121.75C33.6265 121.033 33.8723 120.115 34.5897 119.701Z"
                                            fill="white"></path>
                                        <path
                                            d="M32.5 116C32.5 115.172 33.1716 114.5 34 114.5C34.8284 114.5 35.5 115.172 35.5 116C35.5 116.828 34.8284 117.5 34 117.5C33.1716 117.5 32.5 116.828 32.5 116Z"
                                            fill="white"></path>
                                        g opacity="0.4" style="mix-blend-mode: multiply;">
                                              <path
                                                  d="M29 52V70H31C33.7205 70 36 66.5736 36 63.5C36 67.0899 38.9102 70 42.5 70C46.0898 70 49 67.0899 49 63.5C49 67.0899 51.9102 70 55.5 70C59.0898 70 62 67.0899 62 63.5C62 67.0899 64.9102 70 68.5 70C72.0898 70 75 67.0899 75 63.5C75 67.0899 77.9102 70 81.5 70C85.0898 70 88 67.0899 88 63.5C88 67.0899 90.9102 70 94.5 70C98.0898 70 101 67.0899 101 63.5C101 67.0899 103.91 70 107.5 70C111.09 70 114 67.0899 114 63.5C114 67.0899 116.91 70 120.5 70C122.246 70 123.832 69.3112 125 68.1904V52H29Z"
                                                 fill="#D2D3D6"></path>
                                           </g>
                                           <path d="M107 36L99 52H86L94 36H107Z" fill="white"></path>
                                           <path d="M81 36L73 52H60L68 36H81Z" fill="white"></path>
                                           <path d="M55 36L47 52H34L42 36H55Z" fill="white"></path>
                                           <path d="M120 36L112 52H99L107 36H120Z" fill="#EDEEF0"></path>
                                        <path d="M94 36L86 52H73L81 36H94Z" fill="#EDEEF0"></path>
                                     <path d="M68 36L60 52H47L55 36H68Z" fill="#EDEEF0"></path>
                                           <path d="M42 36L34 52H21L27.3416 39.3167C28.358 37.284 30.4356 36 32.7082 36H42Z"
                                               fill="#EDEEF0"></path>
                                        <path d="M127 36H120L112 52H125L132.087 37.8256C130.705 36.6851 128.932 36 127 36Z"
                                            fill="white"></path>
                                      <path
                                          d="M34 61.5V52H21V61.5C21 65.0899 23.9101 68 27.5 68C31.0899 68 34 65.0899 34 61.5Z"
                                             fill="#D2D3D6"></path>
                                      <path
                                            d="M125 61.5V52H112V61.5C112 65.0899 114.91 68 118.5 68C122.09 68 125 65.0899 125 61.5Z"
                                         fill="#EDEEF0">
                                        </path>
                                          <path
                                               d="M112 61.5V52H99V61.5C99 65.0899 101.91 68 105.5 68C109.09 68 112 65.0899 112 61.5Z"
                                               fill="#D2D3D6"></path>
                                     <path
                                           d="M99 61.5V52H86V61.5C86 65.0899 88.9101 68 92.5 68C96.0899 68 99 65.0899 99 61.5Z"
                                           fill="#EDEEF0"></path>
                                     <path
                                         d="M86 61.5V52H73V61.5C73 65.0899 75.9101 68 79.5 68C83.0899 68 86 65.0899 86 61.5Z"
                                               fill="#D2D3D6"></path>
                                     <path
                                            d="M73 61.5V52H60V61.5C60 65.0899 62.9101 68 66.5 68C70.0899 68 73 65.0899 73 61.5Z"
                                            fill="#EDEEF0"></path>
                                         <path
                                            d="M60 61.5V52H47V61.5C47 65.0899 49.9101 68 53.5 68C57.0899 68 60 65.0899 60 61.5Z"
                                            fill="#D2D3D6"></path>
                                        <path
                                               d="M47 61.5V52H34V61.5C34 65.0899 36.9101 68 40.5 68C44.0899 68 47 65.0899 47 61.5Z"
                                               fill="#EDEEF0"></path>
                                    </svg>
                                </span>
                                <img src="images/${item.logo}" alt="food-storylogo-${key}">
                            </div>
                        </div>
                    </div>
                    <span class="food-story-resturant">${item.name}</span>
                    <span class="food-story-time">${item.time}ساعت پیش</span>
                </div>`;
            }
            document.querySelector(".food-story-items").innerHTML = output;
        } else {
            console.log("error");
        }
    }
    xhr.send();
}

loadFoodStoryData();

function loadSuggestionsData() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "js/data.json", true);
    xhr.onload = function () {
        if (this.status === 200) {
            let data = JSON.parse(xhr.responseText);
            let suggestions = data.suggestions;
            let output = ``;
            for (let key in suggestions) {
                let item = suggestions[key];
                output += `<a href="#">
                    <section class="suggestion-item">
                        <div class="suggestion-pictures">
                            <div class="suggestion-main-img">
                                <div class="suggestion-img-not-loaded">
                                    <svg width="292" height="114" viewBox="0 0 343 114" fill="none"
                                        xmlns="http://www.w3.org/2000/svg" class="">
                                        <path
                                            d="M200.24 55.3C198.823 55.3023 197.998 54.367 197.996 53.1494C197.994 51.9692 198.816 50.9752 200.233 50.9728C201.651 50.9705 202.476 51.962 202.478 53.1421C202.48 54.3597 201.658 55.2977 200.24 55.3Z"
                                            fill="#D7D9DC"></path>
                                        <path
                                            d="M200.364 41.6453H200.539V40.8579H200.256L200.075 41.3237L199.893 40.8579H199.61V41.6453H199.786V41.01H199.79L200.023 41.6453H200.127L200.36 41.01H200.364V41.6453Z"
                                            fill="#D7D9DC"></path>
                                        <path
                                            d="M199.268 41.01H199.513V40.8579H198.829V41.01H199.074V41.6453H199.268V41.01Z"
                                            fill="#D7D9DC"></path>
                                        <path
                                            d="M199.045 49.9301H201.032C201.993 49.9301 202.833 49.2938 203.073 48.3833L205.047 40.8882C205.051 40.873 205.039 40.8579 205.023 40.8579H201.454C201.443 40.8579 201.433 40.8654 201.43 40.8762L199.045 49.9301Z"
                                            fill="#D7D9DC"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M189.446 46.459C189.432 46.459 189.421 46.4481 189.421 46.4347V45.3967C189.421 45.3834 189.41 45.3725 189.396 45.3725H185.96C185.946 45.3725 185.935 45.3834 185.935 45.3967V59.0107C185.935 59.024 185.946 59.0349 185.96 59.0349H187.346C188.492 59.0349 189.421 58.1263 189.421 57.0052V54.1282C189.421 54.106 189.449 54.0957 189.465 54.1123C190.213 54.9222 191.358 55.3006 192.467 55.3006C195.378 55.3006 197.39 52.9778 197.39 50.2054C197.39 47.4517 195.359 45.0541 192.429 45.0541C191.284 45.0541 190.101 45.5002 189.467 46.4481C189.462 46.4548 189.454 46.459 189.446 46.459ZM191.547 52.3409C190.13 52.3409 189.306 51.4043 189.306 50.1867C189.306 49.0065 190.13 48.0138 191.547 48.0138C192.965 48.0138 193.789 49.0065 193.789 50.1867C193.789 51.4043 192.965 52.3409 191.547 52.3409Z"
                                            fill="#D7D9DC"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M177.34 46.459C177.326 46.459 177.315 46.4481 177.315 46.4347V45.3725H173.829V59.0349H175.24C176.386 59.0349 177.315 58.1263 177.315 57.0052V54.0726C177.315 54.0698 177.319 54.0684 177.321 54.0706C178.068 54.9092 179.234 55.3006 180.361 55.3006C183.272 55.3006 185.284 52.9778 185.284 50.2054C185.284 47.4517 183.253 45.0541 180.323 45.0541C179.178 45.0541 177.995 45.5002 177.361 46.4481C177.356 46.4548 177.348 46.459 177.34 46.459ZM179.441 52.3409C178.024 52.3409 177.2 51.4043 177.2 50.1867C177.2 49.0065 178.024 48.0138 179.441 48.0138C180.859 48.0138 181.683 49.0065 181.683 50.1867C181.683 51.4043 180.859 52.3409 179.441 52.3409Z"
                                            fill="#D7D9DC"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M169.301 54.9822H170.687C171.833 54.9822 172.763 54.0734 172.763 52.9524V45.3967C172.763 45.3834 172.752 45.3725 172.738 45.3725H169.301C169.288 45.3725 169.277 45.3834 169.277 45.3967V46.244C169.277 46.2664 169.248 46.2766 169.233 46.2598C168.502 45.4501 167.339 45.0541 166.231 45.0541C163.319 45.0541 161.308 47.4143 161.308 50.1679C161.308 52.9216 163.358 55.3006 166.269 55.3006C167.414 55.3006 168.616 54.8732 169.231 53.9257C169.236 53.9187 169.243 53.9144 169.252 53.9144C169.265 53.9144 169.277 53.9253 169.277 53.9387V54.9579C169.277 54.9713 169.288 54.9822 169.301 54.9822ZM167.15 52.3409C165.733 52.3409 164.909 51.4043 164.909 50.1867C164.909 49.0065 165.733 48.0138 167.15 48.0138C168.568 48.0138 169.392 49.0065 169.392 50.1867C169.392 51.4043 168.568 52.3409 167.15 52.3409Z"
                                            fill="#D7D9DC"></path>
                                        <path
                                            d="M153.794 46.6088C153.781 46.6088 153.77 46.598 153.77 46.5845V45.3967C153.77 45.3834 153.759 45.3725 153.745 45.3725H150.308C150.295 45.3725 150.284 45.3834 150.284 45.3967V54.9579C150.284 54.9713 150.295 54.9822 150.308 54.9822H151.694C152.841 54.9822 153.77 54.0736 153.77 52.9525V49.9994C153.77 48.8005 154.172 47.7703 155.589 47.7703C157.188 47.7703 157.172 49.156 157.162 50.0894C157.161 50.1624 157.16 50.2326 157.16 50.2992V54.9579C157.16 54.9713 157.171 54.9822 157.185 54.9822H158.571C159.717 54.9822 160.646 54.0736 160.646 52.9525V49.0441C160.646 46.6838 159.593 45.0541 156.949 45.0541C155.594 45.0541 154.618 45.445 153.815 46.5982C153.811 46.6047 153.803 46.6088 153.794 46.6088Z"
                                            fill="#D7D9DC"></path>
                                        <path
                                            d="M146.033 43.6999C146.992 43.9775 148.018 43.5531 148.475 42.6825L149.008 41.6656C149.014 41.6539 149.01 41.6397 148.998 41.6332C147.717 40.9281 145.947 40.4833 144.499 40.4833C141.606 40.4833 139.518 42.3565 139.518 45.2226C139.518 47.9576 141.07 48.557 143.426 49.2127C143.464 49.2233 143.504 49.2343 143.545 49.2456C144.367 49.4727 145.705 49.8422 145.705 50.8236C145.705 51.8165 144.767 52.2473 143.886 52.2473C142.602 52.2473 141.491 51.5916 140.553 50.7862L138.954 53.7267C138.948 53.7376 138.951 53.7512 138.962 53.7582C140.433 54.7623 142.208 55.3568 144.02 55.3568C145.475 55.3568 146.989 54.9635 148.119 54.0268C149.268 53.0714 149.613 51.6292 149.613 50.2241C149.613 47.9388 148.061 46.946 146.05 46.3652L145.092 46.0843L145.085 46.0821C144.434 45.8759 143.426 45.5569 143.426 44.7355C143.426 43.9488 144.345 43.5554 145.035 43.5554C145.375 43.5554 145.71 43.6068 146.033 43.6999Z"
                                            fill="#D7D9DC"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M184.416 73.1983V57.6506H180.93V64.5253C180.202 63.6823 179.015 63.2703 177.884 63.2703C174.973 63.2703 172.962 65.6306 172.962 68.3842C172.962 71.1378 175.011 73.5167 177.923 73.5167C179.072 73.5167 180.279 73.0859 180.892 72.1305H180.93V73.1983H184.416ZM178.804 66.2299C180.221 66.2299 181.045 67.2228 181.045 68.4029C181.045 69.6204 180.221 70.5571 178.804 70.5571C177.386 70.5571 176.563 69.6204 176.563 68.4029C176.563 67.2228 177.386 66.2299 178.804 66.2299Z"
                                            fill="#D7D9DC"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M166.609 73.5167C169.769 73.5167 172.527 71.6623 172.527 68.4029C172.527 65.1247 169.769 63.2703 166.609 63.2703C163.448 63.2703 160.69 65.1247 160.69 68.4029C160.69 71.681 163.467 73.5167 166.609 73.5167ZM166.609 66.2299C168.026 66.2299 168.85 67.2228 168.85 68.4029C168.85 69.6204 168.026 70.5571 166.609 70.5571C165.191 70.5571 164.368 69.6204 164.368 68.4029C164.368 67.2228 165.191 66.2299 166.609 66.2299Z"
                                            fill="#D7D9DC"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M154.354 73.5167C157.514 73.5167 160.272 71.6623 160.272 68.4029C160.272 65.1247 157.514 63.2703 154.354 63.2703C151.193 63.2703 148.435 65.1247 148.435 68.4029C148.435 71.681 151.212 73.5167 154.354 73.5167ZM154.354 66.2299C155.771 66.2299 156.595 67.2228 156.595 68.4029C156.595 69.6204 155.771 70.5571 154.354 70.5571C152.936 70.5571 152.112 69.6204 152.112 68.4029C152.112 67.2228 152.936 66.2299 154.354 66.2299Z"
                                            fill="#D7D9DC"></path>
                                        <path
                                            d="M143.822 64.5441V62.1838H148.362V59.0743H140.068V73.1983H143.822V67.6536H147.941V64.5441H143.822Z"
                                            fill="#D7D9DC"></path>
                                    </svg>
                                </div>
                                <img src="images/${item.img}" alt="suggestion-${key}">
                            </div>`
                if (item.hasOwnProperty("promotionTop") && item.hasOwnProperty("ad")) {
                    output += `<div class="suggestion-overlay-promotions">
                                <div class="suggestion-pro-users">
                                    <svg width="21" height="21" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 3.89211H11.9182C14.1709 3.89211 16 5.73305 16 8.00001C16 10.2674 14.1709 12.1079 11.9186 12.1079H0V3.89211Z"
                                            fill="#E20074"></path>
                                        <path
                                            d="M9.69037 5.76833C9.29294 5.76833 8.95307 5.8699 8.67074 6.07305C8.39759 6.27284 8.17865 6.57757 8.01434 6.9868V6.00925C8.01434 5.8762 7.90717 5.76833 7.77497 5.76833H6.45008V9.99123C6.45008 10.1243 6.55726 10.2322 6.68946 10.2322H7.29498C7.73869 10.2322 8.09817 9.87035 8.09817 9.42375V8.64558C8.09817 8.18933 8.20659 7.83801 8.42386 7.59121C8.64405 7.34147 8.95599 7.21639 9.35967 7.21639C9.41847 7.21639 9.51021 7.22269 9.63449 7.23528L9.93266 7.29153V5.82373C9.93266 5.79981 9.91473 5.78008 9.89096 5.77798C9.84759 5.77168 9.78045 5.76833 9.69037 5.76833Z"
                                            fill="white"></path>
                                        <path
                                            d="M5.44881 5.27598C5.24071 5.10096 4.98174 4.97294 4.67147 4.89193C4.35453 4.8168 3.81824 4.77944 3.06301 4.77944H1.11884V10.9797C1.11884 11.1127 1.22601 11.2206 1.35821 11.2206H2.06131C2.50503 11.2206 2.8645 10.8588 2.8645 10.4122V9.37633H3.51631C4.10932 9.37633 4.5251 9.34359 4.76405 9.27769C5.03095 9.21221 5.25906 9.10434 5.44839 8.9545C5.71195 8.75135 5.90295 8.49531 6.02097 8.18597C6.15441 7.87999 6.22114 7.5207 6.22114 7.1081C6.22114 6.72069 6.15441 6.36938 6.02097 6.05374C5.88752 5.7444 5.69694 5.48501 5.44881 5.27598ZM4.4663 7.09887C4.4663 7.52322 4.12475 7.86698 3.70314 7.86698H2.86492V6.25521H3.70314C4.12475 6.25521 4.4663 6.59897 4.4663 7.02332V7.09887Z"
                                            fill="white"></path>
                                        <path
                                            d="M12.4436 5.64912C11.0974 5.64912 10.0061 6.70181 10.0061 8.00003C10.0061 9.29826 11.0974 10.3509 12.4436 10.3509C13.7897 10.3509 14.8811 9.29826 14.8811 8.00003C14.8811 6.70181 13.7897 5.64912 12.4436 5.64912ZM13.3006 8.25649C13.3006 8.70224 12.9169 9.06363 12.4436 9.06363C11.9702 9.06363 11.5866 8.70224 11.5866 8.25649V7.74358C11.5866 7.29782 11.9702 6.93643 12.4436 6.93643C12.9169 6.93643 13.3006 7.29782 13.3006 7.74358V8.25649Z"
                                            fill="white"></path>
                                    </svg>
                                    <p>
                                        ${item.promotionTop}
                                    </p>
                                </div>
                                <div class="suggestion-ad">
                                    <span>
                                        ${item.ad}
                                    </span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="#FF00A6">
                                        <path
                                            d="M8.83603 1.19819C8.98428 0.965218 8.91561 0.656173 8.68263 0.50792C8.44966 0.359666 8.14062 0.428342 7.99237 0.661312L6.34245 3.25404C6.1942 3.48701 6.26287 3.79605 6.49584 3.94431C6.72881 4.09256 7.03786 4.02388 7.18611 3.79091L8.83603 1.19819Z">
                                        </path>
                                        <path
                                            d="M9.23916 5.05455C9.0439 5.24982 9.0439 5.5664 9.23916 5.76166C9.43442 5.95692 9.75101 5.95692 9.94627 5.76166L12.0676 3.64034C12.2629 3.44508 12.2629 3.1285 12.0676 2.93323C11.8723 2.73797 11.5557 2.73797 11.3605 2.93323L9.23916 5.05455Z">
                                        </path>
                                        <path
                                            d="M11.0565 8.50496C11.2047 8.73794 11.5138 8.80661 11.7468 8.65836L14.3395 7.00844C14.5725 6.86019 14.6411 6.55115 14.4929 6.31817C14.3446 6.0852 14.0356 6.01653 13.8026 6.16478L11.2099 7.8147C10.9769 7.96295 10.9082 8.27199 11.0565 8.50496Z">
                                        </path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M3.96438 5.54523C4.03724 5.36308 4.14633 5.19764 4.28505 5.05892L4.40726 4.9367C5.00745 4.33652 5.8982 4.39435 6.61318 4.63267C7.37045 4.8851 8.17742 5.40703 8.88561 6.11521C9.5938 6.8234 10.1157 7.63037 10.3681 8.38764C10.6065 9.10262 10.6643 9.99337 10.0641 10.5936L9.9419 10.7158C9.80319 10.8545 9.63774 10.9636 9.4556 11.0364L5.90697 12.4559C5.88116 12.4662 5.85545 12.4768 5.82985 12.4875L6.12596 12.7837C6.48307 13.1408 7.01129 13.2655 7.4904 13.1058L8.43909 12.7895C8.78838 12.6731 9.16593 12.8619 9.28236 13.2112C9.39879 13.5605 9.21002 13.938 8.86073 14.0544L7.91204 14.3707C6.95381 14.6901 5.89737 14.4407 5.18315 13.7265L4.65688 13.2002C4.54718 13.2914 4.44153 13.3877 4.3403 13.489L4.17156 13.6577C3.52069 14.3086 2.46541 14.3086 1.81454 13.6577L1.34314 13.1863C0.692262 12.5354 0.692262 11.4801 1.34314 10.8293L1.51187 10.6605C1.95876 10.2136 2.31021 9.68064 2.54493 9.09385L3.96438 5.54523ZM6.52858 8.47224C5.93503 7.87868 5.54226 7.24332 5.36815 6.72098C5.17994 6.15634 5.29939 5.9302 5.35007 5.87951C5.40076 5.82882 5.6269 5.70937 6.19154 5.89759C6.71388 6.0717 7.34924 6.46446 7.9428 7.05802C8.53636 7.65158 8.92912 8.28694 9.10324 8.80928C9.29145 9.37392 9.172 9.60006 9.12131 9.65075C9.07062 9.70144 8.84448 9.82089 8.27984 9.63267C7.7575 9.45856 7.12214 9.0658 6.52858 8.47224ZM5.58578 9.41505C5.11742 8.94669 4.73053 8.43513 4.44919 7.92332L3.7829 9.58904C3.69171 9.817 3.58683 10.0386 3.46899 10.2528C3.49704 10.4551 3.63753 10.7666 3.93587 11.065C4.23419 11.3633 4.54573 11.5038 4.74797 11.5318C4.96216 11.414 5.18382 11.3091 5.41178 11.2179L7.07751 10.5516C6.56569 10.2703 6.05413 9.8834 5.58578 9.41505ZM2.99306 12.0078C3.15366 12.1684 3.32879 12.312 3.51286 12.4338C3.47392 12.4707 3.43546 12.5082 3.39749 12.5461L3.22875 12.7149C3.09858 12.8451 2.88752 12.8451 2.75735 12.7149L2.28594 12.2435C2.15577 12.1133 2.15577 11.9022 2.28594 11.7721L2.45468 11.6033C2.49266 11.5654 2.5301 11.5269 2.567 11.488C2.68883 11.672 2.83246 11.8472 2.99306 12.0078Z">
                                        </path>
                                    </svg>
                                </div>
                            </div>`;
                } else if (item.hasOwnProperty("promotionTop")) {
                    output += `<div class="suggestion-overlay-promotions">
                                <div class="suggestion-pro-users">
                                    <svg width="21" height="21" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 3.89211H11.9182C14.1709 3.89211 16 5.73305 16 8.00001C16 10.2674 14.1709 12.1079 11.9186 12.1079H0V3.89211Z"
                                            fill="#E20074"></path>
                                        <path
                                            d="M9.69037 5.76833C9.29294 5.76833 8.95307 5.8699 8.67074 6.07305C8.39759 6.27284 8.17865 6.57757 8.01434 6.9868V6.00925C8.01434 5.8762 7.90717 5.76833 7.77497 5.76833H6.45008V9.99123C6.45008 10.1243 6.55726 10.2322 6.68946 10.2322H7.29498C7.73869 10.2322 8.09817 9.87035 8.09817 9.42375V8.64558C8.09817 8.18933 8.20659 7.83801 8.42386 7.59121C8.64405 7.34147 8.95599 7.21639 9.35967 7.21639C9.41847 7.21639 9.51021 7.22269 9.63449 7.23528L9.93266 7.29153V5.82373C9.93266 5.79981 9.91473 5.78008 9.89096 5.77798C9.84759 5.77168 9.78045 5.76833 9.69037 5.76833Z"
                                            fill="white"></path>
                                        <path
                                            d="M5.44881 5.27598C5.24071 5.10096 4.98174 4.97294 4.67147 4.89193C4.35453 4.8168 3.81824 4.77944 3.06301 4.77944H1.11884V10.9797C1.11884 11.1127 1.22601 11.2206 1.35821 11.2206H2.06131C2.50503 11.2206 2.8645 10.8588 2.8645 10.4122V9.37633H3.51631C4.10932 9.37633 4.5251 9.34359 4.76405 9.27769C5.03095 9.21221 5.25906 9.10434 5.44839 8.9545C5.71195 8.75135 5.90295 8.49531 6.02097 8.18597C6.15441 7.87999 6.22114 7.5207 6.22114 7.1081C6.22114 6.72069 6.15441 6.36938 6.02097 6.05374C5.88752 5.7444 5.69694 5.48501 5.44881 5.27598ZM4.4663 7.09887C4.4663 7.52322 4.12475 7.86698 3.70314 7.86698H2.86492V6.25521H3.70314C4.12475 6.25521 4.4663 6.59897 4.4663 7.02332V7.09887Z"
                                            fill="white"></path>
                                        <path
                                            d="M12.4436 5.64912C11.0974 5.64912 10.0061 6.70181 10.0061 8.00003C10.0061 9.29826 11.0974 10.3509 12.4436 10.3509C13.7897 10.3509 14.8811 9.29826 14.8811 8.00003C14.8811 6.70181 13.7897 5.64912 12.4436 5.64912ZM13.3006 8.25649C13.3006 8.70224 12.9169 9.06363 12.4436 9.06363C11.9702 9.06363 11.5866 8.70224 11.5866 8.25649V7.74358C11.5866 7.29782 11.9702 6.93643 12.4436 6.93643C12.9169 6.93643 13.3006 7.29782 13.3006 7.74358V8.25649Z"
                                            fill="white"></path>
                                    </svg>
                                    <p>
                                        ${item.promotionTop}
                                    </p>
                                </div>
                                </div>`;
                } else if (item.hasOwnProperty("ad")) {
                    output += `<div class="suggestion-overlay-promotions">
                                    <div class="suggestion-ad">
                                        <span>
                                            ${item.ad}
                                        </span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="#FF00A6">
                                            <path
                                                d="M8.83603 1.19819C8.98428 0.965218 8.91561 0.656173 8.68263 0.50792C8.44966 0.359666 8.14062 0.428342 7.99237 0.661312L6.34245 3.25404C6.1942 3.48701 6.26287 3.79605 6.49584 3.94431C6.72881 4.09256 7.03786 4.02388 7.18611 3.79091L8.83603 1.19819Z">
                                           </path>
                                           <path
                                               d="M9.23916 5.05455C9.0439 5.24982 9.0439 5.5664 9.23916 5.76166C9.43442 5.95692 9.75101 5.95692 9.94627 5.76166L12.0676 3.64034C12.2629 3.44508 12.2629 3.1285 12.0676 2.93323C11.8723 2.73797 11.5557 2.73797 11.3605 2.93323L9.23916 5.05455Z">
                                            </path>
                                            <path
                                                d="M11.0565 8.50496C11.2047 8.73794 11.5138 8.80661 11.7468 8.65836L14.3395 7.00844C14.5725 6.86019 14.6411 6.55115 14.4929 6.31817C14.3446 6.0852 14.0356 6.01653 13.8026 6.16478L11.2099 7.8147C10.9769 7.96295 10.9082 8.27199 11.0565 8.50496Z">
                                            </path>
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M3.96438 5.54523C4.03724 5.36308 4.14633 5.19764 4.28505 5.05892L4.40726 4.9367C5.00745 4.33652 5.8982 4.39435 6.61318 4.63267C7.37045 4.8851 8.17742 5.40703 8.88561 6.11521C9.5938 6.8234 10.1157 7.63037 10.3681 8.38764C10.6065 9.10262 10.6643 9.99337 10.0641 10.5936L9.9419 10.7158C9.80319 10.8545 9.63774 10.9636 9.4556 11.0364L5.90697 12.4559C5.88116 12.4662 5.85545 12.4768 5.82985 12.4875L6.12596 12.7837C6.48307 13.1408 7.01129 13.2655 7.4904 13.1058L8.43909 12.7895C8.78838 12.6731 9.16593 12.8619 9.28236 13.2112C9.39879 13.5605 9.21002 13.938 8.86073 14.0544L7.91204 14.3707C6.95381 14.6901 5.89737 14.4407 5.18315 13.7265L4.65688 13.2002C4.54718 13.2914 4.44153 13.3877 4.3403 13.489L4.17156 13.6577C3.52069 14.3086 2.46541 14.3086 1.81454 13.6577L1.34314 13.1863C0.692262 12.5354 0.692262 11.4801 1.34314 10.8293L1.51187 10.6605C1.95876 10.2136 2.31021 9.68064 2.54493 9.09385L3.96438 5.54523ZM6.52858 8.47224C5.93503 7.87868 5.54226 7.24332 5.36815 6.72098C5.17994 6.15634 5.29939 5.9302 5.35007 5.87951C5.40076 5.82882 5.6269 5.70937 6.19154 5.89759C6.71388 6.0717 7.34924 6.46446 7.9428 7.05802C8.53636 7.65158 8.92912 8.28694 9.10324 8.80928C9.29145 9.37392 9.172 9.60006 9.12131 9.65075C9.07062 9.70144 8.84448 9.82089 8.27984 9.63267C7.7575 9.45856 7.12214 9.0658 6.52858 8.47224ZM5.58578 9.41505C5.11742 8.94669 4.73053 8.43513 4.44919 7.92332L3.7829 9.58904C3.69171 9.817 3.58683 10.0386 3.46899 10.2528C3.49704 10.4551 3.63753 10.7666 3.93587 11.065C4.23419 11.3633 4.54573 11.5038 4.74797 11.5318C4.96216 11.414 5.18382 11.3091 5.41178 11.2179L7.07751 10.5516C6.56569 10.2703 6.05413 9.8834 5.58578 9.41505ZM2.99306 12.0078C3.15366 12.1684 3.32879 12.312 3.51286 12.4338C3.47392 12.4707 3.43546 12.5082 3.39749 12.5461L3.22875 12.7149C3.09858 12.8451 2.88752 12.8451 2.75735 12.7149L2.28594 12.2435C2.15577 12.1133 2.15577 11.9022 2.28594 11.7721L2.45468 11.6033C2.49266 11.5654 2.5301 11.5269 2.567 11.488C2.68883 11.672 2.83246 11.8472 2.99306 12.0078Z">
                                            </path>
                                        </svg>
                                    </div>
                                </div>`;
                }
                output += `<div class="suggestion-logo`;
                if (item.isPro) {
                    output += " suggestion-logo-pro-container";
                }
                output += `">
                                <div class="suggestion-logo-not-loaded">
                                    <svg width="48" height="48" viewBox="0 0 160 160" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.03"
                                            d="M80 141C119.765 141 152 136.523 152 131C152 125.477 119.765 121 80 121C40.2355 121 8 125.477 8 131C8 136.523 40.2355 141 80 141Z"
                                            fill="black"></path>
                                        <path
                                            d="M29 44C29 39.5817 32.5817 36 37 36H127C131.418 36 135 39.5817 135 44V115C135 123.837 127.837 131 119 131H45C36.1634 131 29 123.837 29 115V44Z"
                                            fill="#D2D3D6"></path>
                                        <path
                                            d="M29 52H125V115C125 123.837 117.837 131 109 131H45C36.1634 131 29 123.837 29 115V52Z"
                                            fill="#EDEEF0"></path>
                                        <path
                                            d="M39 60H115V115C115 118.314 112.314 121 109 121H45C41.6863 121 39 118.314 39 115V60Z"
                                            fill="white"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M62 88C62 89.105 61.105 90 60 90C58.895 90 58 89.105 58 88C58 86.895 58.895 86 60 86C61.105 86 62 86.895 62 88Z"
                                            fill="#B5B8BD"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M94 88C94 89.105 93.105 90 92 90C90.895 90 90 89.105 90 88C90 86.895 90.895 86 92 86C93.105 86 94 86.895 94 88Z"
                                            fill="#B5B8BD"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M72 95L71.2929 95.7071C70.9024 95.3166 70.9024 94.6834 71.2929 94.2929C71.6826 93.9032 72.3139 93.9024 72.7046 94.2904L72.7065 94.2922L72.7072 94.2929C72.7109 94.2965 72.7182 94.3036 72.7291 94.3137C72.7507 94.3339 72.7862 94.3664 72.8346 94.4084C72.9317 94.4925 73.079 94.6132 73.2687 94.7488C73.6522 95.0227 74.1879 95.3419 74.8162 95.5513C75.4404 95.7594 76.136 95.853 76.8664 95.7069C77.5894 95.5623 78.4166 95.1692 79.2929 94.2929C79.6834 93.9024 80.3166 93.9024 80.7071 94.2929C81.0976 94.6834 81.0976 95.3166 80.7071 95.7071C79.5834 96.8308 78.4106 97.4377 77.2586 97.6681C76.114 97.897 75.0596 97.7406 74.1838 97.4487C73.3121 97.1581 72.5978 96.7273 72.1063 96.3762C71.8585 96.1993 71.6621 96.0388 71.5248 95.9198C71.456 95.8601 71.4016 95.8106 71.3627 95.7742C71.3433 95.756 71.3277 95.7411 71.316 95.7298L71.3014 95.7156L71.2964 95.7106L71.2945 95.7087L71.2936 95.7078C71.2936 95.7078 71.2929 95.7071 72 95Z"
                                            fill="#B5B8BD"></path>
                                        <path
                                            d="M109 131C117.837 131 125 123.837 125 115H135C135 123.837 127.837 131 119 131H109Z"
                                            fill="#B5B8BD"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M34.5897 119.701C35.3072 119.287 36.2246 119.533 36.6388 120.25C37.3848 121.542 38.4578 122.615 39.75 123.361C41.0422 124.107 42.5079 124.5 44 124.5C44.8284 124.5 45.5 125.172 45.5 126C45.5 126.828 44.8284 127.5 44 127.5C41.9813 127.5 39.9982 126.969 38.25 125.959C36.5018 124.95 35.05 123.498 34.0407 121.75C33.6265 121.033 33.8723 120.115 34.5897 119.701Z"
                                            fill="white"></path>
                                        <path
                                            d="M32.5 116C32.5 115.172 33.1716 114.5 34 114.5C34.8284 114.5 35.5 115.172 35.5 116C35.5 116.828 34.8284 117.5 34 117.5C33.1716 117.5 32.5 116.828 32.5 116Z"
                                            fill="white"></path>
                                        <g opacity="0.4" style="mix-blend-mode: multiply;">
                                            <path
                                                d="M29 52V70H31C33.7205 70 36 66.5736 36 63.5C36 67.0899 38.9102 70 42.5 70C46.0898 70 49 67.0899 49 63.5C49 67.0899 51.9102 70 55.5 70C59.0898 70 62 67.0899 62 63.5C62 67.0899 64.9102 70 68.5 70C72.0898 70 75 67.0899 75 63.5C75 67.0899 77.9102 70 81.5 70C85.0898 70 88 67.0899 88 63.5C88 67.0899 90.9102 70 94.5 70C98.0898 70 101 67.0899 101 63.5C101 67.0899 103.91 70 107.5 70C111.09 70 114 67.0899 114 63.5C114 67.0899 116.91 70 120.5 70C122.246 70 123.832 69.3112 125 68.1904V52H29Z"
                                                fill="#D2D3D6"></path>
                                        </g>
                                        <path d="M107 36L99 52H86L94 36H107Z" fill="white"></path>
                                        <path d="M81 36L73 52H60L68 36H81Z" fill="white"></path>
                                        <path d="M55 36L47 52H34L42 36H55Z" fill="white"></path>
                                        <path d="M120 36L112 52H99L107 36H120Z" fill="#EDEEF0"></path>
                                        <path d="M94 36L86 52H73L81 36H94Z" fill="#EDEEF0"></path>
                                        <path d="M68 36L60 52H47L55 36H68Z" fill="#EDEEF0"></path>
                                        <path
                                            d="M42 36L34 52H21L27.3416 39.3167C28.358 37.284 30.4356 36 32.7082 36H42Z"
                                            fill="#EDEEF0"></path>
                                        <path
                                            d="M127 36H120L112 52H125L132.087 37.8256C130.705 36.6851 128.932 36 127 36Z"
                                            fill="white"></path>
                                        <path
                                            d="M34 61.5V52H21V61.5C21 65.0899 23.9101 68 27.5 68C31.0899 68 34 65.0899 34 61.5Z"
                                            fill="#D2D3D6"></path>
                                        <path
                                            d="M125 61.5V52H112V61.5C112 65.0899 114.91 68 118.5 68C122.09 68 125 65.0899 125 61.5Z"
                                            fill="#EDEEF0">
                                        </path>
                                        <path
                                            d="M112 61.5V52H99V61.5C99 65.0899 101.91 68 105.5 68C109.09 68 112 65.0899 112 61.5Z"
                                            fill="#D2D3D6"></path>
                                        <path
                                            d="M99 61.5V52H86V61.5C86 65.0899 88.9101 68 92.5 68C96.0899 68 99 65.0899 99 61.5Z"
                                            fill="#EDEEF0"></path>
                                        <path
                                            d="M86 61.5V52H73V61.5C73 65.0899 75.9101 68 79.5 68C83.0899 68 86 65.0899 86 61.5Z"
                                            fill="#D2D3D6"></path>
                                        <path
                                            d="M73 61.5V52H60V61.5C60 65.0899 62.9101 68 66.5 68C70.0899 68 73 65.0899 73 61.5Z"
                                            fill="#EDEEF0"></path>
                                        <path
                                            d="M60 61.5V52H47V61.5C47 65.0899 49.9101 68 53.5 68C57.0899 68 60 65.0899 60 61.5Z"
                                            fill="#D2D3D6"></path>
                                        <path
                                            d="M47 61.5V52H34V61.5C34 65.0899 36.9101 68 40.5 68C44.0899 68 47 65.0899 47 61.5Z"
                                            fill="#EDEEF0"></path>
                                    </svg>
                                </div>
                                <img src="images/${item.logo}" alt="logo-${key}">`;
                if (item.isPro) {
                    output += `<div class="suggestion-logo-pro">
                                    <svg width="28" height="28" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0 3.89211H11.9182C14.1709 3.89211 16 5.73305 16 8.00001C16 10.2674 14.1709 12.1079 11.9186 12.1079H0V3.89211Z"
                                            fill="#e20074"></path>
                                        <path
                                            d="M9.69037 5.76833C9.29294 5.76833 8.95307 5.8699 8.67074 6.07305C8.39759 6.27284 8.17865 6.57757 8.01434 6.9868V6.00925C8.01434 5.8762 7.90717 5.76833 7.77497 5.76833H6.45008V9.99123C6.45008 10.1243 6.55726 10.2322 6.68946 10.2322H7.29498C7.73869 10.2322 8.09817 9.87035 8.09817 9.42375V8.64558C8.09817 8.18933 8.20659 7.83801 8.42386 7.59121C8.64405 7.34147 8.95599 7.21639 9.35967 7.21639C9.41847 7.21639 9.51021 7.22269 9.63449 7.23528L9.93266 7.29153V5.82373C9.93266 5.79981 9.91473 5.78008 9.89096 5.77798C9.84759 5.77168 9.78045 5.76833 9.69037 5.76833Z"
                                            fill="white"></path>
                                        <path
                                            d="M5.44881 5.27598C5.24071 5.10096 4.98174 4.97294 4.67147 4.89193C4.35453 4.8168 3.81824 4.77944 3.06301 4.77944H1.11884V10.9797C1.11884 11.1127 1.22601 11.2206 1.35821 11.2206H2.06131C2.50503 11.2206 2.8645 10.8588 2.8645 10.4122V9.37633H3.51631C4.10932 9.37633 4.5251 9.34359 4.76405 9.27769C5.03095 9.21221 5.25906 9.10434 5.44839 8.9545C5.71195 8.75135 5.90295 8.49531 6.02097 8.18597C6.15441 7.87999 6.22114 7.5207 6.22114 7.1081C6.22114 6.72069 6.15441 6.36938 6.02097 6.05374C5.88752 5.7444 5.69694 5.48501 5.44881 5.27598ZM4.4663 7.09887C4.4663 7.52322 4.12475 7.86698 3.70314 7.86698H2.86492V6.25521H3.70314C4.12475 6.25521 4.4663 6.59897 4.4663 7.02332V7.09887Z"
                                            fill="white"></path>
                                        <path
                                            d="M12.4436 5.64912C11.0974 5.64912 10.0061 6.70181 10.0061 8.00003C10.0061 9.29826 11.0974 10.3509 12.4436 10.3509C13.7897 10.3509 14.8811 9.29826 14.8811 8.00003C14.8811 6.70181 13.7897 5.64912 12.4436 5.64912ZM13.3006 8.25649C13.3006 8.70224 12.9169 9.06363 12.4436 9.06363C11.9702 9.06363 11.5866 8.70224 11.5866 8.25649V7.74358C11.5866 7.29782 11.9702 6.93643 12.4436 6.93643C12.9169 6.93643 13.3006 7.29782 13.3006 7.74358V8.25649Z"
                                            fill="white"></path>
                                    </svg>
                                </div>`;
                }
                output += `</div>
                        </div>
                        <div class="suggestion-descr">
                            <div class="suggestion-descr-first-row">
                                <div class="suggestion-descr-title">
                                    <h3>
                                        ${item.name}
                                    </h3>`;
                if (item.hasOwnProperty("off")) {
                    output += `<span class="off-item-off suggestion-off">
                                        <span>
                                            تا
                                        </span>
                                        <span class="off-item-off-percentage">
                                            ${item.off}
                                        </span>
                                        <svg width="7" height="10" viewBox="0 0 7 10" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M5.98384 2.49114C6.15147 2.1894 6.04276 1.8089 5.74102 1.64127C5.43928 1.47363 5.05878 1.58235 4.89114 1.88409L1.76614 7.50909C1.59851 7.81083 1.70723 8.19133 2.00897 8.35896C2.3107 8.5266 2.69121 8.41788 2.85884 8.11614L5.98384 2.49114Z"
                                                fill="#FFF"></path>
                                            <path
                                                d="M1.68749 2.34386C1.68749 1.91239 2.03727 1.56261 2.46874 1.56261C2.90021 1.56261 3.24999 1.91239 3.24999 2.34386C3.24999 2.77534 2.90021 3.12511 2.46874 3.12511C2.03727 3.12511 1.68749 2.77534 1.68749 2.34386Z"
                                                fill="#FFF"></path>
                                            <path
                                                d="M4.49999 7.65636C4.49999 7.22489 4.84977 6.87511 5.28124 6.87511C5.71272 6.87511 6.06249 7.22489 6.06249 7.65636C6.06249 8.08784 5.71272 8.43761 5.28124 8.43761C4.84977 8.43761 4.49999 8.08784 4.49999 7.65636Z"
                                                fill="#FFF"></path>
                                        </svg>
                                    </span>`;
                }

                output += `</div>
                                <div class="suggestion-feedback">`;
                if (item.hasOwnProperty("review")) {
                    output += `<span class="suggestion-review">
                                        <span class="suggestion-review-parenthesis">(</span>
                                        <span class="suggestion-review-num">${item.review}</span>
                                        <span class="suggestion-review-parenthesis">)</span>
                                    </span>`;
                }
                output += `<div class="off-item-rate">
                                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <path
                                                    d="M5.55159 0.9086C5.735 0.536977 6.26492 0.536977 6.44833 0.9086L7.76331 3.57306L10.7037 4.00032C11.1138 4.05991 11.2776 4.5639 10.9808 4.85317L8.85313 6.92716L9.35541 9.85568C9.42546 10.2641 8.99675 10.5756 8.62993 10.3828L5.99996 9.00011L3.36998 10.3828C3.00317 10.5756 2.57445 10.2641 2.64451 9.85568L3.14679 6.92716L1.01909 4.85317C0.722336 4.5639 0.88609 4.05991 1.2962 4.00032L4.2366 3.57306L5.55159 0.9086Z"
                                                    fill="#404040"></path>
                                                <path
                                                    d="M5.55159 0.9086C5.735 0.536977 6.26492 0.536977 6.44833 0.9086L7.76331 3.57306L10.7037 4.00032C11.1138 4.05991 11.2776 4.5639 10.9808 4.85317L8.85313 6.92716L9.35541 9.85568C9.42546 10.2641 8.99675 10.5756 8.62993 10.3828L5.99996 9.00011L3.36998 10.3828C3.00317 10.5756 2.57445 10.2641 2.64451 9.85568L3.14679 6.92716L1.01909 4.85317C0.722336 4.5639 0.88609 4.05991 1.2962 4.00032L4.2366 3.57306L5.55159 0.9086Z"
                                                    fill="#404040"></path>
                                            </g>
                                        </svg>
                                        <span>
                                            ${item.rate}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="suggestion-descr-second-row">`;
                if (item.deliveryMethod == "پیک اسنپ‌‌فود:") {
                    output += `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M6.56458 14.6235C4.54422 15.4091 2.37821 14.101 2.04426 12.052L3.02097 11.8195L8.61581 10.4874C8.84104 10.4338 9 10.2325 9 10.001V6.50098C9 6.3551 8.93629 6.21649 8.82557 6.1215C8.71484 6.02651 8.56816 5.98461 8.42397 6.00679L2 6.9951L1 7.17285V7.00099C1 5.07355 1.90398 3.61626 3.23965 2.65732C4.56052 1.70899 6.29365 1.25098 8 1.25098C9.70635 1.25098 11.4395 1.709 12.7604 2.65732C14.096 3.61627 15 5.07356 15 7.001V9.63284C15 10.6639 14.367 11.5892 13.4061 11.9629L6.56458 14.6235ZM1 8.2041L2 8.00105C2.02508 8.00102 2.05048 7.9991 2.07603 7.99517L8 7.08379V9.60605L2 11.0346L1 11.2314V8.2041ZM11.25 9.00098C11.25 8.58677 11.5858 8.25098 12 8.25098C12.4142 8.25098 12.75 8.58677 12.75 9.00098C12.75 9.41519 12.4142 9.75098 12 9.75098C11.5858 9.75098 11.25 9.41519 11.25 9.00098Z"
                                            fill="#A3A3A3"></path>
                                    </g>
                                </svg>`
                }
                output += `<span class="suggestion-delivery">
                                    ${item.deliveryMethod}
                                </span>
                                <span class="suggestion-delivery-price">
                                    ${item.deliveryPrice}
                                </span>
                                <span>
                                    تومان
                                </span>
                            </div>`
                if (item.thirdRow) {
                    output += `<div class="suggestion-descr-third-row">`
                    if (item.hasOwnProperty("promotionShop")) {
                        output += `<div class="promotion">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 3C1.44772 3 1 3.44772 1 4V6H15V4C15 3.44772 14.5523 3 14 3H2Z"
                                            fill="#404040"></path>
                                        <path
                                            d="M1 7V12C1 12.5523 1.44772 13 2 13H9.12602C9.04375 12.6804 9 12.3453 9 12C9 9.79086 10.7909 8 13 8C13.7286 8 14.4117 8.19479 15 8.53513V7H1Z"
                                            fill="#404040"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M16 12C16 13.6569 14.6569 15 13 15C11.3431 15 10 13.6569 10 12C10 10.3431 11.3431 9 13 9C14.6569 9 16 10.3431 16 12ZM13.9588 13.5637C13.7226 13.793 13.4302 13.9396 13.1187 13.985C12.8072 14.0303 12.4905 13.9725 12.2087 13.8187C11.9269 13.6649 11.6926 13.4221 11.5355 13.121C11.4624 12.9809 11.5058 12.8017 11.6324 12.7208C11.7591 12.6399 11.921 12.6879 11.9941 12.828C12.0989 13.0288 12.255 13.1906 12.4429 13.2931C12.6308 13.3957 12.8419 13.4342 13.0496 13.404C13.2573 13.3737 13.4522 13.276 13.6096 13.1232C13.7671 12.9703 13.8801 12.7693 13.9343 12.5454C13.9886 12.3215 13.9816 12.0848 13.9142 11.8653C13.8469 11.6458 13.7223 11.4533 13.5561 11.3122C13.3899 11.1711 13.1896 11.0877 12.9806 11.0726C12.8304 11.0617 12.6806 11.0864 12.5408 11.1441L12.6657 11.2146C12.7959 11.2882 12.8476 11.4646 12.7811 11.6088C12.7146 11.7529 12.5552 11.8101 12.4249 11.7365L11.7174 11.3369C11.5872 11.2634 11.5355 11.0869 11.602 10.9427L11.9631 10.1599C12.0296 10.0157 12.189 9.95853 12.3193 10.0321C12.4495 10.1057 12.5012 10.2821 12.4347 10.4263L12.3571 10.5945C12.5663 10.5083 12.7905 10.4715 13.0152 10.4878C13.3288 10.5106 13.6292 10.6357 13.8784 10.8473C14.1277 11.059 14.3147 11.3477 14.4157 11.677C14.5167 12.0062 14.5272 12.3612 14.4459 12.697C14.3645 13.0329 14.195 13.3345 13.9588 13.5637Z"
                                            fill="#404040"></path>
                                    </svg>
                                    جایزه خرید
                                </div>`;
                    }
                    if (item.hasOwnProperty("promotionEco")) {
                        output += `<div class="promotion">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path
                                                d="M0 3.91992H11.9179C14.1708 3.91992 16 5.74908 16 8.00124C16 10.2542 14.1708 12.0826 11.9187 12.0826H0V3.91992Z"
                                                fill="#404040"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M1.11865 4.80127H5.4168V6.46205H3.00366V7.11092H5.08826V8.76267H3.00366V9.53228H5.4168V10.398C5.4168 10.8415 5.05705 11.2013 4.61352 11.2013H1.35849C1.22625 11.2013 1.11865 11.0937 1.11865 10.9614V4.80127ZM12.4435 5.66533C11.0973 5.66533 10.0057 6.71092 10.0057 8.00127C10.0057 9.29162 11.0973 10.3372 12.4435 10.3372C13.7897 10.3372 14.8813 9.29162 14.8813 8.00127C14.8813 6.71092 13.7897 5.66533 12.4435 5.66533ZM13.3002 7.98484V7.98566V8.25671C13.3002 8.69942 12.9166 9.05917 12.4435 9.05917C11.9704 9.05917 11.5868 8.70024 11.5868 8.25671V7.74747C11.5868 7.30476 11.9704 6.945 12.4435 6.945C12.9166 6.945 13.3002 7.30394 13.3002 7.74747V7.98484ZM8.33174 5.66533C6.79498 5.66533 5.91449 6.52283 5.91449 7.96677L5.91531 7.96595C5.91531 9.33268 6.74981 10.3364 8.12394 10.3364C8.66439 10.3364 9.05864 10.2748 9.54488 10.159L9.16623 8.73802C8.85741 8.83083 8.59457 8.88504 8.37856 8.88504C7.8841 8.88504 7.62948 8.60743 7.62948 7.91995C7.62948 7.3409 7.9457 7.10927 8.42455 7.10927C8.64057 7.10927 8.8878 7.15609 9.15802 7.24069L9.52106 5.85096C9.16541 5.73515 8.84919 5.66533 8.33174 5.66533Z"
                                                fill="white"></path>
                                        </g>
                                    </svg>
                                    خوش‌قیمت‌‌
                                </div>`;
                    }
                    if (item.hasOwnProperty("promotionOff")) {
                        output += `<div class="promotion">
                                    تخفیف سفارش اول
                                </div>`;
                    }
                    if (item.hasOwnProperty("promotionCoupon")) {
                        output += `<div class="promotion">
                                    <span>
                                        دارای
                                    </span>
                                    <span style="margin: 0 2px;">
                                        ${item.promotionCoupon}
                                    </span>
                                    <span>
                                        کوپن
                                    </span>
                                </div>`;
                    }
                    output += `</div>`;
                }
                output += `</div>
                    </section>
                </a>`;
            }
            document.querySelectorAll(".suggestion-items")[0].innerHTML = output;
            document.querySelectorAll(".suggestion-items")[1].innerHTML = output;
            document.querySelectorAll(".suggestion-items")[2].innerHTML = output;
            document.querySelectorAll(".suggestion-items")[3].innerHTML = output;
            document.querySelectorAll(".suggestion-items")[4].innerHTML = output;
            document.querySelectorAll(".suggestion-items")[5].innerHTML = output;
            document.querySelectorAll(".suggestion-items")[6].innerHTML = output;
            document.querySelectorAll(".suggestion-items")[7].innerHTML = output;
            document.querySelectorAll(".suggestion-items")[8].innerHTML = output;
            document.querySelectorAll(".suggestion-items")[9].innerHTML = output;
        } else {
            console.log("error");
        }
    }
    xhr.send();
}

loadSuggestionsData();

//banner slideshow

let slideIndex = 0;

function showSlides() {
    let i;
    let slides = document.querySelectorAll(".slider-banner a");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].style.opacity = "1";
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].style.opacity = ".34";
    setTimeout(showSlides, 5000);
}

showSlides();