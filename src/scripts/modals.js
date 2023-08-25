const cards = [
  {
    id: 1,
    src: 'src/assets/cards/mir.svg',
    number: '1234 33•• •••• 0000'
  },
  {
    id: 2,
    src: 'src/assets/cards/visa.svg',
    number: '2234 66•• •••• 1111'
  },
  {
    id: 3,
    src: 'src/assets/cards/mastercard.svg',
    number: '3234 77•• •••• 2222'
  },
  {
    id: 4,
    src: 'src/assets/cards/mastercard2.svg',
    number: '4234 88•• •••• 3333'
  }
];

const addresses = {
  courier: [
    { id: 1, address: 'Бишкек, улица Табышалиева, 57' },
    { id: 2, address: 'Бишкек, улица Жукеева-Пудовкина, 77/1' },
    { id: 3, address: 'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1' },
    ,
  ],
  pickUp: [
    {
      id: 1,
      address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1'
    },
    {
      id: 2,
      address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 87'
    },
    {
      id: 3,
      address: 'г. Бишкек, улица Табышалиева, д. 57'
    }
  ]
};

let creditCardId = 1;
let globalCreditCardId = 1;

let deliveryTypeId = 2;
let globalDeliveryTypeId = 2;

let courierAddressId = 1;
let globalCourierAddressId = 1;

let pickupAddressId = 1;
let globalPickupAddressId = 1;

const createModal = (type) => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  let body;
  let header;
  let footer;
  let footerCallback;

  switch (type) {
    case 'delivery':
      overlay.addEventListener('click', destroyModal);
      modal.classList.add('modalDelivery');
      header = createModalHeader('Способ доставки', destroyModal);
      body = createModalBodyDelivery();
      footerCallback = () => {
        globalDeliveryTypeId = deliveryTypeId;
        globalCourierAddressId = courierAddressId;
        globalPickupAddressId = pickupAddressId;
        destroyModal();
        renderDeliveryMethod();
      };
      break;

    case 'payment':
      overlay.addEventListener('click', destroyModal);
      modal.classList.add('modalPayment');
      header = createModalHeader('Способ оплаты', destroyModal);
      body = createModalBodyPayment();
      footerCallback = () => {
        globalCreditCardId = creditCardId;
        destroyModal();
        renderPaymentMethod();
      };

      break;

    default:
      break;
  }

  footer = createModalFooter(footerCallback);

  modal.append(header);
  modal.append(body);
  modal.append(footer);
  overlay.append(modal);
  document.body.append(overlay);
  disableScrolling();
};

function createModalHeader(titleText, callback) {
  const header = document.createElement('div');
  header.classList.add('modalHeader');
  const title = document.createElement('p');
  title.classList.add('modalTitle');
  title.textContent = titleText;

  const exit = document.createElement('button');
  exit.classList.add('btn');
  exit.classList.add('modalHeaderBtn');
  exit.innerHTML = `
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.92961 18.1568C4.53909 18.5473 4.53909 19.1805 4.92961 19.571C5.32014 19.9615 5.9533 19.9615 6.34383 19.571L12.0008 13.914L17.658 19.5711C18.0485 19.9616 18.6817 19.9616 19.0722 19.5711C19.4627 19.1806 19.4627 18.5474 19.0722 18.1569L13.4151 12.4998L19.0717 6.84309C19.4623 6.45257 19.4623 5.8194 19.0717 5.42888C18.6812 5.03836 18.0481 5.03836 17.6575 5.42888L12.0008 11.0856L6.34427 5.42899C5.95374 5.03846 5.32058 5.03846 4.93005 5.42899C4.53953 5.81951 4.53953 6.45267 4.93005 6.8432L10.5866 12.4998L4.92961 18.1568Z" fill="#A0A0A4"/>
    </svg>
`;
  exit.addEventListener('click', callback);

  header.append(title);
  header.append(exit);
  return header;
}

