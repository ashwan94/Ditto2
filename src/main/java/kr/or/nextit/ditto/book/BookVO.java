package kr.or.nextit.ditto.book;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookVO {
    private int bookNo;
    private String bookName;
    private String bookCompany;
    private String bookIntro;
    private String bookRent;
    private String bookAuthor;
    private String bookRelease;
    private String bookImage;

}
