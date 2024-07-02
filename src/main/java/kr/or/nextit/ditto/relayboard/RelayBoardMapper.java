package kr.or.nextit.ditto.relayboard;

import kr.or.nextit.ditto.common.SearchVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RelayBoardMapper {
    List<RelayBoardVO> getBoardList();   // 모든 게시글 조회
    int addBoard(RelayBoardVO post);     // 게시글 쓰기
    void deletePost(int relayBoardNo);   // 게시글 삭제
}