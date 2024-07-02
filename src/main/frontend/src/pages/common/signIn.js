import {Link, useNavigate, useRoutes} from "react-router-dom";
import axios, {post} from "axios";
import {useEffect, useState} from "react";

export default function SignIn() {

    const [memberId, setMemberId] = useState("") // 회원 아이디
    const [memberPw, setMemberPw] = useState("") // 회원 비밀번호
    const [loginStatus, setLoginStatus] = useState(false); // 로그인 상태

    // 아이디 체인지 핸들러
    const memberIdOnChangeHandler = (e) => {
        setMemberId(e.target.value);
    }

    // 비밀번호 체인지 핸들러
    const memberPwOnChangeHandler = (e) => {
        setMemberPw(e.target.value);
    }
    const [failMessage, setFailMessage] = useState("")

    // 로그인 함수
    const login = async () => {
        try {
            const res = await axios.post("/SignIn", null, {
                // 파라미터로 memberId, memberPw를 파라미터로 넘기기
                params: {
                    memberId: memberId,
                    memberPw: memberPw
                }
            });
            if (!res.data) {
                // 로그인 실패
                // 경고 메세지 출력 X
                setFailMessage("존재하지 않거나 아이디 혹은 비밀번호가 틀렸습니다.")

            } else {
                // 로그인 성공한 경우 session에 담고
                // 로그인 성공 시 메인 페이지로 이동
                const memberNo = res.data.memberNo; // 회원 번호
                const memberId = res.data.memberId; // 회원 아이디
                const memberNickname = res.data.memberNickname; // 회원 닉네임
                const memberAdmin = res.data.memberAdmin; // 회원 관리자 권한 확인 (member,admin)
                const memberSub = res.data.memberSub; // 회원 멤버십 구독 여부
                const memberProfile = res.data.memberProfile; // 회원 프로필 이미지

                // 조회된 정보들 세션에 저장
                sessionStorage.setItem("member", JSON.stringify
                ({
                    memberNo: memberNo, memberId: memberId, memberNickname: memberNickname,
                    memberAdmin: memberAdmin, memberSub: memberSub, memberProfile:memberProfile
                }))

                // 회원 정보 저장 후 메인 페이지로 화면 이동
                window.location.href="/"
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    
    return (
        <main className="rundry">
            <section className="i pg fh rm ki xn vq gj qp gr hj rp hr">
                <img src="images/shape-06.svg" alt="Shape" className="h j k"/>
                <img src="images/shape-03.svg" alt="Shape" className="h l m"/>
                <img src="images/shape-17.svg" alt="Shape" className="h n o"/>
                <img src="images/shape-18.svg" alt="Shape" className="h p q"/>

                <div className="animate_top bb af i va sg hh sm vk xm yi _n jp hi ao kp">
                    <span className="rc h r s zd/2 od zg gh"></span>
                    <span className="rc h r q zd/2 od xg mh"></span>

                    <div className="wb">
                        <label className="rc kk wm vb" htmlFor="memberId">
                            아이디
                        </label>
                        <input
                            type="text"
                            name="memberId"
                            id="memberId"
                            className="vd hh rg zk _g ch hm dm fm pl/50 xi mi sm xm pm dn/40"
                            onChange={memberIdOnChangeHandler}
                        />
                    </div>

                    <div className="wb">
                        <label className="rc kk wm vb" htmlFor="memberPw">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            name="memberPw"
                            id="memberPw"
                            className="vd hh rg zk _g ch hm dm fm pl/50 xi mi sm xm pm dn/40"
                            onChange={memberPwOnChangeHandler}
                        />
                    </div>

                    <div id="failMessage" style={{color: "red"}}>
                        {failMessage}
                    </div>

                    <button className="vd rj ek rc rg gh lk ml il _l gi hi" onClick={login}>
                        로그인
                    </button>

                    <div className="text-center mt-10 text-black font-extrabold">
                        아직 계정이 없으신가요?
                        <Link to="/SignUp" className="sj hk xj rj ob "
                              style={{color: "blue", borderBottom: "1px solid blue"}}> <span
                            className="rundry">회원가입</span></Link>
                    </div>

                </div>
            </section>
        </main>
    );
}
