package kr.or.nextit.ditto.common;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebTester {
    @GetMapping("/test")
    public String forward(){
        System.out.println("GetMapping 통신 테스트 서버 수신부");
        return "GetMapping 통신 테스트 반환";
    }
}
