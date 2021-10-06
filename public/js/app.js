const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()
  
  const location = searchElement.value
  
  const url = `/weather?address=${location}`

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  fetch(url).then((response) => {
    response.json().then(data => {
      console.log({data})
      if(data.error){
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.message
      }
    })
  })
  
})