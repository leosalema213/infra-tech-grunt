const formMobile = document.querySelector('#form__mobile form')
const inputCelMobile = document.querySelector("#form__mobile #cel")
const btnMobile = document.querySelector('#form__mobile #btn-submit')
const msgErrorMobile = document.querySelector('#form__mobile .input__group span')

const inputCelInvalidMobile = () => {
    inputCelMobile.classList.add('border--error')
    msgErrorMobile.classList.add('is-visible')
    btnMobile.classList.add('disabled')
    btnMobile.disabled = true
  }

  const inputCelValidMobile = () => {
    inputCelMobile.classList.remove('border--error')
    msgErrorMobile.classList.remove('is-visible')
    btnMobile.classList.remove('disabled')
    btnMobile.disabled = false
  }

  IMask(
    inputCelMobile,
    {
      mask: '(00) 00000-0000'
    }
  )

  inputCelMobile.addEventListener('blur', (e) => {
    value = e.target.value
    if (value.length < 15) {
      inputCelInvalidMobile()
    } else {
      inputCelValidMobile()
    }

  })

  const clearInputMobile = () => {
    const select = document.querySelector('select')
    const inputs = document.querySelectorAll('input')

    for(let i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
    }
    select.value = ''
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    Swal.fire('Inscrição realizada com sucesso')
    clearInputMobile()
  })
