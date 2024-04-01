//帳號驗證
function changeAccount() {
    let user = $("#user").val();
    // console.log(user);
    if (user.match(/\w{6,10}/g) == null) {
        document.getElementById("msgAcc").innerHTML = "帳號輸入格式不正確，請重新設定6-10字元的帳號!";
    }
    else {
        $.ajax({
            type: "POST",
            url: "/checkAccount",
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

//密碼驗證
function changePwd() {
    let pwd = $("#password").val();
    if (pwd.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/g) == null) {
        document.getElementById("msgPwd").innerHTML = "密碼輸入格式不正確，請重新設定8-12字元" + "<br />" + "並至少有一個數字、大寫、小寫英文字母的密碼!";
    } else {
        document.getElementById("msgPwd").innerHTML = "密碼格式正確!"
    }
}

//確認密碼驗證
function changePwdCheck() {
    let pwd = $("#password").val();
    let pwdCheck = $("#passwordCheck").val();
    if (pwd == pwdCheck) {
        document.getElementById("msgPwdCheck").innerHTML = "密碼輸入驗證成功!";
    }
    else {
        document.getElementById("msgPwdCheck").innerHTML = "密碼輸入不一致，請重新輸入!";
    }
}

//身份證驗證
function changeId() {
    let identity = $("#identity").val();

    let rule = {}
    for (let i = 65; i <= 90; i++) {
        rule[String.fromCharCode(i)] = (i - 55);
    }
    rule["I"] = 34; rule["J"] = 18; rule["K"] = 19; rule["L"] = 20; rule["M"] = 21;
    rule["N"] = 22; rule["O"] = 35; rule["P"] = 23; rule["Q"] = 24; rule["R"] = 25;
    rule["S"] = 26; rule["T"] = 27; rule["U"] = 28; rule["V"] = 29; rule["W"] = 32;
    rule["X"] = 30; rule["Y"] = 31; rule["Z"] = 33;
    numCheck = ((rule[identity[0]] - rule[identity[0]] % 10) / 10) * 1 +
        (rule[identity[0]] % 10) * 9 +
        identity[1] * 8 +
        identity[2] * 7 +
        identity[3] * 6 +
        identity[4] * 5 +
        identity[5] * 4 +
        identity[6] * 3 +
        identity[7] * 2 +
        identity[8] * 1
    // console.log(numCheck) // 177
    // console.log(10 - numCheck % 10) // 3
    // console.log(10 - numCheck % 10 == identity[9]); // true

    //若餘數為 0 時，則設定其檢查碼為 0
    condition = (identity.match(/^[A-Z][1-2]\d{8}/g) == null) || ((10 - numCheck % 10) % 10 != identity[9])
    // console.log(condition) // true
    if (condition) {
        document.getElementById("msgId").innerHTML = "身份證字號輸入格式不正確";
    }
    else {
        $.ajax({
            type: "POST",
            url: "/checkId",
            data: identity,
            dataType: "json",
            success: (data) => {
                // console.log(data);
                document.getElementById("msgId").innerHTML = data["msg"];
                //也可以用jquery來呈現結果
            },

        });
    }
}

//email驗證
function changeEmail() {
    let email = $("#email").val();
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

// //身分證規則
// let rule = {}
// for (let i = 65; i <= 90; i++) {
//     rule[String.fromCharCode(i)] = (i - 55);
// }

// rule["I"] = 34; rule["J"] = 18; rule["K"] = 19; rule["L"] = 20; rule["M"] = 21;
// rule["N"] = 22; rule["O"] = 35; rule["P"] = 23; rule["Q"] = 24; rule["R"] = 25;
// rule["S"] = 26; rule["T"] = 27; rule["U"] = 28; rule["V"] = 29; rule["W"] = 30;
// rule["X"] = 31; rule["Y"] = 32; rule["Z"] = 33;

// console.log(rule);

// identity = "R122478963";
// console.log(rule[identity[0]]); // 25
// console.log(rule[identity[0]] % 10); // 5
// console.log((rule[identity[0]] - rule[identity[0]] % 10) / 10); // 2
// numCheck = ((rule[identity[0]] - rule[identity[0]] % 10) / 10) * 1 +
//     (rule[identity[0]] % 10) * 9 +
//     identity[1] * 8 +
//     identity[2] * 7 +
//     identity[3] * 6 +
//     identity[4] * 5 +
//     identity[5] * 4 +
//     identity[6] * 3 +
//     identity[7] * 2 +
//     identity[8] * 1
// console.log(numCheck) // 177
// console.log(10 - numCheck % 10) // 3
// console.log(10 - numCheck % 10 == identity[9]) // true
