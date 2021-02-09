// write your code here
getAllRamen()

//  **************** Grab DOM Elements *************
const ramenMenu = document.querySelector("#ramen-menu")
const ramenDetail = document.querySelector("#ramen-detail")
const ramenRating = document.querySelector("#ramen-rating")

// Bonus creation 
const newRamenForm = document.querySelector("#new-ramen")



// *************** Events Handaling ******************

ramenMenu.addEventListener("click", handleClick)
ramenRating.addEventListener("submit", collectFormData)

// Bonus creation
newRamenForm.addEventListener("submit", collectNewRamenData)
// Bonus delete
ramenDetail.addEventListener('click', handleDeleteClick)

function handleClick(e){
  if (e.target.className === "detail-image"){
    const ramenId = e.target.dataset.id
    getSingleRamen(ramenId)
  }
}

function handleDeleteClick(e){
  if (e.target.className === "delete-btn"){
    const ramenId = e.target.dataset.id
    deleteRamen(ramenId).then(getAllRamen)
    
  }
}


// ***************** Fetch/Network Requests ************
function getAllRamen() {
  fetch("http://localhost:3000/ramens")
  .then(res => res.json())
  .then(ramenArray => {
    addRamenToMenu(ramenArray)
    
    // BONUS-See the details for the first ramen on page load (without clicking on an image)
    addRamenShowSection(ramenArray[0])
  })
}


function getSingleRamen(id){
  fetch(`http://localhost:3000/ramens/${id}`)
  .then(res => res.json())
  .then(addRamenShowSection)
}

function updateRamen(id, obj){
  fetch(`http://localhost:3000/ramens/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(obj)
  })
  // .then(res => res.json())
  // .then(addRamenShowSection)
}

// Bonus creation
function createNewRamen(ramen){
  fetch(`http://localhost:3000/ramens`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(ramen)
  })
  .then(res => res.json())
  .then(addSingleRamenToMenu)
  
}

function deleteRamen(id){
  return fetch(`http://localhost:3000/ramens/${id}`, {
    method: "DELETE"
  })
}

// ***************** Logic/Manipulating the DOM ***************
function addRamenToMenu(ramenArray){
  ramenMenu.innerHTML = ""

  ramenArray.forEach(ramen => {
    addSingleRamenToMenu(ramen)
  })
}


function addSingleRamenToMenu(ramen){
  ramenMenu.innerHTML += `
  <img src=${ramen.image} class="detail-image" data-id=${ramen.id} />
  `
}


function addRamenShowSection(singleRamen) {
  ramenDetail.innerHTML = `
  <img class="detail-image" src=${singleRamen.image} alt=${singleRamen.name} />
  <h2 class="name">${singleRamen.name}</h2>
  <h3 class="restaurant">${singleRamen.restaurant}</h3>
  <button class="delete-btn" data-id=${singleRamen.id}>X</button>
  `
  
  ramenRating.dataset.id = singleRamen.id
  ramenRating.rating.value = singleRamen.rating
  ramenRating.comment.value = singleRamen.comment
}


function collectFormData(e){
  e.preventDefault()
  
  const ramenId = e.target.dataset.id
  const rating = e.target.rating.value
  const comment = e.target.comment.value
  
  const ramenObj = {rating: rating, comment: comment}
  
  
  updateRamen(ramenId, ramenObj)
}

// Bonus creation
function collectNewRamenData(e) {
  e.preventDefault()
  
  const name = e.target.name.value
  const image = e.target.image.value
  const comment = e.target["new-comment"].value
  const rating = e.target.rating.value
  const restaurant = e.target.restaurant.value

  const ramentObj = {name, image, comment, rating, restaurant}

  createNewRamen(ramentObj)
  e.target.reset()
}