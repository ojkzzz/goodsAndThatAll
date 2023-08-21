// Функция, которая будет конвертировать сумму по разрядам, добавляя пробелы
const getNumberWithSpaces = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const getNoun = (number, one, two, three) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return three;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return three;
};

const instantPaymet = document.getElementById('instantPaymet');

const desktopCheckAllCheckbox = document.getElementById('checkAll');
// Делаем чекбокс выбора всех товаров по дефолту тру
desktopCheckAllCheckbox.checked = true;

// Cчетчик корзины в хедере
const basketCounter = document.querySelector('.header__basketCounter');
const basketCounterText = document.querySelector('.header__basketCounter p');

//Инициализируем структуру данных
let orderList = [];

// Находим контейнеры с товарами
const basketAvailableGoods = document.querySelectorAll(
  '.basket__availableGoods'
);

// Берем первый попавшийся, так как знаем, что второй такой же для мобильных устройст
const basketGoodsDesktopItems =
  basketAvailableGoods[0].querySelectorAll('.basket__goodsItem');

//Находим все чекбоксы в товарах
const itemChekboxes = basketAvailableGoods[0].querySelectorAll(
  'input[type="checkbox"]'
);

//Вешаем слушатель на чекбокс "Выбрать все"
desktopCheckAllCheckbox.addEventListener('input', () => {
  //Описываем логику работы приложения при изменениях состояния
  const finalySum = document.getElementById('finalySum');
  const countOfGoods = document.getElementById('countOfGoods');
  const sumOfGoods = document.getElementById('sumOfGoods');
  const discount = document.getElementById('discount');
  //Уходим в ветвление, когда чекбокс тру
  if (desktopCheckAllCheckbox.checked) {
    //Пробегаемся по всему списку айтемов, прокликиваем все чекбоксы
    itemChekboxes.forEach((checkbox) => (checkbox.checked = true));
    // Обнуляем список, ищем все айтемы и добавляем их в список
    orderList = [];
    basketGoodsDesktopItems.forEach((item, index) => {
      //Начинаем формирование структуры объекта товара
      const id = index + 1;
      // Обычно при формировании структуры на фронте мы используем id, но так как исходник моих данных - статика, в качестве id я использую нейминг товара
      const price = +item
        .querySelector('.basket__price p')
        .textContent.replaceAll(' ', '')
        .replace('сом', '');
      const discount = +item
        .querySelector('.basket__typography_discount')
        .textContent.replaceAll(' ', '')
        .replace('сом', '');
      const amount = +item.querySelector('.basket__changeAmountBtns p')
        .textContent;
      // interface IItemStructure {id: string, price: number, discount: number, amount: number}[]

      const itemStructure = { id, price, discount, amount };
      // Заполняем список всеми товарами
      orderList.push(itemStructure);
    });
    // Делаем счетчик видимым и включаем в него колличество добавленных товаров глобально, без учета выбранного колличества единиц каждого товара
    basketCounter.style.display = 'flex';
    basketCounterText.textContent = orderList.length;

    //Меняем итоговую стоимость на клиенте
    const finalySumNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.price * cur.amount, 0)
    );
    finalySum.textContent = finalySumNumbers + ' сом';

    //Меняем колличество товаров с учетом колличественного отношения каждой единицы товара на клиенте
    const countOfGoodsNumbers = orderList.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );
    countOfGoods.textContent =
      countOfGoodsNumbers +
      ' ' +
      getNoun(countOfGoodsNumbers, 'товар', 'товара', 'товаров');

    //Меняем сумму без учета скидки на клиенте
    const sumOfGoodsNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.discount * cur.amount, 0)
    );
    sumOfGoods.textContent = sumOfGoodsNumbers + ' сом';

    //Меняем суммку скидки
    const discountNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.discount * cur.amount, 0) -
        orderList.reduce((acc, cur) => acc + cur.price * cur.amount, 0)
    );
    discount.textContent = '−' + discountNumbers + ' сом';

    //Обновляем информацию в блоке доставки
    clearDeliveryList();
    updateDeliveryList('5—6 февраля', orderList);
  } else {
    //Если выбрать все уже чекнут, то меняем не false его состояние и состояние каждого чекбокса товара, так же сбрасываем до пустого массива список товаров, прячем счетчик корзины и приводит к соответствию информацию на клиенте
    itemChekboxes.forEach((checkbox) => (checkbox.checked = false));
    orderList = [];
    basketCounter.style.display = 'none';
    finalySum.textContent = 0;
    countOfGoods.textContent = '0 товаров';
    sumOfGoods.textContent = 0;
    discount.textContent = 0;

    clearDeliveryList();
    updateDeliveryList('5—6 февраля', orderList);
  }

  console.log(orderList);
});

