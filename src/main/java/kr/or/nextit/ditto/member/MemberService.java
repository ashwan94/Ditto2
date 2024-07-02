package kr.or.nextit.ditto.member;


import kr.or.nextit.ditto.common.SearchVO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import java.lang.reflect.Member;
import java.util.List;
import java.util.Objects;


@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberMapper mapper;

    public MemberVO findMember(MemberVO memberVO) {
        return mapper.findMember(memberVO);
    }

    public int checkIdIsDuplicated(String memberId) {
        return mapper.checkIdIsDuplicated(memberId);
    }

    public int checkNicknameIsDuplicated(String memberNickname) {
        return mapper.checkNicknameIsDuplicated(memberNickname);
    }

    public int signUp(MemberVO memberVO) {
        return mapper.signup(memberVO);
    }
    public String getProfile(String memberId){return mapper.getProfile(memberId);} // 프로필 이미지 조회
    public void registerProfile(String imageUrl, String memberId) {mapper.registerProfile(imageUrl, memberId);} // 프로필 이미지 등록
    public MemberVO searchMemberInfo(String memberId) {
        return mapper.searchMemberInfo(memberId);
    }
    public void passwordChange(MemberVO post){
        mapper.passwordChange(post); // 마이페이지 비밀번호 수정
    }
    public void updateMemberData(MemberVO post){
        mapper.updateMemberData(post); // 마이페이지 회원정보 수정
    }

    // 관리자 페이지 회원 정보 리스트
    public List<MemberVO> getMemberList(MemberVO vo){
        return mapper.getMemberList(vo);
    }

    public void adminPageMemberDeleteY(MemberVO memberId){
        mapper.adminPageMemberDeleteY(memberId); // 관리자 페이지 회원 비활성화
    }
    public void adminPageMemberDeleteN(MemberVO memberId){
        mapper.adminPageMemberDeleteN(memberId); // 관리자 페이지 회원 활성화
    }

    public void adminMemberSubStatus(MemberVO memberVO){// 관리자 페이지 멤버십 상태변경
        if (Objects.equals(memberVO.getMemberSub(), "Y")) {
            memberVO.setMemberSub("N");
        } else {
            memberVO.setMemberSub("Y");
        }
        mapper.adminMemberSubStatus(memberVO);
    }

    public List<MemberVO> adminPageMemberClickListSearch (MemberVO memberId){
        return mapper.adminPageMemberClickListSearch(memberId); // 도서 대여 이력 아이디 클릭시 해당 회원정보 조회
    }

    public List<MemberVO> adminPageSearchMemberIdData(String searchWord){
        return mapper.adminPageSearchMemberIdData(searchWord); // 관리자 페이지 멤버아이디로 조회
    }

    public List<MemberVO> adminPageMemberSubChangeOX(MemberVO memberVO){ // 관리자 페이지 멤버십 N일때는 Y Y일때는 N 조회
        return mapper.adminPageMemberSubChangeOX(memberVO);
    }

    public List<MemberVO> adminPageMemberDeleteChangeOX(MemberVO memberVO){ // 관리자 페이지 회원상태 활성화,비활성화 정렬 조회
        return mapper.adminPageMemberDeleteChangeOX(memberVO);
    }



    // 회원 멤버십 구독 가입
    public void updateMemberSubscribe(String memberId) {
        mapper.updateMemberSubscribe(memberId);
    }

    // 회원 탈퇴
    public void deleteMember(String memberId) {
        mapper.deleteMember(memberId);
    }



}