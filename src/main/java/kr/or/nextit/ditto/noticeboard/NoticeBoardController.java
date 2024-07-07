package kr.or.nextit.ditto.noticeboard;

import kr.or.nextit.ditto.common.SearchVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/noticeBoard")
public class NoticeBoardController {

    private final NoticeBoardService noticeBoardService;

    // 전체 게시글 조회 + 개수 조회
    @GetMapping("/list")
    public HashMap<String, Object> getBoardList(SearchVO vo) {
        List<NoticeBoardVO> boardList = noticeBoardService.getBoardList(vo);
        int boardListCount = noticeBoardService.getBoardListCount(vo);
        HashMap<String, Object> map = new HashMap<>();
        map.put("boardList", boardList);
        map.put("boardListCount", boardListCount);
        return map;
    }

    // TODO
    // 검색 기능에 관련된 query 문 수정 => 게시판 작업하면서 고장난듯 | 06.27(목) | 안승환
    // 게시글 검색
    @GetMapping("/search")
    public List<NoticeBoardVO> searchBoardList(String keyword, String type) {
        List<NoticeBoardVO> vo;
        if ("글쓴이".equals(type)){
            vo = noticeBoardService.searchBoardListByMemberId(keyword); // 제목 기준 검색
        }else{
            vo = noticeBoardService.searchBoardListByTitle(keyword); // 검색어 기준 검색
        }
        return vo;
    }

    // TODO
    // 1. 자유게시판 조회수, 게시글 작성에 대해 Controller 에서 param, Mapping 정보를 변경하였으므로 수정 필요
    // 2. 조회수 중복 증가 방지 처리

    // 조회수 증가 + 게시글 상세조회
    @GetMapping("/view")
    public NoticeBoardVO getBoardDetail(@RequestParam int noticeBoardNo) {
        noticeBoardService.incrementHits(noticeBoardNo);
        return noticeBoardService.getBoardDetail(noticeBoardNo);
    }

    // 게시글 작성
    @PostMapping("/register")
    public ResponseEntity<?> addBoard(@RequestBody NoticeBoardVO post) {
        noticeBoardService.addBoard(post); // useGeneratedKeys 속성을 이용해 post.getFreeBoardNo 가
        // 방금 insert 된 data 의 noticeBoardNo 로 변경됨 => 따로 변수에 담지 않아도 됨!
        return ResponseEntity.ok(post.getNoticeBoardNo());
    }

    @PostMapping("/update")
    public void updatePost(@RequestBody NoticeBoardVO vo) {
        noticeBoardService.updatePost(vo);
    }

    // 게시글 삭제
    @GetMapping("/delete")
    public void deletePost(@RequestParam int noticeBoardNo) {
        noticeBoardService.deletePost(noticeBoardNo);
    }

    // 공지 등록
    @GetMapping("/announcement")
    public void goAnnouncement(@RequestParam int noticeBoardNo){
        log.info("공지 번호 : {}", noticeBoardNo);
        noticeBoardService.goAnnouncement(noticeBoardNo);
    }
}