basketGoodsDesktopItems.forEach((item, index) => {
  let amount = +item.querySelector('.basket__changeAmountBtns p').textContent;
  // Обычно при формировании структуры на фронте мы используем id, но так как исходник моих данных - статика, в качестве id я использую индекс
  const id = index + 1;
  const price = +item
    .querySelector('.basket__price p')
    .textContent.replaceAll(' ', '')
    .replace('сом', '');
  const discount = +item
    .querySelector('.basket__typography_discount')
    .textContent.replaceAll(' ', '')
    .replace('сом', '');

  // interface IItemStructure {id: string, price: number, discount: number, amount: number}[]
  const itemStructure = { id, price, discount, amount };
  orderList.push(itemStructure);
  // По дефолту делаем все чекбоксы в состояние тру и добавляем все товары в список покупок
  const checkbox = item.querySelector('input[type="checkbox"]');
  checkbox.checked = true;

  const decreaseBtn = item.querySelector('#decreaseAmount');
  decreaseBtn.addEventListener('click', () => {
    // Ищем количество товаров
    let amount = +item.querySelector('.basket__changeAmountBtns p').textContent;
    // Смотрим, есть ли в нашем массиве данный товар
    const index = orderList.findIndex((el) => el.id === id);
    if (amount > 1) amount -= 1;
    item.querySelector('.basket__changeAmountBtns p').textContent = amount;
    // Если есть, то меняет значение колличества товаров
    if (index > -1) {
      orderList[index].amount = amount;
    }
    const finalySum = document.getElementById('finalySum');
    const finalySumNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.price * cur.amount, 0)
    );
    finalySum.textContent = finalySumNumbers + ' сом';

    const countOfGoods = document.getElementById('countOfGoods');
    const countOfGoodsNumbers = orderList.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );
    countOfGoods.textContent =
      countOfGoodsNumbers +
      ' ' +
      getNoun(countOfGoodsNumbers, 'товар', 'товара', 'товаров');

    const sumOfGoods = document.getElementById('sumOfGoods');
    const sumOfGoodsNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.discount * cur.amount, 0)
    );
    sumOfGoods.textContent = sumOfGoodsNumbers + ' сом';

    const discount = document.getElementById('discount');
    const discountNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.discount * cur.amount, 0) -
        orderList.reduce((acc, cur) => acc + cur.price * cur.amount, 0)
    );
    discount.textContent = '−' + discountNumbers + ' сом';

    clearDeliveryList();
    updateDeliveryList('5—6 февраля', orderList);
  });
  const increaseBtn = item.querySelector('#increaseAmount');
  increaseBtn.addEventListener('click', () => {
    // Ищем количество товаров
    let amount = +item.querySelector('.basket__changeAmountBtns p').textContent;
    // Смотрим, есть ли в нашем массиве данный товар
    const index = orderList.findIndex((el) => el.id === id);
    amount += 1;
    item.querySelector('.basket__changeAmountBtns p').textContent = amount;
    // Если есть, то меняет значение колличества товаров
    if (index > -1) {
      orderList[index].amount = amount;
    }
    const finalySum = document.getElementById('finalySum');
    const finalySumNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.price * cur.amount, 0)
    );
    finalySum.textContent = finalySumNumbers + ' сом';

    const countOfGoods = document.getElementById('countOfGoods');
    const countOfGoodsNumbers = orderList.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );
    countOfGoods.textContent =
      countOfGoodsNumbers +
      ' ' +
      getNoun(countOfGoodsNumbers, 'товар', 'товара', 'товаров');

    const sumOfGoods = document.getElementById('sumOfGoods');
    const sumOfGoodsNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.discount * cur.amount, 0)
    );
    sumOfGoods.textContent = sumOfGoodsNumbers + ' сом';

    const discount = document.getElementById('discount');
    const discountNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.discount * cur.amount, 0) -
        orderList.reduce((acc, cur) => acc + cur.price * cur.amount, 0)
    );
    discount.textContent = '−' + discountNumbers + ' сом';

    clearDeliveryList();
    updateDeliveryList('5—6 февраля', orderList);
  });

  // Здесь я вешаю на каждый чекбокс слушатель событий и исходя из этого планирую формировать структуру данных для передачи на бэк
  checkbox.addEventListener('input', () => {
    let amount = +item.querySelector('.basket__changeAmountBtns p').textContent;
    const price = +item
      .querySelector('.basket__price p')
      .textContent.replaceAll(' ', '')
      .replace('сом', '');
    const discount = +item
      .querySelector('.basket__typography_discount')
      .textContent.replaceAll(' ', '')
      .replace('сом', '');

    // Структура будет выглядеть следующим образом *** {id: string, price: number, discount: number, amount: number}[]

    const itemStructure = { id, price, discount, amount };

    if (checkbox.checked) {
      // Проверяем на наличие товара в списке покупок
      if (!orderList.some((orderItem) => orderItem.id === itemStructure.id)) {
        orderList.push(itemStructure);
      }
    } else {
      orderList = orderList.filter(
        (orderItem) => orderItem.id !== itemStructure.id
      );
    }
    if (!orderList.length) {
      basketCounter.style.display = 'none';
      if (desktopCheckAllCheckbox.checked)
        desktopCheckAllCheckbox.checked = false;
    } else {
      basketCounter.style.display = 'flex';
      basketCounterText.textContent = orderList.length;
    }

    console.log(orderList);
    const finalySum = document.getElementById('finalySum');
    const finalySumNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.price * cur.amount, 0)
    );
    finalySum.textContent =
      orderList.length > 0 ? finalySumNumbers + ' сом' : 0;

    const countOfGoods = document.getElementById('countOfGoods');
    const countOfGoodsNumbers = orderList.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );
    countOfGoods.textContent =
      countOfGoodsNumbers +
      ' ' +
      getNoun(countOfGoodsNumbers, 'товар', 'товара', 'товаров');

    const sumOfGoods = document.getElementById('sumOfGoods');
    const sumOfGoodsNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.discount * cur.amount, 0)
    );
    sumOfGoods.textContent =
      orderList.length > 0 ? sumOfGoodsNumbers + ' сом' : 0;

    const discountNode = document.getElementById('discount');
    const discountNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.discount * cur.amount, 0) -
        orderList.reduce((acc, cur) => acc + cur.price * cur.amount, 0)
    );
    discountNode.textContent =
      orderList.length > 0 ? '−' + discountNumbers + ' сом' : 0;

    clearDeliveryList();
    updateDeliveryList('5—6 февраля', orderList);
  });
});

