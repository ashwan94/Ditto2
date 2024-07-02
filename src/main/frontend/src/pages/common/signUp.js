import {useEffect, useState} from "react";
import axios from "axios";

export default function SignUp() {

    /**
     * 작성자 : 박연지
     * 회원가입 코드
     *
     * */


    /* 사용자에게 입력받을 useState 지정 필드 */
    const [memberId, setMemberId] = useState("") // 회원 아이디
    const [memberName, setMemberName] = useState("") // 회원 이름
    const [memberNickname, setMemberNickname] = useState(""); // 회원 닉네임
    const [memberPw, setMemberPw] = useState(""); // 회원 패스워드
    const [memberConfirmPw, setMemberConfirmPw] = useState(""); // 회원 재확인 패스워드
    const [memberBirth, setMemberBrith] = useState(""); // 회원 생년월일
    const [memberTel, setMemberTel] = useState(""); // 회원 전화번호
    const [memberAdd, setMemberAdd] = useState("") // 회원 도로명 주소
    const [memberPostcode, setMemberPostcode] = useState("") // 회원 우편번호
    const [memberDetailAdd, setMemberDetailAdd] = useState("") // 회원 상세주소
    const [userInputCode, setUserInputCode] = useState(""); // 유저가 입력한 인증번호
    const [verificationCode, setVerificationCode] = useState(0); // 시스템이 지정한 인증번호

    /* 에러 메세지 */
    const [idErrorMessage, setIdErrorMessage] = useState(""); // 아이디 에러 메세지
    const [nameErrorMessage, setNameErrorMessage] = useState(""); // 이름 에러 메세지
    const [nicknameErrorMessage, setNicknameErrorMessage] = useState(""); // 닉네임 에러 메세지
    const [pwErrorMessage, setPwErrorMessage] = useState(""); // 패스워드 에러 메세지
    const [pwConfirmErrorMessage, setPwConfirmErrorMessage] = useState(""); // 재확인 패스워드 에러 메세지
    const [birthErrorMessage, setBirthErrorMessage] = useState(""); // 생년월일 에러 메세지
    const [addressErrorMessage, setAddressErrorMessage] = useState(""); // 주소 에러 메세지
    const [duplicatedId, setDuplicatedId] = useState(true); // 아이디 중복 에러 메세지
    const [duplicatedNickname, setDuplicatedNickname] = useState(true); // 닉네임 중복 에러 메세지
    const [showVerificationInput, setShowVerificationInput] = useState(false); // 인증 입력 필드 표시 상태
    const [checkCode, setCheckCode] = useState(true); // 인증번호 확인용 useState

    // 아이디 핸들러
    const memberIdOnChangeHandler = (e) => {
        setMemberId(e.target.value);
    }
    // 이름 핸들러
    const memberNameOnChangeHandler = (e) => {
        setMemberName(e.target.value);
    }
    // 닉네임 핸들러
    const memberNicknameOnChangeHandler = (e) => {
        setMemberNickname(e.target.value);
    }
    // 비밀번호 핸들러
    const memberPwOnChangeHandler = (e) => {
        setMemberPw(e.target.value);
    }
    // 재확인비밀번호 핸들러
    const memberConfimPwOnChangeHandler = (e) => {
        setMemberConfirmPw(e.target.value);
    }
    // 생년월일 핸들러
    const memberBirthOnChangeHandler = (e) => {
        setMemberBrith(e.target.value);
    }
    // 전화번호 핸들러
    const memberTelOnChangeHandler = (e) => {
        setMemberTel(e.target.value);
    }
    // 우편번호 핸들러
    const memberPostcodeOnChangeHandler = (e) => {
        setMemberAdd(e.target.value);
    }
    // 주소 핸들러
    const memberAddOnChangeHandler = (e) => {
        setMemberPostcode(e.target.value);
    }
    // 상세주소 핸들러
    const memberDetailAddOnChangeHandler = (e) => {
        setMemberDetailAdd(e.target.value);
    }

    // 아이디 중복체크, 아이디 8글자 이상인지 확인하는 이벤트 함수
    const checkMemberIdDuplicate = async () => {
        // 사용자에게 8글자 이상의 아이디 입력받기
        if (memberId.length < 8) {
            setIdErrorMessage("최소 8글자 이상의 아이디로 설정해주세요.");
            return;
        }
        try {
            const res = await axios.post("/checkId", {
                memberId: memberId
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            // 아이디 중복 체크 확인
            if (res.data != 0) {
                // res.data 가 0이 아니면 이미 사용중인 아이디가 있다는 의미
                setDuplicatedId(true);
                setIdErrorMessage("사용중인 아이디입니다.");
            } else {
                setDuplicatedId(false);
                setIdErrorMessage("사용가능한 아이디입니다.");
                const idErrorMessage = document.querySelector("#idErrorMessage")
                idErrorMessage.style.color = "blue";
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // 닉네임 중복 체크 함수
    const checkMemberNicknameDuplicate = async () => {
        if (memberNickname.length < 2) {
            setNicknameErrorMessage("최소 2글자 이상의 닉네임으로 설정해주세요.");
            return;
        } else if (memberNickname == '관리자' || memberNickname == 'admin') {
            setNicknameErrorMessage("사용할 수 없는 키워드가 들어간 닉네임입니다.");
            return;
        }
        try {
            const res = await axios.post("/checkNickname", null, {
                params: {
                    memberNickname: memberNickname
                }
            });
            // 닉네임 중복 체크 확인
            if (res.data != 0) {
                //   중복
                setDuplicatedNickname(true);
                setNicknameErrorMessage("사용중인 닉네임입니다.");


            } else {
                setDuplicatedNickname(false);
                setNicknameErrorMessage("사용가능한 닉네임입니다.")
                const nicknameErrorMessage = document.querySelector("#nicknameErrorMessage");
                nicknameErrorMessage.style.color = "blue";
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // 이름 정규식 (한글 두 글자 이상)
    const koreanRegex = /^[가-힣]{2,}$/;

    // 이름 글자수 제한 함수 이벤트 함수
    const checkSizeMemberName = () => {

        // 이름이 두글자 이하인 경우 경고 메세지 출력
        if (!koreanRegex.test(memberName)) {
            setNameErrorMessage("최소 두 글자 이상의 한글만 입력 가능합니다");

            // 조건에 부합한 경우 에러 메세지 지우기
        } else {
            setNameErrorMessage("");
        }
    };

    // 비밀번호 정규식 (특수문자 1개 포함, 숫자, 문자)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    // 패스워드 정규식 검사 및 에러 메세지 출력 함수
    const checkMemberPw = () => {
        // 비밀번호 정규식 부합하지 않은 경우 에러 메세지 출력
        if (!passwordRegex.test(memberPw) || !memberPw) {
            setPwErrorMessage("최소 특수문자 1개 포함하여 8글자 이상의 비밀번호를 입력해주세요");
            // 오류 메시지 초기화
        } else {
            setPwErrorMessage("");
        }
    }

    // 비밀번호와 재확인 비밀번호의 일치,불일치 에러 메세지 출력 함수
    const checkPasswordConfirm = () => {
        if (memberPw !== memberConfirmPw) {
            setPwConfirmErrorMessage("입력한 비밀번호와 다릅니다.");
        } else {
            if (memberPw == "") {
                setPwConfirmErrorMessage("비밀번호를 입력해주세요.");

            } else if (memberPw != "") {
                setPwConfirmErrorMessage("");
            }
        }
    }


    /* onBlur input 태그들을 검사하는 함수들 */

    // 생년월일 누락 검사 함수 (onBlur input 태그에 커서를 뗐을때 반응하는 이벤트)
    const memberBirthOnBlur = () => {
        if (!memberBirth) {
            setBirthErrorMessage("생년월일을 입력해주세요.");
        } else {
            setBirthErrorMessage("");
        }
    };

    // 주소 누락 검사 함수
    const memberDetailAddOnBlur = () => {
        if (!memberDetailAdd) {
            setAddressErrorMessage("상세주소를 입력해주세요.");
        } else {
            setAddressErrorMessage("");
        }
    };


    /* 주소API 사용하여 우편번호,도로명 주소 자동 완성 */
    /* 다음 주소 API 사용 */
    const handlePostcode = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                if (data.userSelectedType === 'R') {
                    addr = data.roadAddress;
                } else {
                    addr = data.jibunAddress;
                }
                if (data.userSelectedType === 'R') {
                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraAddr += data.bname;
                    }
                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    if (extraAddr !== '') {
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    document.getElementById("sample6_extraAddress").value = extraAddr;
                } else {
                    document.getElementById("sample6_extraAddress").value = '';
                }

                document.getElementById('sample6_postcode').value = data.zonecode;
                document.getElementById("sample6_address").value = addr;
                document.getElementById("sample6_detailAddress").focus();
                setMemberPostcode(data.zonecode);
                setMemberAdd(addr);
            }
        }).open();
    };

    // 인증번호 문자 보내기 함수
    const sendMessage = async () => {
        // MemberController 의 단일 문자 발송으로 쿼리 넘기기
        const res = await axios.post("/sendOne", null, {
                params: {
                    memberTel: memberTel
                }
            }
        )
        setVerificationCode(res.data);
        setShowVerificationInput(true);
    }

    // 유저가 입력한 인증번호 핸들러
    const userInputCodeOnChangeHandler = (e) => {
        setUserInputCode(e.target.value);
    }


    useEffect(() => {
        setUserInputCode(userInputCode);
    }, [userInputCode]);


    useEffect(() => {
        setDuplicatedId(false);
        setDuplicatedNickname(false);
    }, [memberNickname, memberId, memberPw, memberConfirmPw]);

    // 인증 번호 확인 이밴트 함수
    const checkVeridationCode = () => {

        // 유저가 입력한 인증번호와 시스템이 보낸 인증번호가 같은 경우
        if (userInputCode == verificationCode) {
            alert("본인 인증 완료")
            setCheckCode(false);

        } else if (userInputCode != verificationCode) {
            alert("본인 인증 실패")
            setCheckCode(true);
        }
    }


    // 등록버튼 클릭 이벤트
    // 등록 버튼 클릭 시 모든 input 태그 검사 후
    // 경고 메세지 출력 or insert 쿼리 쏘기
    const register = async () => {
        // 에러 메세지 모두 출력
        if (duplicatedId) {
            setIdErrorMessage("아이디 중복체크 해주세요.");
        } else if (memberId === "") {
            setIdErrorMessage("최소 8글자 이상의 아이디로 설정해주세요.");
        }
        if (memberName === "") {
            setNameErrorMessage("이름을 입력해주세요.");
        }
        if (memberNickname === "") {
            setNicknameErrorMessage("닉네임을 입력해주세요.");
        }
        if (duplicatedNickname) {
            setNicknameErrorMessage("닉네임 중복체크 해주세요.");
        }
        if (memberPw === "") {
            setPwErrorMessage("비밀번호를 입력해주세요.");
        }
        if (memberConfirmPw === "") {
            setPwConfirmErrorMessage("입력한 비밀번호와 다릅니다..");
        }
        if (memberBirth === "") {
            setBirthErrorMessage("생년월일을 입력해주세요.");
        }
        if (memberDetailAdd === "") {
            setAddressErrorMessage("주소를 입력해주세요.")
        }

        // DB에 쿼리 쏴서 insert 하기
        if (!duplicatedNickname && !duplicatedId && !checkCode
            && memberId != "" && memberName != "" && memberNickname != "" && memberPw != "" && memberConfirmPw != ""
            && memberBirth != "" && memberTel != "" && memberAdd != "" && memberPostcode != "" && memberDetailAdd != ""
        && idErrorMessage == "사용가능한 아이디입니다." && nicknameErrorMessage == "사용가능한 닉네임입니다." && pwConfirmErrorMessage == "") {


            // 여기서 쿼리 쏘기
            const res = await axios.post("/register", null, {
                params: {
                    memberId: memberId,
                    memberName: memberName,
                    memberNickname: memberNickname,
                    memberPw: memberPw,
                    memberTel: memberTel,
                    memberPostcode: memberPostcode,
                    memberAdd: memberAdd,
                    memberDetailAdd: memberDetailAdd,
                    memberBirth: memberBirth
                }
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.status == 200) {
                alert("회원가입이 완료되었습니다.");
                // 회원가입 후 로그인 화면으로 이동
                window.location.href = '/SignIn';

            } else {
                alert("회원가입에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <main className="rundry">
            <section className="i pg fh rm ki xn vq gj qp gr hj rp hr ">
                <img src="images/shape-06.svg" alt="Shape" className="h j k"/>
                <img src="images/shape-03.svg" alt="Shape" className="h l m"/>
                <img src="images/shape-17.svg" alt="Shape" className="h n o"/>
                <img src="images/shape-18.svg" alt="Shape" className="h p q"/>

                <div className="animate_top bb af i va sg hh sm vk xm yi _n jp hi ao kp">
                    <span className="rc h r s zd/2 od zg gh"></span>
                    <span className="rc h r q zd/2 od xg mh"></span>

                    <div className="rj">
                        <h2 className="ek ck kk wm xb rundry">Sign Up</h2>

                        <span className="i rc sj hk xj rundry">
              <span className="rc h s z/2 nd oe rh tm"></span>
              <span className="rc h q z/2 nd oe rh tm"></span>
                            <p className="rundry">한석줍쇼 계정 생성</p>
            </span>
                    </div>

                    <div
                        className="sb"
                    >
                        <div className="wb">
                            <label className="rc kk wm vb" htmlFor="memberId">
                                아이디
                            </label>
                            <input
                                type="text"
                                name="memberId"
                                id="memberId"
                                value={memberId}
                                placeholder="hanseokku"
                                className="hh rg zk _g ch hm dm fm pl/50 xi mi sm xm pm dn/40 w-72"
                                maxLength="15"
                                onChange={memberIdOnChangeHandler}
                                onBlur={() => {setDuplicatedId(false);
                                    setIdErrorMessage("아이디 중복확인이 필요합니다.");
                                    const idErrorMessage = document.querySelector("#idErrorMessage")
                                    idErrorMessage.style.color = "red";
                                }
                                }
                            />
                            <button className="bg-blue-500 rounded-xl ms-2 text-white h-12 w-28 font-bold"
                                    onClick={checkMemberIdDuplicate}>중복 확인
                            </button>
                            <p id="idErrorMessage" className="text-red"> {idErrorMessage}
                            </p>
                        </div>

                        <div className="wb">
                            <label className="rc kk wm vb" htmlFor="memberName">
                                이름
                            </label>
                            <input
                                type="text"
                                name="memberName"
                                id="memberName"
                                value={memberName}
                                placeholder="한석규"
                                className="vd hh rg zk _g ch hm dm fm pl/50 xi mi sm xm pm dn/40"
                                onChange={memberNameOnChangeHandler}
                                onBlur={checkSizeMemberName}
                            />
                            <p id="nameErrorMessage" className="text-red">{nameErrorMessage}</p>
                        </div>

                        <div className="wb">
                            <label className="rc kk wm vb" htmlFor="memberNickname">
                                닉네임
                            </label>
                            <input
                                type="text"
                                name="memberNickname"
                                id="memberNickname"
                                value={memberNickname}
                                placeholder="hanseokku"
                                maxLength="8"
                                className="hh rg zk _g ch hm dm fm pl/50 xi mi sm xm pm dn/40 w-72"
                                onChange={memberNicknameOnChangeHandler}
                                onBlur={() => {setDuplicatedNickname(false);
                                    setNicknameErrorMessage("닉네임 중복확인이 필요합니다.");
                                    const nicknameErrorMessage = document.querySelector("#nicknameErrorMessage")
                                    nicknameErrorMessage.style.color = "red";
                                }
                            }
                            />
                            <button className="bg-blue-500 rounded-xl ms-2 text-white h-12 w-28 font-bold"
                                    onClick={checkMemberNicknameDuplicate}>중복 확인
                            </button>
                            <p id="nicknameErrorMessage" className="text-red">{nicknameErrorMessage}</p>
                        </div>

                        <div className="wb">
                            <label className="rc kk wm vb" htmlFor="memberPw">
                                비밀번호
                            </label>
                            <input
                                type="password"
                                name="memberPw"
                                id="memberPw"
                                value={memberPw}
                                placeholder="**********"
                                maxLength="15"
                                className="vd hh rg zk _g ch hm dm fm pl/50 xi mi sm xm pm dn/40"
                                onChange={memberPwOnChangeHandler}
                                onBlur={checkMemberPw}
                                onBlur={checkPasswordConfirm}
                            />
                            <p id="pwErrorMessage" className="text-red">{pwErrorMessage}
                            </p>
                        </div>
                        <div className="wb">
                            <label className="rc kk wm vb" htmlFor="passwordConfirm">
                                비밀번호 확인
                            </label>
                            <input
                                type="password"
                                name="passwordConfirm"
                                id="passwordConfirm"
                                value={memberConfirmPw}
                                placeholder="**********"
                                className="vd hh rg zk _g ch hm dm fm pl/50 xi mi sm xm pm dn/40"
                                onChange={memberConfimPwOnChangeHandler}
                                onBlur={checkPasswordConfirm}
                            />
                            <p id="pwConfirmErrorMessage" className="text-red"> {pwConfirmErrorMessage}
                            </p>
                        </div>

                        <div className="wb">
                            <label className="rc kk wm vb" htmlFor="birth">
                                생년월일
                            </label>
                            <input
                                type="date"
                                name="bitrh"
                                id="birth"
                                value={memberBirth}
                                placeholder="2000.09.01"
                                className="vd hh rg zk _g ch hm dm fm pl/50 xi mi sm xm pm dn/40"
                                onChange={memberBirthOnChangeHandler}
                                onBlur={memberBirthOnBlur}
                            />
                            <p id="birthErrorMessage" className="text-red">  {birthErrorMessage}
                            </p>
                        </div>

                        <div className="wb">
                            <label className="rc kk wm vb" htmlFor="tel">
                                전화번호
                            </label>
                            <input
                                type="tel"
                                name="tel"
                                id="tel"
                                value={memberTel}
                                placeholder="01047959464"
                                className="hh rg zk _g ch hm dm fm pl/50 xi mi sm xm pm dn/40 w-72"
                                onChange={memberTelOnChangeHandler}
                            />
                            {/* TODO
                            테스트를 위해 임시로 인증 상태를 조작함
                            인증문자 발송 시 발생하는 비용 낭비 방지 목적
                            완료되면 onClick={sendMessage} 로 변경하면 됨
                            06.26 | 안승환 | 마이페이지 프로필 이미지 삽입 작업 중
                            */}
                            <button onClick={()=>setCheckCode(false)}
                                    className="bg-blue-500 rounded-xl ms-2 text-white h-12 w-28 font-bold"
                            >인증 요청
                            </button>
                        </div>


                        {showVerificationInput ? <div className="wb">
                            <input
                                type="tel"
                                name="tel"
                                id="tel"
                                value={userInputCode}
                                placeholder="12345"
                                className="hh rg zk _g ch hm dm fm pl/50 xi mi sm xm pm dn/40 w-72"
                                onChange={userInputCodeOnChangeHandler}

                            />
                            <button
                                className="bg-blue-500 rounded-xl ms-2 text-white h-12 w-28 font-bold"
                                onClick={checkVeridationCode}
                            >인증 확인
                            </button>


                        </div> : null
                        }

                        <div className="wb">
                            <label className="rc kk wm vb" htmlFor="addr">
                                주소
                            </label>
                            <input type="text" id="sample6_postcode" placeholder="우편번호"
                                   className="hh rg zk _g ch hm dm fm pl/50 xi mi sm xm pm dn/40 w-48"
                                // value={memberPostcode}
                                   onChange={memberPostcodeOnChangeHandler}
                                   readOnly={true}/>
                            <button className="bg-blue-500 rounded-xl ms-2 text-white h-12 w-28 font-bold"
                                    onClick={handlePostcode}>검색
                            </button>
                            <input type="text" id="sample6_address" placeholder="주소"
                                   className="hh rg zk _g ch hm dm fm pl/50 xi mi sm xm pm dn/40 w-full my-2"
                                   onChange={memberAddOnChangeHandler}
                                   readOnly={true}/><br/>
                            <input type="text" id="sample6_detailAddress" placeholder="상세주소"
                                   className="hh rg zk _g ch hm dm fm pl/50 xi mi sm xm pm dn/40 w-48"
                                   value={memberDetailAdd}
                                   onChange={memberDetailAddOnChangeHandler}
                                   onBlur={memberDetailAddOnBlur}/>
                            <input type="text" id="sample6_extraAddress" placeholder="참고항목"
                                   className="hh rg zk _g ch hm dm fm pl/50 xi mi sm xm pm dn/40 w-48 mx-3"
                                   readOnly={true}/>
                        </div>
                        <p id="addressErrorMessage" className="text-red">{addressErrorMessage}</p>
                        <button className="vd rj ek rc rg gh lk ml il _l gi hi mt-14" onClick={register}>
                            등록
                        </button>


                    </div>
                </div>
            </section>
        </main>
    );
}
