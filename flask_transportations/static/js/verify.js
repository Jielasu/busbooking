
function changeSent() {
    let num = $("#num").val();
    let name = $("#name").val();
    // console.log(name);
    document.getElementById("msgSend").innerHTML = name + "您好，請到您註冊的信箱收取最新的驗證碼~";

    $.ajax({
        type: "POST",
        url: "/sendVcode",
        data: { "num": num, "name": name }
    });
}


//email驗證
function changeEmail() {
    let email = $("#newEmail").val();
    if (email.match(/^\w+[@]\w+[.]\w+/g) == null) {
        document.getElementById("msgEmail").innerHTML = "email輸入格式不正確";
    }
    else {
        $.ajax({
            type: "POST",
            url: "/checkMail",
            data: email,
            dataType: "json",
            success: (data) => {
                // console.log(data);
                document.getElementById("msgEmail").innerHTML = data["msg"];
                //也可以用jquery來呈現結果
            },

        });
    }
}
