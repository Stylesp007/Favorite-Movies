const addMovieModal = document.getElementById('add-modal');
const AddMovieButton = document.querySelector('#movie-button');
const visBackdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const movieList = document.getElementById('movie-list');
const movies = [];

const updateUi = () => {
  if (movies.length === 0 ){
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const deleteMovie = movieId => {
  let movieIndex = 0;
  for(const movie of movies) {
    if(movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  movieList.children[movieIndex].remove();
  updateUi();
};

const deleteMovieHandler = (movieId) =>{
  const deleteMovieModal = document.getElementById('delete-modal');
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
};




const renderNewMovieElement = (id,title, imageUrl,rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie_element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>
  `;
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null,id ));
  movieList.append(newMovieElement);
};

const toggleMovieModal = () => {
  addMovieModal.classList.toggle('visible');
  toggleBackdrop();
};
const clearMovieInput = () => {
for(const usrInputs of userInputs){
  usrInputs.value = '';
}
};
const cancelAddMovieHandler = () => {
  toggleMovieModal();
  clearMovieInput();
};
const addMovieHandeler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue= userInputs[2].value;

  if(
    titleValue.trim()=== '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === ''||
    +ratingValue < 1 ||
    +ratingValue > 5) {
      alert('Please Enter a valid number 1 - 5');
      return;
  }
  const newMovie = {
    id:Math.random().toString(),
    title:titleValue,
    image:imageUrlValue,
    rating:ratingValue
  };

  movies.push(newMovie);
  console.log(movies);
  toggleMovieModal();
  clearMovieInput();
  renderNewMovieElement(newMovie.id,newMovie.title, newMovie.image, newMovie.rating);
  updateUi();
};

const toggleBackdrop = () => {
  visBackdrop.classList.toggle('visible');
};

const backdropClickHandler = () => {
  toggleMovieModal();
};

AddMovieButton.addEventListener('click',toggleMovieModal);
visBackdrop.addEventListener('click',backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click',addMovieHandeler)


