import SignIn from "./signIn";
import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import '../../css/mypage.css'


export default function Mypage() {

    // TODO 연체 여부가 Y일때 는 update rent_delay 컬럼 수정 되지 않게 해야됨

    /* 사용자에게 입력받을 useState 지정 필드 */
    const [memberView, setMemberView] = useState([]) // 회원정보 조회
    const [currentMemberPw, setCurrentMemberPw] = useState("") // 현재 패스워드
    const [changeMemberPw, setChangeMemberPw] = useState(""); // 수정할 패스워드
    const [memberNickname, setMemberNickname] = useState(""); // 회원 닉네임
    const [memberBirth, setMemberBrith] = useState(""); // 회원 생년월일
    const [memberAdd, setMemberAdd] = useState("") // 회원 도로명 주소
    const [memberPostcode, setMemberPostcode] = useState("") // 회원 우편번호
    const [memberDetailAdd, setMemberDetailAdd] = useState("") // 회원 상세주소
    const [showBookRentalList, setShowBookRentalList] = useState([]) // 도서 대여 내역 리스트
    const [bookNo, setBookNo] = useState(0); // 책 번호
    const [rentNo, setRentNo] = useState(0); // 렌트 번호
    const [prevProfile, setPrevProfile] = useState(null); // 프로필 이미지(미리보기)
    const [profile, setProfile] = useState(null); // 프로필 이미지(파일 저장)
    const [memberId, setMemberId] = useState("");

    /* 에러 메세지 */
    const [currentPwErrorMessage, setCurrentPwErrorMessage] = useState(""); // 현재 패스워드 에러 메세지
    const [pwErrorMessage, setPwErrorMessage] = useState(""); // 패스워드 에러 메세지
    const [nicknameErrorMessage, setNicknameErrorMessage] = useState(""); // 닉네임 에러 메세지
    const [duplicatedNickname, setDuplicatedNickname] = useState(true); // 닉네임 중복 에러 메세지
    //현재 비밀번호 입력값 핸들러
    const currentPasswordOnChangeHandler = useCallback((e) => {
        setCurrentMemberPw(e.target.value);
    }, [])

    // 비밀번호 수정 핸들러
    const passwordOnChangeHandler = useCallback((e) => {
        setChangeMemberPw(e.target.value);
    }, [])

    // 닉네임 핸들러
    const memberNicknameOnChangeHandler = useCallback((e) => {
        setMemberNickname(e.target.value);
    }, [])

    // 생년월일 핸들러
    const memberBirthOnChangeHandler = useCallback((e) => {
        setMemberBrith(e.target.value);
    }, [])

    // 우편번호 핸들러
    const memberPostcodeOnChangeHandler = useCallback((e) => {
        setMemberPostcode(e.target.value);
    }, [])

    // 주소 핸들러
    const memberAddOnChangeHandler = useCallback((e) => {
        setMemberAdd(e.target.value);
    }, [])

    // 상세주소 핸들러
    const memberDetailAddOnChangeHandler = useCallback((e) => {
        setMemberDetailAdd(e.target.value);
    }, [])

    // 프로필 이미지 핸들러(미리보기)
    const profileOnChangeHandler = useCallback((e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setProfile(file); // 프로필 파일 저장
        setPrevProfile(imageUrl); // 프로필 이미지 미리보기
    }, [])

    const memberData = sessionStorage.getItem("member"); // 세션스토리지에담긴 로그인 회원정보 가져오기
    const memberObj = JSON.parse(memberData); // 문자열을 JSON 객체로 변환

    // 로그인한 유저의 정보 가져오기
    const getData = async () => {
        const postData = {
            memberId: memberObj.memberId // 세션에담긴 로그인 회원 아이디
        }

        try {
            const res = await axios.post("/searchMemberInfo", postData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setMemberView(res.data) // 요청한 로그인 회원의 정보 전체 담기
            setMemberId(res.data.memberId); // 아이디만
            setMemberNickname(res.data.memberNickname) // 닉네임만
            setMemberPostcode(res.data.memberPostcode)// 우편번호만
            setMemberAdd(res.data.memberAdd)// 주소만
            setMemberDetailAdd(res.data.memberDetailAdd)// 상세주소만
            setMemberBrith(res.data.memberBirth)// 생일만

            console.log(res.data.memberId)
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    };

    // 책 대여 이력 정보 가져오기
    const getBookData = async () => {
        const bookData = {
            memberId: memberObj.memberId // 세션에 담긴 회원 아이디
        }

        try {
            const resData = await axios.post("/showBookRentalList", bookData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setShowBookRentalList(resData.data)// 책 대여 이력 리스트에 담기
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // 프로필 이미지 가져오기
    const getProfile = async () => {
        const res = await axios.get("/getProfile", {
            params: {
                memberId: memberView.memberId,
            }
        })
        setPrevProfile(res.data);
    }

    useEffect(() => {
        getProfile();
    }, [memberView])

    // 페이지 첫 랜더링 시 가져오기
    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem("bookRent"))) {
            sessionStorage.removeItem("bookRent");
        }
        getData() // 로그인한 유저의 정보 가져오기
        getBookData() // 책 대여 이력 정보 가져오기
    }, []);

    // 도서 반납
    const bookRentReturn = async () => {

        // update 각테이블에 한번씩 총 두번실행
        const rentData = {
            bookNo: bookNo, // 책번호
            rentNo: rentNo // 렌트번호
        }

        try {
            await axios.post("/rentReturn", rentData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            getBookData(); // 책 대여 이력 정보 가져오기 실행
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        bookRentReturn() // 반납버튼 클릭시 rentNo 값 바뀔때마다 실행
    }, [rentNo]) // 반납버튼 눌렀을때 렌트넘버의 상태값이 변할때마다 실행

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    // 수정할 패스워드 정규식 검사 및 에러 메세지 출력 함수
    const checkMemberPw = () => {
        // 이름이 두글자 이하인 경우 경고 메세지 출력
        // 비밀번호 정규식 부합하지 않은 경우 에러메세지 출력
        if (changeMemberPw != "") {
            if (!passwordRegex.test(changeMemberPw) || !changeMemberPw) {
                setPwErrorMessage("최소 특수문자 1개 포함하여 8글자 이상의 비밀번호를 입력해주세요");
                // 오류 메시지 초기화
            } else {
                setPwErrorMessage("");
            }
        } else {
            setPwErrorMessage("")
        }
    }

    // 현재 비밀번호 체크
    const checkCurrentMemberPw = () => {
        // 이름이 두글자 이하인 경우 경고 메세지 출력
        // 비밀번호 정규식 부합하지 않은 경우 에러메세지 출력
        if (currentMemberPw != "") { // 현재 비밀번호가 ""가 아니면
            if (currentMemberPw != memberView.memberPw) { // 현재 비멀번호와 일치하지 않으면
                setCurrentPwErrorMessage("비밀번호가 일치하지 않습니다."); // 현재 비밀번호 onblur 수정
                // 오류 메시지 초기화
            } else {
                setCurrentPwErrorMessage(""); // 현재 비밀번호 onblur 수정
            }
        } else {
            setCurrentPwErrorMessage(""); // 현재 비밀번호 칸이 비어 있을때
        }
    }

    // 비밀번호 수정 버튼 클릭시
    const passwordChange = async () => {

        // 현재 비밀번호가 일치하고 새로운 비밀먼호가 ""가 아니고 새로운 비밀번호가 조건에 충족할 때
        if (currentMemberPw == memberView.memberPw && changeMemberPw != "" && pwErrorMessage == "") {
            const passChange = {
                memberId: memberView.memberId, // 로그인 회원 아이디
                memberPw: changeMemberPw // 새로 바꿀 비밀번호
            }
            try {
                const res = await axios.post("/passwordChange", passChange, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setCurrentMemberPw(""); // 업데이트후 현재비밀번호칸 비워주기
                setChangeMemberPw(""); // 업데이트후 새로운 비밀번호칸 비워주기
                alert("비밀번호가 수정되었습니다.")
                getData();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    }

    // 주소API 사용하여 우편번호,도로명 주소 자동 완성
    const handlePostcode = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                var addr = ''; // 주소 변수
                // var extraAddr = ''; // 참고항목 변수

                if (data.userSelectedType === 'R') {
                    addr = data.roadAddress;
                } else {
                    addr = data.jibunAddress;
                }

                document.getElementById('memberPostcode').value = data.zonecode;
                document.getElementById("memberAdd").value = addr;
                document.getElementById("memberDetailAdd").focus();
                setMemberPostcode(data.zonecode); // 우편 번호
                setMemberAdd(addr); // 주소
                setMemberDetailAdd("") // 상세주소
            }
        }).open();
    };

    // TODO
    // 프로필 이미지 리사이즈

    // save버튼 클릭시 회원정보 수정
    const saveMemberData = async () => {
        if (memberNickname.length == 0) {
            alert("닉네임을 입력해 주세요.")
            return;
        } else if (memberNickname.length < 2) {
            alert("최소 2글자 이상의 닉네임으로 설정해주세요.")
            return;
        } else if (memberNickname == '관리자' || memberNickname == 'admin') {
            alert("사용할 수 없는 키워드가 들어간 닉네임입니다.")
            return;
        }
        if (duplicatedNickname) { // true일때 중복될때
            alert("사용할수없는 닉네임 입니다 닉네임을 수정해주세요.")
            return
        }
        const memberData = {
            memberId: memberView.memberId, // 로그인 회원 아이디
            memberNickname: memberNickname, // 바꿀닉네임, 현상유지도 가능
            memberPostcode: memberPostcode, // 우편번호
            memberAdd: memberAdd, // 주소
            memberDetailAdd: memberDetailAdd, // 상세주소
            memberBirth: memberBirth // 생일
        }
        try {
            await axios.put("/changeMemberData", memberData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // 사용자가 프로필 이미지를 등록했을 경우
            // TODO
            // 프로필 이미지 변경했을때 sessionStorage 에는 변경 전 이미지 정보가 담겨 있으므로
            // 프로필 이미지가 변경된 data 를 sessionStorage 로 변경해주기
            if (profile) {
                const imageForm = new FormData();
                imageForm.append('profile', profile);
                imageForm.append('memberId', memberView.memberId);
                axios.post('/changeMemberProfile', imageForm, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }).then(response => (console.log("이미지 경로 : ", response.data)))
            }
            alert("회원정보가 수정되었습니다.")
            getData();
        }catch (error){
            console.error("회원정보 수정 실패")
        }
    }

    // 닉네임 중복체크 onblur 마우스 땠을때 실행됨
    const nicknameDupCheck = async () => {

        if (memberNickname.length < 2) {
            setNicknameErrorMessage("최소 2글자 이상의 닉네임으로 설정해주세요.");// 닉네임 onblur
            return;
        } else if (memberNickname == '관리자' || memberNickname == 'admin') {
            setNicknameErrorMessage("사용할 수 없는 키워드가 들어간 닉네임입니다."); // 닉네임 onblur
            return;
        }

        try {
            const res = await axios.post("/checkNick", {
                memberNickname: memberNickname // 닉네임
            });

            if (memberNickname != memberView.memberNickname) { // 닉네임이 현재 닉네임과 다를때 실행
                // 닉네임 중복 체크 확인
                if (res.data != 0) {
                    //   중복
                    setDuplicatedNickname(true); // 중복될때
                    setNicknameErrorMessage("사용중인 닉네임입니다.");
                    return
                } else {
                    setDuplicatedNickname(false);// 사용가능할때
                    setNicknameErrorMessage("");
                }
            }
            setDuplicatedNickname(false); // 현재이름과 같을때 사용가능하게
        } catch (error) {
            console.error("닉네임 에러야! ", error);
        }

    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    }, []);
    // 탭변경을 위한 useState
    const [activeTab, setActiveTab] = useState('tab1');


    // 회원탈퇴 버튼 이벤트
    const deleteMember = async () => {
        if(window.confirm("회원 탈퇴 하시겠습니까?")){
            const res = await axios.post("/deleteMember", null,{
                params: {
                    memberId: memberId
                }// 아이디
            });

            if (res.status == 200) {
                alert("회원 탈퇴 성공 !")
                // 세션에 저장된 값 삭제
                sessionStorage.removeItem("member")
                // 메인 페이지로 이동
                window.location.href="/"
                
            } else {
                alert("회원 탈퇴 실패 ..")
            }
        } else {
            alert("회원 탈퇴를 취소하였습니다.")
        }


    }


    return (
        <main>
            <section className="i pg fh rm ki xn vq gj qp gr hj rp hr rundry">
                <div className="bb ze ki xn 2xl:ud-px-0">
                    <body>
                    <section id="content" className="container">
                        <div className="page-heading">
                            <div className="media clearfix" style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <div className="media-left pr30">
                                    <a>
                                        <div className="mt-2"
                                             style={{width: "300px", height: "300px", display: "flex"}}>
                                            {prevProfile
                                                ? <img src={prevProfile} style={{
                                                    borderRadius: "50%",
                                                    border: "2px solid hsl(0 0% 50%)",
                                                    padding: "2%",
                                                }}/>
                                                : <img src="/images/profile/basic_profile.png" style={{
                                                    borderRadius: "50%",
                                                    border: "2px solid hsl(0 0% 50%)",
                                                    padding: "2%"
                                                }}/>
                                            }
                                        </div>
                                    </a>
                                </div>
                                <br/>
                                <div className="media-body va-m" style={{flex: "none"}}>
                                    <ul className="media-heading text-center rundry text-xl" style={{color: "black"}}>
                                        <li style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginLeft: "2"
                                        }}>
                                            {memberNickname}님 환영합니다
                                        </li>
                                        <li className="rundry">아이디 : {memberView.memberId}</li>
                                        <li className="rundry">이 름 : {memberView.memberName}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="tab-block py-5 px-2">
                                <ul className="nav nav-tabs rundry ">
                                    <li className="active">
                                        <a
                                            data-toggle="tab"
                                            className={` ${activeTab === 'tab1' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('tab1')}
                                            style={{fontSize: "20px"}}
                                        >
                                            내 정보 보기
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            data-toggle="tab"
                                            className={`${activeTab === 'tab2' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('tab2')}
                                            style={{fontSize: "20px"}}
                                        >
                                            도서 대출 이력 보기
                                        </a>

                                    </li>
                                    <li>
                                        <a
                                            data-toggle="tab"
                                            className={` ${activeTab === 'tab3' ? 'active' : ''}`}
                                            onClick={() => setActiveTab('tab3')}
                                            style={{fontSize: "20px"}}
                                        >
                                            회원탈퇴
                                        </a>

                                    </li>
                                </ul>

                                <br/>
                                <div className="tab-content p30" style={{color: "black"}}>
                                    {activeTab === 'tab1' && (
                                        <div id="tab1" className="tab-pane active">
                                            <div className="media mt25">
                                                <div
                                                    className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                                    <div className="sm:col-span-2 border-gray-900/10">
                                                        <label htmlFor="memberName"
                                                               className="block text-lg font-medium leading-6 text-gray-900  rundry">
                                                            이름
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                readOnly={true}
                                                                type="text"
                                                                name="memberName"
                                                                value={memberView.memberName}
                                                                id="memberName"
                                                                autoComplete="given-name"
                                                                className="block  rundry w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <label htmlFor="memberNickname"
                                                               className="block rundry text-lg font-medium leading-6 text-gray-900">
                                                            닉네임
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                type="text"
                                                                name="memberNickname"
                                                                onChange={memberNicknameOnChangeHandler}
                                                                onBlur={nicknameDupCheck}
                                                                value={memberNickname}
                                                                id="memberNickname"
                                                                autoComplete="family-name"
                                                                className="block rundry w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                            />
                                                        </div>
                                                        <p id="nicknameErrorMessage"
                                                           className="text-red">{nicknameErrorMessage}</p>
                                                    </div>

                                                    <div className="sm:col-span-2">
                                                        <label htmlFor="memberId"
                                                               className="block text-lg font-medium leading-6 text-gray-900 rundry">
                                                            아이디
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                readOnly={true}
                                                                type="text"
                                                                name="memberId"
                                                                id="memberId"
                                                                value={memberView.memberId}
                                                                autoComplete="given-name"
                                                                className="block rundry w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="sm:col-span-2">
                                                        <label htmlFor="memberPw"
                                                               className="block text-lg font-medium leading-6 text-gray-900 rundry">
                                                            현재 비밀번호
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="memberPw"
                                                                name="memberPw"
                                                                type="password"
                                                                onChange={currentPasswordOnChangeHandler}
                                                                onBlur={checkCurrentMemberPw}
                                                                value={currentMemberPw}
                                                                autoComplete="memberPw"
                                                                className="block rundry w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                            />
                                                            <p id="pwErrorMessage"
                                                               className="text-red">{currentPwErrorMessage}</p>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2">
                                                        <label htmlFor="memberNewPw"
                                                               className="rundry block text-lg font-medium leading-6 text-gray-900">
                                                            새로운 비밀번호
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="memberNewPw"
                                                                name="memberNewPw"
                                                                type="password"
                                                                autoComplete="memberNewPw"
                                                                onChange={passwordOnChangeHandler}
                                                                value={changeMemberPw}
                                                                onBlur={checkMemberPw}
                                                                className="rundry block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                            />
                                                            <p id="pwErrorMessage"
                                                               className="text-red">{pwErrorMessage}</p>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2 mt-8 text-xl">
                                                        <button
                                                            onClick={passwordChange}
                                                            className="btn btn-dark rundry"
                                                        >
                                                            비밀번호 수정
                                                        </button>
                                                    </div>


                                                    <div className="sm:col-span-2">
                                                        <label htmlFor="memberTel"
                                                               className="rundry block text-lg font-medium leading-6 text-gray-900">
                                                            전화번호
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                readOnly={true}
                                                                id="memberTel"
                                                                name="memberTel"
                                                                value={memberView.memberTel}
                                                                type="text"
                                                                autoComplete="memberTel"
                                                                className="block rundry w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                            />
                                                        </div>
                                                        <label htmlFor="memberTel"
                                                               className="block rundry text-lg font-medium leading-6 text-gray-900 mt-9">
                                                            프로필 사진 변경
                                                        </label>
                                                        <div className="mt-2">
                                                            {prevProfile
                                                                ?
                                                                <img src={prevProfile} className="border-2 p-2"/>
                                                                :
                                                                <img src="/images/profile/basic_profile.png"
                                                                     className="border-2 p-2"/>
                                                            }
                                                            <input
                                                                name="memberProfile"
                                                                accept='image/jpg, image/png, image/jpeg'
                                                                type="file"
                                                                onChange={profileOnChangeHandler}
                                                                className="rundry my-4 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                            />
                                                            <button onClick={() => setProfile(null)}
                                                                    className="rundry bg-red-500 hover:bg-transparent text-white font-semibold hover:text-red-700 px-6 py-1.5 border border-transparent hover:border-red-500 rounded text-lg">
                                                                프로필 삭제
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2 sm:col-start-1 rundry">
                                                        <label htmlFor="memberPostcode"
                                                               className="block text-lg font-medium leading-6 text-gray-900 rundry">
                                                            우편번호
                                                        </label>
                                                        <div className="mt-2 rundry">
                                                            <input
                                                                readOnly={true}
                                                                type="text"
                                                                name="memberPostcode"
                                                                id="memberPostcode"
                                                                onChange={memberPostcodeOnChangeHandler}
                                                                value={memberPostcode}
                                                                autoComplete="memberPostcode"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 rundry shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="sm:col-span-2 rundry">
                                                        <label htmlFor="memberAdd"
                                                               className="block text-lg font-medium leading-6 text-gray-900 rundry">
                                                            도로명 주소
                                                        </label>
                                                        <div className="mt-2 rundry">
                                                            <input
                                                                readOnly={true}
                                                                type="text"
                                                                name="memberAdd"
                                                                id="memberAdd"
                                                                onChange={memberAddOnChangeHandler}
                                                                value={memberAdd}
                                                                autoComplete="memberAdd"
                                                                className="block rundry w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-1 rundry">
                                                        <label htmlFor="memberDetailAdd"
                                                               className="block text-lg font-medium leading-6 text-gray-900 rundry">
                                                            상세주소
                                                        </label>
                                                        <div className="mt-2 rundry">
                                                            <input
                                                                type="text"
                                                                name="memberDetailAdd"
                                                                value={memberDetailAdd}
                                                                id="memberDetailAdd"
                                                                onChange={memberDetailAddOnChangeHandler}
                                                                autoComplete="memberDetailAdd"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-1 rundry">
                                                        <div className="mt-2 rundry">
                                                            <button
                                                                onClick={handlePostcode}
                                                                className="mt-5 bg-blue-500 rounded-xl ms-2 text-white h-12 w-28 font-bold rundry"
                                                            >검색
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2 rundry">
                                                        <label htmlFor="memberSub"
                                                               className="block text-lg font-medium leading-6 text-gray-900 rundry">
                                                            멤버십
                                                        </label>
                                                        <div className="mt-2 rundry">
                                                            <input
                                                                readOnly={true}
                                                                type="text"
                                                                name="memberSub"
                                                                id="memberSub"
                                                                value={memberView.memberSub === 'Y' ? "멤버십 구독 회원" : "일반 회원"}
                                                                autoComplete="memberSub"
                                                                className="block rundry w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2 rundry">
                                                        <label htmlFor="memberBirth"
                                                               className="block rundry text-lg font-medium leading-6 text-gray-900">
                                                            생년월일
                                                        </label>
                                                        <div className="mt-2 rundry">
                                                            <input
                                                                type="date"
                                                                name="memberBirth"
                                                                id="memberBirth"
                                                                value={memberBirth}
                                                                onChange={memberBirthOnChangeHandler}
                                                                autoComplete="memberBirth"
                                                                className="block rundry w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={saveMemberData}
                                                        className="btn btn-dark rundry rounded-xl h-10 w-28 mt-7 ml-40"
                                                    >
                                                        저장
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'tab2' && (
                                        <div id="tab2" className="tab-pane rundry">

                                            <div
                                                className="media rundry mt-5 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <table
                                                    className="table-auto w-full border-collapse border border-gray-800 rundry">
                                                    <tr className="text-center rundry">
                                                        <td className="border border-gray-800 px-4 py-2">도서 번호</td>
                                                        <td className="border border-gray-800 px-4 py-2">도서명</td>
                                                        <td className="border border-gray-800 px-4 py-2">대여일</td>
                                                        <td className="border border-gray-800 px-4 py-2">반납예정일</td>
                                                        <td className="border border-gray-800 px-4 py-2">실제 반납일</td>
                                                        <td className="border border-gray-800 px-4 py-2">연체여부</td>
                                                        <td className="border border-gray-800 px-4 py-2">반납여부</td>
                                                    </tr>
                                                    {/* 도서대여 이력이 한개이상 존재 할때나옴 */}
                                                    {showBookRentalList && showBookRentalList.length > 0 ? (
                                                        showBookRentalList.map((v, i) =>
                                                            (
                                                                <tr key={i} className="text-center">
                                                                    <td className="border border-gray-800 px-4 py-2">{v.bookNo}</td>
                                                                    <td className="border border-gray-800 px-4 py-2">{v.bookName}</td>
                                                                    <td className="border border-gray-800 px-4 py-2">{v.rentStart}</td>
                                                                    <td className="border border-gray-800 px-4 py-2">{v.rentEnd}</td>
                                                                    <td className="border border-gray-800 px-4 py-2">{v.rentReturn}</td>
                                                                    <td className="border border-gray-800 px-4 py-2">{v.rentDelay}</td>
                                                                    <td className="border border-gray-800 px-4 py-2">{v.rentReturn == null && v.bookRent == 'Y' ? (
                                                                        <button className="text-red" type="button"
                                                                                onClick={() => {
                                                                                    setRentNo(v.rentNo);
                                                                                    setBookNo(v.bookNo);
                                                                                }}>
                                                                            반납하기</button>) : (
                                                                        <span
                                                                            className="text-blue-500">반납완료</span>)}</td>
                                                                </tr>
                                                            )
                                                        )
                                                    ) : null}
                                                </table>
                                            </div>


                                        </div>)}
                                    {activeTab === 'tab3' &&
                                        (
                                            <div id="tab3" className="tab-pane">
                                                <div className="media mt25 text-center">
                                                    <button
                                                        onClick={deleteMember}
                                                        className="bg-red-500 rounded-xl ms-2 text-white h-12 w-28 font-bold text-2xl"
                                                    > 회원 탈퇴
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>


                            </div>
                        </div>
                    </section>
                    </body>

                </div>
            </section>
        </main>
    )
}
