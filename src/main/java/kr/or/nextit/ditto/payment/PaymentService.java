package kr.or.nextit.ditto.payment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentMapper mapper;

    // 결제 내역 조회
    public List<PaymentVO> getPaymentList(){
        return mapper.getPaymentList();
    }

    // 결제 내용 입력
    public void goPay(PaymentVO vo){mapper.goPay(vo);}
}
