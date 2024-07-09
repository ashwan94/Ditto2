import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import '../../../css/boardList.css'
import {Link, useNavigate} from "react-router-dom";
import PodcastBoardAdd from "../podcastBoard/add"
export default function List () {
    // State 에 대한 Hook
    const [boardList, setBoardList] = useState([]);                       // 전체 게시글 리스트
    const [searchWord, setSearchWord] = useState("");                           // 검색어
    const [searchType, setSearchType] = useState("podcastTitle");           // 검색 타입
    const [memberId, setMemberId] = useState(null);                               // 로그인한 회원 정보

    // 페이징 처리
    const [totalBoardListCount, setTotalBoardListCount] = useState(0);  // 전체 게시글 개수
    const [currentPage, setCurrentPage] = useState(1);                  // 현재 페이지 번호

    const [endPage, setEndPage] = useState(0);                          // 최대 페이지 번호
    const [pageNumList, setPageNumList] = useState([]);                  // 페이지 번호 리스트
    const pageNumListSize = 10;                                                       // 페이지 번호 개수
    const boardType = "podcastBoard";                                                 // URL 요청을 위한 게시판 종류
    const navigator = useNavigate();
    const [close, setClose] = useState(false);      // 글쓰기 창 띄우기

    // DB 로 게시글 리스트 조회
    const getData = async () => {
        const firstRecordIndex = (currentPage - 1) * pageNumListSize + 1; // 시작 페이지
        const res = await axios.get(`/${boardType}/list`,
            {
                params:{
                    firstRecordIndex:firstRecordIndex - 1,
                    searchWord:searchWord,
                    searchType:searchType,
                    pageNumListSize:pageNumListSize,
                }
            })
        if (res.data) {
            setBoardList(res.data.boardList);                  // 전체 게시글 목록
            setTotalBoardListCount(res.data.boardListCount);   // 전체 게시글 개수(전체 페이지 번호를 위해 필요함)
        }
    }

    // 검색 버튼에 대한 handler
    const searchKeywordOnChangeHandler = useCallback((e) => {
        setSearchWord(e.target.value);
    }, []);

    const searchTypeOnChangeHandler = useCallback((e) => {
        setSearchType(e.target.value);
    }, []);

    // 검색 기능에 대한 게시글 조회
    const handleSearch = async  () => {
        const data = {
            searchType : searchType,
            searchWord : searchWord,
        }
        const res =
            await axios.get(`/${boardType}/search`, data)
        if (res.data) {
            setBoardList(res.data)
        }
    }

    // 빈 문자열로 검색 시 모든 게시글 조회
    const allList = () =>{
        setSearchWord("")
        getData();
    }

    // AMDIN 일때 게시글 삭제
    const goDelete = async (number)=> {
        if(window.confirm("게시글 번호 : " + number + " 을 삭제합니까?")){
            const res = await axios.put(`/${boardType}/delete`, null,{
                params:{
                    podcastBoardNo : number,
                }
            })
            getData(); // 삭제 후 게시글 재렌더링
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

    // 화상회의 플레이어로 이동
    // 로그인된 회원의 nickname, 선택된 게시글의 title 을 query string 으로 전달Z
    const checkMember = (boardInfo) => {
        if(!memberId){
            alert("로그인 후 이용 가능합니다.");
            navigator("/signIn")
        }else{
            if(memberId.memberSub === 'Y'){
                goLive(boardInfo);
            }else{
                alert("멤버십 구독이 필요합니다.");
            }
        }
    }

    // 클릭된 게시글 LIVE 상태로 변경하기
    const goLive = async (e) => {
        if(memberId.memberId === e.memberId){
            if(window.confirm("방송을 시작하시겠습니까?")){
                const boardNo = e.podcastBoardNo;
                const data = {
                    memberId : memberId.memberId,
                    podcastBoardNo : boardNo,
                    onair:'LIVE',
                }
                const res = await axios.post("/podcastBoard/update", data)
                if(res.status === 200){
                    // alert("방송 시작 성공")
                    window.location.href = `https://192.168.0.175:3001?nickName=${encodeURI(memberId.memberNickname)}&boardTitle=${encodeURI(e.podcastTitle)}&podcastBoardNo=${e.podcastBoardNo}`
                }
            }
        }else{
            // 방송 진행 중인지 아닌지 판별
            if(e.onair === 'LIVE'){
                // alert("라이브 방송 중입니다.");
                window.location.href = `https://192.168.0.175:3001?nickName=${encodeURI(memberId.memberNickname)}&boardTitle=${encodeURI(e.podcastTitle)}&podcastBoardNo=${e.podcastBoardNo}`
            }else{
                alert("방송 준비 중입니다. 잠시만 기다려주세요.");
            }
        }
    }

    const checkAdd = () => {
        if(!memberId){
            alert("로그인 후 이용 가능합니다.")
            navigator("/signIn")
        }else{
            if(memberId.memberSub === 'Y'){
                setClose(true);
            }else{
                alert("멤버십 가입이 필요한 서비스입니다!");
            }
        }
    }

    // 사용자가 페이지 번호 클릭 시 실행
    useEffect(() => {
        getData();
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

    useEffect(() => {
        getData()
        const memberLog = sessionStorage.getItem("member")
        if(memberLog){
            setMemberId(JSON.parse(memberLog)); // 필요한 경우 memberId, memberNickname, memberAdmin 등에서 data 꺼내쓰기
        }
    }, []);

    // 이전 페이지 버튼
    const goClickPrev = () => {
        window.scrollTo({
            top:10,
            behavior:'smooth',
        });

        if(currentPage > 1) {
            getPageNumList(pageNumList[0] - pageNumListSize);
        }else{
            getPageNumList(1);
            return alert("1번째 페이지입니다.");
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

    // 글쓰기 mount
    const goClose = ({close, content}) => {
        setClose(close)
        getData();
    }

    return (
        <article className="mt-32 ml-32 mr-32 rundry">
            <div className="text-black">
                <br/>
                <div className="text-center text-4xl mb-10">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC4Fg7lReTSEUCcSPBbzNa7fhipRxY0BgAgg&s"
                        className="w-48 py-5"
                        style={{display: "flex", margin: "auto"}}/>
                    하브루타
                </div>
                <div className="relative">
                    {close
                        ?
                        <div className="absolute inset-0 z-50 flex justify-end -top-52 -right-36">
                            <PodcastBoardAdd goClose={goClose} close={close} memberId={memberId}/>
                        </div>
                        :
                        null}
                </div>
                <span>총 {totalBoardListCount} 개의 게시물이 있습니다.</span>
                <span className="right mt-3">
                    <select onChange={searchTypeOnChangeHandler}>
                        <option value="제목">제목</option>
                        <option value="호스트">호스트</option>
                    </select>
                    <input
                        onChange={searchKeywordOnChangeHandler}
                        style={{border: "0.5px solid black"}}
                        className="rounded-xl"
                        type="text" value={searchWord}/>
                    <button
                        onClick={handleSearch}
                        name="검색"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 mb-1 ml-1 px-4 rounded-full me-10">
                        검색
                    </button>
                    <Link to={`/community/${boardType}/list`}><button
                        className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-1 mb-1 ml-1 px-4 rounded-full"
                        onClick={allList}>목록</button></Link>
                    <button
                        onClick={checkAdd}
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 mb-1 ml-1 px-4 rounded-full">글쓰기</button>
            </span>
                <br/>
                <table>
                    <thead>
                    <tr className="text-center">
                        <th className="small-col">번호</th>
                        <th className="large-col">제목</th>
                        <th className="large-col">호스트</th>
                        <th className="middle-col">생성일</th>
                        {memberId && memberId.memberAdmin === 'ADMIN' ?
                            <th className="small-col">삭제</th>
                            :
                            null
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {boardList && boardList.map((board, i) => (
                        <tr key={i}>
                            <td className="center small-col">
                                <button
                                    type="button"
                                    onClick={() => checkMember(board)}>
                                    {board.podcastBoardNo}
                                </button>
                            </td>
                            <td className="left large-col">
                                <button
                                    type="button"
                                    onClick={() => checkMember(board)}>
                                    {board.podcastTitle}&nbsp;&nbsp;{board.onair === 'LIVE' ?
                                    <img src="/images/onair.png" className="w-10 inline"/> : null}
                                </button>
                                {board.hits
                                    ?
                                    <span>
                                        {board.onair === 'LIVE'
                                            ?
                                            <img src="/images/onair.png" className="w-10 inline"/>
                                            :
                                            null
                                        }
                                        </span>
                                    :
                                    null
                                }
                            </td>
                            <td className="center small-col">{board.memberNickname}</td>
                            <td className="center sl-col">{new Date(board.createDate).toLocaleString('ko-kr', {
                                month: "long",
                                day: "numeric"
                            })}</td>
                            {memberId && memberId.memberAdmin === 'ADMIN' ?
                                <td className="center small-col">
                                    <button
                                        onClick={() => goDelete(board.podcastBoardNo)}
                                        className="text-red-700">
                                    </button>
                                </td>
                                :
                                null
                            }
                        </tr>
                    ))}
                    </tbody>
                </table>
                <br/>
            </div>
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
                                    to={`/community/${boardType}/list`}
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
            </div>
        </article>
    );
};