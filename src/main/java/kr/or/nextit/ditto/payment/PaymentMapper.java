package kr.or.nextit.ditto.payment;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PaymentMapper {
    List<PaymentVO> getPaymentList();   // 결제 내역 조회
    void goPay(PaymentVO vo);           // 결제 정보 입력
}
