import {Link, useNavigate} from "react-router-dom";
// import {MQTTSub} from "../../js/mqtt";
import {useEffect, useState} from "react";
import mqtt from "mqtt";
import axios from "axios";

export default function List(){
    // MQTT 세팅
    const URL = "nextit.or.kr:21883"; // 21883 은 protocol 이며 생략되면 error 난다
    const client = mqtt.connect(URL,{
        connectTimeout: 5000,
        hostname:"nextit.or.kr",
        port:29001,
    });

    // MQTT 에서 subscribe 한 message(착석 여부) 에 대한 data 처리
    const [message, setMessage] = useState({});
    const [num, setNum] = useState(0); // MQTT 통신 횟수 확인용
    useEffect(() => {
        // 최초 null 로 시작할때 브라우저 로딩 시 발생하는 에러에 대한 처리

    }, [message]);

    // MQTT connect 에 대한 event -> subscribe, publish 모두 처리
    client.on("connect", () => {
        // 아두이노에서 publish 하는 경로와 동일하게 subscribe 경로 지정
        client.subscribe("/IoT/Sensor/Ditto", (err) => {
            if (!err) {
                // React 에서 publish 할 테스트용 message
                client.publish("/React/Ditto", "React 에서 발송된 message");
            }
        });
    });

    // MQTT broker 에서 message 가 감지됐을 경우 작동되는 event
    // setTimeout 등 별도의 함수를 추가로 실행시키지 않아도 broker 에 새로운 message 가 감지되면 알아서 실행됨
    client.on("message", (topic, message) => {
        // message is Buffer
        const parser = JSON.parse(message.toString());
        setMessage(parser);     // MQTT 에서 가져온 data 를 useState 로 UPDATE
        setNum(num+1);   // MQTT subscribe 횟수 확인용
        client.end();
    });

    // 로그인 회원 정보
    const memberLog = sessionStorage.getItem("member");
    const [member, setMember] = useState(memberLog);
    const navigate = useNavigate();

    // DB 에서 가져온 SEAT Table
    const [seatList, setSeatList] = useState([]);
    const getSeatData = async () => {
        const res = await axios.get("/seat/list");
        setSeatList(res.data);
    };

    // 브라우저 로딩 완료 시 DB 의 SEAT 에서 좌석 정보 가져옴
    useEffect(() => {
        getSeatData();
    }, []);

    //  사용자가 좌석 클릭 시 상태 변경
    const [seatNo, setSeatNo] = useState(0);            // DB 로 전송할 seatNo
    const [seatClick, setSeatClick] = useState(false); // 예약할 좌석 선택 상태 값
    const [seatIndex, setSeatIndex] = useState(0);      // map 함수 실행 시 선택된 index 파악을 위한 변수
    const goChangeSeat = (e) => {
        setSeatClick(!seatClick);
        setSeatNo(e);
    }

    // 선택한 좌석 예약하기
    const goReservate = async () => {
        if(!member){
            alert("로그인이 필요한 서비스입니다.");
            navigate("/signIn")
            return;
        }
        const res = await axios.post("/seat/reservate", null,{
            params:{
                seatNo:seatNo,
            }
        })
        if(res.status === 200){
            alert("선택하신" + seatNo + "번 좌석 예약이 완료되었습니다.");
            getSeatData();
            setSeatClick(false);
        }
    }

    // 좌석 배치도 로직
    // 1. seatNo 가 홀수인 경우를 기준으로 조건문 시작(좌, 우 의자 이미지 구분을 위해서)
    // 2. 초음파센서 실시간 data 송수신 체크를 위해 seatNo 7 을 전용 이미지로 렌더링
    // 3. status 가 Y, N 에 따라 의자 이미지를 none(이용 가능), used(이용 중) 으로 구별해 렌더링

    // 이미지 위치 잡기
    // 부모 <div> 에 className : static
    // 자식 <div> 에 className : z-10 absolute transform -translate-x-64 -translate-y-24
    // 레이아웃은 grid, grid-cols-2 로 지정해줌

    // TODO
    // 좌석 배치도 | 안승환 | 06.10(아마 이쯤?)
    // 1. 예약이 가능한 좌석 클릭 시 clicked 이미지로 변경
    // 2. 예약 button 클릭 시 해당 좌석의 정보를 DB 에 UPDATE 후 재렌더링
    // 3. My page 에서 좌석 예약 취소하기(연지님이랑 추후 논의)

    return(
        <main>
            <section className="gj do hj sp text-black">
                <div className="grid place-items-center static">
                    <div className="grid grid-cols-3">
                        <div></div>
                    <div className="text-5xl">
                        <span>좌석 배치도</span>
                    </div>
                        <div className="text-end">
                            <button
                                onClick={goReservate}
                                className="bg-blue-600 text-white rounded border text-white font-bold p-3 text-2xl">예약하기</button>
                        </div>
                    </div>
                    <div className="text-xl">예약할 좌석을 선택해주세요</div>
                    <img src="../../images/seat/seat_map.png" alt="좌석 배치도" className="w-7/12"/>
                    <div className="grid grid-cols-2 z-10 w-28 absolute transform -translate-x-60 -translate-y-28">
                        {seatList &&
                            seatList.map((v, i) => {
                                return (
                                    <div key={i}>
                                        {v.seatNo % 2 === 1 || v.seatNo === 1 ?
                                                <>
                                                {v.seatNo === 7 ?
                                                        <>
                                                            {message && message.seatStatus === '0' ?
                                                                <div className="relative">
                                                                    <span className="absolute mt-3 ms-7 text-red-700 text-sm font-extrabold">{v.seatNo}</span>
                                                                    <img src="../../images/seat/left_none.png"/>
                                                                </div>
                                                                :
                                                                <div className="relative">
                                                                    <span className="absolute mt-3 ms-7 text-red-700 text-sm font-extrabold">{v.seatNo}</span>
                                                                    <img src="../../images/seat/left_clicked.png"/>
                                                                </div>}
                                                        </>
                                                    :
                                                        <>
                                                            {v.status === 'Y' ?
                                                                <>
                                                                    {seatClick && seatIndex === i ?
                                                                        <button className="relative text-center"
                                                                                onClick={() => {
                                                                                    setSeatIndex(i);
                                                                                    goChangeSeat(v.seatNo)
                                                                                }}>
                                                                            <span className="absolute mt-3 text-black text-sm">{v.seatNo}</span>
                                                                            <img src="../../images/seat/left_clicked.png"/>
                                                                        </button>
                                                                        :
                                                                        <button className="relative text-center"
                                                                                onClick={() => {
                                                                                    setSeatIndex(i);
                                                                                    goChangeSeat(v.seatNo)
                                                                                }}>
                                                                            <span className="absolute mt-3 text-black text-sm">{v.seatNo}</span>
                                                                            <img src="../../images/seat/left_none.png"/>
                                                                        </button>
                                                                    }
                                                                </>
                                                                :
                                                                <div className="relative text-center">
                                                                    <span
                                                                        className="absolute mt-3 text-black text-sm">{v.seatNo}</span>
                                                                    <img src="../../images/seat/left_used.png"/>
                                                                </div>
                                                            }
                                                        </>
                                                }
                                                </>
                                                :
                                                <>
                                                    {v.status === 'Y' ?
                                                        <>
                                                            {seatClick && seatIndex === i ?
                                                                <button className="relative text-center"
                                                                        onClick={() => {
                                                                            setSeatIndex(i);
                                                                            goChangeSeat(v.seatNo)
                                                                        }}>
                                                                    <span className="absolute mt-3 text-sm transform -translate-x-2">{v.seatNo}</span>
                                                                    <img src="../../images/seat/right_clicked.png"/>
                                                                </button>
                                                                :
                                                                <button className="relative text-center"
                                                                        onClick={() => {
                                                                            setSeatIndex(i);
                                                                            goChangeSeat(v.seatNo)
                                                                        }}>
                                                                    <span className="absolute mt-3 text-black text-sm transform -translate-x-2">{v.seatNo}</span>
                                                                    <img src="../../images/seat/right_none.png"/>
                                                                </button>
                                                            }
                                                        </>
                                                        :
                                                        <div className="relative">
                                                            <span className="absolute mt-3 ms-5 text-black text-sm">{v.seatNo}</span>
                                                            <img src="../../images/seat/right_used.png"/>
                                                        </div>
                                                    }
                                                </>
                                        }
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </section>
        </main>
    )
}