package kr.or.nextit.ditto.book;

import kr.or.nextit.ditto.common.SearchVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookMapper mapper;

    @Autowired
    public BookService(BookMapper mapper) {
        this.mapper = mapper;
    }

    public int getBookListCount(SearchVO vo) {

        return mapper.getBookListCount(vo);
    }

    public List<BookVO> selectBooks(SearchVO vo){
        return mapper.selectBooks(vo);
    }

    public BookVO getBook(int bookNo) {
        return mapper.getBook(bookNo);
    }

}
