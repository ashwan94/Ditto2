package kr.or.nextit.ditto.podcastboard;

import kr.or.nextit.ditto.common.SearchVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class PodcastBoardService {
    private final PodcastBoardMapper mapper;

    // 모든 게시글 조회
    public List<PodcastBoardVO> getBoardList(SearchVO vo){
        return mapper.getBoardList(vo);
    }

    // 모든 게시글 개수 조회
    public int getBoardListCount(SearchVO vo){
        return mapper.getBoardListCount(vo);
    }

    // 제목으로 검색
    public List<PodcastBoardVO> searchBoardListByTitle(@Param("keyword") String keyword){
        return mapper.searchBoardListByTitle(keyword);
    }

    // 작성자 이름으로 검색
    public List<PodcastBoardVO> searchBoardListByMemberId(@Param("keyword") String keyword){
        return mapper.searchBoardListByMemberId(keyword);
    }

    // 게시글 작성
    public int addBoard(PodcastBoardVO post) {
        return mapper.addBoard(post);
    }

    // 상세 게시글 정보
    public PodcastBoardVO getBoardDetail(int podcastBoardNo) {
        return mapper.getBoardDetail(podcastBoardNo);
    }

    // 조회수
    public void incrementHits(int podcastBoardNo) {
        mapper.incrementHits(podcastBoardNo);
    }

    // 게시글 수정
    public void updatePost(PodcastBoardVO vo){
        mapper.updatePost(vo);
    }

    // 게시글 삭제
    public void deletePost(int podcastBoardNo){
        mapper.deletePost(podcastBoardNo);
    }

    // 어드민 페이지 팟캐스트 리스트 조회
    public List<PodcastBoardVO> adminPodcastList(){
        return mapper.adminPodcastList();
    }

    // 관리자 페이지 팟캐스트 게시글 상태변경
    public void adminPodcastStatusUpdate(PodcastBoardVO vo){
        if (Objects.equals(vo.getStatus(),"Y")){
            vo.setStatus("N");
        }else {
            vo.setStatus("Y");
        }
        mapper.adminPodcastStatusUpdate(vo);
    }
    // 관리자 페이지 팟캐스트 총시간 많은순 정렬
    public List<PodcastBoardVO> adminPodcastListOrderBy(PodcastBoardVO vo){
        return mapper.adminPodcastListOrderBy(vo);
    }
}
