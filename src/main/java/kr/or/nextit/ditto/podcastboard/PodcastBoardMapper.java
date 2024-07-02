package kr.or.nextit.ditto.podcastboard;

import kr.or.nextit.ditto.common.SearchVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PodcastBoardMapper {
    List<PodcastBoardVO> getBoardList(SearchVO vo);                                    // 모든 게시글 조회
    int getBoardListCount(SearchVO vo);                                    // 모든 게시글 개수 조회
    List<PodcastBoardVO> searchBoardListByTitle(@Param("keyword") String keyword);     // 제목으로 게시글 검색
    List<PodcastBoardVO> searchBoardListByMemberId(@Param("keyword") String keyword);  // 작성자로 게시글 검색
    PodcastBoardVO getBoardDetail(int podcastBoardNo);                                    // 게시글 상세보기
    void incrementHits(int podcastBoardNo);                                            // 게시글 조회수
    int addBoard(PodcastBoardVO post);     // 게시글 쓰기
    void updatePost(PodcastBoardVO vo);    // 게시글 수정
    void deletePost(int podcastBoardNo);   // 게시글 삭제
    List<PodcastBoardVO> adminPodcastList(); // 어드민 페이지 팟캐스트 리스트 조회
    void adminPodcastStatusUpdate(PodcastBoardVO vo); // 관리자 페이지 팟캐스트 게시글 상태 변경
    List<PodcastBoardVO> adminPodcastListOrderBy(PodcastBoardVO vo); // 관리자 페이지 팟캐스트 총시간 많은순 정렬

}