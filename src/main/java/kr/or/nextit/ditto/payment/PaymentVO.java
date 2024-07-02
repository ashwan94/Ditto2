package kr.or.nextit.ditto.payment;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
public class PaymentVO {
    private int paymentNo;              // 결제번호
    private String memberId;            // 회원 아이디
    private int price;                  // 결제 금액
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDate;   // 결제일
}
