package kr.or.nextit.ditto.freeboard;

import kr.or.nextit.ditto.common.SearchVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FreeBoardMapper {
    List<FreeBoardVO> getBoardList(SearchVO vo);                                    // 모든 게시글 조회
    int getBoardListCount(SearchVO vo);                                    // 모든 게시글 개수 조회
    FreeBoardVO getBoardDetail(int freeBoardNo);                                    // 게시글 상세보기
    void incrementHits(int freeBoardNo);                                            // 게시글 조회수
    int addBoard(FreeBoardVO post);     // 게시글 쓰기
    void updatePost(FreeBoardVO vo);    // 게시글 수정
    void deletePost(int freeBoardNo);   // 게시글 삭제

    void adminfreeBoardStatusY(FreeBoardVO freeBoardNo); // Y인 게시글 비활성화 진행
    void adminfreeBoardStatusN(FreeBoardVO freeBoardNo); // N인 게시글 활성화 진행

}