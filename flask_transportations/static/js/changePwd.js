//電話驗證
function changePhone() {
    let phone = $("#phone").val();
    let num = $("#num").val();
    // console.log(user);
    if (phone.match(/\d{0,100}/g) == null) {
        document.getElementById("msgPhone").innerHTML = "";
    }
    else {
        $.ajax({
            type: "POST",
            url: "/checkPhone",
            data: { "phone": phone, "num": num },
            dataType: "json",
            success: (data) => {
                // console.log(data);
                document.getElementById("msgPhone").innerHTML = data["msg"];
                //也可以用jquery來呈現結果
            },

        });
    }
}

//新密碼驗證
function changePwd() {
    let pwd = $("#newPsd").val();
    if (pwd.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/g) == null) {
        document.getElementById("msgPwd").innerHTML = "密碼輸入格式不正確，請重新設定8-12字元" + "<br />" + "並至少有一個數字、大寫、小寫英文字母的密碼!";
    } else {
        document.getElementById("msgPwd").innerHTML = "密碼格式正確!"
    }
}

//確認新密碼驗證
function changePwdCheck() {
    let pwd = $("#newPsd").val();
    let pwdCheck = $("#newPwdCheck").val();
    if (pwd == pwdCheck) {
        document.getElementById("msgPwdCheck").innerHTML = "密碼輸入驗證成功!";
    }
    else {
        document.getElementById("msgPwdCheck").innerHTML = "密碼輸入不一致，請重新輸入!";
    }
}





