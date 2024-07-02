import ReactQuill from "../../../js/ReactQuill";
import React, {useState} from "react";
import {useLocation} from "react-router-dom";

export default function Update() {
    const podcastBoardNo = useLocation().state.freeBoardNo;                       // 상세 페이지(view.js) 에서 전달받은 게시글 번호
    const [updateBtn, setUpdateBtn] = useState(true); // Editor 컴포넌트 마운트 상태값
    const boardType = "podcastBoard";                                    // URL 요청에 대한 게시판 종류
    return (
        <article className="mt-32 ml-32 mr-32">
            <ReactQuill boardNo={podcastBoardNo} updateBtn={updateBtn} boardType={boardType}/>
        </article>
    )
}