//帳號驗證
function changeAccount() {
    let user = $("#user").val();
    // console.log(user);
    if (user.match(/\w{6,10}/g) == null) {
        document.getElementById("msgAcc").innerHTML = "帳號輸入格式不正確，請重新設定6-10字元的原始註冊帳號!";
    }
    else {
        $.ajax({
            type: "POST",
            url: "/ForgetCheckAccount",
            data: user,
            dataType: "json",
            success: (data) => {
                // console.log(data);
                document.getElementById("msgAcc").innerHTML = data["msg"];
                //也可以用jquery來呈現結果
            },

        });
    }


}
