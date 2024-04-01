

// let today = new Date();
// let dd = today.getDate();
// let mm = today.getMonth() + 1; //January is 0!
// let yyyy = today.getFullYear();

// if (dd < 10) {
// 	dd = '0' + dd;
// }

// if (mm < 10) {
// 	mm = '0' + mm;
// }

// today = yyyy + '-' + mm + '-' + dd;
// console.log(today)

// let minDay = new Date();
// minDay.setDate(minDay.getDate());
// newMinDay = minDay.toISOString().split('T')[0]
// console.log(newMinDay)

// let maxDay = new Date();
// maxDay.setDate(maxDay.getDate() + 14);
// newMaxDay = maxDay.toISOString().split('T')[0];
// console.log(newMaxDay)

// document.getElementById("startDate").setAttribute("min", newMinDay);
// document.getElementById("startDate").setAttribute("value", newMinDay);
// document.getElementById("startDate").setAttribute("max", newMaxDay);

// document.getElementById("endDate").setAttribute("min", newMinDay);
// document.getElementById("endDate").setAttribute("value", newMaxDay);
// document.getElementById("endDate").setAttribute("max", newMaxDay);


// $(function () {
//     $("#datepicker").datepicker({
//         showWeek: true,
//         firstDay: 1
//     });
// });

$(function () {
    var dateFormat = "mm/dd/yy",
        from = $("#startDate")
            .datepicker({
                defaultDate: "+0w",
                changeMonth: true,
                numberOfMonths: 2,  //顯示兩個月可以選舉
                minDate: 0,         //最早可選取日期:今日
                maxDate: "+14D"     //最晚可選取日期:今日+14天
            })
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
            }),
        to = $("#finalDate").datepicker({
            defaultDate: "+0w",
            changeMonth: true,
            numberOfMonths: 2,
            minDate: 0,
            maxDate: "+14D"
        })
            .on("change", function () {
                from.datepicker("option", "maxDate", getDate(this));
            });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }

        return date;
    }
});