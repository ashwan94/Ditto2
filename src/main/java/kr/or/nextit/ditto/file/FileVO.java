package kr.or.nextit.ditto.file;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;

@Data
public class FileVO {
    private int fileNo;
    private String fileName;
    private String fileOriginalname;
    private String filePath;
    private long fileSize;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDate;
    private String fileType;

    public FileVO(String fileName, String fileOriginalname, String filePath, long fileSize, String fileType) {
        this.fileName = fileName;
        this.fileOriginalname = fileOriginalname;
        this.filePath = filePath;
        this.fileSize = fileSize;
        this.fileType = fileType;
    }
}
