import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');

addGalleryMarkup(galleryItems, galleryContainer);

function addGalleryMarkup(incomingElements, markupContainer) {
  let galleryMarkup = '';

  incomingElements.forEach(({ original, preview, description }) => {
    galleryMarkup += `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
  });

  markupContainer.insertAdjacentHTML('afterbegin', galleryMarkup);
}

new SimpleLightbox('.some-element a', {});

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
