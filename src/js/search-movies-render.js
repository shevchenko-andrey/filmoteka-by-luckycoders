import { genres } from './common/genres';
import { dataFormat } from './helpers/data-format.js';
import { renderListCard } from './helpers/render-list-card';
import { fetchSearchMovies } from './api/api-service-search';
import { debounce } from 'lodash';
import { refs } from './common/refs';
import { paginationSettings } from './helpers/pagination';
import { setDataToStorageForMain, onClickPopularBtn } from './top-rated';
import { INPUT_SEARCH_TYPE } from './common/search-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { settingsNotify } from './common/settings-for-notiflix';

const DEBOUNCE_DELAY = 300;

refs.searchForm.addEventListener(
  'input',
  debounce(() => onInput(), DEBOUNCE_DELAY),
);

async function onInput() {
  const searchQuery = refs.searchForm.value.trim();
  if (searchQuery.trim() === '') {
    Notify.failure('Please enter a movie name', settingsNotify);
    return 
  }

  try {
    const { results, total_results: totalItems } = await fetchSearchMovies(
      searchQuery,
      paginationSettings.startPage,
    );
    if (totalItems === 0) {
     Notify.warning('Nothing found', settingsNotify);
      refs.searchForm.value = '';
      return  
    }

    paginationSettings.pagination.reset(totalItems);
    paginationSettings.pagination.searchQuery = searchQuery;
    paginationSettings.searchType = INPUT_SEARCH_TYPE;
    const formattedData = dataFormat(results, genres);
    renderListCard(formattedData);
    setDataToStorageForMain(formattedData);
    // refs.searchForm.value = '';
  } catch (error) {
    console.log(error);
  }
}
