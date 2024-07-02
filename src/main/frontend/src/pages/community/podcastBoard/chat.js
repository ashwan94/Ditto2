import React, {useRef, useEffect, useState, useCallback} from 'react';
import io from 'socket.io-client';
import {useLocation} from "react-router-dom";

const pcConfig = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302',
        },
    ],
};

const sdpConstraints = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
};

const Chat = () => {
    const [isChannelReady, setIsChannelReady] = useState(false);
    const [isInitiator, setIsInitiator] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const localStreamRef = useRef(null);
    const pcRef = useRef(null);
    const remoteStreamRef = useRef(null);
    const socketRef = useRef(null);
    const [member, setMember] = useState(""); // session 에 저장된 로그인된 member 정보
    const [context, setContext] = useState();
    const contextRef = useRef(); // 채팅에 대한 Ref
    const location = useLocation();
    const boardNo = location.state; // 하르루타 게시판에서 받아온 게시글 번호

    // handler
    const contextOnChangeHandler = useCallback((e) => {
        setContext(e.target.value);
    })

    // socket 객체 생성
    const socket = io.connect('http://localhost:3000', {
        secure: true,
        rejectUnauthorized: false, // 개발 중에만 자체 서명된 인증서 오류를 무시하기 위해 사용합니다
    });
    socketRef.current = socket;

    // --------------- Server 세팅 ---------------

    // isInitiator, isStarted state 를 감지하는 useEffect
    useEffect(() => {
        socket.on('created', (room) => {
            console.log('호스트가 생성한 방:', room);
            setIsInitiator(true);
        });

        socket.on('full', (room) => {
            console.log(room, '은 허용 입장 인원을 초과했습니다.');
        });

        socket.on('join', (room) => {
            console.log('게스트가 참가한 방:', room);
            setIsChannelReady(true);
        });

        socket.on('joined', (room) => {
            console.log('게스트가 참가한 방:', room);
            setIsChannelReady(true);
        });

        socket.on('message', (message) => {
            console.log('Server 로부터의 메세지 :', message);
            if (message === 'got user media') {
                console.log("Message 가 got user media 로 인식");
                maybeStart();
            } else if (message.type === 'offer') {
                if (!isInitiator && !isStarted) {
                    console.log("Message 가 offer 로 인식");
                    maybeStart();
                }
                pcRef.current.setRemoteDescription(new RTCSessionDescription(message));
                doAnswer();
            } else if (message.type === 'answer' && isStarted) {
                console.log("Message 가 answer 로 인식");
                pcRef.current.setRemoteDescription(new RTCSessionDescription(message));
            } else if (message.type === 'candidate' && isStarted) {
                console.log("Message 가 candidate 로 인식");
                const candidate = new RTCIceCandidate({
                    sdpMLineIndex: message.label,
                    candidate: message.candidate,
                });
                pcRef.current.addIceCandidate(candidate);
            } else if (message === 'bye' && isStarted) {
                console.log("Message 가 bye 로 인식");
                handleRemoteHangup();
            }
        });

        const room = 'foo';         // 채팅방 이름 설정
        socket.emit('create or join', room); // server 에 채팅방 생성/참가 메세지 발송

        const localVideo = document.getElementById('localVideo');    // Client 비디오 스트림
        const remoteVideo = document.getElementById('remoteVideo');  // 상대방 비디오 스트림

        // Client 의 장치 정보 가져오기
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: {
                    mandatory: {
                        maxWidth: 1920,
                        maxHeight: 1080,
                        maxFrameRate: 30,
                    },
                    optional: [{ googNoiseReduction: true }, { facingMode: 'user' }],
                },
            })
            .then((stream) => {
                localStreamRef.current = stream;
                localVideo.srcObject = stream;
                sendMessage('got user media');
                if (isInitiator) {
                    maybeStart();
                }
            })
            .catch((e) => alert('getUserMedia() error: ' + e.name));

        return () => socket.disconnect();
    }, [isInitiator, isStarted]);

    // Client 에서 Server 로 메세지 발송
    const sendMessage = (message) => {
        console.log('클라이언트에서 보낸 메시지:', message);
        socketRef.current.emit('message', message);
    };

    // 호스트가 방을 생성할 때는 createPeerConnection 이 실행되지 않음
    // 기존 생성된 방에 참가자가 입장할때 서로의 createPeerConnection 이 실행됨
    const maybeStart = () => {
        console.log('>>>>>>> maybeStart() ', isStarted, localStreamRef.current, isChannelReady);
        if (!isStarted && typeof localStreamRef.current !== 'undefined' && isChannelReady) {
            console.log('>>>>>> creating peer connection');
            createPeerConnection();
            pcRef.current.addStream(localStreamRef.current);
            setIsStarted(true);
            console.log('isInitiator', isInitiator);
            if (isInitiator) {
                doCall();
            }
        }
    };

    // Peer 생성
    // 호스트가 방을 생성했고, 참가자가 입장할때 실행됨
    const createPeerConnection = () => {
        try {
            const pc = new RTCPeerConnection(pcConfig);
            pc.onicecandidate = handleIceCandidate;
            pc.onaddstream = handleRemoteStreamAdded;
            pcRef.current = pc;
            console.log('RTCPeerConnection created.');
        } catch (e) {
            console.error('Failed to create PeerConnection, exception: ' + e.message);
            alert('Cannot create RTCPeerConnection object.');
            return;
        }
    };

    // ICE Candidate 관리
    const handleIceCandidate = (event) => {
        console.log('icecandidate event: ', event);
        if (event.candidate) {
            sendMessage({
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate,
            });
        } else {
            console.log('End of candidates.');
        }
    };

    // offer 생성 에러
    const handleCreateOfferError = (error) => {
        console.error('createOffer() error:', error);
    };

    // peer 로 offer 송신
    const doCall = () => {
        console.log('Sending offer to peer');
        pcRef.current.createOffer(setLocalAndSendMessage, handleCreateOfferError);
    };

    // peer 에 대한 응답
    const doAnswer = () => {
        console.log('Sending answer to peer.');
        pcRef.current.createAnswer().then(
            setLocalAndSendMessage,
            onCreateSessionDescriptionError
        );
    };

    // Client 의 비디오, 오디오 스트림 정보를 Server 로 송신
    const setLocalAndSendMessage = (sessionDescription) => {
        pcRef.current.setLocalDescription(sessionDescription);
        console.log('setLocalAndSendMessage sending message', sessionDescription);
        sendMessage(sessionDescription);
    };

    // Client 의 비디오, 오디오 스트림 생성 실패
    const onCreateSessionDescriptionError = (error) => {
        console.error('Failed to create session description: ' + error.toString());
    };

    // 원격 스트림 정보 추가
    const handleRemoteStreamAdded = (event) => {
        console.log('원격 스트림이 추가되었습니다.');
        remoteStreamRef.current = event.stream;
        const remoteVideo = document.getElementById('remoteVideo');
        if (remoteVideo) {
            remoteVideo.srcObject = remoteStreamRef.current;
        }
    };

    // 원격 스트림 종료
    const handleRemoteHangup = () => {
        console.log('Session terminated.');
        stop();
        setIsInitiator(false);
    };

    // 채팅방 나가기
    const stop = () => {
        setIsStarted(false);
        if (pcRef.current) {
            pcRef.current.close();
            pcRef.current = null;
        }
    };



    // ---------------- FRONT ---------------

    // 채팅 '전송' 클릭 시
    const sendContext = () => {
        console.log("전송할 채팅 내용 : ",context);
        socket.emit("context", context);   // server 로 채팅 기록 전송
        contextRef.current.value = "";
        setContext("");
    }

    // 하단 '종료' 버튼 클릭 시
    const goClose = () => {
        if(window.confirm("채팅을 종료하시곘습니까?")){
            console.log("채팅 종료")
        }
    }


    // 브라우저 로딩이 완료되면 실행
    // TODO
    // 방 개설자와 호스트 ID 가 일치하면 room 이름을 호스트 ID 로 지정
    useEffect(() => {
        const memberLog = sessionStorage.getItem("member");
        if (memberLog) {
            setMember(JSON.parse(memberLog));
        } else {
            setMember("참가자 테스트");
        }
    }, [])

    return (
        <div style={{backgroundColor: '#212426'}}>
            <div style={{backgroundColor: '#383838'}} className="grid grid-cols-3 pt-5 pb-3 mb-10">
                <div><img src="/images/Hansukjupshow_logo.png" className="w-20 ms-7"/></div>
                <div className="text-center">참가자</div>
                {member && member.memberId
                    ?
                    <div className="text-end me-10">{member.memberId}님의 채널입니다.</div>
                    :
                    null
                }
            </div>
            <h1 className="text-center text-4xl mb-10">Realtime communication with WebRTC</h1>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-3" style={{gridTemplateColumns: '1.2fr 1.2fr 0.8fr'}}>
            <div id="videos">
                <video id="localVideo" autoPlay muted playsInline className="border border-8"></video>
                <video id="remoteVideo" autoPlay playsInline></video>
            </div>
                    <div className="bg-blue-400 text-white flex items-center justify-center">상대 화면</div>
                    <div className="text-white bg-gray-700">
                        <div className="m-3">
                            <textarea className="rounded w-full" style={{height:"60vh"}}>테스트</textarea>
                        </div>
                        <div className="flex items-center justify-center">
                        <input type="text"
                               ref={contextRef}
                               onChange={contextOnChangeHandler}
                               className="rounded bg-black text-white w-9/12"
                               style={{backgroundColor:"#212426", height:"6%", padding:"10px"}}/>
                        <button onClick={sendContext}
                        className="ms-1 text-white px-3 py-1.5 rounded"
                                style={{backgroundColor: '#212426'}}
                        >전송</button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{backgroundColor: '#383838'}} className="grid grid-cols-3 pb-14">
                <div className="text-center mt-8">
                    <button><img src="/images/chat/cam_off.png" alt="비디오 꺼짐" className="w-8"/></button>
                    <button><img src="/images/chat/cam_on.png" alt="비디오 켜짐" className="w-8"/></button>
                    <button><img src="/images/chat/mic_off.png" alt="마이크 꺼짐" className="w-8"/></button>
                    <button><img src="/images/chat/mic_on.png" alt="마이크 켜짐" className="w-8"/></button>
                </div>
                <div className="text-center mt-8">
                    <button
                        onClick={goClose}
                        className="font-bold text-red-600 border border-red-600 hover:bg-red-600 hover:text-white w-20 h-10 rounded">종료
                    </button>
                </div>
                <div className="text-center mt-8">채팅 버튼</div>
            </div>
        </div>
    );
};
export default Chat;
