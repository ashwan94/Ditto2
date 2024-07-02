package kr.or.nextit.ditto.comment;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {
    List<CommentVO> getCommentList(CommentVO vo); // 모든 댓글 조회
    int commentRegister(CommentVO vo);           // 댓글 작성
    void commentUpdate(CommentVO vo);            // 댓글 수정
    void commentDelete(int commentNo);           // 댓글 삭제
}
