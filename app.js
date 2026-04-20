const users = {

an:{
name:"Nguyễn Văn An",
pass:"123"
},

binh:{
name:"Trần Bình",
pass:"456"
},

phong:{
name:"Phạm Lê Gia An",
pass:"001"
}

}



async function login(){

const u = user.value.toLowerCase()
const p = pass.value

if(!users[u] || users[u].pass !== p){

alert("Sai thông tin")
return

}


const res = await fetch(`letters/${u}.txt`)
const text = await res.text()


const fullText = `Thân gửi, ${users[u].name}

${text}`


document
.querySelector(".envelope")
.classList.add("open")


typeWriter(fullText)

}



function typeWriter(text){

const el = document.getElementById("letterText")

el.innerText = ""

let i = 0


function typing(){

if(i < text.length){

el.innerText += text.charAt(i)

i++

setTimeout(typing,20)

}

}


typing()

}