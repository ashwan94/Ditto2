package kr.or.nextit.ditto.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentMapper mapper;

    public List<CommentVO> getCommentList(CommentVO vo){
        return mapper.getCommentList(vo);
    } // 모든 댓글 조회
    public int commentRegister(CommentVO vo){
        return mapper.commentRegister(vo);
    }               // 댓글 작성
    public void commentUpdate(CommentVO vo) { mapper.commentUpdate(vo);}                          // 댓글 수정
    public void commentDelete(int commentNo) {mapper.commentDelete(commentNo);}                   // 댓글 삭제
}