function createModalBodyPayment() {
  const body = document.createElement('div');
  body.classList.add('modalBodyPayment');

  cards.forEach((card) => {
    const modalPaymentItem = document.createElement('div');
    modalPaymentItem.classList.add('modalPaymentItem');
    const radio = document.createElement('button');

    radio.innerHTML = `
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10.5" r="7.5" stroke="black" stroke-opacity="0.2"/>
            <path
                d="M10 13.5C11.6569 13.5 13 12.1569 13 10.5C13 8.84315 11.6569 7.5 10 7.5C8.34315 7.5 7 8.84315 7 10.5C7 12.1569 8.34315 13.5 10 13.5Z"
                fill="white"
            />
        </svg>
    `;
    radio.classList.add('modalBodyRadio');
    radio.classList.add(`modalBodyRadio-${card.id}`);

    modalPaymentItem.addEventListener('click', () => {
      const lastActiveRadio = document.querySelector(
        `.modalBodyRadio-${creditCardId}`
      );
      lastActiveRadio.classList.remove('modalBodyRadio_active');
      creditCardId = card.id;
      radio.classList.add('modalBodyRadio_active');
    });

    const cardImg = document.createElement('img');
    cardImg.setAttribute('src', card.src);

    const cardNumbers = document.createElement('p');
    cardNumbers.classList.add('typography__cardNumbers');
    cardNumbers.textContent = card.number;

    modalPaymentItem.append(radio);
    modalPaymentItem.append(cardImg);
    modalPaymentItem.append(cardNumbers);

    body.append(modalPaymentItem);
  });

  Promise.resolve().then(() => {
    creditCardId = globalCreditCardId;
    const lastActiveRadio = document.querySelector(
      `.modalBodyRadio-${globalCreditCardId}`
    );
    lastActiveRadio.classList.add('modalBodyRadio_active');
  });

  return body;
}

