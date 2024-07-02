import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import '../../../css/boardDetail.css';

export default function View() {
    const [board, setBoard] = useState([]);                     // 해당 게시글의 상세 정보
    let freeBoardNo = useLocation().state;                                            // 이전 page 에서 전달받은 freeBoardNo
    const boardType = "freeBoard";                                           // URL 요청을 위한 주소

    const navigate = useNavigate();
    const [memberLog, setMemberLog] = useState("");            // 로그인된 회원 정보

    const [commentList, setCommentList] = useState([]);         // 해당 게시글의 모든 댓글 리스트
    const [commentContent, setCommentContent] = useState("");  // 댓글 내용
    const typeRef = useRef("");              // 댓글 작성 시 게시판 TYPE 입력을 위한 useRef
    const contentRef = useRef("");           // 댓글 <input> 컨트롤을 위한 Ref
    const [updateBtn, setUpdateBtn] = useState(false);        // 댓글 수정을 위한 상태 감지 button
    const [tempCommentNo, setTempCommentNo] = useState(0);     // 댓글 수정할 때 사용할 임시 commentNo

    // 댓글 handler
    const contentOnChangeHandler = useCallback((e) => {
        setCommentContent(e.target.value)
    }, [])

    // 게시글 삭제
    const deletePost = async () => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            const res = await axios.get(`/${boardType}/delete?${boardType}No=${freeBoardNo}`)
                .then((navigate(`/community/${boardType}/list`)))
                .catch((error) => console.log("게시글 삭제 실패"))
        }
    }

    // 게시글 수정(update.js 로 이동)
    const updatePost = () => {
        navigate(`/community/${boardType}/update`, {state: {freeBoardNo}})
    }

    // 게시글 상세 정보 가져오기
    const getBoard = async () => {
        // TODO
        // '이전' 버튼 클릭 시 강제로 1 page 부터 시작되는데 사용자가 머물던 currentPage 로 이동시키기
        const res = await axios.get(`/${boardType}/view?${boardType}No=${freeBoardNo}`)
        if (res.data) {
            setBoard(res.data);
        }
    };

    // 댓글 목록 가져오기
    const getCommentList = async () => {
        const res = await axios.get('/comment/list', {
            params: {
                boardNo: freeBoardNo,
                type: typeRef.current.value,
            }
        })
        if (res.status === 200) {
            setCommentList(res.data);
        }
    };

    // 댓글 작성
    const goRegisterComment = async () => {
        if (contentRef.current.value) {
            const data = {
                boardNo: freeBoardNo,
                memberId: memberLog.memberId,
                content: commentContent,
                type: typeRef.current.value,
            }
            const res = await axios.post("/comment/register", data)
            if (res.status === 200) {
                contentRef.current.value = "";
                getCommentList(); // 댓글 작성 완료 시 commentList 재 렌더링
            }
        } else {
            alert("댓글을 입력하세요")
            contentRef.current.focus();
        }
    }

    // 댓글 수정
    const updateComment = async (e) => {
        contentRef.current.value = e.content;
        contentRef.current.focus();
        setTempCommentNo(e.commentNo);
        setUpdateBtn(true);  // 새로운 댓글 창의 '등록' 버튼 끄고 '수정' 버튼으로 변경
    }

    // 수정된 댓글 내용 DB 저장
    const goUpdateComment = async () => {
        const data = {
            commentNo: tempCommentNo,
            content: commentContent,
            type: typeRef.current.value,
        }
        const res = await axios.post("/comment/update", data)
        contentRef.current.value = "";
        setUpdateBtn(false); // 새로운 댓글 창의 '수정' 버튼 끄고 '등록' 버튼으로 변경
        getCommentList();
    }

    // 댓글 삭제
    const deleteComment = async (e) => {
        const commentNo = e.commentNo; // 삭제할 댓글 번호
        const res = await axios.post("/comment/delete", null, {
            params: {
                commentNo: commentNo,
            }
        });
        if (res.status === 200) {
            getCommentList();
        }
    }

    // TODO
    // 댓글 닉네임 표기 | 안승환 | 06.25(화)
    // 게시글, 댓글 작성자로 표기할 정보를 MEMBER_ID 가 아니라 MEMBER_NICKNAME 으로 수정하기
    // axios.get 방식을 이용해 MEMBER_ID 기준으로 MEMBER 테이블 조회 실행

    useEffect(() => {
        getBoard();
        getCommentList();
        const getMemberLog = sessionStorage.getItem("member");
        if (getMemberLog) {
            const parse = JSON.parse(getMemberLog);
            setMemberLog(parse);
        }
    }, []);

    return (
        <>
            {board ? (
                <article className="mt-32 ml-32 mr-32 rundry">
                    <div className="container">
                        <div className="header">
                            <div className="text-black text-2xl my-3 text-center">{board.freeTitle}</div>
                            <div>
                                <p style={{borderTop:"2px dashed black" , paddingTop:"10px", paddingBottom:"5px"}}>No. {board.freeBoardNo}&nbsp;&nbsp;&nbsp;</p>
                                <p style={{paddingTop:"5px", paddingBottom:"10px" }}>작성자
                                    : {board.memberId}</p>
                            </div>
                            <div>작성일 : {new Date(board.createDate).toLocaleString('ko-kr', {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric"
                            })}
                                <span className="float-right mr-4">조회수: {board.hits}</span>
                            </div>
                        </div>
                        <div className="comment rounded-xl mt-12"
                             dangerouslySetInnerHTML={{__html: board.freeContent}}/>


                        <hr className="my-10"/>
                        <div className="actions me-4">
                            {
                                memberLog && memberLog.memberAdmin === 'ADMIN'
                                    ?
                                    <>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 mb-1 ml-1 px-4 rounded-full"
                                            onClick={deletePost}>삭제
                                        </button>
                                    </>
                                    :
                                    <>
                                        {
                                            memberLog.memberId === board.memberId
                                                ?
                                                <>
                                                    <button className="bg-blue-500 text-white font-bold"
                                                            onClick={updatePost}>수정
                                                    </button>
                                                    <button className="bg-red-500 text-white font-bold"
                                                            onClick={deletePost}>삭제
                                                    </button>
                                                </>
                                                :
                                                null
                                        }
                                    </>
                            }
                            <button onClick={() => navigate(`/community/${boardType}/list`)}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold">목록
                            </button>
                        </div>
                        <div className="mx-5 my-5 p-5">
                            {commentList && commentList.map((v, i) => {
                                return (
                                    <div className="text-black font-extrabold" key={i}>
                                        {v.status === 'Y'
                                            ?
                                            <div>
                                            <span>
                                            {
                                                v.memberProfile
                                                    ?
                                                    <img src={v.memberProfile}
                                                         className="w-7 h-7 inline border-gray-600 border-2"
                                                         style={{borderRadius:"50%"}}
                                                         alt="사용자 등록 프로필"/>
                                                    :
                                                    <img src="/images/profile/basic_profile.png"
                                                         className="w-7 h-7 inline border-gray-600 border-2"
                                                         alt="기본 프로필"/>
                                            }&nbsp;
                                                <span>{v.memberId}</span>
                                        </span>
                                                <div className="my-2 text-lg font-medium">
                                                    <span>{v.content}</span>
                                                </div>
                                                <div className="text-sm text-gray-500 font-normal">
                                                    {
                                                        new Date(new Date(v.modifyDate).getTime() + 9 * 60 * 60 * 1000)
                                                            .toISOString()
                                                            .replace(/-/g, '.')
                                                            .slice(0, 16)
                                                            .replace('T', ' ')
                                                    }


                                                    <span>{
                                                        memberLog && memberLog.memberId === v.memberId
                                                            ?
                                                            <div className="text-end me-3">
                                                                <button
                                                                    onClick={() => updateComment(v)}
                                                                    className="font-extrabold text-white me-3 bg-gray-600 border-2 py-2 px-2 rounded-xl hover:bg-gray-900">댓글 수정
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteComment(v)}
                                                                    className="font-extrabold text-white me-3 bg-red-600 border-2 py-2 px-2 rounded-xl hover:bg-red-900">댓글 삭제
                                                                </button>
                                                            </div>
                                                            :
                                                            null
                                                    }</span>
                                                </div>
                                                <hr className="hr1 mb-8 mt-2"/>
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                )
                            })}
                        </div>
                        <div className="mx-5 my-5 border rounded-md p-5">
                            <div className="text-black font-extrabold">
                                <span>{memberLog && memberLog.memberId}</span>
                            </div>
                            {
                                memberLog && memberLog.memberId
                                    ?
                                    <input
                                        type="text"
                                        className="mb-5 w-full h-12 text-black"
                                        placeholder="댓글을 남겨보세요"
                                        onChange={contentOnChangeHandler}
                                        ref={contentRef}
                                    />
                                    :
                                    <input placeholder={"로그인 후 이용 가능합니다"} disabled/>
                            }
                            <div className="text-end">
                                {updateBtn
                                    ?
                                    <button
                                        onClick={goUpdateComment}
                                        className="font-extrabold text-white me-3 bg-blue-600 border-2 py-2 px-2 rounded-xl hover:bg-blue-900">수정
                                    </button>
                                    :
                                    <button
                                        onClick={goRegisterComment}
                                        className="font-extrabold text-white me-3 bg-blue-600 border-2 py-2 px-2 rounded-xl hover:bg-blue-900">댓글 등록
                                    </button>
                                }

                            </div>
                            <input ref={typeRef} type="hidden" value="FREE_BOARD" disabled/>
                        </div>
                    </div>
                </article>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};