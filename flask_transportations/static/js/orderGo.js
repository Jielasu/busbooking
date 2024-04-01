
function changefield(choose, id, url) {
    var data;
    var select = document.getElementById(choose);
    $(id).html(""); //每次重新选择当前列表框，就清空下一级列表框。
    for (i = 0; i < select.length; i++) {
        if (select[i].selected) { //判断被选中项
            Name = select[i].text;
            data = {
                "mydata": Name
            };
            $.post({ //发起ajax请求
                url: url,
                type: "POST",
                data: JSON.stringify(data),
                // { #dataType: 'json'#}
                contentType: "application/json; charset=UTF-8",
                success: function (data) {
                    // { #console.log(data.length);# }
                    if (data) {
                        // $(id).empty(); //清空上次的值
                        $("<option selected='selected' disabled='disabled'  style='display: none' value=''></option> ").appendTo(id);
                        for (i = 0; i < data.length; i++) {
                            $("<option value='" + data[i] + "'>" + data[i] + "</option>").appendTo(id);
                        }
                    } else {
                        alert('error')
                    }
                }
            });
        }
    }
}



function search() {
    let startStation = $("#startStation").val();
    let finalStation = $("#finalStation").val();

    let selectRideDate = $("#startDate").val(); // 09/24/2023、10/01/2023
    let selectYear = selectRideDate.substr(-4, 4);
    let selectMonth = selectRideDate.substr(0, 2);
    let selectDay = selectRideDate.substr(3, 2);
    let selectHour = $("#hours").val();
    let selectMin = $("#minutes").val();
    let stringSelect = selectYear + "-" + selectMonth + "-" + selectDay + "T" + selectHour + ":" + selectMin + ":00+08:00";

    let selectDatetime = new Date(stringSelect); // 台灣時區+8
    // console.log(selectDatetime); // Sun Sep 24 2023 06:20:00 GMT+0800 (台北標準時間)
    let nowTime = new Date();
    let nowTime2 = new Date();
    nowTime2.setHours(nowTime.getHours() + 2); // 現在時間+2小時
    // console.log(nowTime);
    if (selectDatetime < nowTime) {
        // console.log("hahaha");
        alert("您選擇的乘車時間,不可早於現在時間,\n請重新選擇!");
        return false;
        // 或者 return false;
    }
    else if (selectDatetime < nowTime2) {
        // console.log("hahaha");
        alert("您選擇的乘車時間,不可早於發車前 2 小時,\n請重新選擇!");
        return false;
        // 或者 return false;
    }
    else {
        // data = !($("#finalStation").val() == null) && !($("#startDate").val() == "") && !($("#finalDate").val() == "")
        //     && ($("#startDate").val().match(/[0-1]\d\/[0-3]\d\/[2-9]\d{3}/g) != null)
        //     && ($("#finalDate").val().match(/[0-1]\d\/[0-3]\d\/[2-9]\d{3}/g) != null);
        // // console.log(data);
        // if (data) {
        document.getElementById("showWait").innerHTML = '<strong style="color:#FF0080;">' + "&emsp;查詢中請稍等" + "</strong>";
        return true;
        // }
    }
}

var buyChoose1TicketNum = 1;  //選第1個的購買票數預設=1
var buyChoose2TicketNum = 1;
var buyChoose3TicketNum = 1;

document.getElementById("buyChooseoneTicketNum").value = buyChoose1TicketNum;
document.getElementById("buyChoosetwoTicketNum").value = buyChoose2TicketNum;
document.getElementById("buyChoosethreeTicketNum").value = buyChoose3TicketNum;


