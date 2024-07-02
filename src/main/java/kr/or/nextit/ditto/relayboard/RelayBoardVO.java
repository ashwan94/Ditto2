package kr.or.nextit.ditto.relayboard;

import kr.or.nextit.ditto.comment.CommentVO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RelayBoardVO {
    private int relayBoardNo; // 게시판 번호
    private String memberId; // 회원 ID
    private String memberProfile; // 회원 프로필 이미지
    private String relayTitle; // 게시물 제목
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp createDate; // 등록 시간
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp modifyDate; // 수정 시간
    private String status; // Y : 활성화, N : 비활성화
    private List<CommentVO> commentList; // 댓글 목록
}