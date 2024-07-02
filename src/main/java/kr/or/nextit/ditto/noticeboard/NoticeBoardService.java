package kr.or.nextit.ditto.noticeboard;

import kr.or.nextit.ditto.common.SearchVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class NoticeBoardService {
    private final NoticeBoardMapper mapper;

    // 모든 게시글 조회
    public List<NoticeBoardVO> getBoardList(SearchVO vo){
        return mapper.getBoardList(vo);
    }

    // 모든 게시글 개수 조회
    public int getBoardListCount(SearchVO vo){
        return mapper.getBoardListCount(vo);
    }

    // 제목으로 검색
    public List<NoticeBoardVO> searchBoardListByTitle(@Param("keyword") String keyword){
        return mapper.searchBoardListByTitle(keyword);
    }

    // 작성자 이름으로 검색
    public List<NoticeBoardVO> searchBoardListByMemberId(@Param("keyword") String keyword){
        return mapper.searchBoardListByMemberId(keyword);
    }

    // 게시글 작성
    public int addBoard(NoticeBoardVO post) {
        return mapper.addBoard(post);
    }

    // 상세 게시글 정보
    public NoticeBoardVO getBoardDetail(int noticeBoardNo) {
        return mapper.getBoardDetail(noticeBoardNo);
    }

    // 조회수
    public void incrementHits(int noticeBoardNo) {
        mapper.incrementHits(noticeBoardNo);
    }

    // 게시글 수정
    public void updatePost(NoticeBoardVO vo){
        mapper.updatePost(vo);
    }

    // 게시글 삭제
    public void deletePost(int noticeBoardNo){
        mapper.deletePost(noticeBoardNo);
    }

    // 공지 등록
    public void goAnnouncement(int noticeBoardNo){
        mapper.goAnnouncement(noticeBoardNo);
    }
}
