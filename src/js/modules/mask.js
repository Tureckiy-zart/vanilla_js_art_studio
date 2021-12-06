const mask = (selector) => {
  const setCursorPosition = (position, element) => {
    element.focus();
    console.log('position :>> ', position);
    if (element.setSelectionRange) {
      //https://developer.mozilla.org/ru/docs/Web/API/HTMLInputElement/setSelectionRange

      element.setSelectionRange(position, element); // set cursor to position #3 in input
    } else if (element.createTextRange) {
      const range = element.createTextRange(); //Polyfill for IE

      range.collapse(true);
      range.moveEnd("character", position);
      range.moveStart("character", position);
      range.select();
    }
  };

  function createMask(event) {
    let matrix = "+38 (___) ___ __ __",
      i = 0,
      def = matrix.replace(/\D/g, ""), //  all not numbers wil be replaced to ''
      value = this.value.replace(/\D/g, "");

    if (def.length >= value.length) value = def;

    this.value = matrix.replace(/./g, (a) => {
      return /[_\d]/.test(a) && i < value.length
        ? value.charAt(i++)
        : i >= value.length
        ? ""
        : a;
    });
    if (event.type === "blur") {
      if (this.value.length === 2) this.value = "";
    } else {
      setCursorPosition(this.value.length, this);
    }
  }

  const inputs = document.querySelectorAll(selector);

  inputs.forEach((input) => {
    input.addEventListener("input", createMask);
    input.addEventListener("focus", createMask);
    input.addEventListener("blur", createMask);
  });
};

export default mask;
