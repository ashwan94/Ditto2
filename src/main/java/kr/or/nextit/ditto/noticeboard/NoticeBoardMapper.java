package kr.or.nextit.ditto.noticeboard;

import kr.or.nextit.ditto.common.SearchVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NoticeBoardMapper {
    List<NoticeBoardVO> getBoardList(SearchVO vo);                                    // 모든 게시글 조회
    int getBoardListCount(SearchVO vo);                                    // 모든 게시글 개수 조회
    List<NoticeBoardVO> searchBoardListByTitle(@Param("keyword") String keyword);     // 제목으로 게시글 검색
    List<NoticeBoardVO> searchBoardListByMemberId(@Param("keyword") String keyword);  // 작성자로 게시글 검색
    NoticeBoardVO getBoardDetail(int noticeBoardNo);                                    // 게시글 상세보기
    void incrementHits(int noticeBoardNo);                                            // 게시글 조회수
    int addBoard(NoticeBoardVO post);     // 게시글 쓰기
    void updatePost(NoticeBoardVO vo);    // 게시글 수정
    void deletePost(int noticeBoardNo);   // 게시글 삭제
    void goAnnouncement(int noticeBoardNo);   // 공지 등록
}