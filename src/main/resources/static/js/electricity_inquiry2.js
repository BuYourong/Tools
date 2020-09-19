/*
*   @title  electricity_inquiry2
*   @author 卜佑荣
*   @create 2020-9-17 20:53
*/

onload = function () {
    $.ajax({
        url: "/api/electricity_inquiry/area",
        data: {},
        type: "POST",
        dataType: "json",
        success: function(areaData) {
            console.log("area-ajax");
            //dataType指明了返回数据为json类型，故不需要再反序列化
            // data = jQuery.parseJSON(data);
            console.log(areaData);

            areaData.roomlist.forEach(element => {
                let areaid = element.id;
                let areaname = element.name;
                // console.log('areaid = ' + areaid + ', areaname = ' + areaname);
                $('#area').append('<input type="radio" name="area" value="' +areaid+ '" id="area_' +areaid+ '">');
                $('#area').append('<label for="area_' +areaid+ '">' +areaname+ '</label>&nbsp;&nbsp;')
            });
            $("#area input:eq(1)").attr("checked", "checked");
        }
    });
}

function submit() {
    let buildnameInput = $("#build").val();
    let roomnameInput = $("#room").val();
    if (buildnameInput == "" || roomnameInput == "") {
        console.log("空字符串");
        return;
    }
    console.log("buildnameInput = " + buildnameInput + ", roomnameInput = " + roomnameInput);

    $("#quantity").text("");
    $("#quantityUnit").text("");
    $("#balance").text("");

    let areaid = $("#area").find("input:checked").val();
    console.log("areaid = " + areaid);

    let buildid = build(areaid, buildnameInput, roomnameInput);
    console.log("buildid = " + buildid);
}

function build(areaid, buildnameInput, roomnameInput) {
    // 栋数列表
    $.ajax({
        url: "/api/electricity_inquiry/build",
        data: {
            "areaid": areaid
        },
        type: "POST",
        dataType: "json",
        success: function(buildData) {
            console.log("build-ajax");
            //dataType指明了返回数据为json类型，故不需要再反序列化
            // data = jQuery.parseJSON(data);
            console.log(buildData);

            // some() return true 跳出循环
            // every() return false 跳出循环
            buildData.roomlist.some(element => {
                let buildidTmp = element.id;
                let buildnameTmp = element.name;

                // let buildNumberTmp = buildnameTmp.substr(4, buildnameTmp.length-5);
                // if (buildNumberTmp == buildnameInput) {
                //     console.log("buildData-buildidTmp = " + buildidTmp);
                //     room(areaid, buildidTmp, roomnameInput);
                //     return buildidTmp;
                // }

                let pattern = "(学生)?" + buildnameInput + "栋$";
                let str = buildnameTmp;
                // console.log("pattern = " + pattern);
                // console.log("str = " + str);
                // console.log("pattern = " + str.search(pattern));
                if (str.search(pattern) >= 0) {
                    console.log("buildData-buildidTmp = " + buildidTmp);
                    room(areaid, buildidTmp, roomnameInput);
                    return true;
                }

            });
        }
    });
}

function room(areaid, buildid, roomnameInput) {
    // 房间列表
    $.ajax({
        url: "/api/electricity_inquiry/room",
        data: {
            "areaid": areaid,
            "buildid": buildid
        },
        type: "POST",
        dataType: "json",
        success: function(roomData) {
            console.log("room-ajax");
            //dataType指明了返回数据为json类型，故不需要再反序列化
            // data = jQuery.parseJSON(data);
            console.log(roomData);

            // some() return true 跳出循环
            // every() return false 跳出循环
            roomData.roomlist.some(element => {
                let roomidTmp = element.id;
                let roomnameTmp = element.name;

                // let roomNumber = roomnameTmp.substr(roomnameTmp.length-3);
                // if (roomNumber == roomnameInput) {
                //     console.log("roomData-roomidTmp = " + roomidTmp);
                //     quantity(roomidTmp);
                //     return roomidTmp;
                // }

                let pattern = "(\\d+-)?" + roomnameInput + "$";
                let str = roomnameTmp;
                // console.log("pattern = " + pattern);
                // console.log("str = " + str);
                // console.log("pattern = " + str.search(pattern));
                if (str.search(pattern) >= 0) {
                    console.log("roomData-roomidTmp = " + roomidTmp);
                    quantity(roomidTmp);
                    return true;
                }
            });
        }
    });
}

function quantity(roomid) {
    // 电量查询
    $.ajax({
        url: "/api/electricity_inquiry/quantity",
        data: {
            "roomid": roomid
        },
        type: "POST",
        dataType: "json",
        success: function(quantityData) {
            console.log("quantity-ajax");
            //dataType指明了返回数据为json类型，故不需要再反序列化
            // data = jQuery.parseJSON(data);
            console.log(quantityData);

            // 电量
            let quantity = quantityData.quantity;
            // 单位
            let quantityUnit = quantityData.quantityunit;

            $("#quantity").text(quantity);
            $("#quantityUnit").text(quantityUnit);

            // 单价
            let price = $("#price").val();
            console.log("price = " + price);

            // 余额
            let balance = Number(quantity) * Number(price);
            $("#balance").text(balance.toFixed(2));
        }
    });
}