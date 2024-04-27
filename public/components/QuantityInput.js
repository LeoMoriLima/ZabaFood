export default (max, id, currentValue = 1, onClickPlus, onClickMinus) => {
    const quantityInput = document.createElement("div");
    quantityInput.classList.add("quantity-input-container")

    const minusButton = document.createElement("button");
    minusButton.classList.add("quantity-button-math");
    minusButton.innerText = "-";
    minusButton.onclick = () => {
        let value = parseInt(input.value);
        if (value > input.min) {
            input.value = value - 1;
        }
        toggleButtons();

        if (onClickMinus) {
            onClickMinus(minusButton);
        }
    };
    quantityInput.appendChild(minusButton);

    const input = document.createElement('input');
    input.id = id;
    input.classList.add("quantity-input")
    input.type = 'number';
    input.value = currentValue || 1;
    input.min = '1';
    input.max = `${max}`;
    input.step = '1';
    input.classList.add('input-quantity');
    input.onwheel = (e) => e.preventDefault();
    input.readOnly = true;

    quantityInput.appendChild(input);

    const plusButton = document.createElement("button");
    plusButton.classList.add("quantity-button-math");
    plusButton.innerText = "+";
    plusButton.onclick = () => {
        let value = parseInt(input.value);
        if (value < input.max) {
            input.value = value + 1;
        }
        toggleButtons();
        
        if (onClickPlus) {
            onClickPlus(plusButton);
        }
    };
    quantityInput.appendChild(plusButton);

    function toggleButtons() {
        minusButton.disabled = parseInt(input.value) <= input.min;
        plusButton.disabled = parseInt(input.value) >= input.max;
    }

    toggleButtons();

    return quantityInput;
};