function createModalBodyDelivery() {
  const body = document.createElement('div');
  body.classList.add('modalBodyDelivery');

  // Tabs

  const tabs = document.createElement('div');
  tabs.classList.add('modalBodyDelivery__tabs');

  const tab1 = document.createElement('div');
  tab1.classList.add('modalBodyDelivery__tab');
  tab1.addEventListener('click', () => {
    tab1.classList.add('modalBodyDelivery__activeTab');
    tab2.classList.remove('modalBodyDelivery__activeTab');
    addressCourierList.style.display = 'none';
    addressPickupList.style.display = 'flex';
    deliveryTypeId = 1;
  });

  const tab1__typography = document.createElement('p');
  tab1__typography.classList.add('modalBodyDelivery__typography');
  tab1__typography.textContent = 'В пункте выдачи';
  tab1.append(tab1__typography);

  const tab2 = document.createElement('div');
  tab2.classList.add('modalBodyDelivery__tab');
  tab2.addEventListener('click', () => {
    tab2.classList.add('modalBodyDelivery__activeTab');
    tab1.classList.remove('modalBodyDelivery__activeTab');
    addressPickupList.style.display = 'none';
    addressCourierList.style.display = 'flex';
    deliveryTypeId = 2;
  });

  const tab2__typography = document.createElement('p');
  tab2__typography.classList.add('modalBodyDelivery__typography');
  tab2__typography.textContent = 'Курьером';
  tab2.append(tab2__typography);

  tabs.append(tab1);
  tabs.append(tab2);

  // Tabs

  // Description

  const description = document.createElement('div');
  const description__typography = document.createElement('p');
  description__typography.classList.add('modalBodyDelivery__typography');
  description__typography.classList.add('modalBodyDelivery__typography_header');
  description__typography.textContent = 'Мои адреса';
  description.append(description__typography);

  // Description

  // AddressCourierList

  const addressCourierList = document.createElement('div');
  addressCourierList.classList.add('modalBodyDelivery__addressCourierList');

  addresses.courier.forEach((address) => {
    const addressCourierItem = document.createElement('div');
    addressCourierItem.classList.add('addressCourierItem');

    const radio = document.createElement('button');

    radio.innerHTML = `
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10.5" r="7.5" stroke="black" stroke-opacity="0.2"/>
            <path
                d="M10 13.5C11.6569 13.5 13 12.1569 13 10.5C13 8.84315 11.6569 7.5 10 7.5C8.34315 7.5 7 8.84315 7 10.5C7 12.1569 8.34315 13.5 10 13.5Z"
                fill="white"
            />
        </svg>
    `;
    radio.classList.add('modalBodyRadio');
    radio.classList.add('btn');
    radio.classList.add(`modalBodyRadio-${address.id}`);

    addressCourierItem.addEventListener('click', () => {
      const lastActiveRadio = document.querySelector(
        `.modalBodyRadio-${courierAddressId}`
      );
      lastActiveRadio.classList.remove('modalBodyRadio_active');
      courierAddressId = address.id;
      radio.classList.add('modalBodyRadio_active');
    });

    const addressTypography = document.createElement('p');
    addressTypography.classList.add('typography__cardNumbers');
    addressTypography.textContent = address.address;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn');
    removeBtn.classList.add('removeBtn');
    removeBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="#A0A0A4"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="#A0A0A4"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="#A0A0A4"/>
      </svg>
    `;

    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    addressCourierItem.append(radio);
    addressCourierItem.append(addressTypography);
    addressCourierItem.append(removeBtn);
    addressCourierList.append(addressCourierItem);
  });

  // AddressCourierList

  // AddressPickupList

  const addressPickupList = document.createElement('div');
  addressPickupList.classList.add('modalBodyDelivery__addressPickupList');

  addresses.pickUp.forEach((address) => {
    const addressPickupItem = document.createElement('div');
    addressPickupItem.classList.add('addressPickupItem');

    const radio = document.createElement('button');

    radio.innerHTML = `
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10.5" r="7.5" stroke="black" stroke-opacity="0.2"/>
            <path
                d="M10 13.5C11.6569 13.5 13 12.1569 13 10.5C13 8.84315 11.6569 7.5 10 7.5C8.34315 7.5 7 8.84315 7 10.5C7 12.1569 8.34315 13.5 10 13.5Z"
                fill="white"
            />
        </svg>
    `;
    radio.classList.add('modalBodyRadio');
    radio.classList.add('btn');
    radio.classList.add(`modalBodyPickupRadio-${address.id}`);

    addressPickupItem.addEventListener('click', () => {
      const lastActiveRadio = document.querySelector(
        `.modalBodyPickupRadio-${pickupAddressId}`
      );
      lastActiveRadio.classList.remove('modalBodyRadio_active');
      pickupAddressId = address.id;
      radio.classList.add('modalBodyRadio_active');
    });

    const addresPickupTypographyBox = document.createElement('div');
    addresPickupTypographyBox.classList.add('addresPickupTypographyBox');

    const addressTypography = document.createElement('p');
    addressTypography.classList.add('typography__cardNumbers');
    addressTypography.textContent = address.address;

    const pickupRate = document.createElement('div');
    pickupRate.classList.add('pickupRate');
    pickupRate.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.69769 1.14922C6.43817 0.528396 5.56198 0.528387 5.30244 1.14919L6.69769 1.14922ZM5.30244 1.14919L4.14719 3.90977L1.19202 4.16613C0.519264 4.22467 0.262282 5.05966 0.759713 5.49464L3.00514 7.45915L2.33207 10.3824C2.18436 11.0238 2.87792 11.5567 3.46133 11.2023L6.00032 9.65611L8.53797 11.2015C9.12269 11.5588 9.81568 11.0227 9.66861 10.3826L8.99549 7.45915L11.2402 5.49537C11.7385 5.05961 11.4793 4.22519 10.8083 4.16667L7.85294 3.91029L6.69769 1.14922" fill="#FF970D"/>
        </svg>
        <span class='typography__cardNumbers typography__cardNumbers_small'>4.99</span>
        <span class='typography__cardNumbers typography__cardNumbers_small typography__cardNumbers_grey'>Пункт выдачи</span>
      `;

    addresPickupTypographyBox.append(addressTypography);
    addresPickupTypographyBox.append(pickupRate);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('btn');
    removeBtn.classList.add('removeBtn');
    removeBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="#A0A0A4"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="#A0A0A4"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="#A0A0A4"/>
      </svg>
    `;

    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    addressPickupItem.append(radio);
    addressPickupItem.append(addresPickupTypographyBox);
    addressPickupItem.append(removeBtn);
    addressPickupList.append(addressPickupItem);
  });

  // AddressPickupList

  Promise.resolve().then(() => {
    deliveryTypeId = globalDeliveryTypeId;
    courierAddressId = globalCourierAddressId;
    pickupAddressId = globalPickupAddressId;
    if (deliveryTypeId === 1) {
      tab1.classList.add('modalBodyDelivery__activeTab');
      addressCourierList.style.display = 'none';
      addressPickupList.style.display = 'flex';
    } else {
      tab2.classList.add('modalBodyDelivery__activeTab');
      addressPickupList.style.display = 'none';
      addressCourierList.style.display = 'flex';
    }
    const lastActiveCourierRadio = document.querySelector(
      `.modalBodyRadio-${courierAddressId}`
    );
    lastActiveCourierRadio.classList.add('modalBodyRadio_active');

    lastActivePickupRadio = document.querySelector(
      `.modalBodyPickupRadio-${pickupAddressId}`
    );
    lastActivePickupRadio.classList.add('modalBodyRadio_active');
  });

  body.append(tabs);
  body.append(description__typography);
  body.append(addressPickupList);
  body.append(addressCourierList);

  return body;
}

function createModalFooter(callback) {
  const button = document.createElement('button');
  button.classList.add('btn');
  button.classList.add('modalFooter__btn');
  button.textContent = 'Выбрать';

  button.addEventListener('click', callback);

  return button;
}

function destroyModal() {
  const overlay = document.querySelector('.overlay');
  const exit = document.querySelector('.modalHeaderBtn');
  overlay.remove();
  overlay.removeEventListener('click', destroyModal);
  exit.removeEventListener('click', destroyModal);
  enableScrolling();
}

function renderPaymentMethod() {
  const paymentImg = document.querySelector('.payment__cardImg');
  const paymentText = document.querySelector('.payment__cardImg ~ p');
  const aside__cardImg = document.querySelector('.aside__cardImg');
  const aside__cardP = document.querySelector('.aside__cardImg ~ p');
  const choosen = cards.find((card) => card.id === globalCreditCardId);

  paymentImg.setAttribute('src', choosen.src);
  paymentText.textContent = choosen.number;
  aside__cardImg.setAttribute('src', choosen.src);
  aside__cardP.textContent = choosen.number;
}

function renderDeliveryMethod() {
  const schedule = document.querySelector('.pickUpAddress__schedule');
  if (deliveryTypeId === 2) schedule.style.display = 'none';
  else {
    schedule.style.display = 'flex';
  }

  const deliveryAddress = document.getElementById('deliveryAddress');
  const deliveryHeader = document.querySelector('.aside__deliveryHeader p');

  const deliveryAddress2 = document.querySelector('.delivery__pickUpAddress p');
  const deliveryHeader2 = document.querySelector(
    '.delivery__descriptions .delivery__pickUpPoint p'
  );

  const address =
    deliveryTypeId === 2
      ? addresses.courier.find((address) => address.id === courierAddressId)
          .address
      : addresses.pickUp.find((address) => address.id === pickupAddressId)
          .address;

  header =
    deliveryTypeId === 1 ? 'Доставка в пункт выдачи' : 'Доставка курьером';

  deliveryAddress.textContent = address;
  deliveryAddress2.textContent = address;
  deliveryHeader.textContent = header;
  deliveryHeader2.textContent = header;
}

const asideEditBtn = document.querySelector('.aside__paymentHeader button');
asideEditBtn.addEventListener('click', () => createModal('payment'));

const paymentEditBtn = document.querySelector('.payment__header .btn');
paymentEditBtn.addEventListener('click', () => createModal('payment'));

const asideDeliveryBtn = document.querySelector(
  '.aside__deliveryHeader button'
);
asideDeliveryBtn.addEventListener('click', () => {
  createModal('delivery');
});
const paymentDeliveryBtn = document.querySelector('.basket__delivery button');
paymentDeliveryBtn.addEventListener('click', () => {
  createModal('delivery');
});

function enableScrolling() {
  document.body.classList.remove('stop-scrolling');
}
function disableScrolling() {
  document.body.classList.add('stop-scrolling');
}

renderDeliveryMethod();
