package kr.or.nextit.ditto.book;

import kr.or.nextit.ditto.common.SearchVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BookMapper {
    // 도서 목록 띄우기
    List<BookVO> selectBooks(SearchVO vo);
    // 도서 목록 개수 - 페이지네이션을 위해
    int getBookListCount(SearchVO vo);
    BookVO getBook(int bookNo);

}
