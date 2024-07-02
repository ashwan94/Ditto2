package kr.or.nextit.ditto.file;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/upload")
@CrossOrigin(origins = ("http://localhost:3000"))
public class FileController {
    private final FileService service;
    private static final String UPLOAD_DIR = "src/main/frontend/public/"; // 파일 저장 경로

    // 전체 파일 조회
    @GetMapping("/image/select")
    public List<FileVO> selectFiles(){
        return service.selectFiles();
    }

    // 파일 저장
    @PostMapping("/image/register")
    public ResponseEntity<?> registerFile(@RequestParam("image") MultipartFile file, @RequestParam("boardType") String boardType) {
        log.info("게시판 종류 : {}", boardType);

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("파일 내용이 없습니다.");
        }

        try {
            Path uploadPath = Paths.get(UPLOAD_DIR + boardType);    // React 의 public/freeBoard 로 경로 지정

            // 해당 경로에 폴더가 존재하지 않으면 생성
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Local PC 에 파일 저장할 때 중복 이름 에러 방지를 위해 UUID 로 변환
            // 한글 깨짐 방지를 위해 UTF-8 형식으로 인코딩
            // 파일 이름에 공백 포함 시 제거
            String fileName = new String(StringUtils.cleanPath(file.getOriginalFilename()).replaceAll(" ", "").getBytes("8859_1"), "UTF-8");
            String ext = fileName.substring(fileName.lastIndexOf(".")); // 확장자명 추출
            String uuidFileName = getUuid() + ext;

            // Local PC 에 파일 정보 복사해 실제 파일로 저장
            Path filePath = uploadPath.resolve(uuidFileName);
            Files.copy(file.getInputStream(), filePath);

            // 파일 정보 확인
            log.info("File name : {}", uuidFileName);                        // UUID 로 변환된 파일 이름
            log.info("File original name : {}", file.getOriginalFilename()); // 원본 파일명
            log.info("File path : {}", uploadPath);                          // 파일 저장 경로(Server에 저장됨)
            log.info("File size : {}", file.getSize() + " bytes");           // 파일 크기
            log.info("File type : {}", file.getContentType());               // 파일 확장자명

            // DB 에 파일 정보 저장
            // fileNo, createData 는 default 이므로 VO 에서 아래 전용 생성자를 따로 만들어줌
            service.registerFile(new FileVO(
                    uuidFileName,
                    file.getOriginalFilename(),
                    uploadPath.toString(),
                    file.getSize(),
                    file.getContentType()
            ));

            // Front(React) 에서 파일 미리보기를 위해 URL 형식으로 경로 지정
            String imageUrl = "/" + boardType + "/" + uuidFileName;

            // axios post 에 대한 response 로 image URL 반환
            return ResponseEntity.ok().body(new ImageUploadResponse(imageUrl));

        } catch (IOException e) {
            e.printStackTrace();
            log.info("파일 저장에 실패했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미 동일한 파일이 존재합니다");
        }
    }

    // UUID 생성
    public static String getUuid(){
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    // 이미지 파일에 대한 URL 생성
    public static class ImageUploadResponse{
        private String imageUrl;

        public ImageUploadResponse(String imageUrl){
            this.imageUrl = imageUrl;
        }

        public String getImageUrl(){
            return imageUrl;
        }

        public void setImageUrl(String imageUrl){
            this.imageUrl = imageUrl;
        }
    }
}