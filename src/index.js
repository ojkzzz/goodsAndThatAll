const desktopCheckAllCheckbox = document.getElementById('checkAll');

const firstDesktopItem = document.getElementById('firstItem');
const secondDesktopItem = document.getElementById('secondItem');
const thirdDesktopItem = document.getElementById('thirdItem');

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
  if (desktopCheckAllCheckbox.checked) {
    itemChekboxes.forEach((checkbox) => (checkbox.checked = true));
  } else {
    itemChekboxes.forEach((checkbox) => (checkbox.checked = false));
  }
});

basketGoodsDesktopItems.forEach((item) => {
  // Здесь я вешаю на каждый чекбокс слушатель событий и исходя из этого планирую формировать структуру данных для передачи на бэк
  const checkbox = item.querySelector('input[type="checkbox"]');
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
  const amount = +item.querySelector('.basket__changeAmountBtns p').textContent;
  // Структура будет выглядеть следующим образом *** {id: string, price: number, discount: number, amount: number}[]

  const itemStructure = { id, price, discount, amount };
  console.log(itemStructure);

  checkbox.addEventListener('input', () => {
    if (checkbox.checked) {
      if (!orderList.some((orderItem) => orderItem.id === itemStructure.id)) {
        orderList.push(itemStructure);
      }
    } else {
      orderList = orderList.filter(
        (orderItem) => orderItem.id !== itemStructure.id
      );
    }

    console.log(basketCounter);
    if (!orderList.length) basketCounter.style.display = 'none';
    else {
      basketCounter.style.display = 'flex';
      basketCounterText.textContent = orderList.length;
    }

    console.log(orderList);
  });
});
