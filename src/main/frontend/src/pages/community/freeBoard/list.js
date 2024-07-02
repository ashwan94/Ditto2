import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import '../../../css/boardList.css'
import {Link} from "react-router-dom";

export default function List () {
    // State 에 대한 Hook
    const [boardList, setBoardList] = useState([]);                       // 전체 게시글 리스트
    const [searchWord, setSearchWord] = useState(null);                           // 검색어
    const [searchType, setSearchType] = useState("제목");           // 검색 타입
    const [memberId, setMemberId] = useState(null);                               // 로그인한 회원 정보

    // 페이징 처리
    const [totalBoardListCount, setTotalBoardListCount] = useState(0);  // 전체 게시글 개수
    const [currentPage, setCurrentPage] = useState(1);                  // 현재 페이지 번호


    const [endPage, setEndPage] = useState(0);                          // 최대 페이지 번호
    const [pageNumList, setPageNumList] = useState([]);                  // 페이지 번호 리스트
    const pageNumListSize = 10;                                                       // 페이지 번호 개수
    const boardType = "freeBoard";                                                    // URL 요청을 위한 게시판 종류
    // 현재 버튼이 몇번째 세트인지 나타내는 수
    const currentSet = Math.ceil(currentPage/pageNumListSize);
    const endNum = Math.ceil(totalBoardListCount / pageNumListSize);
    // DB 로 게시글 리스트 조회
    const getData = async () => {
        const firstRecordIndex = (currentPage - 1) * pageNumListSize + 1; // 시작 페이지
        const res = await axios.get(`/${boardType}/list`,
            {
                params:{
                    firstRecordIndex:firstRecordIndex - 1,
                    pageNumListSize:pageNumListSize
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
        const firstRecordIndex = (currentPage - 1) * pageNumListSize + 1; // 시작 페이지
        const res = await axios.get(`/${boardType}/list`,
            {
                params:{
                    firstRecordIndex:firstRecordIndex - 1,
                    searchWord:searchWord,
                    searchType:searchType,
                    pageNumListSize:pageNumListSize
                }
            })
        if (res.data) {
            setBoardList(res.data.boardList);                  // 전체 게시글 목록
            setTotalBoardListCount(res.data.boardListCount);   // 전체 게시글 개수(전체 페이지 번호를 위해 필요함)
        }
    }

    // 목록버튼클릭시 전체 목록 조회
    const allList = () =>{
        setSearchWord("")
        getPageNumList(1);
        getData();
    }

    // AMDIN 일때 게시글 삭제
    const goDelete = async (number)=> {
        if(window.confirm("게시글 번호 : " + number + " 을 삭제합니까?")){
            const res = await axios.put(`/${boardType}/delete`, null,{
                params:{
                    freeBoardNo : number,
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

    // 사용자가 페이지 번호 클릭 시 실행
    useEffect(() => {
        if (searchWord == ""){
            getData();
        }else {
            handleSearch();
        }
    }, [currentPage]);

    // 전체 페이지 번호 개수 구하기
    useEffect(() => {
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

        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    }, []);

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
    return (
        <article className="mt-32 ml-32 mr-32 rundry">
            <div className="text-black">
                <br/>

                <div className="text-center text-4xl mb-10">
                    <img src="https://cdn-icons-png.flaticon.com/512/4812/4812731.png" className="w-48" style={{display:"flex", margin:"auto"}}/>
                    자유게시판
                </div>

                <span>총 {totalBoardListCount} 개의 게시물이 있습니다.</span>
                <span className="right">
                    <select onChange={searchTypeOnChangeHandler}>
                        <option value="제목">제목</option>
                        <option value="아이디">아이디</option>
                    </select>
                    <input
                        onChange={searchKeywordOnChangeHandler}
                        style={{border: "0.5px solid black"}}
                        className="rounded-xl"
                        type="text" value={searchWord}/>
                    <button
                        onClick={()=> {getPageNumList(1); handleSearch(); }}
                        name="검색" className="gradient">
                        검색
                    </button>
                </span>
                <br/>
                <table>
                    <thead>
                    <tr className="text-center">
                        <th className="small-col">번호</th>
                        <th className="large-col">제목</th>
                        <th className="sl-col">아이디</th>
                        <th className="middle-col">작성일</th>
                        <th className="small-col">조회수</th>
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
                                <Link
                                    to={`/community/${boardType}/view`}
                                    state={board.freeBoardNo}>
                                    {board.freeBoardNo}
                                </Link>
                            </td>
                            <td className="left large-col">
                                <Link
                                    to={`/community/${boardType}/view`}
                                    state={board.freeBoardNo}>
                                    {board.freeTitle}
                                </Link>
                                {board.commentCount
                                    ?
                                    <span className="ms-2 text-red-400 font-bold">({board.commentCount})</span>
                                    :
                                    null
                                }
                            </td>
                            <td className="center small-col">{board.memberId}</td>
                            <td className="center sl-col">{new Date(board.createDate).toLocaleString('ko-kr', {
                                month: "long",
                                day: "numeric"
                            })}</td>
                            <td className="center small-col">{board.hits}</td>
                            {memberId && memberId.memberAdmin === 'ADMIN' ?
                                <td className="center small-col">
                                    <button
                                        onClick={() => goDelete(board.freeBoardNo)}
                                        className="text-red-700">v
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

            <span className="right mt-3">
                    <Link to={`/community/${boardType}/list`}><button
                        className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-1 mb-1 ml-1 px-4 rounded-full"
                        onClick={allList}>목록</button></Link>
                    <Link to={`/community/${boardType}/add`}><button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 mb-1 ml-1 px-4 rounded-full">글쓰기</button></Link>
            </span>


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
                                    state={{currentPage:currentPage}}
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