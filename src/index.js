// Функция, которая будет конвертировать сумму по разрядам, добавляя пробелы
const getNumberWithSpaces = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const desktopCheckAllCheckbox = document.getElementById('checkAll');
// Делаем чекбокс выбора всех товаров по дефолту тру
desktopCheckAllCheckbox.checked = true;

const basketCounter = document.querySelector('.header__basketCounter');
const basketCounterText = document.querySelector('.header__basketCounter p');

let orderList = [];

const basketAvailableGoods = document.querySelectorAll(
  '.basket__availableGoods'
);
// Находим контейнеры с товарами

const basketGoodsDesktopItems =
  basketAvailableGoods[0].querySelectorAll('.basket__goodsItem');
// Берем первый попавшийся, так как знаем, что второй такой же для мобильных устройст

const itemChekboxes = basketAvailableGoods[0].querySelectorAll(
  'input[type="checkbox"]'
);

desktopCheckAllCheckbox.addEventListener('input', () => {
  const finalySum = document.getElementById('finalySum');
  const countOfGoods = document.getElementById('countOfGoods');
  const sumOfGoods = document.getElementById('sumOfGoods');
  if (desktopCheckAllCheckbox.checked) {
    itemChekboxes.forEach((checkbox) => (checkbox.checked = true));
    orderList = [];
    // Обнуляем список, ищем все айтемы и добавляем их в список
    basketGoodsDesktopItems.forEach((item) => {
      const id = item.querySelector('.basket__goodsName').textContent;
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
      // Структура будет выглядеть следующим образом *** {id: string, price: number, discount: number, amount: number}[]

      const itemStructure = { id, price, discount, amount };

      orderList.push(itemStructure);
    });
    basketCounter.style.display = 'flex';
    basketCounterText.textContent = orderList.length;

    const finalySumNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.price * cur.amount, 0)
    );
    finalySum.textContent = finalySumNumbers + ' сом';

    const countOfGoodsNumbers = orderList.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );
    countOfGoods.textContent = countOfGoodsNumbers + ' товара';

    const sumOfGoodsNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.discount * cur.amount, 0)
    );
    sumOfGoods.textContent = sumOfGoodsNumbers + ' сом';
  } else {
    itemChekboxes.forEach((checkbox) => (checkbox.checked = false));
    orderList = [];
    basketCounter.style.display = 'none';
    finalySum.textContent = 0;
    countOfGoods.textContent = '0 товаров';
    sumOfGoods.textContent = 0;
  }

  console.log(orderList);
});

basketGoodsDesktopItems.forEach((item) => {
  let amount = +item.querySelector('.basket__changeAmountBtns p').textContent;
  const id = item.querySelector('.basket__goodsName').textContent;
  // Обычно при формировании структуры на фронте мы используем id, но так как исходник моих данных - статика, в качестве id я использую нейминг товара
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
  orderList.push(itemStructure);
  // По дефолту делаем все чекбоксы в состояние тру и добавляем все товары в список покупок
  const checkbox = item.querySelector('input[type="checkbox"]');
  checkbox.checked = true;

  const decreaseBtn = item.querySelector('#decreaseAmount');
  decreaseBtn.addEventListener('click', () => {
    // Ищем количество товаров
    let amount = +item.querySelector('.basket__changeAmountBtns p').textContent;
    // Смотрим, есть ли в нашем массиве данный товар
    const id = item.querySelector('.basket__goodsName').textContent;
    const index = orderList.findIndex((el) => el.id === id);
    if (amount > 1) amount -= 1;
    item.querySelector('.basket__changeAmountBtns p').textContent = amount;
    // Если есть, то меняет значение колличества товаров
    if (index > -1) {
      orderList[index].amount = amount;
      console.log(orderList[index].amount);
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
    countOfGoods.textContent = countOfGoodsNumbers + ' товара';

    const sumOfGoods = document.getElementById('sumOfGoods');
    const sumOfGoodsNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.discount * cur.amount, 0)
    );
    sumOfGoods.textContent = sumOfGoodsNumbers + ' сом';
  });
  const increaseBtn = item.querySelector('#increaseAmount');
  increaseBtn.addEventListener('click', () => {
    // Ищем количество товаров
    let amount = +item.querySelector('.basket__changeAmountBtns p').textContent;
    // Смотрим, есть ли в нашем массиве данный товар
    const id = item.querySelector('.basket__goodsName').textContent;
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
    countOfGoods.textContent = countOfGoodsNumbers + ' товара';

    const sumOfGoods = document.getElementById('sumOfGoods');
    const sumOfGoodsNumbers = getNumberWithSpaces(
      orderList.reduce((acc, cur) => acc + cur.discount * cur.amount, 0)
    );
    console.log(sumOfGoodsNumbers);
    sumOfGoods.textContent = sumOfGoodsNumbers + ' сом';
  });

  // Здесь я вешаю на каждый чекбокс слушатель событий и исходя из этого планирую формировать структуру данных для передачи на бэк
  checkbox.addEventListener('input', () => {
    let amount = +item.querySelector('.basket__changeAmountBtns p').textContent;
    const id = item.querySelector('.basket__goodsName').textContent;
    // Обычно при формировании структуры на фронте мы используем id, но так как исходник моих данных - статика, в качестве id я использую нейминг товара
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
    finalySum.textContent = finalySumNumbers + ' сом';

    const countOfGoods = document.getElementById('countOfGoods');
    const countOfGoodsNumbers = orderList.reduce(
      (acc, cur) => acc + cur.amount,
      0
    );
    countOfGoods.textContent = countOfGoodsNumbers + ' товара';
  });
});

// Здесь мы считаем сумму товаров при первом рендере. Предполагаем, что сайт может быть не статичен и рендерить список товаров и их общую сумму мы будем исходя из ответа, полученного от бэка
const finalySum = document.getElementById('finalySum');
const finalySumNumbers = getNumberWithSpaces(
  orderList.reduce((acc, cur) => acc + cur.price * cur.amount, 0)
);
finalySum.textContent = finalySumNumbers + ' сом';

//Здесь мы считаем количество товаров при первом рендере
const countOfGoods = document.getElementById('countOfGoods');
const countOfGoodsNumbers = orderList.reduce((acc, cur) => acc + cur.amount, 0);
countOfGoods.textContent = countOfGoodsNumbers + ' товара';

//Здесь мы ищем сумму товаров без скидки при первом рендере
const sumOfGoods = document.getElementById('sumOfGoods');
const sumOfGoodsNumbers = getNumberWithSpaces(
  orderList.reduce((acc, cur) => acc + cur.discount * cur.amount, 0)
);
sumOfGoods.textContent = sumOfGoodsNumbers + ' сом';

//Здесь мы считаем сумму скидки
const discount = document.getElementById('discount');
