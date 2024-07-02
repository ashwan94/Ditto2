package kr.or.nextit.ditto.file;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileService {
    private final FileMapper mapper;

    // 파일 조회
    public List<FileVO> selectFiles(){
        return mapper.selectFiles();
    }

    // 파일 저장
    public void registerFile(FileVO vo){
        mapper.registerFile(vo);
    }
}
