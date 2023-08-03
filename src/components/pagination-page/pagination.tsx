import React, {FunctionComponent, MouseEvent} from 'react';

import paginationPageButtonStyles from './pagination.module.css';

import {TPagination} from '../../services/types/props';
import {usePagination} from '../../utils/hooks';
import {useAppDispatch, useSelector} from '../../services/types/hooks';
import {getUsersList} from '../../services/actions/users';


export const Pagination: FunctionComponent<TPagination> = (props) => {
  const {
    totalResults,
    siblingCount,
    currentPage,
    itemsPerPage
  } = props;

  const {searchValueState} = useSelector(state => state)

  const dispatch = useAppDispatch();

  const paginationRange = usePagination({
    currentPage,
    totalResults,
    siblingCount,
    itemsPerPage
  });

  let lastPage = 0;

  if (paginationRange) {
    // Если в диапазоне меньше 2 страниц, компонент не будет отрисован
    if (currentPage === 0 || paginationRange.length < 2) {
      return null;
    }
    lastPage = (paginationRange[paginationRange.length - 1] as number);
  }

  const onNext = () => {
    dispatch(getUsersList(searchValueState.searchValue, currentPage + 1));
  };

  const onPrevious = () => {
    dispatch(getUsersList(searchValueState.searchValue, currentPage - 1));
  };

  return (
    <ul className={paginationPageButtonStyles.list}>
      <li>
        <button type="submit"
                className={paginationPageButtonStyles.item}
                disabled={currentPage === 1}
                onClick={onPrevious}
        >
          Назад
        </button>
      </li>
      {
        paginationRange?.map(pageNumber => {
          if (pageNumber === '...') {
            return (
              <li>
                &#8230; {/* многоточие */}
              </li>
            )
          } else {
            return (
              <li>
                <button type="submit"
                        className={pageNumber === currentPage
                          ? `${paginationPageButtonStyles.item} ${paginationPageButtonStyles['item_selected']}`
                          : `${paginationPageButtonStyles.item}`}
                        // onClick={onChangePage(pageNumber as number)}
                        // onClick={() => onChangePage(pageNumber as number)}
                        onClick={(e: MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault();
                          // dispatch(paginationActions.getNextPage(pageNumber as number))
                          // onChangePage(pageNumber as number)
                          dispatch(getUsersList(searchValueState.searchValue, pageNumber as number))
                        }}
                >
                  {pageNumber}
                </button>
              </li>
            )
          }
        })
      }
      <li>
        <button type="submit"
                className={paginationPageButtonStyles.item}
                disabled={currentPage === lastPage}
                onClick={onNext}
        >
          Вперед
        </button>
      </li>
    </ul>
  )
}