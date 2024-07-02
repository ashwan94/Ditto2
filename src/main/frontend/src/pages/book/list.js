import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


export default function BookList() {

    /**
     * 작성자 : 박연지
     * 도서 리스트 출력 코드
     * getDate() : 화면 첫 랜더링 시 도서 목록 가져오는 함수
     * */

    /* 도서 리스트 */
    const [bookList, setBookList] = useState([]);
    /* 현재 페이지 */
    const [currentPage, setCurrentPage] = useState(1);
    /* 한 페이지에 보일 게시글의 개수 */
    const recordsPerPage = 10;
    /* 도서 목록 개수 */
    const [resultCount, setResultCount] = useState(0)

    /* 검색 단어, 검색 타입(제목/저자) */
    const [searchWord, setSearchWord] = useState("")
    const [searchType, setSearchType] = useState("bookName")


    /* 화면에 도서 목록을 그리는 getData 함수 */
    const getData = async () => {
        try {
           if(searchWord != ""){
               const res = await axios.get("/book/list", {
                   params: {
                       firstRecordIndex: 0,
                       searchWord: searchWord,
                       searchType: searchType
                   }
               });

               setBookList(res.data.list);
               setResultCount(res.data.list.length);

               return;
           }

            let fristRecordIndex = (currentPage - 1) * 10 + 1;  // 페이지시작
            const res = await axios.get("/book/list", {
                params: {
                    firstRecordIndex: fristRecordIndex - 1,
                    searchWord: searchWord,
                    searchType: searchType
                }
            });
            setBookList(res.data.list);
            setResultCount(res.data.list.length);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    /* 검색 기능을 위한 검색 키워드, 검색 타이틀 체인지 핸들러 */
    const searchWordOnChangeHandler = (e) => {
        setSearchWord(e.target.value)
    }
    const searchTypeOnChangeHandler = (e) => {
        setSearchType(e.target.value)
    }

    /* 현재 페이지가 바뀔 때마다 도서 목록을 교체하기 위한 useEffect 훅 */
    useEffect(() => {
        getData();
    }, [currentPage]);

    /* 페이지네이션 관련 변수 선언 */
    const totalCount = 335; //책목록 전체건수
    const [pageNumList, setPageNumList] = useState([]); //페이지번호 목록
    const pageNumListSize = 10; //페이지 번호 목록(10개)
    const totalPageNum = Math.ceil(totalCount / pageNumListSize); // 최대 페이지 번호
    // 현재 버튼이 몇번째 세트인지 나타내는 수
    const currentSet = Math.ceil(currentPage/pageNumListSize);


    /* 페이지 번호 그리는 함수 */
    const getPageNumList = (startNum) => {
        const list = []
        for (let i = startNum; i < (startNum + pageNumListSize); i++) {
            if (i <= totalPageNum) {
                list.push(i)
            }
        }
        setPageNumList(list)
        setCurrentPage(startNum)
    }

    /* 처음에 pageNumList가 비어있는 값이면 버튼을 그리지 못하므로 1로 default 값 주기 */
    useEffect(() => {
        getPageNumList(1)
    }, []);


    /* 이전 버튼 클릭 이벤트 */
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

    /* 이후 버튼 클릭 이벤트 */
    const goClickNext = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        if (currentPage < totalPageNum && pageNumList.length % pageNumListSize == 0) {
            getPageNumList(pageNumList[0] + 10)

        }
        else {
            return alert("정보가 없습니다.")
        }
    }
    /* 검색 버튼 이벤트 */
    const searchBook = (e) => {
        getData();

        /* 도서 목록 가져온 후 랜더링 두 번되는 것 막기 */
        e.preventDefault();
    }

    return (
        <main>
            <section className="gj do hj sp jr i pg rundry">
                <div className="bb ze ki xn 2xl:ud-px-0" >
                    <div id="board-search">
                        <form action={`/book/list?searchWord=${searchWord}`} method="get">
                            <label>
                                <select name="searchType" onChange={searchTypeOnChangeHandler}>
                                    <option value="bookName">제목</option>
                                    <option value="bookAuthor">저자</option>
                                </select>
                            </label>
                            <label>
                                <input onChange={searchWordOnChangeHandler} type="text" name="searchWord"
                                       placeholder="검색어를 입력해주세요."/>
                            </label>
                            <button type="text" onClick={searchBook} className="btn btn-dark">검색</button>
                        </form>
                    </div>

                    <div className="border-2 mt-5"/>

                    {bookList && bookList.length > 0 ? (
                        bookList.map((v, i) => (
                            <ul role="list" className="divide-y divide-gray-100" key={`bookList` + i}>
                                <Link to={`/book/view?bookNo=${v.bookNo}`}>
                                    <li className="flex justify-between gap-x-6 py-5">
                                        <div className="flex min-w-0 gap-x-4">
                                            <img className="h-60 w-60 flex-none rounded-md bg-gray-50 border-2 p-1"
                                                 src={v.bookImage}
                                                 alt={v.bookName}/>
                                            <div className="min-w-0 flex-auto mt-5 ml-5">
                                                <p className="text-xl font-bold leading-6 text-gray-900">
                                                    {v.bookName}
                                                </p>
                                                <p className="text-sm font-bold leading-6 text-black">저자
                                                    : {v.bookAuthor}</p>
                                                <p className="text-sm font-bold text-black">출판사 : {v.bookCompany}</p>
                                                <p className="mt-1 text-sm leading-5 text-gray-500">출판날짜
                                                    : {v.bookRelease}</p>
                                                <p className="mt-1 truncate text-sm leading-5 text-gray-900">책 소개
                                                    : {v.bookIntro}</p>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                            </ul>
                        ))
                    ) : (
                        null
                    )
                    }
                    {bookList.length < 10 && currentPage != totalPageNum ? null :
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
                                                to={`/book/list?currentPageNo=${v}`} onClick={() => {
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
                        // 버튼 끝
                    }

                </div>
            </section>
        </main>
    )
        ;
}


