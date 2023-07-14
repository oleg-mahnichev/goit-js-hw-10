import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");


function populateBreeds() {
    loader.classList.add("loading");
    fetchBreeds()
        .then(breeds => {
            breeds.forEach(breed => {
                const option = document.createElement("option");
                option.value = breed.id;
                option.text = breed.name;
                breedSelect.appendChild(option);
            });
            loader.classList.remove("loading");
            breedSelect.disabled = false;
        })
        .catch(() => {
            loader.classList.remove("loading");
            error.classList.add("error-state");
        });
}

function displayCatInfo() {
    const breedId = breedSelect.value;
    loader.classList.add("loading");
    catInfo.innerHTML = "";

    const loadingText = document.createElement("p");
    loadingText.textContent = "Loading data, please wait...";
    catInfo.appendChild(loadingText);

    fetchCatByBreed(breedId)
        .then(data => {
            const cat = data[0];
            const img = document.createElement("img");
            img.src = cat.url;
            img.style.width = '777px';

            const name = document.createElement("p");
            name.textContent = "Breed: " + cat.breeds[0].name;

            const description = document.createElement("p");
            description.textContent = "Description: " + cat.breeds[0].description;
            description.style.width = '777px';

            const temperament = document.createElement("p");
            temperament.textContent = "Temperament: " + cat.breeds[0].temperament;
            temperament.style.width = '777px';

            catInfo.innerHTML = "";
            catInfo.appendChild(img);
            catInfo.appendChild(name);
            catInfo.appendChild(description);
            catInfo.appendChild(temperament);

            loader.classList.remove("loading");
        })
        .catch(() => {
            loader.classList.remove("loading");
            error.classList.add("error-state");
        });
}

breedSelect.addEventListener("change", displayCatInfo);


populateBreeds();
