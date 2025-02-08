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
import {searchValueActions} from "../../services/store-slices/search-value";
import usersList from "../../services/store-slices/users-list";
import {Preloader} from "../preloader/preloader";

function App() {
  const {
    usersListState,
    paginationState,
    popupState
  } = useSelector(state => state);
  const [searchOptionValue, setSearchOptionValue] = useState<string>(SearchOptions.UNSORTED);

  const dispatch = useAppDispatch();

  const handleRadioButtonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchOptionValue(e.target.value);
    dispatch(searchValueActions.setOrderState(e.target.value))
  }

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
        usersListState.isLoading
        && <Preloader/>
      }
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
