import { refs } from './common/refs';
import { STORAGE_HOME_KEY, STORAGE_MAIN_KEY } from './common/keys';
import { renderListCard } from './helpers/render-list-card';

refs.onLogo.addEventListener('click', renderCards);

function renderCards(e) {
  e.preventDefault();
  const storageData = JSON.parse(localStorage.getItem(STORAGE_HOME_KEY));
  renderListCard(storageData);
  localStorage.setItem(STORAGE_MAIN_KEY, JSON.stringify(storageData));
}