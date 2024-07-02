package kr.or.nextit.ditto.member;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Setter
@Getter
public class MemberVO {
    private int memberNo;
    private String memberId;
    private String memberName;
    private String memberNickname;
    private String memberPw;
    private String memberSub;
    private String memberTel;
    private String memberAdd;
    private String memberBirth;
    private String memberProfile;
    private String memberAdmin;
    private String memberLog;
    private String memberDelete;
    private String memberDetailAdd;
    private String memberPostcode;
}
