console.log("connected........")

const socket = io();


let name;

do{
    name = prompt("enter name");

}while(!name)

var sendBtn = document.querySelector('#submitBtn')
var textarea = document.querySelector('#textarea')
var msgArea = document.querySelector('.msg-content');


function fun() {
    sendMessage(textarea.value)
}

// msg.addEventListener('keyup' , (e) => {
//     if(e.key === 'Enter'){
//         console.log(e.target.value)
//     }
// })



function sendMessage(message) {
    let msg = {
        user:name,
        message:message.trim()
    }

    // append
    appendMessage(msg,'display-sender-msg')

    textarea.value = "";

    scrollToBottom()

    //send to server

    socket.emit('message',msg);
}

function appendMessage(msg,type) {
    
    let mainDiv = document.createElement('div')

    let className = type

    mainDiv.classList.add(className)

    let markUp = `
    
    <p>${msg.message}</p>

    `
    mainDiv.innerHTML = markUp;

    msgArea.appendChild(mainDiv);

}


// 

socket.on('message',(msg) => {
    appendMessage(msg,"display-reciver-msg")
    scrollToBottom()
})


function scrollToBottom() {
    msgArea.scrollTop = msgArea.scrollHeight;
}



