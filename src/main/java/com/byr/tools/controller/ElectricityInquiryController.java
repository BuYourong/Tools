package com.byr.tools.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api/electricity_inquiry")
// @CrossOrigin(value = "*")  //跨域
public class ElectricityInquiryController {
    @RequestMapping(value = "area")
    @ResponseBody
    public String getAreaListJSON() {
        String url = "http://h5cloud.17wanxiao.com:8080/CloudPayment/user/getRoom.do?payProId=1567&schoolcode=786&optype=1&areaid=0&buildid=0&unitid=0&levelid=0&businesstype=2";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class);
        // System.out.println("responseEntity = " + responseEntity);

        String areaListJson = responseEntity.getBody();
        System.out.println("areaListJson = " + areaListJson);

        return areaListJson;
    }

    @RequestMapping("build")
    @ResponseBody
    public String getBuildListJSONByAreaid(String areaid) {
        System.out.println("areaid = " + areaid);
        String url = "http://h5cloud.17wanxiao.com:8080/CloudPayment/user/getRoom.do?payProId=1567&schoolcode=786&optype=2&areaid={areaid}&buildid=0&unitid=0&levelid=0&businesstype=2";
        Map<String,String> params = new HashMap<>();
        params.put("areaid", areaid);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class, params);
        // System.out.println("responseEntity = " + responseEntity);

        String buildListJSON = responseEntity.getBody();
        System.out.println("buildListJSON = " + buildListJSON);

        return buildListJSON;
    }

    @RequestMapping("room")
    @ResponseBody
    public String getRoomListJSONByAreaidAndBuildid(String areaid, String buildid) {
        System.out.println("buildid = " + buildid);
        String url = "http://h5cloud.17wanxiao.com:8080/CloudPayment/user/getRoom.do?payProId=1567&schoolcode=786&optype=4&areaid={areaid}&buildid={buildid}&unitid=0&levelid=-1&businesstype=2";
        Map<String,String> params = new HashMap<>();
        params.put("areaid", areaid);
        params.put("buildid", buildid);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class, params);
        // System.out.println("responseEntity = " + responseEntity);

        String roomListJSON = responseEntity.getBody();
        System.out.println("roomListJSON = " + roomListJSON);

        return roomListJSON;
    }

    @RequestMapping("quantity")
    @ResponseBody
    public String getQuantityByAreaidAndBuildidAndRoomid(String roomid) {
        System.out.println("roomid = " + roomid);
        String url = "http://h5cloud.17wanxiao.com:8080/CloudPayment/user/getRoomState.do?payProId=1888&schoolcode=786&businesstype=2&roomverify={roomid}";
        Map<String,String> params = new HashMap<>();
        params.put("roomid", roomid);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class, params);
        // System.out.println("responseEntity = " + responseEntity);

        String quantityJSON = responseEntity.getBody();
        System.out.println("quantityJSON = " +quantityJSON);

        return quantityJSON;
    }

    @RequestMapping("quantity-server")
    @ResponseBody
    public String getQuantityByAreaidAndBuildnumAndRoomnum(String areaid, String buildnum, String roomnum) {
        System.out.println("areaid = " + areaid + ", buildnum = " + buildnum + ", roomnum = " + roomnum);


        return null;
    }
}
