const filter = document.querySelector('#good-dog-filter')

function getDogs() {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(dogs => {
        dogs.forEach((dog) => {
        displayDogs(dog)
        })
    })
}

function displayDogs(dog) {
    const div = document.querySelector('#dog-bar')
    const newSpan = document.createElement('span')
    div.append(newSpan)
    newSpan.innerText = dog.name
    newSpan.addEventListener('click', () => {
        getInfo(dog.id, dog.name, dog.isGoodDog, dog.image)
    })
}

getDogs()

function getInfo(dogID, dogName, dogisGood, dogImage) {
    //clear current info
    document.querySelector('#dog-info').innerText = ''
    //name
    const name = document.createElement('h2')
    name.innerText = dogName
    //image
    const image = document.createElement('img')
    image.src = dogImage
    //good dog button
    const button = document.createElement('button')
    if (dogisGood === true) {
        button.innerText = 'Good Dog!'
    }
    else {
        button.innerText = 'Bad Dog!'
    }
    button.addEventListener('click', () => {
        //debugger
        if (button.innerText === 'Good Dog!') {
            button.innerText = 'Bad Dog!'
            patchDog(dogID, button.innerText)
            if (filter.innerText === 'Filter good dogs: ON') {
                hideBadDogs()
            }
        }
        else {
            button.innerText = 'Good Dog!'
            patchDog(dogID, button.innerText)
        }
    })
    document.querySelector('#dog-info').append(image, name, button)
}

function patchDog(dogID, isGood) {
    let goodDog = true
    if (isGood === 'Bad Dog!') {
        goodDog = false
    }
    //debugger
    fetch(`http://localhost:3000/pups/${dogID}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: goodDog
        })
    })
    .then(res => res.json())
    //.then(data => console.log(data))
}


filter.addEventListener('click', () => {
    if (filter.innerText === 'Filter good dogs: ON') {
        filter.innerText = 'Filter good dogs: OFF'
        document.querySelector('#dog-bar').innerText = ''
        getDogs()
    }
    else {
        filter.innerText = 'Filter good dogs: ON'
        hideBadDogs() 
    }
})

function hideBadDogs() {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(dogs => {
        document.querySelector('#dog-bar').innerText = ''
        dogs.forEach(dog => {
        if (dog.isGoodDog === true) {
            //console.log(dog.name)
            displayDogs(dog)
            }
        })
    })
}