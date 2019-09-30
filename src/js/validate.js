const buttonRender = () => {
    const button = document.querySelector('.popup_is-opened').querySelector('.button');
    const currForm = button.parentElement;
    const errors = currForm.querySelectorAll('.popup__error');
      if ((errors[0].textContent !== '') || (errors[1].textContent !== '')) {
        button.setAttribute('disabled',true);
      // Можно лучше: Там где справляется css лучше использовать его. Мы можем стилизовать кнопку с атрибутом disabled с помощью селектора :disabled в css.
      } else if ((currForm.elements[0].value.length > 0) && (currForm.elements[1].value.length > 0)) {
        button.removeAttribute('disabled');
      }
    }
  
  // Можно лучше: переименовать в validateForm
  const formsValidation = (event) => {
    const currentInputName = event.target.getAttribute('name');
    const currentInput = event.target;
    const errorMessage = event.target.nextElementSibling;
    // Интересное использование switch'а - никогда такого не видел :)
    switch (true) {
      case (currentInput.value.length === 0):
        errorMessage.textContent = 'Это обязательное поле';
        break;
      case (currentInputName === 'link'):
        const valid = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!(valid.test(currentInput.value))) {
          errorMessage.textContent = 'Здесь должна быть ссылка';
        } else {
          errorMessage.textContent = '';
        }
        break;
      case (currentInput.value.length < 2) || (currentInput.value.length > 30):
        errorMessage.textContent = 'Должно быть от 2 до 30 символов';
        break;
      case ((currentInput.value.length > 1) && (currentInput.value.length < 31)):
        errorMessage.textContent = '';
        break;
    }
    buttonRender();
  }
export {formsValidation};