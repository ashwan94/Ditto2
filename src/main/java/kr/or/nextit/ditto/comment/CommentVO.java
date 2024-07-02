package kr.or.nextit.ditto.comment;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
public class CommentVO {
    private int commentNo;              // 댓글 번호
    private int boardNo;                // 게시판 번호
    private String memberId;            // 작성자
    private String memberProfile;       // 댓글 작성한 회원의 프로필
    private String content;             // 댓글 내용
    private String type;                // 게시판 종류
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDate;   // 작성일
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime modifyDate;   // 수정일
    private String status;              // 활성화
    private String gptUsed;             // GPT 사용여부
}
