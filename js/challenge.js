const counter = document.querySelector('#counter')
const minus = document.querySelector('#minus')
const plus = document.querySelector('#plus')
const heart = document.querySelector('#heart')
const pause = document.querySelector('#pause')
const likes = document.querySelector('.likes')
const list = document.querySelector('#list')

let counterVal
let form = document.querySelector("form")
let interId
let clicks = 0

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const comment = e.target.querySelector('#comment-input').value
    leaveComment(comment)
    form.reset()
})

counting()
minus.addEventListener('click', countMinus)
plus.addEventListener('click', countPlus)
heart.addEventListener('click', likeLists)
pause.addEventListener('click', pauseBtn)

function counting(){
    if(!interId){
        interId = setInterval(()=>{
            counterVal = parseInt(counter.innerText) 
            counterVal++
            counter.innerText = counterVal
        }, 1000)
    }  
}

function pauseBtn(){
    if(pause.innerText === "pause"){
        clearInterval(interId)
        interId = null
        document.querySelectorAll("button").forEach((btn)=>{
            if(btn.id !== "pause"){
                btn.disabled = true
            }
        })
        pause.innerText = "resume"
    } else if(pause.innerText === "resume"){
        counting()
        document.querySelectorAll("button").forEach((btn)=>{
            if(btn.id !== "pause"){
                btn.disabled = false
            }
        })
        pause.innerText = "pause"
    }
}

function leaveComment(comment){
    const newCom = document.createElement('p')
    newCom.innerText = comment
    list.appendChild(newCom)
}

function likeLists(){
    counterVal = parseInt(counter.innerText)
    clicks ++
    const lists = document.querySelectorAll('li')
    if(lists.length === 0){
        clicks = 0
        createLikes(counterVal, clicks)
    } else {
        const lastNum = parseInt(lists[lists.length-1].dataset.num)
        if(counterVal === lastNum){
            lists[lists.length-1].innerHTML = `<p>${counterVal} has been liked <span>${clicks+1}</span> time</p>`
        } else {
            clicks = 0
            createLikes(counterVal, clicks)
        }
    } 
}

function createLikes(counterVal, clicks){
    const newLike = document.createElement('li')
    newLike.setAttribute('data-num', counterVal)
    newLike.innerHTML = `<p>${counterVal} has been liked <span>${clicks+1}</span> time</p>`
    likes.appendChild(newLike)   
}

function countPlus(){
    counterVal = parseInt(counter.innerText)
    counterVal += 1
    counter.innerText = counterVal
}

function countMinus(counterVal){
    counterVal = parseInt(counter.innerText)
    counterVal -= 1
    counter.innerText = counterVal
}
