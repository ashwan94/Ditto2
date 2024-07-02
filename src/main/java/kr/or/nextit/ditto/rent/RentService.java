package kr.or.nextit.ditto.rent;


import kr.or.nextit.ditto.book.BookVO;
import kr.or.nextit.ditto.common.SearchVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Objects;

@Service
public class RentService {
    private final RentMapper mapper;

    @Autowired
    public RentService(RentMapper mapper) {
        this.mapper = mapper;
    }


    // 도서 대여
    public int bookRent(RentVO vo) {
        return mapper.bookRent(vo);
    }

    // 도서 대여 상태 변경
    public void updateBookStatus(int bookNo){
        mapper.updateBookStatus(bookNo);
    }

    // 사용자 연체 확인
    public int checkOverdueDays(int memberNo){
        return mapper.checkOverdueDays(memberNo);
    }

    // 도서 대여 권수 확인
    public int checkRentCount(int memberNo){
        return mapper.checkRentCount(memberNo);
    }

    // 로그인 회원의 대여 도서 리스트 조회
    public List<RentVO> showBookList(RentVO memberId){
        return mapper.showBookList(memberId);
    }

    // 도서 반납 update 두번 나눠서 실행됨
    public void rentReturn(RentVO rentNo){
        mapper.rentReturn(rentNo);
    }
    // 도서 반납 update 두번 나눠서 실행됨
    public void rentBookReturn(RentVO rentNo){
        mapper.rentBookReturn(rentNo);
    }

    // 관리자 페이지 도서 대여 이력
    public List<RentVO> adminPageBookRentList(){
        return mapper.adminPageBookRentList();
    }

    public List<RentVO> adminBookSearchPageId(String searchWord) {
        return mapper.adminBookSearchPageId(searchWord);
    }
    public List<RentVO> adminBookSearchPageBook(String searchWord) {
        return mapper.adminBookSearchPageBook(searchWord);
    }

    public List<RentVO> adminBookSearchPageRentStart(String searchWord) {
        return mapper.adminBookSearchPageRentStart(searchWord);
    }
    public List<RentVO> adminBookSearchPageRentEnd(String searchWord) {
        return mapper.adminBookSearchPageRentEnd(searchWord);
    }
    public List<RentVO> adminBookSearchPageRentReturn(String searchWord) {
        return mapper.adminBookSearchPageRentReturn(searchWord);
    }
    public List<RentVO> rentDelaySearch() {
        return mapper.rentDelaySearch();
    }

}
