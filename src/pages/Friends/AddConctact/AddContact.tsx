import { Subtitle } from '@pages/Friends/Contacts';
import React from 'react';
import { AddContactForm } from './AddContactForm';

export const AddContact = () => {
  return (
    <>
      <Subtitle>Добавить контакт</Subtitle>
      <AddContactForm />
    </>
  );
};

//1
//Хук используется после условия

//2
//Выведется 0, так как setState выполняется асинхронно
//
// Решение 1:
//   const [counts, setCounts] = useState<Array<number>>([]);
//   const [price, setPrice] = useState(0);
//
//   const summary = useMemo(() => {
//     if (!price || !counts.length) return 0;
//     const result = counts.reduce((prev, current) => current * price + prev, 0);
//     console.log(result);
//     return result;
//   }, [counts, price]);
//
//   useEffect(() => {
//     const newCounts = [5, 3, 2];
//     const newPrice = Math.random() * 10;
//     setCounts(newCounts);
//     setPrice(newPrice);
//   }, []);
//
//
// Решение 2:
//   const [counts, setCounts] = useState<Array<number>>([]);
//   const [price, setPrice] = useState(0);
//
//   useEffect(() => {
//     const newCounts = [5, 3, 2];
//     const newPrice = Math.random() * 10;
//     setCounts(newCounts);
//     setPrice(newPrice);
//     const result = newCounts.reduce((prev, current) => current * newPrice + prev, 0);
//     console.log(result);
//   }, []);

//3.
//В компоненте Button пользы от useCallback - нет, тк пропс caption указан в массиве зависимостей, других пропсов и состояний нет, значит это единственный источник обновления колбэка, someFunc будет обновляться с такой же частотой, как и без useCallback
//В компоненте Cats польза есть, тк Cat функция получает из компонента, обновляться этому колбэку не нужно, он и не будет.

// interface Car {
//   brand: string;
//   type: string;
//   fullDescription: string;
// }
//
// const createCar = (brand: Car['brand'], type: Car['type']): Car => {
//   const result: Car = {
//     brand,
//     type,
//     fullDescription: `${brand} ${type}`,
//   };
//
//   Object.defineProperty(result, 'fullDescription', {
//     get: function (): Car['fullDescription'] {
//       return `${this.brand} ${this.type}`;
//     },
//     set: function (value: string) {
//       const splitValue = value.split(' ');
//       if (splitValue.length === 2) {
//         this.brand = splitValue[0];
//         this.type = splitValue[1];
//         return;
//       }
//       this.fullDescription = `${this.brand} ${this.type}`;
//     },
//   });
//
//   return result;
// };
//
// const c = createCar('Lada', 'sedan');
// console.log(c);
