
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
    // console.log($("#finalStation").val() == null);
    // console.log($("#startDate").val() == "");
    // console.log($("#finalDate").val() == "");


    // console.log($("#startDate").val(), typeof $("#startDate").val());
    // 09/08/2023
    // console.log($("#finalDate").val());
    // 09/11/2023
    // console.log($("#startDate").val().match(/[0-1]\d\/[0-3]\d\/[2-9]\d{3}/g) != null);
    // console.log($("#finalDate").val().match(/[0-1]\d\/[0-3]\d\/[2-9]\d{3}/g) != null);

    data = !($("#finalStation").val() == null) && !($("#startDate").val() == "") && !($("#finalDate").val() == "")
        && ($("#startDate").val().match(/[0-1]\d\/[0-3]\d\/[2-9]\d{3}/g) != null)
        && ($("#finalDate").val().match(/[0-1]\d\/[0-3]\d\/[2-9]\d{3}/g) != null);
    // console.log(data);
    if (data) {
        document.getElementById("showWait").innerHTML = '<strong style="color:#FF0080;">' + "&emsp;查詢中請稍等" + "</strong>";
    }
}
