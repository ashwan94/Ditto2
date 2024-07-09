import React, {useEffect, useRef, useState} from 'react';
import "../../../css/addBoard.css"
import ReactQuill from '../../../js/ReactQuill'
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

export default function PodcastBoardAdd({goClose, close, memberId}) {
    const navigate = useNavigate();                     // 페이지 이동을 위한 navigate
    const boardType = "podcastBoard";                                // URL 요청에 대한 게시판 종류
    const comebackUrl = `/community/${boardType}/add`             // 로그인 후 돌아올 URL
    const [memberLog, setMemberLog] = useState(""); // 로그인된 회원 정보
    const [title, setTitle] = useState('');
    const titleRef = useRef();

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const goRegister = async () => {
        if(memberId){
            if(title){
                const data = {
                    podcastTitle : title,
                    memberId : memberId.memberId,
                }
                const res = await axios.post("/podcastBoard/register", data)
                if(res.status === 200){
                    goClose(!close);
                }
            }else{
                alert("제목을 입력해주세요.");
                titleRef.current.focus();
            }
        }else{
            alert("멤버십 구독이 필요합니다.");
        }

    }

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

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    return (
        <article className="mt-32 ml-32 mr-32  shadow-2xl">
            <div className="bg-blue-100 px-8 pt-5 pb-3 rounded text-end">
                <input
                    type="text"
                    id="title"
                    value={title}
                    ref={titleRef}
                    placeholder="방송 제목을 입력하세요"
                    onChange={handleChange}
                    className="px-4 py-2 mb-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div>
                    <button className="bg-blue-600 text-white border-black me-5 rounded px-2 py-1" onClick={goRegister}>완료</button>
                    <button className="bg-blue-600 text-white border-black rounded px-2 py-1"
                        onClick={() => goClose(!close)}>취소</button>
                </div>
            </div>
        </article>
    );
}