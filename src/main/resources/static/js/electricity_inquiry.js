/*
*   @title  electricity_inquiry
*   @author 卜佑荣
*   @create 2020-9-17 12:46
*/

onload = function () {
    $.ajax({
        url: "/api/electricity_inquiry/area",
        data: {},
        type: "POST",
        dataType: "json",
        success: function(areaData) {
            console.log("ajax");
            //dataType指明了返回数据为json类型，故不需要再反序列化
            // data = jQuery.parseJSON(data);
            console.log(areaData);

            areaData.roomlist.forEach(element => {
                let areaid = element.id;
                let areaname = element.name;
                // console.log('areaid = ' + areaid + ', areaname = ' + areaname);
                $('#area').append("<option value='"+areaid+"'>"+areaname+"</option>");
            });
        }
    });
}

/**
 * 选择校区
 */
function selectArea() {
    // $("#select_id").change(function(){//code...}); //为Select添加事件，当选择其中一项时触发
    // var checkText=$("#select_id").find("option:selected").text(); //获取Select选择的text
    // var checkValue=$("#select_id").val(); //获取Select选择的Value
    // var checkIndex=$("#select_id ").get(0).selectedIndex; //获取Select选择的索引值
    // var maxIndex=$("#select_id option:last").attr("index"); //获取Select最大的索引值

    let areaOption = $('#area').find("option:selected");
    // console.log(areaOption);
    let areaid = areaOption.val();
    let areaname = areaOption.text();
    console.log('areaid = ' + areaid);
    console.log('areaname = ' + areaname);

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

            $('#build').empty();
            $('#room').empty();
            $('#build').append("<option value='-1'>请选择</option>");
            buildData.roomlist.forEach(element => {
                let buildid = element.id;
                let buildname = element.name;
                // console.log('buildid = ' + buildid + ', buildname = ' + buildname);
                $('#build').append("<option value='"+buildid+"'>"+buildname+"</option>");
            });
        }
    });
}

/**
 * 选择栋数
 */
function selectBuild() {
    let buildOption = $('#build').find("option:selected");
    // console.log(buildOption);
    let buildid = buildOption.val();
    let buildname = buildOption.text();
    console.log('buildid = ' + buildid);
    console.log('buildname = ' + buildname);

    let areaOption = $('#area').find("option:selected");
    let areaid = areaOption.val();

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

            $('#room').empty();
            $('#room').append("<option value='-1'>请选择</option>");
            roomData.roomlist.forEach(element => {
                let roomid = element.id;
                let roomname = element.name;
                // console.log('roomid = ' + roomid + ', roomname = ' + roomname);
                $('#room').append("<option value='"+roomid+"'>"+roomname+"</option>");
            });
        }
    });

}

/**
 * 选择房间
 */
function selectRoom() {
    // let buildOption = $('#build').find("option:selected");
    // let buildid = buildOption.val();
    // let areaOption = $('#area').find("option:selected");
    // let areaid = areaOption.val();

    let roomOption = $('#room').find("option:selected");
    // console.log(roomOption);
    let roomid = roomOption.val();
    let roomname = roomOption.text();
    console.log('roomid = ' + roomid);
    console.log('roomname = ' + roomname);

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

            let price = $("#price").val();
            console.log("price = " + price);

            $("#balance").text(Number(quantity) * Number(price));
        }
    });
}