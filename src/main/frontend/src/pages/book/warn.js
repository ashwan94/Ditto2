import {useEffect, useState} from "react";
import {Link, useParams, useSearchParams} from "react-router-dom";
import axios from "axios";
import "../../css/board.css"

export default function BookWarn() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    }, []);



    return (
        <main>
            <section className="gj do hj sp jr i pg rundry">
                <div className="bb ze ki xn 2xl:ud-px-0">
                    <div className="bb ze ki xn 2xl:ud-px-0 mb-8" style={{borderTop: "1px solid lightgray"}} />
                        <div>
                            <img
                                className="rounded-xl"
                                src="https://png.pngtree.com/thumb_back/fw800/background/20230516/pngtree-the-inside-of-a-library-with-lots-of-books-image_2546224.jpg"
                                alt="Example"
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            />
                            <div style={{
                                display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"
                            }} className="mt-9 text-lg">
                                책을 깨끗하게 사용해주세요<br/> 우리 모두가 함께 사용하는 소중한 책들입니다. <br/>다음 이용자를 위해 책을 소중히 다뤄주세요.<br/> 감사합니다!
                            </div>
                            <Link to={`/book/list`}>
                                <button
                                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mx-2">
                                    소장 도서 목록 보러 가기
                                </button>
                            </Link>

                            <div className="bb ze ki xn 2xl:ud-px-0 text-xl mt-14 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="size-6">
                                    <path fillRule="evenodd"
                                          d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                                          clipRule="evenodd"/>
                                </svg>
                                도서 대여 안내
                            </div>

                            <table className="board-table mt-5" style={{fontSize: "20px"}}>
                                <thead>
                                <th style={{background: "lightgray", borderRight: "1px solid white"}} scope="col"
                                    className="th-num">구분
                                </th>
                                <td style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background: "lightgray"
                                }}>
                                    내용

                                </td>
                                </thead>
                                <tbody>
                                <tr>
                                    <th style={{background: "lightgray"}} scope="col" className="bookDetailTitle">대상
                                    </th>
                                    <td scope="col">한석줍쇼 회원증 소지자, 한석줍쇼 공유오피스 입주자</td>
                                </tr>
                                <tr>
                                    <th style={{background: "lightgray"}} scope="col" className="bookDetailTitle">대출방법
                                    </th>
                                    <td>본인의 한석줍쇼 회원증 제시 <br/>
                                        - 타인의 회원증으로 대출불가
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{background: "lightgray"}} scope="col" className="bookDetailTitle">대출권수
                                    </th>
                                    <td>1인당 3권</td>
                                </tr>
                                <tr>
                                    <th style={{background: "lightgray"}} scope="col" className="bookDetailTitle">대출기간
                                    </th>
                                    <td>14일간</td>
                                </tr>
                                <tr>
                                    <th style={{background: "lightgray"}} scope="col"
                                        className="bookDetailTitle white-space: nowrap">대출제한
                                    </th>
                                    <td>희귀자료, 참고자료, 귀중자료, 연속간행물, 기타 관장이 필요하다고 인정한 자료</td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="bb ze ki xn 2xl:ud-px-0 text-xl mt-14 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="size-6">
                                    <path fillRule="evenodd"
                                          d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                                          clipRule="evenodd"/>
                                </svg>
                                도서 반납 안내
                            </div>

                            <table className="board-table mt-5" style={{fontSize: "20px"}}>
                                <thead>
                                <th style={{background: "lightgray", borderRight: "1px solid white"}} scope="col"
                                    className="th-num">구분
                                </th>
                                <td style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background: "lightgray"
                                }}>
                                    내용

                                </td>
                                </thead>
                                <tbody>
                                <tr>
                                    <th style={{background: "lightgray"}} scope="col" className="bookDetailTitle">도서반납
                                    </th>
                                    <td scope="col">- 연체 시 연체일수만큼 대출 정지<br/>
                                        - 공유오피스 곳곳에 위치한 도서반납함에 반납 가능 (반납함 도서는 익일 처리) <br/>
                                        ※ 반납연체도서 문자알림 서비스는 제공되지 않을 수 있음
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{background: "lightgray"}} scope="col" className="bookDetailTitle">자료변상
                                    </th>
                                    <td>도서관 자료를 훼손 또는 분실하였을 경우 <br/>
                                        - 동일 자료로 변상 <br/>
                                        - 절판등의 사유로 동일자료로 대체가 불가할 경우 현금변상 <br/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            </section>
    </main>
)

}
