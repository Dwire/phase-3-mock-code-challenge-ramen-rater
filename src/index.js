// write your code here
getAllRamens()

const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetail = document.querySelector('#ramen-detail')
const ramenForm = document.querySelector('#ramen-rating')

ramenMenu.addEventListener("click", handleClick)
ramenForm.addEventListener("submit", grabFormData)


function getAllRamens(){
  fetch("http://localhost:3000/ramens")
  .then(res => res.json())
  // .then(ramenData => displayRamenImages(ramenData))
  .then(ramenArray => {
    ramenArray.forEach(ramen => displayRamenImage(ramen))
  })
}

function getSingleRamen(ramenId){
  return fetch(`http://localhost:3000/ramens/${ramenId}`)
         .then(res => res.json())
  // .then(ramenObj => {
  //   populateImgDetail(ramenObj)
  //   populateImgForm(ramenObj)
  // })
}


function displayRamenImage(ramen){
  // ramenArray.forEach(ramen => {
    const img = document.createElement('img')
    img.className = 'detail-img'
    img.dataset.id = ramen.id
    img.src = ramen.image 
    img.alt = ramen.name 

    // img.addEventListener('click', logClick)
    ramenMenu.append(img)
  // })
}

function handleClick(e){
  if (e.target.matches('img.detail-img')){
    const ramenId = e.target.dataset.id
    getSingleRamen(ramenId).then(populateImgDetail)
    getSingleRamen(ramenId).then(populateImgForm)

    // populateImgDetail(e)
    // populateImgForm()
  }
}


function populateImgDetail(ramenObj){
  ramenDetail.innerHTML = `
    <img class="detail-image" src=${ramenObj.image} alt=${ramenObj.name}/>
    <h2 class="name">${ramenObj.name}</h2>
    <h3 class="restaurant">${ramenObj.restaurant}</h3>
  `
}

function populateImgForm(ramenObj){
  ramenForm.dataset.id = ramenObj.id

  ramenForm.innerHTML = `
    <label for="rating">Rating: </label>
    <input type="text" name="rating" id="rating" value=${ramenObj.rating}  />
    <label for="comment">Comment:</label>
    <textarea name="comment" id="comment">${ramenObj.comment}</textarea>
    <input type="submit" value="Update" />
  `
}


function grabFormData(e) {
  e.preventDefault()

  const ramenId = e.target.comment.dataset.id
  const formComment = e.target.comment.value 
  const formRating = parseInt(e.target.rating.value) 

  const ramenObj = {
    comment: formComment,
    rating: formRating
  }
  
  updateRamen(ramenId, ramenObj)

}

function updateRamen(id, ramen){
  fetch(`http://localhost:3000/ramens/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(ramen)
  })
  .then(res => res.json())
  .then(console.log)

}












