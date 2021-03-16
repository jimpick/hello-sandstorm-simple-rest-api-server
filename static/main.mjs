console.log('Ready')

const inputEl = document.querySelector('input')
const updateBtnEl = document.querySelector('button')

async function run() {
  const response = await fetch('/posts')
  const json = await response.json()
  console.log('JSON', json)
  inputEl.value = json.value
}
run()

updateBtnEl.addEventListener('click', update)

async function update() {
  const newValue = inputEl.value
  console.log('Update!', newValue)
  const response = await fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ value: newValue })
  })
  console.log('Response:', response)
  if (response.status !== 200) {
    inputEl.value = 'Error! ' + response.statusText
  }
}
