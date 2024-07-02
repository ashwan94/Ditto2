package kr.or.nextit.ditto.freeboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FreeBoardVO {
    private int freeBoardNo; // 게시판 번호
    private String memberId; // 회원 ID
    private String freeTitle; // 게시물 제목
    private String freeContent; // 게시물 내용
    private int hits; // 조회수
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp createDate; // 등록 시간
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp modifyDate; // 수정 시간
    private String status; // Y : 활성화, N : 비활성화
    private int commentCount; // 1 게시글 당 댓글 개수
}
