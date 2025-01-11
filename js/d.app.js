//load city names

function loadCityData() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "js/data.json", true);
    xhr.onload = function () {
        if (this.status === 200) {
            let data = JSON.parse(xhr.responseText);
            let cities = data.cities;
            let output = ``;
            for (let i = 0; i < cities.length; i++) {
                output += `<div class="city">
                <a href="#">
                    <p>
                        ${cities[i]}
                    </p>
                </a>
            </div>`;
            }
            document.querySelector(".cities-list").innerHTML = output;
        } else {
            console.log("error");
        }
    }
    xhr.send();
}

loadCityData();