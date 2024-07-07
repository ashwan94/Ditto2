package kr.or.nextit.ditto.podcastboard;

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
@RequestMapping("/podcastBoard")
public class PodcastBoardController {

    private final PodcastBoardService podcastBoardService;

    // 전체 게시글 조회 + 개수 조회
    @GetMapping("/list")
    public HashMap<String, Object> getBoardList(SearchVO vo) {
        List<PodcastBoardVO> boardList = podcastBoardService.getBoardList(vo);
        int boardListCount = podcastBoardService.getBoardListCount(vo);
        HashMap<String, Object> map = new HashMap<>();
        map.put("boardList", boardList);
        map.put("boardListCount", boardListCount);
        return map;
    }

    // TODO
    // 검색 기능에 관련된 query 문 수정 => 게시판 작업하면서 고장난듯 | 06.27(목) | 안승환
    // 게시글 검색
    @GetMapping("/search")
    public List<PodcastBoardVO> searchBoardList(String keyword, String type) {
        List<PodcastBoardVO> vo;
        if ("글쓴이".equals(type)){
            vo = podcastBoardService.searchBoardListByMemberId(keyword); // 제목 기준 검색
        }else{
            vo = podcastBoardService.searchBoardListByTitle(keyword); // 검색어 기준 검색
        }
        return vo;
    }

    // TODO
    // 1. 자유게시판 조회수, 게시글 작성에 대해 Controller 에서 param, Mapping 정보를 변경하였으므로 수정 필요
    // 2. 조회수 중복 증가 방지 처리

    // 조회수 증가 + 게시글 상세조회
    @GetMapping("/view")
    public PodcastBoardVO getBoardDetail(@RequestParam int podcastBoardNo) {
        podcastBoardService.incrementHits(podcastBoardNo);
        return podcastBoardService.getBoardDetail(podcastBoardNo);
    }

    // 게시글 작성
    @PostMapping("/register")
    public ResponseEntity<?> addBoard(@RequestBody PodcastBoardVO post) {
        podcastBoardService.addBoard(post); // useGeneratedKeys 속성을 이용해 post.getPodcastBoardNo 가
        // 방금 insert 된 data 의 podcastBoardNo 로 변경됨 => 따로 변수에 담지 않아도 됨!
        return ResponseEntity.ok(post.getPodcastBoardNo());
    }

    @PostMapping("/update")
    public void updatePost(@RequestBody PodcastBoardVO vo) {
        podcastBoardService.updatePost(vo);
    }

    // 게시글 삭제
    @GetMapping("/delete")
    public void deletePost(@RequestParam int podcastBoardNo) {
        podcastBoardService.deletePost(podcastBoardNo);
    }


    // 관리자 페이지 팟캐스트 리스트 조회
    @PostMapping("/adminPodcast")
    public List<PodcastBoardVO> adminPodcastList(){
        return podcastBoardService.adminPodcastList();
    }

    // 관리자 페이지 팟캐스트 게시글 상태 변경
    @PostMapping("/updatePodcastStatus")
    public void adminPodcastStatusUpdate(@RequestBody PodcastBoardVO vo){
        podcastBoardService.adminPodcastStatusUpdate(vo);
    }

    // 관리자 페이지 팟캐스트 총시간 많은 순서로 정렬
    @PostMapping("/adminPodcastOrderBy")
    public List<PodcastBoardVO> adminPodcastListOrderBy(@RequestBody PodcastBoardVO vo){
        return podcastBoardService.adminPodcastListOrderBy(vo);
    }


}
