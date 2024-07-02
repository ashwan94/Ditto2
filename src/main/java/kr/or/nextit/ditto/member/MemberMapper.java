package kr.or.nextit.ditto.member;

import kr.or.nextit.ditto.common.SearchVO;
import kr.or.nextit.ditto.freeboard.FreeBoardVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.lang.reflect.Member;
import java.util.List;

@Mapper
public interface MemberMapper {
    MemberVO findMember(MemberVO memberVO);
    int checkIdIsDuplicated(String memberId);
    int checkNicknameIsDuplicated(String memberNickname);
    int signup(MemberVO memberVO);
    void registerProfile(String imageUrl, String memberId);  // 프로필 이미지 등록
    String getProfile(String memberId);
    MemberVO searchMemberInfo(String memberId);
    void passwordChange(MemberVO post); // 마이페이지 비밀번호 수정
    void updateMemberData(MemberVO post); // 마이페이지 회원정보 수정
    // 회원 멤버십 구독 가입
    void updateMemberSubscribe(String memberId);
    List<MemberVO> getMemberList(MemberVO vo); // 관리자 페이지 회원조회
    void adminPageMemberDeleteY(MemberVO memberId); // 관리자 페이지 회원 비활성화

    void adminPageMemberDeleteN(MemberVO memberId); // 관리자 페이지 회원 활성화
    void adminMemberSubStatus(MemberVO memberVO); // 관리자 페이지 멤버십 상태변경

    // 회원 탈퇴
    void deleteMember(String memberId);
    List<MemberVO> adminPageMemberClickListSearch(MemberVO memberId); // 도서대여 이력에서 회원 아이디클릭시 해당 회원정보조회
    List<MemberVO> adminPageSearchMemberIdData(String searchWord); // 멤버아이디 타입 키워드로 검색

    List<MemberVO> adminPageMemberSubChangeOX(MemberVO memberVO); // 관리자페이지 멤버십 OX 정렬 조회
    List<MemberVO> adminPageMemberDeleteChangeOX(MemberVO memberVO); // 관리자페이지 회원상태 활성화, 정지 정렬 조회
}