function changeBuyNum() {
    let buyNumChoose1 = document.querySelector("#one > div.pos_right > select.buyNum");
    let buyNumChoose2 = document.querySelector("#two > div.pos_right > select.buyNum");
    let buyNumChoose3 = document.querySelector("#three > div.pos_right > select.buyNum");

    if (buyNumChoose1 != null && buyNumChoose2 != null && buyNumChoose3 != null) {

        buyNumChoose1 = document.querySelector("#one > div.pos_right > select.buyNum").value;
        let buyTwoChoose1 = document.querySelector("#one > div.pos_right > select.buyTwo");
        let buyThreeChoose1 = document.querySelector("#one > div.pos_right > select.buyThree");
        let buyFourChoose1 = document.querySelector("#one > div.pos_right > select.buyFour");

        buyNumChoose2 = document.querySelector("#two > div.pos_right > select.buyNum").value;
        let buyTwoChoose2 = document.querySelector("#two > div.pos_right > select.buyTwo");
        let buyThreeChoose2 = document.querySelector("#two > div.pos_right > select.buyThree");
        let buyFourChoose2 = document.querySelector("#two > div.pos_right > select.buyFour");


        buyNumChoose3 = document.querySelector("#three > div.pos_right > select.buyNum").value;
        let buyTwoChoose3 = document.querySelector("#three > div.pos_right > select.buyTwo");
        let buyThreeChoose3 = document.querySelector("#three > div.pos_right > select.buyThree");
        let buyFourChoose3 = document.querySelector("#three > div.pos_right > select.buyFour");

        // console.log(buyNumChoose1, buyNumChoose2,buyNumChoose3);

        //有4*4*4種判斷式
        if (buyNumChoose1 == 2) {
            buyTwoChoose1.disabled = false;
            buyThreeChoose1.disabled = true;
            buyFourChoose1.disabled = true;
            buyChoose1TicketNum = 2;

            if (buyNumChoose2 == 2) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 2;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            } else if (buyNumChoose2 == 3) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 3;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            }
            else if (buyNumChoose2 == 4) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = false;
                buyChoose2TicketNum = 4;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            }
            else if (buyNumChoose2 == 1) {
                buyTwoChoose2.disabled = true;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 1;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            }
        }
        else if (buyNumChoose1 == 3) {
            buyTwoChoose1.disabled = false;
            buyThreeChoose1.disabled = false;
            buyFourChoose1.disabled = true;
            buyChoose1TicketNum = 3;

            if (buyNumChoose2 == 2) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 2;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            } else if (buyNumChoose2 == 3) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 3;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            }
            else if (buyNumChoose2 == 4) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = false;
                buyChoose2TicketNum = 4;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            }
            else if (buyNumChoose2 == 1) {
                buyTwoChoose2.disabled = true;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 1;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            }
        }
        else if (buyNumChoose1 == 4) {
            buyTwoChoose1.disabled = false;
            buyThreeChoose1.disabled = false;
            buyFourChoose1.disabled = false;
            buyChoose1TicketNum = 4;

            if (buyNumChoose2 == 2) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 2;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            } else if (buyNumChoose2 == 3) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 3;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            }
            else if (buyNumChoose2 == 4) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = false;
                buyChoose2TicketNum = 4;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            }
            else if (buyNumChoose2 == 1) {
                buyTwoChoose2.disabled = true;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 1;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            }
        }
        else if (buyNumChoose1 == 1) {
            buyTwoChoose1.disabled = true;
            buyThreeChoose1.disabled = true;
            buyFourChoose1.disabled = true;
            buyChoose1TicketNum = 1;

            if (buyNumChoose2 == 2) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 2;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            } else if (buyNumChoose2 == 3) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 3;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            }
            else if (buyNumChoose2 == 4) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = false;
                buyChoose2TicketNum = 4;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            }
            else if (buyNumChoose2 == 1) {
                buyTwoChoose2.disabled = true;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 1;

                if (buyNumChoose3 == 2) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 2;

                } else if (buyNumChoose3 == 3) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 3;

                }
                else if (buyNumChoose3 == 4) {
                    buyTwoChoose3.disabled = false;
                    buyThreeChoose3.disabled = false;
                    buyFourChoose3.disabled = false;
                    buyChoose3TicketNum = 4;

                }
                else if (buyNumChoose3 == 1) {
                    buyTwoChoose3.disabled = true;
                    buyThreeChoose3.disabled = true;
                    buyFourChoose3.disabled = true;
                    buyChoose3TicketNum = 1;

                }
            }
            console.log(buyChoose1TicketNum, buyChoose2TicketNum, buyChoose3TicketNum);
        }
    } else if (buyNumChoose1 != null && buyNumChoose2 != null) {

        buyNumChoose1 = document.querySelector("#one > div.pos_right > select.buyNum").value;
        let buyTwoChoose1 = document.querySelector("#one > div.pos_right > select.buyTwo");
        let buyThreeChoose1 = document.querySelector("#one > div.pos_right > select.buyThree");
        let buyFourChoose1 = document.querySelector("#one > div.pos_right > select.buyFour");

        buyNumChoose2 = document.querySelector("#two > div.pos_right > select.buyNum").value;
        let buyTwoChoose2 = document.querySelector("#two > div.pos_right > select.buyTwo");
        let buyThreeChoose2 = document.querySelector("#two > div.pos_right > select.buyThree");
        let buyFourChoose2 = document.querySelector("#two > div.pos_right > select.buyFour");

        // console.log(buyNumChoose1, buyNumChoose2);

        //有4*4種判斷式
        if (buyNumChoose1 == 2) {
            buyTwoChoose1.disabled = false;
            buyThreeChoose1.disabled = true;
            buyFourChoose1.disabled = true;
            buyChoose1TicketNum = 2;

            if (buyNumChoose2 == 2) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 2;


            } else if (buyNumChoose2 == 3) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 3;


            }
            else if (buyNumChoose2 == 4) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = false;
                buyChoose2TicketNum = 4;


            }
            else if (buyNumChoose2 == 1) {
                buyTwoChoose2.disabled = true;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 1;


            }
        }
        else if (buyNumChoose1 == 3) {
            buyTwoChoose1.disabled = false;
            buyThreeChoose1.disabled = false;
            buyFourChoose1.disabled = true;
            buyChoose1TicketNum = 3;

            if (buyNumChoose2 == 2) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 2;

            } else if (buyNumChoose2 == 3) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 3;


            }
            else if (buyNumChoose2 == 4) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = false;
                buyChoose2TicketNum = 4;

            }
            else if (buyNumChoose2 == 1) {
                buyTwoChoose2.disabled = true;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 1;


            }
        }
        else if (buyNumChoose1 == 4) {
            buyTwoChoose1.disabled = false;
            buyThreeChoose1.disabled = false;
            buyFourChoose1.disabled = false;
            buyChoose1TicketNum = 4;

            if (buyNumChoose2 == 2) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 2;


            } else if (buyNumChoose2 == 3) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 3;


            }
            else if (buyNumChoose2 == 4) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = false;
                buyChoose2TicketNum = 4;


            }
            else if (buyNumChoose2 == 1) {
                buyTwoChoose2.disabled = true;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 1;


            }
        }
        else if (buyNumChoose1 == 1) {
            buyTwoChoose1.disabled = true;
            buyThreeChoose1.disabled = true;
            buyFourChoose1.disabled = true;
            buyChoose1TicketNum = 1;

            if (buyNumChoose2 == 2) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 2;


            } else if (buyNumChoose2 == 3) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 3;


            }
            else if (buyNumChoose2 == 4) {
                buyTwoChoose2.disabled = false;
                buyThreeChoose2.disabled = false;
                buyFourChoose2.disabled = false;
                buyChoose2TicketNum = 4;


            }
            else if (buyNumChoose2 == 1) {
                buyTwoChoose2.disabled = true;
                buyThreeChoose2.disabled = true;
                buyFourChoose2.disabled = true;
                buyChoose2TicketNum = 1;


            }
        }
        console.log(buyChoose1TicketNum, buyChoose2TicketNum);

    }

    else if (buyNumChoose1 != null) {

        buyNumChoose1 = document.querySelector("#one > div.pos_right > select.buyNum").value;
        let buyTwoChoose1 = document.querySelector("#one > div.pos_right > select.buyTwo");
        let buyThreeChoose1 = document.querySelector("#one > div.pos_right > select.buyThree");
        let buyFourChoose1 = document.querySelector("#one > div.pos_right > select.buyFour");

        // console.log(buyNumChoose1);

        //有4種判斷式
        if (buyNumChoose1 == 2) {
            buyTwoChoose1.disabled = false;
            buyThreeChoose1.disabled = true;
            buyFourChoose1.disabled = true;
            buyChoose1TicketNum = 2;


        }
        else if (buyNumChoose1 == 3) {
            buyTwoChoose1.disabled = false;
            buyThreeChoose1.disabled = false;
            buyFourChoose1.disabled = true;
            buyChoose1TicketNum = 3;


        }
        else if (buyNumChoose1 == 4) {
            buyTwoChoose1.disabled = false;
            buyThreeChoose1.disabled = false;
            buyFourChoose1.disabled = false;
            buyChoose1TicketNum = 4;


        }
        else if (buyNumChoose1 == 1) {
            buyTwoChoose1.disabled = true;
            buyThreeChoose1.disabled = true;
            buyFourChoose1.disabled = true;
            buyChoose1TicketNum = 1;


        }
        console.log(buyChoose1TicketNum);
    }
    document.getElementById("buyChooseoneTicketNum").value = buyChoose1TicketNum;
    document.getElementById("buyChoosetwoTicketNum").value = buyChoose2TicketNum;
    document.getElementById("buyChoosethreeTicketNum").value = buyChoose3TicketNum;
}



// function doOnsubmit() {

//     let submitBtn1 = document.querySelector("#one > div.pos_right > input.buttons");
//     let submitBtn2 = document.querySelector("#two > div.pos_right > input.buttons");
//     let submitBtn3 = document.querySelector("#three > div.pos_right > input.buttons");
//     if (submitBtn1 != null && submitBtn2 != null && submitBtn3 != null) {
//         submitBtn1.onsubmit = function () {
//             console.log(buyChoose1TicketNum);
//             document.getElementById("buyChooseoneTicketNum").value = buyChoose1TicketNum;
//             console.log(document.getElementById("buyChooseoneTicketNum").value);
//             return false;
//         }

//     }

// }