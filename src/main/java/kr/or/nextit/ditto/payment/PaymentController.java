package kr.or.nextit.ditto.payment;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
@CrossOrigin(origins = "http://nextit.or.kr:23124")
@RequestMapping("/payment")
public class PaymentController {
    private final PaymentService service;

    // 결제 내역 조회
    @GetMapping("/list")
    public List<PaymentVO> getPaymentList(){
        return service.getPaymentList();
    }

    // 결제 내용 입력
    @PostMapping("/goPay")
    public void goPay(@RequestBody PaymentVO vo){
        service.goPay(vo);
    }
}
