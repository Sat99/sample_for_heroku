let socket = io();


$(function () {
    let msglist = $('#msglist')
    let sendbtn = $('#sendmsg')
    let msgbox = $('#msgbox')
    let loginbox = $('#loginbox')
    let loginbtn = $('#loginbtn')
    let loginDiv = $('#login-div')
    let chatDiv = $('#chat-div')
    let showty =$('#showty')
    let typediv =$('#typediv')
    let user = ''

    socket.on('connected', () => {
        console.log("Connected " + socket.id)
               
    })
    socket.on("new_user", function(data){
        msglist.append($('<li>' + data +" is online" + '</li>'))
    })
    sendbtn.click(function () {
        socket.emit('send_msg', {
            user: user,
            message: msgbox.val()
        })
        
    })

    $( msgbox ).keydown(function() {        /*to indicate that a key is pressed*/
     socket.emit("typing",{user:user})
    })

    socket.on("typer",function(data){
        
        if($(showty).is(":hidden")){
            $(showty).show()
                      if ( $(showty).text().length == 0 ) {     /*check if the div is empty or not*/
                         
                         typediv.append($('<li>'+ data+ " is typing..." +'</li>'))
                      }
                     
        
                } else{
                   
                    
                }
        
    })
     /*$("#showty").hide();*/


    loginbtn.click(function () {
        user = loginbox.val()
        chatDiv.show()
        loginDiv.hide()
        socket.emit('login', {
            user: user
        })
    })

    socket.on('recv_msg', function (data) {
        $(showty).hide()
        msglist.append($('<li>' + data.user + ': ' + data.message + '</li>'))
    })
})