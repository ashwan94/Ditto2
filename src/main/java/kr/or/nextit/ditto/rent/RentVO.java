package kr.or.nextit.ditto.rent;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RentVO {
    int rentNo;
    int bookNo;
    String bookName;
    int memberNo;
    String memberId;
    String rentStart;
    String rentEnd;
    String rentDelay;
    String rentReturn;
    String rentExtend;
    String bookRent; // 조인해서 렌트합니다.
}
