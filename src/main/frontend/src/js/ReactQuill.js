import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

const Editor = ({boardNo, addBtn, updateBtn, boardType}) => {
    window.scrollTo({top:0})
    // 사용자가 이미지를 선택하고 open 했을때 작동되는 handler
    function imageHandler() {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            // console.log("사용자가 입력한 image :", file);

            const formData = new FormData();
            formData.append("image", file);
            formData.append("boardType", boardType);
            // console.log("Server 로 쏘기 위한 image : ", formData);

            const res =
                axios.post("/upload/image/register", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then((response) => {
                        // console.log("Server 로부터 받은 Image URL :", response.data);
                        const range = this.quill.getSelection();
                        this.quill.insertEmbed(range.index, "image", `http://localhost:3000${response.data.imageUrl}`);
                        // Front 에서 즉시 이미지 띄우기 위한 경로 지정
                        // ex) http://localhost:3000/freeBoard/12.png 같은 형식으로 가져와 Editor 에 즉시 이미지를 볼 수 있게 처리함
                    })
                    .catch((error) => {
                        console.error("Error uploading image:", error.response.data);
                    });
        };
    }

    // Editor 에 장착할 modules 정보
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{font: []}],
                [{header: [1, 2, false]}],
                ["bold", "italic", "underline"],
                [{color: []}, {background: []}], // dropdown with defaults from theme
                [{script: "sub"}, {script: "super"}], // superscript/subscript
                [{list: "ordered"}, {list: "bullet"}],
                [{indent: "-1"}, {indent: "+1"}], // outdent/indent
                [{direction: "rtl"}], // text direction
                ["link", "image"],
                ["clean"], // remove formatting button
            ],
            handlers: {
                image: imageHandler, // 이미지 선택 됐을때 실행됨
            },
        },
    }), []);

    // <Link> 로 boardNo 받으면 freeBoardNo, <Quill> 에디터로 마운트하면 boardNo 로 받음
    // URL 로 보낼때 parameter 전달하는 방식과 Component 로 parameter 를 전달하는 방식이 다르므로
    // 이번처럼 Editor 같은 라이브러리를 재활용하기 위해서는 철저한 사전 설계가 매우 중요하다는걸 깨달았다.(⭐⭐⭐⭐⭐)️
    const [freeBoardNo, setFreeBoardNo] = useState(0); // 이전 page 에서 URL 로 전달받은 freeBoardNo
    const [title, setTitle] = useState("");       // 제목
    const [content, setContent] = useState("");   // 내용(텍스트 + 이미지)
    const titleRef = useRef(null);
    const navigate = useNavigate();
    const locate = useLocation();

    // 제목 handler
    const titleOnChangeHandler = useCallback((e)=> {
        setTitle(e.target.value);
    });

    // TODO
    // React-Quill 에 이미지 리사이즈 관련 모듈 설치, 적용하기

    // 수정 버튼 클릭 시 해당 게시글의 정보 가져옴
    const getFreeBoardContents = async () => {
        let data = {};
        if(boardType === 'freeBoard'){
            data = {freeBoardNo : freeBoardNo}
        }else if(boardType === 'noticeBoard'){
            data = {noticeBoardNo : freeBoardNo}
        }else if(boardType === 'relayBoard'){
            data = {relayBoardNo : freeBoardNo}
        }else{
            data = {podcastNo:freeBoardNo}
        }

        const res = await axios.get(`/${boardType}/view?${boardType}No=${freeBoardNo}`)
            .then((response => showContents(response)))
            .catch((error) => console.log("error occurred!"));
    }

    // DB 에서 조회한 데이터를 게시판 종류에 맞게 세팅
    const showContents = (getDb) => {
        let dbData = getDb.data;
        if(dbData.freeBoardNo) {
            setTitle(dbData.freeTitle);
            setContent(dbData.freeContent);
        }else if(dbData.noticeBoardNo){
            setTitle(dbData.noticeTitle);
            setContent(dbData.noticeContent);
        }else if(dbData.relayBoardNo){
            setTitle(dbData.relayTitle);
            setContent(dbData.relayContent);
        }else{
            setTitle(dbData.podcastTitle);
            setContent(dbData.podcastContent);
        }
    }

    useEffect(() => {
        if(freeBoardNo){
            getFreeBoardContents();
        }
    }, [freeBoardNo])

    // 수정 button 클릭 시 DB 에서 해당 게시글의 제목, 내용 데이터 가져옴
    useEffect(() => {
        if(!addBtn){            // URL 이동이 아니라 Editor comp 를 마운트 했을 때 게시글 번호 변경
            setFreeBoardNo(locate.state.freeBoardNo || boardNo);
        }
    }, []);

    // TODO
    // React-Quill Editor 모듈 수정 + 게시판 자잘한 수정 | 안승환 | 06.28(금)
    // 1. 게시글 작성 시 회원 아이디를 로그인된 계정 정보로 변경
    // 2. 이미지 리사이즈 가능하도록 커스텀 내용 추가
    // 3. 새 글 쓰기하다가 로그인 페이지로 이동했을때 로그인 후 이전 페이지(게시판 리스트)로 이동하기

    // 새 글 작성 버튼
    const goAdd = async () => {
        if(title){
            if(content){
                const memberId = JSON.parse(sessionStorage.getItem("member")).memberId; // 로그인된 회원 정보
                let data = {};
                if(boardType === 'freeBoard'){
                    data = {freeTitle : title, freeContent : content, memberId:memberId}
                }else if(boardType === 'noticeBoard'){
                    data = {noticeTitle : title, noticeContent : content, memberId:memberId}
                }else if(boardType === 'relayBoard'){
                    data = {relayTitle : title, relayContent : content, memberId:memberId}
                }else{
                    data = {podcastTitle : title, podcastContent : content, memberId:memberId}
                }
                const res = await axios.post(`/${boardType}/register`, data)
                .then((response => navigate(`/community/${boardType}/view`, {
                    state:response.data
                })))
                    .catch((error) => console.log(error));
            }else{
                alert("내용을 입력하세요");
            }
        }else{
            alert("제목을 입력하세요");
            titleRef.current.focus();
        }
    }

    // 게시글 수정 버튼
    const goUpdate = async () => {
        if (title) {
            if (content) {
                const memberId = JSON.parse(sessionStorage.getItem("member")).memberId;
                let data = {};
                if(boardType === 'freeBoard'){
                    data = {freeBoardNo: freeBoardNo,
                            freeTitle: title,
                            freeContent: content,
                            memberId: memberId,
                            }
                }else if(boardType === 'noticeBoard'){
                    data = {noticeBoardNo: freeBoardNo,
                        noticeTitle: title,
                        noticeContent: content,
                        memberId: memberId,
                    }
                }else if(boardType === 'relayBoard'){
                    data = {relayBoardNo: freeBoardNo,
                        relayTitle: title,
                        relayContent: content,
                        memberId: memberId,
                    }
                }else{
                    data = {podcastBoardNo: freeBoardNo,
                        podcastTitle: title,
                        podcastContent: content,
                        memberId: memberId,
                    }
                }

                const res = await axios.post(`/${boardType}/update`, data)
                    .then((response => navigate(`/community/${boardType}/view`, {
                        state: freeBoardNo
                    })))
                    .catch((error) => console.log(error));
            } else {
                alert("내용을 입력하세요");
            }
        } else {
            alert("제목을 입력하세요");
            titleRef.current.focus();
        }
    }

    const goCancle = () => {
        if (window.confirm("글 작성을 취소합니까?")) {
            navigate(-1)
        }
    }

    return (
        <div>
            <input type="text" ref={titleRef} onChange={titleOnChangeHandler} value={title}
                   className="text-black text-4xl w-full" placeholder="제목을 입력하세요"/>
            <hr className="my-3" />
            <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                theme="snow"
                style={{
                    height:'500px',
                    color:'#000000',
                    overflowY:'visible',
                }}
            />
            <div className="text-end mt-14">
                {updateBtn ?
                    <>
                        <button onClick={goCancle}
                                className="bg-red-500 text-100 p-2 font-bold text-white rounded hover:bg-blue-700 me-5">취소
                        </button>
                        <button onClick={goUpdate}
                                className="bg-blue-500 text-100 p-2 font-bold text-white rounded hover:bg-blue-700">수정
                            완료
                        </button>
                    </>
                    :
                    <>
                        <button onClick={goCancle}
                                className="bg-red-500 text-100 p-2 font-bold text-white rounded hover:bg-blue-700 me-5">취소
                        </button>
                        <button onClick={goAdd}
                                className="bg-blue-500 text-100 p-2 font-bold text-white rounded hover:bg-blue-700">작성
                            완료
                        </button>
                    </>
                }
            </div>
        </div>
    );
};

export default Editor;
