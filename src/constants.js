export const TOKEN_KEY = 'token';
// export const BASE_URL = 'https://bobapp-296503.uc.r.appspot.com';同学的
export const BASE_URL = '';
// export const BASE_URL = 'https://35.203.134.112:8080';
export const SEARCH_KEY = {
    all: 0,
    keyword: 1,
    user: 2
};

export const PLACE_TYPES = {
    site: "tourist_attraction",
    dining: "restaurant",
    hotel: "lodging",
  };


//   icons: {
//     site:
//       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAACXBIWXMAAAsSAAALEgHS3X78AAAB0ElEQVRIiaWWr0/DQBTHv7ciWegkis1gN0wtS5CQwIJBQZopDDAEkvDDIfjlCQOFITCB3pBUsGEx659QMiRNyaV342jvel37TZp0r91n3/fu3bsRKGRYQRnALoAagLrw1gBAD0DHd0hP9u0Y1LACE8AtgDXVDwqi0JbvkIESalgBddUFYKYAcnkM3I5BMwJFNXyHPI+hLOU+gHJGIJjjiu8Qb4oF9lTArWVgc+Xv88cnsH8hhVJj9InNnQ5F6M4GYBYBczq8j+r6AfC+AW8U3kdUIoYV1Fktx/p5S5/z0jbw+v4vZBciPSjV/QuwfiB1JVO1oHuD1o+m+XgGzM0CzRMttKaF0oXhdV1dBGaKYSxJWmgGuQW21ZSqzrPVHoW1/RqFsaTkCmxAKHXeCtureRqCbw611nu8T5/EAZKjpVzfIRW+ozoilK44dacTdR7p0TtEBsow596nKtG9L67+cU5gmwIhmadZ3VLYgu8QF5I+zer2igNjThG67aaZB4Jc5tLjIdmOsid0aYtAKZSlkbYMl7ITNemI1pUhlrbSqSCbrapKDRkwEcrKoKpv7KyfSIYVHBlWEAgX/aORX3TgMGCfHeeJ4gNFJ16GWPvEBOAXDJWposVp8PsAAAAASUVORK5CYII=",
//     hotel:
//       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAACXBIWXMAAAsSAAALEgHS3X78AAABwElEQVRIia2WQU4CMRSG/5kSoytn6w7mAuIJ1HgANV4ALmDkAipcQOUCeAQ8gBFOICeouDKuGF2Z6FDzpi2ZdjrMMPBtCK/lz//e62vxkIPgrAXgFEATQF3tigBMADwBePTCOHL9OiMqODsDcJcSyoMEH7wwvl0qKjgbAGgViNmQ8+O064VoRUGNIeynUq4qCFX3G8Op4OytRA3L0PDCeOqrLm9CENqtr46NZPsQaPzJz2pQGVFT9TDxA2DvGdjaB777cim4NvfMI7k266WjgeCs7jtT372UbkncFtPotWxWiWiWuXNQ3OxkS+WryTD56gNRD/gZA58XqxY3qqmDe2SEqZ6aFZvmhfGEnI5XtbKEIVT3h+lpSPg4kakXQcfPhG4v+GRXlUA2iMTKNor2/r6nI4lTPaY0VYM1U6f7tQ3rllp3/pO5h76lFN01XU71F/uSfnWO7XIi5XLRCHuiOhVcdu23yvVG0ft0VVJw4oXxgR10zT7VduqIu2i7ghlRlYpzs0VHnfFiUSU8KjgNIy+M7/MWc/9MQNb3JXPZOLpdymmKc0d9jTe+EoKzpuBsJjgTapw3A4kJzjJ/b5wA+AepRpUoXZHF9AAAAABJRU5ErkJggg==",
//     dining:
//       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAdCAYAAABFRCf7AAAACXBIWXMAAAsSAAALEgHS3X78AAABsElEQVRIia2WP0/CQBjGn2tY3IirDnVwh4m1fgIgjg7KBziVT0AZncDcagLfQJgcqaOTxBUT+wkMm2PNS+9oae+ubcqTkCv35/c+dy/3FgaDIg4XQA9AF0ALQFPODAEEAJZMYKFbnYNGfLf4EcDIFDAlCjBgYhdED5XAlXRWRWMm4OegNYBKe7CT6pzVAJJGEYdHDw3p0pNJSXTWAv62wEnzsP0N4ymnbvydPofGLpTTh1zc6wnQucu3pJsZ4P8A57mNuRFHT0F72VGjLr0ErlfXUedwRLkNK6tzG58lnR+1m/cyoT3HOEQABaOW9DEvtR8z9M0HXvrx83cAPLWTzNu1JujaOOVrkbhWwE0A3BtLBil0mMDWCq6updr+8ojQQEHLZaBYCyYQpgvKa6VLoNcVlcF09p9rAgNVV/dQ2RFYl9k1VqPZ3+mgrssclA45HbGCDszobtRUvnvKaizNJOZ0C2XlWpWArplAO9upvfvyfKYFwK0pB9ZLHHF8Wt5bQyb0gc1VKlZfOspqbgIWQmUCsluk4jO0rStySmCqfwpCrvuystVXxDGJeIn/BQD+ARyCeckINsdpAAAAAElFTkSuQmCC",
//   },
  

//   const elements = {
//     map: document.querySelector("#map"),
//     placeContainer: document.querySelector(".place-container"),
//     placeOverview: document.querySelector(".place-overview"),
//     placeNum: document.querySelector("#place-num"),
//     placeList: document.querySelector(".place-list"),
//   };


//   export function createCard(type) {
//     places[type].forEach((place) => {
//       const imgSrc = getPlaceCardImg(place);
//       const starPercentageRounded = ratingCalc(place.rating);
//       const userRatings = getPlaceCardRating(place);
  
//       const placeCard = document.createElement("div");
//       placeCard.className = "place-card";
//       placeCard.id = `${place.place_id}`;
//       placeCard.innerHTML = `<div class="place-content"><div class="icon icon-${type}"><i class="material-icons">local_${type}</i></div><p class="place-name">${place.name}</p><p class="place-address">${place.vicinity}</p><div class="place-rating"><div class="stars-outer"><div class="stars-inner" style="width:${starPercentageRounded}"></div></div> (${userRatings})</div></div><img class="place-img" src="${imgSrc}" alt="${place.name} photo"></div>
//       `;
  
//       elements.placeList.appendChild(placeCard);
//       placeCard.addEventListener("click", () => {
//         highlightMarker(place);
//         showPlaceDetails(place, type);
//       });
//     });
//   }