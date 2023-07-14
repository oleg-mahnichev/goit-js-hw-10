import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_HKPCvN3LmDFaMwIePofjiW38IibgUMV6KbP9IHVAHfoJBvGsVhRnQYsTBzTdBWsD";

const errorElement = document.querySelector(".error");
errorElement.style.display = "none";

export const fetchBreeds = async () => {
    const loaderElement = document.querySelector(".loader");
    loaderElement.style.display = "block";

    try {
        const response = await axios.get("https://api.thecatapi.com/v1/breeds");
        loaderElement.style.display = "none";
        return response.data;
    } catch (error) {
        loaderElement.style.display = "none";
        errorElement.style.display = "block";
    }
};

export const fetchCatByBreed = async (breedId) => {
    try {
        const response = await axios.get(
            `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
        );
        return response.data;
    } catch (error) {
        loaderElement.style.display = "none";
        errorElement.style.display = "block";
    }
};
