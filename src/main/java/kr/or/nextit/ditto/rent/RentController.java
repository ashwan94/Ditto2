package kr.or.nextit.ditto.rent;

import kr.or.nextit.ditto.common.SearchVO;
import kr.or.nextit.ditto.member.MemberVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.javassist.bytecode.analysis.Type;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class RentController {

    private final RentService service;

    // 도서 대여 insert
    @PostMapping("/book/rent")
    public void bookRent (RentVO rentVO){
        service.bookRent(rentVO);
    }

    // 도서 대여 상태 업데이트 n -> y
    @PostMapping("/book/status")
    public void updateBookStatus (int bookNo){
        service.updateBookStatus(bookNo);
    }


    // 연체날수 확인
    @PostMapping("/book/checkOverdueDays")
    public int checkOverdueDays (int memberNo){
        // 연체날수 리턴 3일 연체면 3 리턴
       return service.checkOverdueDays(memberNo);
    }

    // 도서 대여 권수 확인
    @PostMapping("/book/checkRentCount")
    public int checkRentCount (int memberNo){
        return service.checkRentCount(memberNo);
    }

    // 로그인 회원 도서 대여 이력 리스트
    @PostMapping("/showBookRentalList")
    public List<RentVO> bookList(@RequestBody RentVO memberId){
        return service.showBookList(memberId);// 로그인 회원의 도서 대여 이력 리스트 출력
    }

    // 로그인회원의 도서 반납
    @PostMapping("/rentReturn")
    public void rentReturn(@RequestBody RentVO rentNo){
        service.rentReturn(rentNo); // 연체여부, 실제반납일 수정
        service.rentBookReturn(rentNo); // 책 대출가능여부 활성화 대출가능하게
    }

    // 관리자 페이지 도서 대여 이력
    @GetMapping("/adminBookRentList")
    public List<RentVO> adminBookRentList(){
        return service.adminPageBookRentList();
    }

    // 관리자 페이지 도서 대여 이력 검색
    @PostMapping("/adminBookListSearch")
    public List<RentVO> adminBookSearchPageId(@RequestBody SearchVO searchVO){
        List<RentVO> vo = new ArrayList<RentVO>();
        String searchType = searchVO.getSearchType();
        String searchWord = searchVO.getSearchWord();
        if("아이디".equals(searchType)){
            vo = service.adminBookSearchPageId(searchWord); // 아이디 기준 검색
        }else if ("도서명".equals(searchType)){
            vo = service.adminBookSearchPageBook(searchWord);
        }else if ("대여일".equals(searchType)){
            vo = service.adminBookSearchPageRentStart(searchWord);
        }else if ("반납예정일".equals(searchType)){
            vo = service.adminBookSearchPageRentEnd(searchWord);
        }else if ("실제반납일".equals(searchType)){
            vo = service.adminBookSearchPageRentReturn(searchWord);
        }
        return vo;
    }

    // 관리자 페이지 도서대여이력 연체여부
    @PostMapping("/rentDelaySearch")
    public List<RentVO> rentDelaySearch(){
        return service.rentDelaySearch();
    }
}