// Подстановка данных при первой загрузке
// Здесь мы считаем сумму товаров при первом рендере. Предполагаем, что сайт может быть не статичен и рендерить список товаров и их общую сумму мы будем исходя из ответа, полученного от бэка
const finalySum = document.getElementById('finalySum');
const finalySumNumbers = getNumberWithSpaces(
  orderList.reduce((acc, cur) => acc + cur.price * cur.amount, 0)
);
finalySum.textContent = finalySumNumbers + ' сом';

//Здесь мы считаем количество товаров при первом рендере
const countOfGoods = document.getElementById('countOfGoods');
const countOfGoodsNumbers = orderList.reduce((acc, cur) => acc + cur.amount, 0);
countOfGoods.textContent =
  countOfGoodsNumbers +
  ' ' +
  getNoun(countOfGoodsNumbers, 'товар', 'товара', 'товаров');

//Здесь мы ищем сумму товаров без скидки при первом рендере
const sumOfGoods = document.getElementById('sumOfGoods');
const sumOfGoodsNumbers = getNumberWithSpaces(
  orderList.reduce((acc, cur) => acc + cur.discount * cur.amount, 0)
);
sumOfGoods.textContent = sumOfGoodsNumbers + ' сом';

//Здесь мы считаем сумму скидки
const discount = document.getElementById('discount');
const discountNumbers = getNumberWithSpaces(
  orderList.reduce((acc, cur) => acc + cur.discount * cur.amount, 0) -
    orderList.reduce((acc, cur) => acc + cur.price * cur.amount, 0)
);
discount.textContent = '−' + discountNumbers + ' сом';

