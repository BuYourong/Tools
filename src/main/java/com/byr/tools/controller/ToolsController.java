package com.byr.tools.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ToolsController {
    // 首页
    @RequestMapping({"", "index"})
    public String index() {
        return "index";
    }

    // 电量查询
    @RequestMapping("electricity_inquiry")
    public String electricityInquiry() {
        return "electricity_inquiry";
    }

    // 电量查询2
    @RequestMapping("electricity_inquiry2")
    public String electricityInquiry2() {
        return "electricity_inquiry2";
    }
}
