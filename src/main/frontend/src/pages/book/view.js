import React, {useEffect, useState} from "react";
import {Link, useParams, useSearchParams} from "react-router-dom";
import axios from "axios";
import "../../css/board.css"

export default function BookView() {


    /**
     * 작성자 : 박연지
     * 도서 리스트 출력 코드
     * getBook() : 화면 첫 랜더링 시 도서 정보 가져오는 함수
     * */


    /* 도서 정보 */
    const [book, setBook] = useState({});

    /* 도서 대여 가능 여부 */
    const [bookRent, setBookRent] = useState(true);
    const memberObj = JSON.parse(sessionStorage.getItem("member"));

    /* url 로 받은 도서 번호 */
    const [searchParams, setSearchParams] = useSearchParams();

    /* ?bookNo=n 의 n의 값을 bookNo로 저장해두기 */
    const bookNo = searchParams.get("bookNo");

    /* 첫 랜더링 시 가져올 도서 정보 */
    const getBook = async () => {
        try {
            const res = await axios.get("/book/view", {
                params: {
                    bookNo: bookNo
                }
            });
            setBook(res.data);
            if (res.data.bookRent == 'N') {
                // 대출 가능
                setBookRent(true)
            } else if (res.data.bookRent == 'Y') {
                setBookRent(false);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    /**
     * 작성자 : 박연지
     * 도서 대여 기능 구현 파트
     * checkRentCount() : 회원 번호 조회 후 최대 대출 가능 횟수 파악
     * bookRentEvent
     * */

        // 도서 대여 버튼 클릭 이벤트
    const bookRentEvent = async () => {
            if (!bookRent) {
                alert("다른 사용자가 이미 대여중인 도서입니다.");
                return;
            } else {
                // 다른 사용자가 이미 대여중이 아닌 경우
                // 도서 대여 절차 진행
                const res = await axios.post("/book/checkOverdueDays", null, {
                    params: {
                        memberNo: memberObj.memberNo
                    }
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                sessionStorage.setItem("bookRent", JSON.stringify("ok")) // 대여했을때 마이페이지이동시 대여리스트 띄우도록
                console.log("연체날수: ", res.data)

                // 책의 대여 여부 확인 대여가능/대여불가
                if (!bookRent) {
                    alert("다른 사용자가 이미 대여중인 도서입니다.");
                    return;
                } else {
                    // 다른 사용자가 이미 대여중이 아닌 경우
                    // 도서 대여 절차 진행

                    // 회원의 연체 이력 조회(연체날수 체크)
                    const res = await axios.post("/book/checkOverdueDays", null, {
                        params: {
                            memberNo: memberObj.memberNo
                        }
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    // 연체날수가 0이상인 경우 대여 금지
                    if (res.data > 0) {
                        return alert(`연체된 날수가 ${res.data}일 있습니다. 연체된 날수만큼 대여가 불가능합니다.`)


                        // 최대 대출 가능 횟수 확인 (res.data가 3이하인 경우에만 대여 가능)
                    } else if (res.data < 0 || !res.data) {
                        const response = await axios.post("/book/checkRentCount", null, {
                            params: {
                                memberNo: memberObj.memberNo
                            }
                        }, {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })

                        if (response.data >= 3) {
                            return alert("도서 대여 최대 권수는 3권입니다.")

                        }
                        // 연체 이력이 없는 경우 도서 대출 진행
                        const res = await axios.post("/book/rent", null, {
                            params: {
                                bookNo: bookNo,
                                bookName: book.bookName,
                                memberNo: memberObj.memberNo,
                                memberId: memberObj.memberId
                            }
                        }, {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });

                        // 연체 이력 없고 최대 대출 가능 권수를 넘지 않은 경우 도서 대여 진행 및
                        // 도서의 상태값 변경
                        if (res.status == 200) {
                            // 도서 대여 상태 변경
                            updateBookStatus();
                            alert("도서 대여 성공");
                            window.location.href = '/mypage';
                            // 회원가입 후 처리 로직
                        } else {
                            alert("도서 대여 실패, 다시 시도해주세요.");
                        }
                    }
                }
            }
        }
    /* 도서 대여 시 대출가능 -> 대출불가로 상태 변화 함수 */
    const updateBookStatus = async () => {
        const res = await axios.post("/book/status", null, {
            params: {
                bookNo: bookNo
            }
        })
        if (res.status == 200) {
            console.log(res)
        }
    }


    /* 페이지 이동 시 window 가장 상단으로 위치 조정 */
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
        getBook();
    }, []);


    return (
        <main>
            <section className="gj do hj sp jr i pg rundry container">
                <div className="bb ze ki xn 2xl:ud-px-0 mb-8"

                     style={{
                         borderTop: "1px solid lightgray",
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center"
                     }}>
                    <div className="page-title">
                        <div>
                            <img
                                src="https://i0.wp.com/library.re.kr/wp-content/uploads/2022/08/social-1024x512-1.jpeg"
                                alt="Example"
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            />
                        </div>
                    </div>


                    <div id="board-list" className="rundry">
                        <div className="container">


                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center"
                            }} className="mt-14 border-2 py-5 rounded-xl text-lg">
                                <img
                                    src="https://img.freepik.com/premium-vector/notification-message-bell-icon-alert-alarm-icon-3d-vector-illustration_365941-650.jpg"
                                    className="w-75 h-60"/>
                                책을 깨끗하게 사용해주세요<br/> 우리 모두가 함께 사용하는 소중한 책들입니다. <br/>다음 이용자를 위해 책을 소중히 다뤄주세요.<br/> 감사합니다!
                            </div>
                            <div style={{marginTop: "4%", marginBottom: "2%"}}>
                                {memberObj ? <button
                                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded my-2"
                                    onClick={bookRentEvent}>
                                    도서 대여
                                </button> : null}


                                <Link to={`/book/list`}>
                                    <button
                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mx-2">
                                        목록
                                    </button>
                                </Link>
                            </div>
                            <table className="board-table" style={{fontSize: "15px"}}>
                                <thead>
                                <th style={{background: "lightgray"}} scope="col" className="th-num">표지</th>
                                <td style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

                                    <img
                                        src={book.bookImage}
                                        alt="책 표지"
                                        className="flex justify-center items-center"
                                    />
                                </td>
                                </thead>
                                <tbody>
                                <tr>
                                    <th style={{background: "lightgray"}} scope="col" className="bookDetailTitle">번호
                                    </th>
                                    <td scope="col">{book.bookNo}</td>
                                </tr>
                                <tr>
                                    <th style={{background: "lightgray"}} scope="col" className="bookDetailTitle">제목
                                    </th>
                                    <td>{book.bookName}</td>
                                </tr>
                                <tr>
                                    <th style={{background: "lightgray"}} scope="col" className="bookDetailTitle">저자
                                    </th>
                                    <td>{book.bookAuthor}</td>
                                </tr>
                                <tr>
                                    <th style={{background: "lightgray"}} scope="col" className="bookDetailTitle">출판사
                                    </th>
                                    <td>{book.bookCompany}</td>
                                </tr>
                                <tr>
                                    <th style={{background: "lightgray"}} scope="col"
                                        className="bookDetailTitle white-space: nowrap">도서설명
                                    </th>
                                    <td>{book.bookIntro}</td>
                                </tr>
                                <tr>
                                    <th style={{background: "lightgray"}} scope="col" className="bookDetailTitle">해당년월
                                    </th>
                                    <td>{book.bookRelease}</td>
                                </tr>
                                <tr>
                                    <th style={{background: "lightgray"}} scope="col"
                                        className="bookDetailTitle">대출가능<br/>여부
                                    </th>
                                    <td>
                                        {bookRent ? <img
                                                src="/images/book_possible.png"
                                                alt="대출 가능"
                                                className="flex justify-center items-center"
                                                style={{width: "50px", height: "50px", marginLeft: "48%"}}/>
                                            : <img
                                                src="/images/book_impossible.png"
                                                alt="대출 불가능"
                                                className="flex justify-center items-center"
                                                style={{width: "50px", height: "50px", marginLeft: "48%"}}/>
                                        }
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )

}
