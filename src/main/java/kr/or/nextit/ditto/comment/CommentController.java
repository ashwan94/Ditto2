package kr.or.nextit.ditto.comment;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequestMapping("/comment")
public class CommentController {
    private final CommentService service;

    // 전체 댓글 목록 조회
    @GetMapping("/list")
    public List<CommentVO> getCommentList(CommentVO vo){
        return service.getCommentList(vo);
    }

    // 댓글 입력
    @Transactional
    @PostMapping("/register")
    public int commentRegister(@RequestBody CommentVO vo){
        return service.commentRegister(vo);
    }

    // 댓글 수정
    @PostMapping("/update")
    public void commentUpdate(@RequestBody CommentVO vo){
        service.commentUpdate(vo);
    }

    // 댓글 삭제
    @PostMapping("/delete")
    public void commentDelete(int commentNo){
        service.commentDelete(commentNo);
    }
}