if (!orderList.length) basketCounter.style.display = 'none';
else {
  basketCounter.style.display = 'flex';
  basketCounterText.textContent = orderList.length;
}

// Конец подстановки данных при первой загрузке

instantPaymet.addEventListener('input', () => {
  const finalySumNumbers = getNumberWithSpaces(
    orderList.reduce((acc, cur) => acc + cur.price * cur.amount, 0)
  );
  const asideSubmitBtn = document.querySelector('.aside__submitBtn');
  if (instantPaymet.checked) {
    asideSubmitBtn.textContent =
      orderList.length > 0
        ? 'Оплатить ' + finalySumNumbers + ' сом'
        : 'Заказать';
  } else {
    asideSubmitBtn.textContent = 'Заказать';
  }
});

//Начинаем работу с блоком доставки
//Принимаем дату и список товаров к доставке. Нам важно иметь в этой структуре ссылку на картинку и колличество выбранного товара
const updateDeliveryList = (date, listItems) => {
  if (listItems.length > 0) {
    const listOfDeleliveries = document.querySelector(
      '.delivery__listOfDeleliveries'
    );

    const deliveryItem = document.createElement('div');
    deliveryItem.classList.add('delivery__deliveryItem');

    const deliverySubheader = document.createElement('p');
    deliverySubheader.classList.add('delivery__typography_subheader');
    deliverySubheader.innerText = date;

    deliveryItem.appendChild(deliverySubheader);

    const listOfDeleliveries__list = document.createElement('div');
    listOfDeleliveries__list.classList.add('listOfDeleliveries__list');

    listItems.forEach((item) => {
      const listOfDeleliveries__item = document.createElement('div');
      listOfDeleliveries__item.classList.add('listOfDeleliveries__item');

      const counter = document.createElement('div');
      counter.classList.add('listOfDeleliveries__counter');

      if (item.amount < 2) counter.style.display = 'none';
      else {
        counter.textContent = item.amount;
      }

      const image = document.createElement('img');
      image.setAttribute('src', getSrc(item.id));

      listOfDeleliveries__item.appendChild(counter);
      listOfDeleliveries__item.appendChild(image);
      listOfDeleliveries__list.appendChild(listOfDeleliveries__item);
    });
    deliveryItem.appendChild(listOfDeleliveries__list);
    listOfDeleliveries.appendChild(deliveryItem);
  }
};

//Функция очистки списка доставки
const clearDeliveryList = () => {
  const listOfDeleliveries = document.querySelector(
    '.delivery__listOfDeleliveries'
  );
  listOfDeleliveries.innerHTML = '';
};

const getSrc = (id) => {
  switch (id) {
    case 1:
      return './src/assets/imgs/Frame 3853.png';
      break;
    case 2:
      return './src/assets/imgs/Frame 277132129.png';
      break;
    case 3:
      return './src/assets/imgs/Frame 277132129 (1).png';
      break;
    default:
      return './src/assets/imgs/Frame 277132129.png';
      break;
  }
};

updateDeliveryList('5—6 февраля', orderList);
