import {useMemo} from 'react';
import {range} from './functions';
import {TUsePagination} from '../services/types/hooks';

export const usePagination = (args: TUsePagination) => {
  const {totalResults, siblingCount, currentPage, itemsPerPage} = args;

  return useMemo(() => {
    // Округление до следующего целого значения гарантирует запасную страницу для вывода последних данных
    const totalPageCount = Math.ceil(totalResults / itemsPerPage);
    // Кол-во страниц определяется исходя из siblingCount + firstPage + lastPage + currentPage + 2 многоточия (2 x '...')
    const totalPageNumbers = siblingCount + 3;

    // dispatch(paginationActions.cleanPagination());

    /* Вариант отображения 1. Если кол-во страниц меньше, чем их число, которое нужно отображать на странице,
       возвращаем диапазон [1...totalPageCount] */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    // Подсчитываем кол-во одновременно видимых страниц слева и справа. Значения должны быть в диапазоне от 1 до totalPageCount
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /* Не нужно показывать многоточие, если между 1ой и последней страницами (1 и totalPageCount) находится 1 элемент
      Поэтому задаем boolean-значения для отображения многоточия справа и многоточия слева: */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /* Вариант 2. Слева многоточия нет, но есть справа */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      // let leftItemCount = siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, '...', totalPageCount];
    }

    /* Вариант 3. Справа многоточия нет, но есть слева */
    if (shouldShowLeftDots && !shouldShowRightDots) {


      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, '...', ...rightRange];
    }

    /* Вариант 4. Многоточие с обеих сторон */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
  }, [totalResults, itemsPerPage, siblingCount, currentPage]);
};