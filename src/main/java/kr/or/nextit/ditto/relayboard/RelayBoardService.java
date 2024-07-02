package kr.or.nextit.ditto.relayboard;

import kr.or.nextit.ditto.common.SearchVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class RelayBoardService {
    private final RelayBoardMapper mapper;

    // 모든 게시글 조회
    public List<RelayBoardVO> getBoardList(){
        return mapper.getBoardList();
    }

    // 게시글 작성
    public int addBoard(RelayBoardVO post) {
        return mapper.addBoard(post);
    }

    // 게시글 삭제
    public void deletePost(int relayBoardNo){
        mapper.deletePost(relayBoardNo);
    }
}
