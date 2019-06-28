let socket = io();
socket.on('connected', () => {
    console.log("Connected " + socket.id)
    })

$(function () {
    let msglist1 = $('#mssgList1')
    let sendbtn1 = $('#sendmsg1')
    let msgbox1 = $('#msgbox1')
    let msglist2 = $('#messages2')
    let sendbtn2 = $('#sendmsg2')
    let msgbox2 = $('#msgbox2')
    let loginbox = $('#loginbox')
    let loginbtn = $('#loginbtn')
    let loginDiv = $('#login-div')
    let chatDiv = $('#chat-div')

    let user = ''

    
    socket.on("new_user", function(data){
        //online notification
        msglist1.append($("<li>"+ data +" is online" + "</li>"))
        msglist2.append($("<li>"+ data +" is online" + "</li>"))
    })
    sendbtn1.click(function () {
        socket.emit('send_msg1', {
            user: user,
            message: msgbox1.val()
        })
    })

    sendbtn2.click(function () {
        socket.emit('send_msg2', {
            user: user,
            message: msgbox2.val()
        })
    })

    loginbtn.click(function () {
        user = loginbox.val()
        chatDiv.show()
        loginDiv.hide()
        
        socket.emit('login', {
            user: user,
            Room1: "Room1",
            Room2: "Room2"
        })
               
        
    })

    socket.on('recv_msg1', function (data) {
        msglist1.append($("<li>" + data.user + ': ' + data.message + "</li>" ))
    })

    socket.on('recv_msg2', function (data) {
        msglist2.append($("<li>" + data.user + ': ' + data.message + "</li>" ))
    })
})