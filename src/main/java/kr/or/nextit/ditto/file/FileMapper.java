package kr.or.nextit.ditto.file;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FileMapper {
    List<FileVO> selectFiles();
    void registerFile(FileVO vo);
}
