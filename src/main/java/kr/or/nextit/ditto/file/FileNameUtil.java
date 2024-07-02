package kr.or.nextit.ditto.file;


import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class FileNameUtil {
    // 파일 이름에 한글 등 UTF-8 인코딩
    public static String encodeFileName(String fileName){
        try{
            return URLEncoder.encode(fileName, StandardCharsets.UTF_8.toString());
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }
}
