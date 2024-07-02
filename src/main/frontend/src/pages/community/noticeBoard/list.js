import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import '../../../css/boardList.css'
import {Link} from "react-router-dom";

export default function List() {
    // State 에 대한 Hook
    const [boardList, setBoardList] = useState([]);                       // 전체 게시글 리스트
    const [searchWord, setSearchWord] = useState(null);                           // 검색어
    const [searchType, setSearchType] = useState("noticeTitle");           // 검색 타입
    const [memberId, setMemberId] = useState(null);                               // 로그인한 회원 정보

    // 페이징 처리
    const [totalBoardListCount, setTotalBoardListCount] = useState(0);  // 전체 게시글 개수
    const [currentPage, setCurrentPage] = useState(1);                  // 현재 페이지 번호

    const [endPage, setEndPage] = useState(0);                          // 최대 페이지 번호
    const [pageNumList, setPageNumList] = useState([]);                  // 페이지 번호 리스트
    const pageNumListSize = 10;                                                       // 페이지 번호 개수
    const boardType = "noticeBoard";
    // URL 요청을 위한 게시판 종류
    // 현재 버튼이 몇번째 세트인지 나타내는 수
    const currentSet = Math.ceil(currentPage / pageNumListSize);

    // TODO
    // 공지사항으로 등록된 글에 대한 페이징 처리 | 안승환 | 06.28(금)
    // 화면, DB query 내용을 변경해 공지(announcement) 가 Y 로 등록된 게시글은
    // 모든 페이지에서 최상단에 고정되도록 지정

    // DB 로 게시글 리스트 조회
    const getData = async () => {
        const firstRecordIndex = (currentPage - 1) * pageNumListSize + 1; // 시작 페이지
        const res = await axios.get(`/${boardType}/list`,
            {
                params: {
                    firstRecordIndex: firstRecordIndex - 1,
                    searchWord: searchWord,
                    searchType: searchType,
                    pageNumListSize: pageNumListSize,
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
    const handleSearch = async () => {
        const data = {
            searchType: searchType,
            searchWord: searchWord,
        }
        const res =
            await axios.get(`/${boardType}/search`, data)
        if (res.data) {
            setBoardList(res.data)
        }
    }

    // 빈 문자열로 검색 시 모든 게시글 조회
    const allList = () => {
        setSearchWord("")
        getData();
    }

    // AMDIN 일때 게시글 삭제
    const goDelete = async (number) => {
        if (window.confirm("게시글 번호 : " + number + " 을 삭제합니까?")) {
            const res = await axios.put(`/${boardType}/delete`, null, {
                params: {
                    noticeBoardNo: number,
                }
            })
            getData(); // 삭제 후 게시글 재렌더링
        }
    }

    // 페이지 번호 그리기(번호 분할)
    const getPageNumList = (startNum) => {
        const list = [];
        for (let i = startNum; i < (startNum + pageNumListSize); i++) {
            if (i <= endPage) {
                list.push(i)
            }
        }
        setPageNumList(list);
        setCurrentPage(startNum);
    }

    // 사용자가 페이지 번호 클릭 시 실행
    useEffect(() => {
        getData();
    }, [currentPage]);

    const endNum = Math.ceil(totalBoardListCount / pageNumListSize);
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
        if (memberLog) {
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
            top: 10,
            behavior: 'smooth',
        });

        if (currentSet > 1) {
            getPageNumList(pageNumList[0] - pageNumListSize);
        } else {
            getPageNumList(1);
            return alert("첫번째 페이지입니다.");
        }
    }


    // 다음 페이지 버튼
    const goClickNext = () => {
        window.scrollTo({
            top: 10,
            behavior: 'smooth',
        })

        // currentPage 가 endPage 보다 작으면서, pageNumList[1,2,3,4,5] 길이(5) 와 pageNumListSize(5) 를
        // 나눈 나머지가 0일 때 2가지 조건을 동시에 만족하면 'Next Button' 이 실행됨
        // pageNumList.length % pageNumListSize == 0 의 의미는 마지막 page 가 아니라는 의미
        // 그러나 위 조건만으로 실행시키기에 만약 마지막 page 의 pageNumList 가 5일 경우 동작하므로
        // 또다른 조건인 currentPage < endPage 로 이를 보완하여 해결한다
        if (currentPage < endPage && pageNumList.length % pageNumListSize == 0) {
            getPageNumList(pageNumList[0] + pageNumListSize)
        } else {
            return alert("마지막 페이지입니다.");
        }
    }
    return (
        <article className="mt-32 ml-32 mr-32 rundry">
            <div className="text-black">
                <br/>
                <div className="text-center text-4xl mb-10">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA+VBMVEX////t8/TkAEjNAEEAZaP/mTPkAEbkE03t9PTjAEDveZfMADju+vraepHYAET/kxzpAET/kRH/5c+YMG7/9fnTKlYAX6DW4u3jADzpy9YAXJ8AYqGVPHfjAD7jADijwtlyn8T/lSaKqcn/+fP/7+Hs2uLiADLqT3b/vob/273/sGjnPGX/p1T/nTv/6tj/tHH2u8r/okj/y59BgbPwj6b31d//1LH4xtP+7vT84+ztb43mFVfyma70r77vgp7/q1v/xJLrXoHJXIYmdKxRi7i1zeCUt9KbjbBqPX7k7vWIPnrG2ehlk7xsZZm1TH1spcjadY7iACbnK2A2EYzuAAAFgUlEQVR4nO2ceXuiVhSHgSpKZlpGSx1GKxkGi4nGRJ04atQszWTaNOmW7/9hiqjI4hK9C0J/738+ysN5n3MvdzsiCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwZDDU4g6BJb0rxTbs0Ti1kteGIkuSJBu5ftyhsOHKmPpJrmM77mBYMDYkD9kYxh0OfQa2vDSUlHrc8dBnrPsEJbmaviQ2/SmUJH0Sd0DUyQUNq9dxB0SdkKFyFHdA1IFh8km9oZhyw7yYbkNRFPNpNhTFdBuKYroN82K6DcUlaTQUA9AytCzKYe6NKDIx7LZaJ7RD3YuwHyXD05aZzRa69OPdlagfFcPzMzU75YZFzLuQXyVIbmidzPyyZszNdKUeBcNu1pwJqp1YnzXr/EgNi51FAs1Ye+F6PzLDWqOw8DuJMYGrux8FQ+vWXDTQm3OmChvZrEdi+KVlLhJ4ytZhE1vyR2AYQwfUImzP396GtYu5X1a9qDH26l/e1ZtTfgrz/Vtmhl2vA54V2foNjyS9qsguP3wX5M0rDXffxThddsAvbP20I7u6DG5fw11zuJiiOX63jEeI3ihwosLH0Juise+AQlsJBsbF0DdFY9wBHUEjGBcXw4bKqQM6DMOC9Azf/Xo84+F96KbnBY5TtJewIEXDH0vlOffHgZsWXcNCg8cUzX/yTt8ws6BS/hq4bcc01SyXKZqWi6SQiWEmE1S0bhvsO6DLJJpCRoaZ8gMfpRB1hZth5XMcgpoSbaSsDDOZR45m7799cvltRSNlZlgKjxnsePxaLpdcfn/H0bDMzfAxU1rc9I90Gt5XvJv+TNMwsnqKy/CpnGFjuEsOi63CZtTG/vO5T6X4Da35wmID6v773s8HYFhUtxpmO3sbfjwAw1phq6DZ2Nvw4RD6YVfdQqFFsPDPMHqW7jRa1IqbOSdZOD6VPcWUjofCU6ZcqrikdE4jCOLx82eXP/WUGnoMIps0DA0rPNcWHk1+hpX7OARD1fVMDcvfYjEcSLz2aUIpPO3yOgq9jiaRiWEpuMK/UE31gs9x9orNNoqGldlCu1QuPYv+u7o7wmahy8Wxb4cV6Rn+9ffHGcehx2hxvufd4rJlGtkT5nFu0eFamXAZGhR5GFqN5dkah6Y6qSq8DZ2G6p2PqhwKFHpNfxp5nQF/WR4hcuiO7ZGtyzLZOf7OlQrWScHrjqyPgR164/ooN8vhmxD/MKvFqHndscCn2Gsw/MXhg5+ew5BhPc1ph+Np8JR8iLeLL1gZ8iypcYlE7fvKEWZhKFjOFG7u2GDfHSNh+74b9PMbO+T+tYnnN97IwbqyZqPhnV1vixscSepLl9VRLcbdcYPhlS4penOyXpGoRti6Vfl0x7WGg6a7zLLH6585hHXelq9Kkb6YxxpDbSy7Ezv9avppzROHuFbfm8ixnMdFwtYEbdg/Gs1mddW6tu53NAyXEzmG/7cIB/1ByeVkY164qDe1tb+kYzit5zOJzp22EjG0nYnqLF7ZuNr4W0r/e3ImcuoZwyEjYrhYHsv6KPoOCBaGjiPTRfFKQ1lWDPly5UuDxDx9Q7ZEDP81DL0q361/h0c+2Yai1m73+73XXZNMw/z2S7zLkmkobr/EuzCZhq/M4fzSJBq+Oofuxak3TMS7TQhaqZBMw/TnEIZBkvCuLzLD0H839DGjKEkgM7yuBg23TPdigcywZ/sF5RdGQRJBZijc+asC7IN8gynZeChoL147lY1LNiESQphDYVCf7VnJin6YgsSGgjB5sQ2Hu0N8ykwhNxSEYXvSP9z3JNMwPGxgmAJCRxI7jhaJIPU5/B8YhhzjDoYR6TcEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASeM/Euuu6X8rPAsAAAAASUVORK5CYII=" className="w-48"
                         style={{display: "flex", margin: "auto"}}/>
                    공지사항
                </div>


                <span className="left py-5">총 {totalBoardListCount} 개의 게시물이 있습니다.</span>
                <span className="right">
                    <select onChange={searchTypeOnChangeHandler}>
                        <option value="제목">제목</option>
                        <option value="글쓴이">글쓴이</option>
                    </select>
                    <input
                        onChange={searchKeywordOnChangeHandler}
                        style={{border: "0.5px solid black"}}
                        className="rounded-xl"
                        type="text" value={searchWord}/>

                    <button
                        onClick={handleSearch}
                        name="검색"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 mb-1 ml-1 px-4 rounded-full">
                검색        </button>
                </span>
                <br/>
                <table>
                    <thead>
                    <tr style={{textAlign: "center"}}>
                        <th className="small-col">번호</th>
                        <th className="large-col">제목</th>
                        <th className="sl-col">글쓴이</th>
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
                        <tr key={i} className={board.announcement === 'Y' ? "bg-red-400 text-white" : ""}>
                            <td className="center small-col">
                                <Link
                                    to={`/community/${boardType}/view`}
                                    state={board.noticeBoardNo}>
                                    {board.noticeBoardNo}
                                </Link>
                            </td>
                            <td className="left large-col">
                                <Link
                                    to={`/community/${boardType}/view`}
                                    state={board.noticeBoardNo}>
                                    {board.noticeTitle}
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
                            })}
                            </td>
                            <td className="center small-col">{board.hits}</td>
                            {memberId && memberId.memberAdmin === 'ADMIN' ?
                                <td className="center small-col">
                                    <button
                                        onClick={() => goDelete(board.noticeBoardNo)}
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