package kr.or.nextit.ditto.book;

import kr.or.nextit.ditto.common.SearchVO;
import kr.or.nextit.ditto.member.MemberVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    private final BookService service;

    @GetMapping("/book/list")
    public HashMap<String, Object> selectBooks(SearchVO vo, @RequestParam(value = "currentPageNo", defaultValue = "1") int currentPageNo) {
        int totalCount = service.getBookListCount(vo);
        List<BookVO> list = service.selectBooks(vo);
        list.stream().forEach(o-> System.out.println(o.getBookName()));
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("list", list);
        map.put("vo", vo);
        map.put("totalCount", totalCount);
        return map;
    }

    @GetMapping("/book/view")
    public BookVO getBook(@RequestParam(value = "bookNo") String bookNoParams)
    {
        int bookNo = Integer.parseInt(bookNoParams);
        return service.getBook(bookNo);
    }


}