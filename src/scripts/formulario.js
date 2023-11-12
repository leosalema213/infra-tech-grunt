const form = document.querySelector('form')
const inputCel = document.querySelector("#cel")
const btn = document.querySelector('#btn-submit')
const msgError = document.querySelector('.input__group span')

const inputCelInvalid = () => {
    inputCel.classList.add('border--error')
    msgError.classList.add('is-visible')
    btn.classList.add('disabled')
    btn.disabled = true
  }

  const inputCelValid = () => {
    inputCel.classList.remove('border--error')
    msgError.classList.remove('is-visible')
    btn.classList.remove('disabled')
    btn.disabled = false
  }

  IMask(
    inputCel,
    {
      mask: '(00) 00000-0000'
    }
  )

  inputCel.addEventListener('blur', (e) => {
    value = e.target.value
    if (value.length < 15) {
      inputCelInvalid()
    } else {
      inputCelValid()
    }

  })

  const clearInput = () => {
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
    clearInput()
  })


