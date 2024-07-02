package kr.or.nextit.ditto.member;


import kr.or.nextit.ditto.file.FileController;
import kr.or.nextit.ditto.common.SearchVO;
import kr.or.nextit.ditto.freeboard.FreeBoardVO;
import kr.or.nextit.ditto.rent.RentVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.lang.reflect.Member;
import java.util.*;

import static kr.or.nextit.ditto.file.FileController.getUuid;

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private final MemberService service;
    private DefaultMessageService messageService;
    private String UPLOAD_DIR = "src/main/frontend/public/images/"; // 프로필 이미지 저장 경로
    Path uploadPath =  Paths.get(UPLOAD_DIR + "profile"); // public 의 profile 을 실제 파일 경로로 지정

    // 로그인
    @PostMapping("/SignIn")
    public MemberVO findMember(MemberVO memberVO) {
        // DB 회원과 비교
        MemberVO member = service.findMember(memberVO);
        return member;
    }

    // 마이페이지 회원정보 조회
    @PostMapping("/searchMemberInfo")
    public MemberVO searchMemberInfo(@RequestBody Map<String, String> payload){
        String memberId = payload.get("memberId");
        MemberVO member = service.searchMemberInfo(memberId);
        return member;
    }

    // 마이페이지 비밀번호 수정
    @PostMapping("/passwordChange")
    public void passwordChange(@RequestBody MemberVO post){
        service.passwordChange(post); // 기존 비밀번호 수정
    }

    // 마이페이지 닉네임 중복체크
    @PostMapping("/checkNick")
    public int checkNick(@RequestBody MemberVO memberVO) {
        // 닉네임 중복
        int checkNickname = service.checkNicknameIsDuplicated(memberVO.getMemberNickname());
        // 0 = 사용가능한 아이디나 닉네임
        return checkNickname;
    }

    // 마이페이지 회원정보 수정
    @PutMapping("/changeMemberData")
    public void updateMember(@RequestBody MemberVO post){
        service.updateMemberData(post); // 회원정보 수정버튼 클릭시
    }

    // 마이페이지 프로필 이미지 조회
    @GetMapping("/getProfile")
    public String select(String memberId){
        return service.getProfile(memberId);
    }

    // TODO
    // MEMBER 테이블 변경 | 06.27(목) | 안승환
    // -> FILE 테이블을 사용하도록 하기 위함
    // MEMBER 테이블의 MEMBER_PROFILE 을 FILE_NO 로 변경하고 FILE 테이블의 NO 로 기입하도록 변경
    // 작동 순서
    // 1. 프로필 저장
    // 2. 이미지 정보 분석
    // 3. FILE 테이블에 2번 정보 저장(파일명, 파일 사이즈, 파일 경로 등) + useGeneratedKeys
    // 4. MEMBER 의 FILE_NO 에 3번을 저장
    // 5. 4번을 SELECT 로 프로필 이미지 정보 가져오기

    // 마이페이지 프로필 이미지 변경
    @PostMapping("/changeMemberProfile")
    public ResponseEntity<?> updateProfile(MultipartFile profile, String memberId) throws IOException {

        // 해당 경로에 폴더가 존재하지 않으면 생성
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = new String(StringUtils.cleanPath(profile.getOriginalFilename()).replaceAll(" ", "").getBytes("8859_1"), "UTF-8");
        String ext = fileName.substring(fileName.lastIndexOf(".")); // 확장자명 추출
        String uuidFileName = getUuid() + ext;

        // Local PC 에 파일 정보 복사해 실제 파일로 저장
        Path filePath = uploadPath.resolve(uuidFileName);
        Files.copy(profile.getInputStream(), filePath);

        // Front(React) 에서 파일 미리보기를 위해 URL 형식으로 경로 지정
        String imageUrl = "/images/profile/" + uuidFileName;

        // DB MEMBER 테이블의 PROFILE 내용 UPDATE
        service.registerProfile(imageUrl, memberId);

        return ResponseEntity.ok().body(new FileController.ImageUploadResponse(imageUrl));
    }

    // 회원가입
    @PostMapping("/register")
    public void SignUp(MemberVO memberVO) {
        int result = service.signUp(memberVO);
    }

    // 아이디 중복체크
    @PostMapping("/checkId")
    public int checkId(@RequestBody MemberVO memberVO) {
        // 아이디 중복
        int checkId = service.checkIdIsDuplicated(memberVO.getMemberId());
        return checkId;
    }

    // 닉네임 중복체크
    @PostMapping("/checkNickname")
    public int checkNickname(MemberVO memberVO) {
        // 닉네임 중복
        int checkNickname = service.checkNicknameIsDuplicated(memberVO.getMemberNickname());
        // 0 = 사용가능한 아이디나 닉네임

        return checkNickname;
    }

    /**
     * 단일 메시지 발송 예제 - 공식 홈페이지
     */
    @PostMapping("/sendOne")
    public String sendOne(String memberTel) {
        Message message = new Message();
        this.messageService = NurigoApp.INSTANCE.initialize("NCSFSLKFU5JQF16Z", "4L0VM1ASNF9CSLSZDMWLNQLDZXSGYG7B", "https://api.coolsms.co.kr");
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.

        // verificationCode => 인증번호 5자리
        String verificationCode = String.valueOf((int)(Math.random() * (99999 - 10000 + 1)) + 10000);
        message.setFrom("01047959464");
        message.setTo(memberTel);
        message.setText("[한석줍쇼 인증코드]" + verificationCode);

        System.out.println(message);
        messageService.sendOne(new SingleMessageSendingRequest(message));

        return verificationCode;
    }

    // 관리자 회원 정보 리스트
    @PostMapping("/adminMemberList")
    public List<MemberVO> getMemberList(MemberVO vo){
        return service.getMemberList(vo);
    }

    // 관리자 페이지 회원 비활성화
    @PostMapping("/memberDeleteY")
    public void adminMemberDeleteY(@RequestBody MemberVO memberId){
        service.adminPageMemberDeleteY(memberId);
    }

    // 회원 멤버십 구독 가입
    @PostMapping("/updateMemberSubscribe")
    public void updateMemberSubscribe(String memberId) {
        // 쿼리 실행
        service.updateMemberSubscribe(memberId);
    }
    // 관리자 페이지 회원 활성화
    @PostMapping("/memberDeleteN")
    public void adminMemberDeleteN(@RequestBody MemberVO memberId){
        service.adminPageMemberDeleteN(memberId);
    }

    // 관리자 페이지 멤버십 상태변경
    @PostMapping("/memberSubStatus")
    public void adminMemberSubStatus(@RequestBody MemberVO memberVO){
        service.adminMemberSubStatus(memberVO);
    }

    // 관리자 페이지 도서대여이력에서 아이디 클릭시 해당 아이디 회원정보로 이동
    @PostMapping("/idClickSearch")
    public List<MemberVO> adminIdClick(@RequestBody MemberVO memberId){
        return service.adminPageMemberClickListSearch(memberId);
    }

    // 회원정보 타입 검색
    @PostMapping("/adminMemberListSearch")
    public List<MemberVO> adminPageSearchMemberId(@RequestBody SearchVO searchVO){
        List<MemberVO> vo = new ArrayList<MemberVO>();
        String searchType = searchVO.getSearchType();
        String searchWord = searchVO.getSearchWord();
        if ("아이디".equals(searchType)){
            vo = service.adminPageSearchMemberIdData(searchWord); // 아이디 기준 검색
        }
        return vo;
    }
    @PostMapping("/deleteMember")
    public void deleteMember(String memberId) {
        service.deleteMember(memberId);
    }

    // 멤버십 클릭시 O X정렬 회원조회
    @PostMapping("/memberSubChangeOX")
    public List<MemberVO> adminPageMemberSubChangeOX(@RequestBody MemberVO memberVO){
        return service.adminPageMemberSubChangeOX(memberVO);
    }


    // 화원상태 변경 클릭시 활성화, 정지 정렬 회원 조회
    @PostMapping("/memberStatusChangeOX")
    public List<MemberVO> adminPageMemberDeleteChangeOX(@RequestBody MemberVO memberVO){
        return service.adminPageMemberDeleteChangeOX(memberVO);
    }

    // 회원 멤버십 구독 여부 판독
    @PostMapping("/searchMembership")
    public MemberVO searchMembership(String memberId){
        MemberVO member =service.searchMemberInfo(memberId);
        return member;
    }

}
