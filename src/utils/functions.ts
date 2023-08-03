// Создаем массив заданной длины и заполняем от начала до конца пустотами
export const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};