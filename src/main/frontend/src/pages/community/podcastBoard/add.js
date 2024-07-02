import React, {useEffect, useState} from 'react';
import "../../../css/addBoard.css"
import ReactQuill from '../../../js/ReactQuill'
import {useLocation, useNavigate} from "react-router-dom";

export default function FreeBoardAdd() {
    const addBtn = true;                                         // 새 글 쓰기 상태 버튼
    const navigate = useNavigate();                     // 페이지 이동을 위한 navigate
    const boardType = "podcastBoard";                                // URL 요청에 대한 게시판 종류
    const comebackUrl = `/community/${boardType}/add`             // 로그인 후 돌아올 URL
    const [memberLog, setMemberLog] = useState(""); // 로그인된 회원 정보

    // 로그인 되지 않았을 경우 로그인 후 글쓰기 진입
    useEffect(() => {
        const member = sessionStorage.getItem("member");
        if (!member) {
            alert("로그인 후 이용해주세요");
            navigate("/signIn", {
                state: {
                    comebackUrl: comebackUrl,
                }
            })
        }
    }, [memberLog])

    return (
        <article className="mt-32 ml-32 mr-32">
            <ReactQuill addBtn={addBtn} boardType={boardType}/>
        </article>
    );
}