import axios from "axios";
import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function AdminPage(){

    const [memberList, setMemberList] = useState([]) // 회원 정보 리스트
    const [freeBoardList, setFreeBoardList] = useState([])// 자유게시판 리스트
    const [bookRentList, setBookRentList] = useState([]) // 도서 대여 이력 리스트
    const [podcastList, setPodcastList] = useState([]) // 팟캐스트 리스트
    const [showMemberList, setShowMemberList] = useState(false) // 회원 정보 화면표시
    const [showFreeBoardList, setShowFreeBoardList] = useState(false) // 자유게시판 화면표시
    const [showBookList, setShowBookList] = useState(false) // 도서 대여 이력 화면표시
    const [showPodcastList, setShowPodcastList] = useState(false) // 팟캐스트 화면표시
    const [searchType, setSearchType] = useState("아이디") // 회원 정보 검색타입
    const [searchWord, setSearchWord] = useState("") // 회원 정보 검색키워드
    const [memberSubChangeData, setMemberSubChangeData] = useState("Y") // 멤버십 상태 변경용
    const [memberDelete, setMemberDelete] = useState("Y") // 회원 활동 상태 변경용
    const [podcastOrder, setPodcastOrder] = useState("ASC") // 총시간순 정렬
    const boardType = "freeBoard"; // 자유게시판 타입

    const memberDT = JSON.parse(sessionStorage.getItem("member"))

    // 페이징 처리
    const [totalBoardListCount, setTotalBoardListCount] = useState(0);  // 전체 게시글 개수
    const [currentPage, setCurrentPage] = useState(1);                  // 현재 페이지 번호

    const [endPage, setEndPage] = useState(0);                          // 최대 페이지 번호
    const [pageNumList, setPageNumList] = useState([]);                  // 페이지 번호 리스트
    const pageNumListSize = 10;

    // TODO 날짜 검색 타입클릭시 자동으로 날짜선택 열리도록 할수있나 알아보기

    const searchTypeOnChangeHandler = useCallback((e) => {
        setSearchType(e.target.value)
        if (searchType == "아이디" || searchType == "도서명"){
            setSearchWord("")
        }
    },[])

    const searchWordOnChangeHandler = useCallback((e) => {
        setSearchWord(e.target.value)
    },[])

    // 회원정보 전체 조회
    const getMemberData = async () => {

        try {
            const res = await axios.post("/adminMemberList");
            setMemberList(res.data)                // 전체 게시글 목록
        } catch (error) {
            console.error("회원정보 에러", error);
        }

    };

    // 자유게시판 리스트 조회
    const getFreeBoardData = async () => {
        const firstRecordIndex = (currentPage - 1) * pageNumListSize + 1; // 시작 페이지
        const res = await axios.get("/freeBoard/list",
            {
                params:{
                    firstRecordIndex:firstRecordIndex - 1,
                    memberAdmin: memberDT.memberAdmin,
                    pageNumListSize:pageNumListSize
                }
            })
        if (res.data) {
            setFreeBoardList(res.data.boardList);                  // 전체 게시글 목록
            setTotalBoardListCount(res.data.boardListCount);   // 전체 게시글 개수(전체 페이지 번호를 위해 필요함)
        }
    }

    // 관리자 페이지 도서 대여 이력 조회
    const getBookRentData = async () => {
        try {
            const resBookRent = await axios.get("/adminBookRentList");

            setBookRentList(resBookRent.data)
        } catch (error) {
            console.error("도서 대여 이력조회 에러", error);
        }
    }

    // 관리자 페이지 팟캐스트 리스트 조회
    const getPodcastData = async () => {
        try {
            const res = await axios.post("/podcastBoard/adminPodcast");
            setPodcastList(res.data)
        } catch (error) {
            console.error("도서 대여 이력조회 에러", error);
        }
    }



    useEffect(() =>{
        setShowMemberList(true)
        getMemberData();
        getFreeBoardData();
        getBookRentData();
        getPodcastData();
    },[])

    // 멤버 아이디로 회원 정보, 게시판, 도서 대여이력 검색
    const searchBtn = async () => {
        console.log(searchWord)
        if(searchWord != ""){
            if(showMemberList){
                searchMemberList()
            }else if (showFreeBoardList){
                searchFreeBoardList()
            }else if (showBookList){
                searchBookList()
            }else if (showPodcastList){
                searchPodcastList()
            }
            getPageNumList(1)
            return;
        }
        getMemberData();
        getFreeBoardData();
        getBookRentData();
        getPodcastData()
        getPageNumList(1)
    }

    // 회원정보 검색요청
    const searchMemberList = async () => {
        try {
            const res = await axios.post("/adminMemberListSearch",{
                    searchType: searchType,
                    searchWord : searchWord,
                },{
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            setMemberList(res.data) // 회원정보 검색요청

        } catch (error) {
            console.error("도서 대여 이력조회 에러", error);
        }
    }

    // 자유게시판 검색요청
    const searchFreeBoardList = async  () => {
        const firstRecordIndex = (currentPage - 1) * pageNumListSize + 1; // 시작 페이지
        const res = await axios.get("/freeBoard/list",
            {
                params:{
                    firstRecordIndex:firstRecordIndex - 1,
                    searchWord:searchWord,
                    memberAdmin: memberDT.memberAdmin,
                    searchType:searchType,
                    pageNumListSize:pageNumListSize
                }
            })
        if (res.data) {
            setFreeBoardList(res.data.boardList);                  // 전체 게시글 목록
            setTotalBoardListCount(res.data.boardListCount);   // 전체 게시글 개수(전체 페이지 번호를 위해 필요함)
        }
    }

    // 도서 대여 이력 검색요청
    const searchBookList = async () => {
        try {
            const res = await axios.post("/adminBookListSearch",{
                searchType: searchType,
                searchWord : searchWord
            },{
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setBookRentList(res.data)

        } catch (error) {
            console.error("도서 대여 이력조회 에러", error);
        }
    }

    // 팟캐스트 검색요청
    const searchPodcastList = async () => {
        try {
            const res = await axios.post("/podcastBoard/adminPodcast",{
                searchType: searchType,
                searchWord : searchWord,
            },{
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setPodcastList(res.data)

        } catch (error) {
            console.error("팟캐스트 리스트 조회 에러", error);
        }
    }


    // 회원 비활성화 요청
    const memberDeleteY = async (mem) => {
        try{
            await axios.post("/memberDeleteY",{
                memberId: mem
            })
        }catch (error){
            console.log("회원 탈퇴 에러야", error);
        }
        searchBtn();
    }

    // 회원 활성화 요청
    const memberDeleteN = async (mem) => {
        try{
            await axios.post("/memberDeleteN",{
                memberId: mem
            })
        }catch (error){
            console.log("회원 활성화 에러야", error);
        }
        searchBtn();
    }

    // 회원 멤버십 구독상태 변경
    const memberSubStatus = async (memId,memSb) => {
        try{
            const subData = {
                memberId : memId,
                memberSub : memSb
            }
            await axios.post("/memberSubStatus",subData,{
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
        }catch (error){
            console.log("멤버쉽 구독상태 수정 에러야!", error)
        }
        searchBtn()
    }

    // 도서목록에서 회원 아이디 클릭시 해당 회원 번호 검색
    const idClick = async (memId) => {
        try {
            const res = await axios.post("/idClickSearch",{
                memberId : memId
            });
            setShowBookList(false)
            setShowMemberList(true)
            setSearchWord(memId)
            setMemberList(res.data)
        } catch (error) {
            console.error("도서 대여 이력조회 에러", error);
        }
    }

    // 휴대전화 정규식
    function formatPhoneNumber (phoneNumber) {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }
        return null;
    }

    // 연체여부 클릭시 딜레이상태 'Y' 'N'인것들만 보임
    const rentDelaySearch = async () => {
        try {
            const res = await axios.post("/rentDelaySearch");
            setBookRentList(res.data)
        } catch (error) {
            console.error("도서 대여 이력조회 에러", error);
        }
    }

    // 멤버십 클릭시 각각 X 또는 O 인것만 조회
    const memberSubChange = async () => {
        if (memberSubChangeData == "Y"){
            setMemberSubChangeData("N")
        }else {
            setMemberSubChangeData("Y")
        }
        setSearchWord("")
        try {
            const res = await axios.post("/memberSubChangeOX",{
                memberSub: memberSubChangeData
            },{
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setMemberList(res.data)
        } catch (error){
            console.log("멤버십 O X 조회 에러", error)
        }
    }

    // 회원 상태변경 클릭시 활성화 또는 정지 인것만 조회
    const memberStatusChange = async () => {
        if (memberDelete == "N"){
            setMemberDelete("Y")
        }else {
            setMemberDelete("N")
        }
        setSearchWord("")
        try {
            const res = await axios.post("/memberStatusChangeOX", {
                memberDelete: memberDelete
            },{
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setMemberList(res.data)
        }catch (error){
            console.log("멤버 상태 정렬조회 에러",error)
        }
    }

    // 페이지 번호 그리기(번호 분할)
    const getPageNumList = (startNum) => {
        const list = [];
        for(let i = startNum; i < (startNum + pageNumListSize); i++){
            if(i <= endPage){
                list.push(i)
            }
        }
        setPageNumList(list);
        setCurrentPage(startNum);
    }

    // 사용자가 페이지 번호 클릭 시 실행
    useEffect(() => {
        if (searchWord == ""){
            getFreeBoardData();
        }else {
            searchFreeBoardList();
        }
    }, [currentPage]);

    // 전체 페이지 번호 개수 구하기
    useEffect(() => {
        const endNum = Math.ceil(totalBoardListCount / pageNumListSize);
        setEndPage(endNum)
    }, [totalBoardListCount]);

    // 페이지 개수 조회
    useEffect(() => {
        getPageNumList(currentPage);
    }, [endPage]);

    // 현재 버튼이 몇번째 세트인지 나타내는 수
    const currentSet = Math.ceil(currentPage/pageNumListSize);

    // 이전 페이지 버튼
    const goClickPrev = () => {
        window.scrollTo({
            top:10,
            behavior:'smooth',
        });

        if(currentSet > 1) {
            getPageNumList(pageNumList[0] - pageNumListSize);
        }else{
            getPageNumList(1);
            return alert("첫번째 페이지입니다.");
        }
    }

    // 다음 페이지 버튼
    const goClickNext = () => {
        window.scrollTo({
            top:10,
            behavior:'smooth',
        })

        // currentPage 가 endPage 보다 작으면서, pageNumList[1,2,3,4,5] 길이(5) 와 pageNumListSize(5) 를
        // 나눈 나머지가 0일 때 2가지 조건을 동시에 만족하면 'Next Button' 이 실행됨
        // pageNumList.length % pageNumListSize == 0 의 의미는 마지막 page 가 아니라는 의미
        // 그러나 위 조건만으로 실행시키기에 만약 마지막 page 의 pageNumList 가 5일 경우 동작하므로
        // 또다른 조건인 currentPage < endPage 로 이를 보완하여 해결한다
        if(currentPage < endPage && pageNumList.length % pageNumListSize == 0) {
            getPageNumList(pageNumList[0] + pageNumListSize)
        }else{
            return alert("마지막 페이지입니다.");
        }
    }


    // 자유게시판 비활성화 진행
    const freeBoardStatusY = async (no) => {
        try{
            await axios.post("/freeBoard/statusY", {
                freeBoardNo : no,
            },{
                headers: {
                    "Content-Type": "application/json"
                }
            })
            searchBtn();
        }catch (error){
            console.log("게시글 비활성화 진행중 에러야!", error)
        }
        searchBtn();
    }

    // 자유게시판 활성화 진행
    const freeBoardStatusN = async (no) => {
        try{
            await axios.post("/freeBoard/statusN",{
                freeBoardNo : no,
            },{
                headers: {
                    "Content-Type": "application/json"
                }
            })
            searchBtn();
        }catch (error){
            console.log("게시글 활성화 진행중 에러야!", error)
        }
        searchBtn();
    }

    // 팟캐스트 활성화 비활성화 업데이트
    const updatePodcastStatus = async (no,sts) => {
        try {
            const res = await axios.post("/podcastBoard/updatePodcastStatus",{
                podcastBoardNo : no,
                status : sts
            })
        }catch (error){
            console.log("팟캐스트 리스트 업데이트 에러야", error)
        }
        getPodcastData();
    }

    //팟캐스트 리스트 총시간순 정렬
    const orderByPodcastTime = async () => {
        if (podcastOrder == "ASC"){
            setPodcastOrder("DESC")
        }else {
            setPodcastOrder("ASC")
        }
        try {
            const res = await axios.post("/podcastBoard/adminPodcastOrderBy",{
                podcastOrder: podcastOrder
            });
            setPodcastList(res.data)
        } catch (error) {
            console.error("팟캐스트 리스트 오름차순 정렬 조회 에러", error);
        }
    }

    return (
        <main className="rundry">
            <section className="i pg fh rm ki xn vq gj qp gr hj rp hr ">
                <div className="bb ze ki xn 2xl:ud-px-0">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div>
                            <span
                                onClick={() => {
                                    setShowMemberList(true);
                                    setShowFreeBoardList(false);
                                    setShowBookList(false);
                                    setShowPodcastList(false);
                                    getMemberData();
                                    setSearchWord("");
                                    setSearchType("아이디");
                                }}
                                className={`btn mt-1 text-lg leading-6 mx-3 ${showMemberList ? 'text-blue-600' : 'text-gray-600'}`}>회원정보</span>
                            <span
                                onClick={() => {
                                    setShowMemberList(false);
                                    setShowFreeBoardList(true);
                                    setShowBookList(false);
                                    setShowPodcastList(false);
                                    getFreeBoardData();
                                    getPageNumList(1);
                                    setSearchWord("");
                                    setSearchType("아이디");
                                }}
                                className={`btn mt-1 text-lg leading-6 mx-3 ${showFreeBoardList ? 'text-blue-600' : 'text-gray-600'}`}>자유게시판</span>
                            <span
                                onClick={() => {
                                    setShowMemberList(false);
                                    setShowFreeBoardList(false);
                                    setShowBookList(true);
                                    setShowPodcastList(false);
                                    getBookRentData();
                                    setSearchWord("");
                                    setSearchType("아이디");
                                }}
                                className={`btn mt-1 text-lg leading-6 mx-3 ${showBookList ? 'text-blue-600' : 'text-gray-600'}`}>도서 대여 이력</span>
                            <span
                                onClick={() => {
                                    setShowMemberList(false);
                                    setShowFreeBoardList(false);
                                    setShowBookList(false);
                                    setShowPodcastList(true);
                                    getPodcastData();
                                    setSearchWord("");
                                    setSearchType("아이디");
                                }}
                                className={`btn mt-1 text-lg leading-6 mx-3 ${showPodcastList ? 'text-blue-600' : 'text-gray-600'}`}>팟캐스트</span>
                            {showMemberList ? (
                                <label className="float-right">
                                    <select onChange={searchTypeOnChangeHandler}>
                                        <option value="아이디">아이디</option>
                                    </select>
                                    <input
                                        type="text"
                                        onChange={searchWordOnChangeHandler}
                                        className="border" style={{borderRadius: "4px"}} value={searchWord}/>
                                    <button
                                        onClick={searchBtn}
                                        className="ml-2 bg-blue-500 text-white w-14" style={{borderRadius: "4px"}}>검색
                                    </button>
                                </label>) : showFreeBoardList ? (
                                <label className="float-right">
                                    <select onChange={searchTypeOnChangeHandler}>
                                        <option value="아이디">아이디</option>
                                        <option value="제목">제목</option>
                                    </select>
                                    <input
                                        type="text"
                                        onChange={searchWordOnChangeHandler}
                                        className="border" style={{borderRadius: "4px"}} value={searchWord}/>
                                    <button
                                        onClick={searchBtn}
                                        className="ml-2 bg-blue-500 text-white w-14" style={{borderRadius: "4px"}}>검색
                                    </button>
                                </label>) : showBookList ? (
                                <label className="float-right">
                                    <select onChange={searchTypeOnChangeHandler}>
                                        <option value="아이디">아이디</option>
                                        <option value="도서명">도서명</option>
                                        <option value="대여일">대여일</option>
                                        <option value="반납예정일">반납예정일</option>
                                        <option value="실제반납일">실제반납일</option>
                                    </select>
                                    {searchType == "아이디" || searchType == "도서명" ? (
                                        <input
                                            type="text"
                                            onChange={searchWordOnChangeHandler}
                                            className="border" style={{borderRadius: "4px"}} value={searchWord}/>
                                    ) : (
                                        <input
                                            type="date"
                                            onChange={searchWordOnChangeHandler}
                                            className="border" style={{borderRadius: "4px"}} value={searchWord}/>
                                    )}
                                    <button
                                        onClick={searchBtn}
                                        className="ml-2 bg-blue-500 text-white w-14" style={{borderRadius: "4px"}}>검색
                                    </button>
                                </label>) : showPodcastList ? (
                                <label className="float-right">
                                    <select onChange={searchTypeOnChangeHandler}>
                                        <option value="아이디">아이디</option>
                                        <option value="생성일">생성일</option>
                                        <option value="수정일">수정일</option>
                                    </select>
                                    <input
                                        type="text"
                                        readOnly="true"
                                        onChange={searchWordOnChangeHandler}
                                        className="border" style={{borderRadius: "4px"}} value={searchWord}/>
                                    <button
                                        onClick={searchBtn}
                                        className="ml-2 bg-blue-500 text-white w-14" style={{borderRadius: "4px"}}>검색
                                    </button>
                                </label>
                            ) : null}
                        </div>
                        <div
                            className="mt-10 gap-x-6 gap-y-8 sm:grid-cols-6 border-t border-gray-900/10 pt-12">
                            {/* 회원정보 리스트 */}
                            {showMemberList ? (
                                <table class="table-auto w-full border-collapse border border-gray-800">
                                    <tr className="text-center">
                                        <td class="border border-gray-800 px-4 py-2">회원번호</td>
                                        <td class="border border-gray-800 px-4 py-2">아이디</td>
                                        <td class="border border-gray-800 px-4 py-2">이름</td>
                                        <td class="border border-gray-800 px-4 py-2">닉네임</td>
                                        <td class="border border-gray-800 px-4 py-2 text-purple-700">
                                            <button onClick={memberSubChange}>멤버십</button>
                                        </td>
                                        <td class="border border-gray-800 px-4 py-2">전화번호</td>
                                        <td class="border border-gray-800 px-4 py-2 text-purple-700">
                                            <button onClick={memberStatusChange}>회원상태</button>
                                        </td>
                                    </tr>
                                    {memberList && memberList.length > 0 ? (
                                        memberList.map((v, i) =>
                                            (
                                                <tr key={i} className="text-center">
                                                    <td className="border border-gray-800 px-4 py-2">{v.memberNo}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.memberId}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.memberName}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.memberNickname}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.memberSub != 'N' ? (
                                                        <button
                                                            onClick={() => memberSubStatus(v.memberId, v.memberSub)}
                                                            className="text-blue-600">구독중</button>
                                                    ) : <button
                                                        onClick={() => memberSubStatus(v.memberId, v.memberSub)}
                                                        className="text-red">미가입</button>}
                                                    </td>
                                                    <td className="border border-gray-800 px-4 py-2">{formatPhoneNumber(v.memberTel)}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.memberDelete == 'N' ? (
                                                        <button
                                                            onClick={() => memberDeleteY(v.memberId)}
                                                            className="text-blue-600" type="button">
                                                            활성화</button>) : (
                                                        <button
                                                            onClick={() => memberDeleteN(v.memberId)}
                                                            className="text-red" type="button">정지</button>)}</td>
                                                </tr>
                                            )
                                        )
                                    ) : (<td className="text-red text-center" colSpan="7">검색된 정보가 없습니다.</td>)}
                                </table>) : showFreeBoardList ? (
                                // 자유게시판 리스트
                                <table className="table-auto w-full border-collapse border border-gray-800">
                                    <p className="w-60">총 {totalBoardListCount} 개의 게시물이 있습니다.</p>
                                    <tr className="text-center">
                                        <td className="border border-gray-800 px-4 py-2">번호</td>
                                        <td className="border border-gray-800 px-4 py-2">제목</td>
                                        <td className="border border-gray-800 px-4 py-2">아이디</td>
                                        <td className="border border-gray-800 px-4 py-2">작성일</td>
                                        <td className="border border-gray-800 px-4 py-2">조회수</td>
                                        <td className="border border-gray-800 px-4 py-2">삭제</td>
                                    </tr>
                                    {freeBoardList && freeBoardList.length > 0 ? (
                                        freeBoardList.map((v, i) =>
                                            (
                                                <tr key={i} className="text-center">
                                                    <td className="border border-gray-800 px-4 py-2">{v.freeBoardNo}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.freeTitle}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.memberId}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{new Date(v.createDate).toLocaleString('ko-kr', {
                                                        month: "long",
                                                        day: "numeric"
                                                    })}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.hits}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.status == 'Y' ? (
                                                        <button onClick={() => freeBoardStatusY(v.freeBoardNo)} className="text-blue-500" type="button">
                                                            활성화</button>) : (
                                                        <button onClick={() => freeBoardStatusN(v.freeBoardNo)} className="text-red" type="button">
                                                            비활성화</button>)}</td>
                                                </tr>
                                            )
                                        )
                                    ) : (<td className="text-red text-center" colSpan="7">검색된 정보가 없습니다.</td>)}
                                </table>
                            ) : showBookList ? (
                                // 도서 대여 이력 리스트
                                <table className="table-auto w-full border-collapse border border-gray-800">
                                    <tr className="text-center">
                                        <td className="border border-gray-800 px-4 py-2">도서 번호</td>
                                        <td className="border border-gray-800 px-4 py-2">도서명</td>
                                        <td className="border border-gray-800 px-4 py-2">대여일</td>
                                        <td className="border border-gray-800 px-4 py-2">반납예정일</td>
                                        <td className="border border-gray-800 px-4 py-2">실제 반납일</td>
                                        <td className="border border-gray-800 px-4 py-2">회원 아이디</td>
                                        <td
                                            className="border border-gray-800 px-4 py-2 text-purple-700">
                                            <button onClick={rentDelaySearch}>연체여부</button>
                                        </td>
                                    </tr>
                                    {/* 도서대여 이력이 한개이상 존재 할때나옴 */}
                                    {bookRentList && bookRentList.length > 0 ? (
                                        bookRentList.map((v, i) =>
                                            (
                                                <tr key={i} className="text-center">
                                                    <td className="border border-gray-800 px-4 py-2">{v.bookNo}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.bookName}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.rentStart}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.rentEnd}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.rentReturn}</td>
                                                    <td className="border border-gray-800 px-4 py-2">
                                                        <button className="text-blue-500 hover:bg-blue-100"
                                                                onClick={() => idClick(v.memberId)}>{v.memberId}</button>
                                                    </td>
                                                    <td className="border border-gray-800 px-4 py-2 text-red">{v.rentDelay == 'Y' ? 'Y' : null}</td>
                                                </tr>
                                            )
                                        )
                                    ) : (<td className="text-red text-center" colSpan="7">검색된 정보가 없습니다.</td>)}
                                </table>
                            ) : showPodcastList ? (
                                // 팟캐스트 리스트
                                <table className="table-auto w-full border-collapse border border-gray-800">
                                    <tr className="text-center">
                                        <td className="border border-gray-800 px-4 py-2">번호</td>
                                        <td className="border border-gray-800 px-4 py-2">제목</td>
                                        <td className="border border-gray-800 px-4 py-2">아이디</td>
                                        <td className="border border-gray-800 px-4 py-2">방송생성일</td>
                                        <td className="border border-gray-800 px-4 py-2 text-purple-700"><button onClick={orderByPodcastTime}>총 방송시간</button></td>
                                        <td className="border border-gray-800 px-4 py-2">ONAIR</td>
                                        <td className="border border-gray-800 px-4 py-2">조회수</td>
                                        <td className="border border-gray-800 px-4 py-2">삭제</td>
                                    </tr>
                                    {/* 도서대여 이력이 한개이상 존재 할때나옴 */}
                                    {podcastList && podcastList.length > 0 ? (
                                        podcastList.map((v, i) =>
                                            (
                                                <tr key={i} className="text-center">
                                                    <td className="border border-gray-800 px-4 py-2">{v.podcastBoardNo}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.podcastTitle}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.memberId}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.modifyDate}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.liveTime}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.onair}</td>
                                                    <td className="border border-gray-800 px-4 py-2">{v.hits}</td>
                                                    <td className="border border-gray-800 px-4 py-2">
                                                        <button className={`${v.status == 'Y' ? "text-blue-500" : "text-red-500"}`} onClick={() => updatePodcastStatus(v.podcastBoardNo,v.status)}>{v.status}</button>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (<td className="text-red text-center" colSpan="7">검색된 정보가 없습니다.</td>)}
                                </table>) : null}
                        < /div>
                        {showFreeBoardList ? (
                            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                                 className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-5 sm:px-6">
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                                     aria-label="Pagination">
                                    <a
                                        onClick={goClickPrev}
                                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <img
                                            src="/images/chevron-left-solid.svg"
                                            className="h-5 w-5" aria-hidden="true"
                                        />
                                    </a>
                                    {
                                        pageNumList.map(((v, i) => {
                                            return (
                                                <Link
                                                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                                    key={`page` + i}
                                                    state={{currentPage: currentPage}}
                                                    onClick={() => {
                                                        // 버튼 클릭 시 현재 페이지 번호 변화
                                                        setCurrentPage(v)
                                                        // 버튼 클릭 시 페이지 변화시킨 후 윈도우 창 올리기
                                                        window.scrollTo({
                                                            top: 0,
                                                            behavior: 'smooth',
                                                        });
                                                    }}>{v}</Link>
                                            )
                                        }))
                                    }

                                    <a
                                        onClick={goClickNext}
                                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        <span className="sr-only">Next</span>
                                        <img
                                            src="/images/chevron-right-solid.svg"
                                            className="h-5 w-5" aria-hidden="true"
                                        />
                                    </a>
                                </nav>
                            </div>) : null}
                    </div>
                </div>
            </section>
        </main>
    )
}