package kr.or.nextit.ditto.relayboard;

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
@RequestMapping("/relayBoard")
public class RelayBoardController {

    private final RelayBoardService relayBoardService;

    // 전체 게시글 조회
    @GetMapping("/list")
    public HashMap<String, Object> getBoardList() {
        List<RelayBoardVO> boardList = relayBoardService.getBoardList();
        HashMap<String, Object> map = new HashMap<>();
        map.put("boardList", boardList);
        return map;
    }

    // 게시글 작성
    @PostMapping("/register")
    public ResponseEntity<?> addBoard(RelayBoardVO post) {
        relayBoardService.addBoard(post);
        return ResponseEntity.ok(post.getRelayBoardNo());
    }

    // 게시글 삭제
    @GetMapping("/delete")
    public void deletePost(@RequestParam int relayBoardNo) {
        relayBoardService.deletePost(relayBoardNo);
    }
}
