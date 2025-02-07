import {ChangeEvent, useState} from 'react';

import appStyles from './app.module.css';

import {itemsCountPerPage, siblingPageCountInView} from '../../utils/constants';

import {SearchForm} from '../search-form/search-form';
import {Pagination} from '../pagination/pagination';
import {Popup} from '../popup/popup';
import {SearchResults} from '../search-results/search-results';

import {popupActions} from '../../services/store-slices/popup';

import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {SearchOptions} from '../../services/types/props';

function App() {
  const {
    paginationState,
    popupState
  } = useSelector(state => state);
  const [searchOptionValue, setSearchOptionValue] = useState<string>(SearchOptions.UNSORTED);

  const handleRadioButtonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchOptionValue(e.target.value);
  }

  const dispatch = useAppDispatch();

  return (
    <main className={appStyles.main}>
      <SearchForm onCleanSearchOption={() => {
        setSearchOptionValue(SearchOptions.UNSORTED)
      }}/>
      <SearchResults searchOptionValue={searchOptionValue} onChangeOptionValue={handleRadioButtonChange}/>
      <Pagination totalResults={paginationState.totalResults}
                  currentPage={paginationState.currentPage}
                  siblingCount={siblingPageCountInView}
                  itemsPerPage={itemsCountPerPage}
      />
      {
        popupState.isOpen &&
        <Popup login={popupState.login}
               profileUrl={popupState.profileUrl}
               username={popupState.username}
               userInfo={popupState.userInfo}
               reposCount={popupState.reposCount}
               followers={popupState.followers}
               following={popupState.following}
               onClosePopup={() => {
                 dispatch(popupActions.onClosePopup());
                 document.body.classList.remove(appStyles.bodyOverlay);
               }}/>
      }
    </main>
  );
}

export default App;
