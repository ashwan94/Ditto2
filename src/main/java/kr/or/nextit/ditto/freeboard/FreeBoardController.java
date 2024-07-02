package kr.or.nextit.ditto.freeboard;

import kr.or.nextit.ditto.common.SearchVO;
import kr.or.nextit.ditto.member.MemberVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/freeBoard")
public class FreeBoardController {

    private final FreeBoardService freeBoardService;

    // 전체 게시글 조회 + 개수 조회
    @GetMapping("/list")
    public HashMap<String, Object> getBoardList(SearchVO vo) {
        List<FreeBoardVO> boardList = freeBoardService.getBoardList(vo);
        int boardListCount = freeBoardService.getBoardListCount(vo);
        HashMap<String, Object> map = new HashMap<>();
        map.put("boardList", boardList);
        map.put("boardListCount", boardListCount);
        return map;
    }


    // TODO
    // 1. 자유게시판 조회수, 게시글 작성에 대해 Controller 에서 param, Mapping 정보를 변경하였으므로 수정 필요
    // 2. 조회수 중복 증가 방지 처리

    // 조회수 증가 + 게시글 상세조회
    @GetMapping("/view")
    public FreeBoardVO getBoardDetail(@RequestParam int freeBoardNo) {
        freeBoardService.incrementHits(freeBoardNo);
        return freeBoardService.getBoardDetail(freeBoardNo);
    }

    // 게시글 작성
    @PostMapping("/register")
    public ResponseEntity<?> addBoard(@RequestBody FreeBoardVO post) {
        freeBoardService.addBoard(post); // useGeneratedKeys 속성을 이용해 post.getFreeBoardNo 가
        // 방금 insert 된 data 의 freeBoardNo 로 변경됨 => 따로 변수에 담지 않아도 됨!
        return ResponseEntity.ok(post.getFreeBoardNo());
    }

    // 게시글 수정
    @PostMapping("/update")
    public void updatePost(@RequestBody FreeBoardVO vo) {
        freeBoardService.updatePost(vo);
    }

    // 게시글 삭제
    @GetMapping("/delete")
    public void deletePost(@RequestParam int freeBoardNo) {
        freeBoardService.deletePost(freeBoardNo);
    }

    // Y인 게시글 비활성화 진행
    @PostMapping("/statusY")
    public void adminfreeBoardStatusY(@RequestBody FreeBoardVO freeBoardNo){
        freeBoardService.adminfreeBoardStatusY(freeBoardNo);
    }
    // N인 게시글 활성화 진행
    @PostMapping("/statusN")
    public void adminfreeBoardStatusN(@RequestBody FreeBoardVO freeBoardNo){
        freeBoardService.adminfreeBoardStatusN(freeBoardNo);
    }

}
