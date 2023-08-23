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
let globalCreditCardId = 1;
let creditCardId = 1;

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
      modal.classList.add('modalDelivery');
      header = createModalHeader('Способ доставки', () => console.log('exit'));
      body = createModalBodyDelivery();
      footerCallback = () => {
        console.log('доставка');
      };

      break;
    case 'payment':
      overlay.addEventListener('click', destroyPaymentModal);
      modal.classList.add('modalPayment');
      header = createModalHeader('Способ оплаты', destroyPaymentModal);
      body = createModalBodyPayment();
      footerCallback = () => {
        globalCreditCardId = creditCardId;
        destroyPaymentModal();
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

      console.log(creditCardId);
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

  //   console.log(lastActiveRadio);

  Promise.resolve().then(() => {
    const lastActiveRadio = document.querySelector(`.modalBodyRadio-${1}`);
    lastActiveRadio.classList.add('modalBodyRadio_active');
  });

  return body;
}

function createModalBodyDelivery() {
  const body = document.createElement('div');
  body.classList.add('modalBodyDel;ivery');
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

function destroyPaymentModal() {
  const overlay = document.querySelector('.overlay');
  overlay.remove();
  enableScrolling();
  overlay.removeEventListener('click', destroyPaymentModal);
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

createModal('payment');

function enableScrolling() {
  document.body.classList.remove('stop-scrolling');
}
function disableScrolling() {
  document.body.classList.add('stop-scrolling');
}
