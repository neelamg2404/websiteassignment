const variantInputs = document.querySelectorAll('input[name="size"]');
const unitPrice = document.querySelector('#unit-price');
const subtotal = document.querySelector('#subtotal');
const quantityOutput = document.querySelector('#quantity');
const decreaseButton = document.querySelector('#decrease-quantity');
const increaseButton = document.querySelector('#increase-quantity');
const addButton = document.querySelector('#add-to-bag');
const bagCount = document.querySelector('.bag-count');
const bagLink = document.querySelector('.bag-link');
const cartMessage = document.querySelector('#cart-message');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const enquiryForm = document.querySelector('#enquiry-form');
const successMessage = document.querySelector('#success-message');

let quantity = 1;
let bagItems = 0;

function getSelectedPrice() {
	return Number(document.querySelector('input[name="size"]:checked').value);
}

function formatPrice(amount) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	}).format(amount);
}

function updateProductSummary() {
	const price = getSelectedPrice();
	unitPrice.textContent = formatPrice(price);
	subtotal.textContent = formatPrice(price * quantity);
	quantityOutput.textContent = String(quantity);
	decreaseButton.disabled = quantity === 1;
	increaseButton.disabled = quantity === 99;
}

variantInputs.forEach((input) => {
	input.addEventListener('change', updateProductSummary);
});

decreaseButton.addEventListener('click', () => {
	if (quantity > 1) {
		quantity -= 1;
		updateProductSummary();
	}
});

increaseButton.addEventListener('click', () => {
	if (quantity < 99) {
		quantity += 1;
		updateProductSummary();
	}
});

addButton.addEventListener('click', () => {
	bagItems += quantity;
	bagCount.textContent = String(bagItems);
	bagLink.setAttribute('aria-label', `Shopping bag, ${bagItems} ${bagItems === 1 ? 'item' : 'items'}`);
	cartMessage.textContent = `${quantity} ${quantity === 1 ? 'set' : 'sets'} added to your bag.`;
});

menuToggle.addEventListener('click', () => {
	const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
	menuToggle.setAttribute('aria-expanded', String(!isOpen));
	menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
	navigation.classList.toggle('is-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => {
		navigation.classList.remove('is-open');
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.setAttribute('aria-label', 'Open navigation');
	});
});

enquiryForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const name = enquiryForm.elements.name.value.trim();
	successMessage.textContent = `Thanks, ${name}! Your enquiry is ready. We'll be in touch soon.`;
	enquiryForm.reset();
});

updateProductSummary();
