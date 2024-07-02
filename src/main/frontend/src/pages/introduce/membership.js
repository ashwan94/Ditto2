import React, {useEffect, useState} from "react";
import axios from "axios";


export default function Membership() {


    const [memberId, setMemberId] = useState();


    // 첫 랜더링 시 사이트 가장 상단으로 위치
    useEffect(() => {

        const memberData = sessionStorage.getItem("member"); // 세션스토리지에담긴 로그인 회원정보 가져오기
        const memberObj = JSON.parse(memberData); // 문자열을 JSON 객체로 변환

        // 회원 아이디가 없는 경우 빈 문자로 설정
        if (!memberObj) {
            setMemberId("");
        } else {
            // 회원 아이디가 있는 경우 세션에 담겨있는 값으로 담기
            setMemberId(memberObj.memberId);
        }

        window.scrollTo({
            top: 0,
            behavior: 'auto',
        })

    }, []);


    const [paymentTime, setPaymentTime] = useState(new Date().getTime());
    const clickChargeBtn = async (pg_method, amount, nickname, redirect_url) => {
        if (memberId == "") {
            return alert("로그인이 필요한 서비스입니다.");
        }

        // 로그인한 사용자가 존재하는 경우
        // 사용자의 멤버십 구독 여부 파악 후
        // 멤버십 구독중인 경우 return

        const res = await axios.post("/searchMembership", null, {
            params: {
                memberId: memberId
            }
        });

        if (res.data.memberSub == "Y") {
            return alert("이미 멤버십 구독중인 사용자입니다.")
        }


        // paymentTime을 날짜, 시, 분, 초 형식으로 변환하는 함수
        // 날짜 형식 포맷팅
        const formatPaymentTime = (timestamp) => {
            const date = new Date(timestamp);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `(${year}-${month}-${day} ${hours}:${minutes}:${seconds})`;
        };


        const {IMP} = window;
        IMP.init('imp18537852') // 가맹점 번호 지정

        IMP.request_pay({
                pg: `${pg_method}`, // 결제 방식 지정 -> 카카오페이
                pay_method: 'card',
                merchant_uid: `mid_${paymentTime}`, // 현재 시간
                name: '한석줍쇼 1일 멤버십 이용권 구매', // 결제 품목 및 제목 지정
                amount: parseInt(`${amount}`), // 충전할 금액
                buyer_email: '구매자 이메일',
                buyer_name: `${nickname}`,
                buyer_tel: '010-1222-1222',
                buyer_addr: '서울특별시 강남구 삼성동',
                buyer_postcode: '123-456',
                m_redirect_url: `${redirect_url}` // 만약 새창에서 열린다면 결제 완료 후 리다이렉션할 주소
            }, async function (rsp) {
                if (rsp.success) {
                    const res = await axios.post("/updateMemberSubscribe", null, {
                        params: {
                            memberId: memberId
                        }
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (res.status == 200) {
                        // 결제 파트에서 결제금액 / 결제시간 / 회원ID 콘솔출력
                        const paymentHistory = {
                            price : amount,
                            memberId : memberId,
                        }
                        goPay(paymentHistory)
                        // console.log("결제 금액: " + amount);
                        // console.log("결제 완료 시간: " + formatPaymentTime(paymentTime));
                        // console.log("회원 아이디 : " + memberId);

                    } else {
                        alert("결제 실패");
                    }

                } else {
                    alert("결제 실패");
                }

            }
        );
    }

    // 멤버십 결제 내역 입력
    const goPay = async (data)=> {
        console.log("결제 정보 : ", data);
        const res = await axios.post("/payment/goPay", data)
        if(res.status === 200){
            window.location.href = '/mypage'; // 결제 완료 시 마이페이지로 이동
        }
    }


    return (
        <main className="rundry text-xl">
            <div className="gj do hj sp jr pg rundry">
                <div className="bb ze ki xn 2xl:ud-px-0 mb-8" style={{borderTop: "1px solid lightgray"}}/>

                <section className="lj tp kr mb-10">
                    <div>
                        <div className="text-center text-8xl text-black">Features</div>
                        <div className="text-center text-2xl mt-3">멤버십 구독 회원분들께 드리는 무료 혜택!</div>
                    </div>

                    <div className="bb ze ki xn yq mb en">
                        {/* 무료 혜택 안내 화면 구역 리셉션 데스크, 주방 및 휴게실 등 6가지 */}
                        <div className="wc qf pn xo ng">
                            <div className="animate_top sg oi pi zq ml il am cn _m">
                                <img src="images/main_features_info.png" alt="Icon" className="w-10"/>
                                <h4 className="ek zj kk wm nb _b rundry">리셉션 데스크</h4>
                                <p>리셉션 데스크에는 전문성을 갖춘 매니저가 상주하며, 최고의 고객 서비스를 제공합니다</p>
                            </div>

                            <div className="animate_top sg oi pi zq ml il am cn _m">
                                <img src="images/main_features_kitchen.png" alt="Icon" className="w-10"/>
                                <h4 className="ek zj kk wm nb _b rundry">주방 및 휴게시설</h4>
                                <p>편안한 쇼파, 고급 안마의자, 자연 친화적인 휴식 공간, 간단히 식음료를 즐길 수 있는 테이블과 스툴 등을 갖추고 있습니다. 라운지 공간에는 공용
                                    냉장고,
                                    얼음정수기, 커피머신,
                                    전자렌지, 토스트기, 싱크대, 식기 등이 있습니다</p>
                            </div>

                            <div className="animate_top sg oi pi zq ml il am cn _m">
                                <img src="images/main_features_printer.png" alt="Icon" className="w-10"/>
                                <h4 className="ek zj kk wm nb _b rundry">사무 보조 기기</h4>
                                <p>복사/스캔/팩스가 가능한 복합기, 문서 절단기, 코팅기, 제본기, 파쇄기까지 다양한 사무 보조기기를 고루 갖추고 있습니다. 입주사분들께는 월
                                    100장(흑백기준)을 무료로 출력해
                                    드립니다. 초과시에도 부담없는 금액으로 이용하실 수 있습니다</p>
                            </div>

                            <div className="animate_top sg oi pi zq ml il am cn _m">
                                <img src="images/main_features_readingRoom.png" alt="Icon" className="w-10"/>
                                <h4 className="ek zj kk wm nb _b rundry">열람실</h4>
                                <p>1인 ~ 10인이 도서 열람이 가능한 공간이 마련돼 있습니다. 냉난방시설과 환기시설을 갖추고 있어 쾌적한 실내환경을 제공합니다. 책상과 서랍, 고급의자
                                    등이
                                    마련돼 있어 최상의
                                    컨디션을 유지해줍니다. 또한 여러 개의 CCTV로 보안과 안전에 최선을 다합니다</p>
                            </div>

                            <div className="animate_top sg oi pi zq ml il am cn _m">
                                <img src="images/main_features_location.png" alt="Icon" className="w-10"/>
                                <h4 className="ek zj kk wm nb _b rundry">접근성</h4>
                                <p>오룡역 8번 출구에서 도보 5분 거리에 위치하고 있어 대중교통 이용이 편리합니다</p>
                            </div>

                            <div className="animate_top sg oi pi zq ml il am cn _m">
                                <img src="images/main_features_clean.png" alt="Icon" className="w-10"/>
                                <h4 className="ek zj kk wm nb _b rundry">시설 관리</h4>
                                <p>매일 정기적으로 전문 청소업체가 방문해 모든 시설을 쾌적하고 깔끔하게 관리합니다</p>
                            </div>
                        </div>


                    {/* 멤버십 가격 안내 화면 구역 */}
                    <section className="rundry px-8 py-24 rounded-xl" style={{backgroundColor: "lightblue", border:"2px solid black"}}>
                        <div className="container mx-auto text-center">
                            <h2 className="block antialiased tracking-normal text-4xl font-semibold leading-[1.3] text-black mb-4 rundry">멤버십
                                가격 안내</h2>
                            <p className="block antialiased text-base leading-relaxed text-inherit mb-8 font-bold text-white ">
                                Check out our affordable pricing options for awesome environment.
                            </p>
                        </div>
                        <div className="flex justify-center mt-24"
                             style={{display: "flex", alignItems: "center", textAlign: "center", margin: "auto"}}>


                                {/* 왼쪽 박스 */}
                                <div
                                    className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-blue-gray-100 mx-4 rundry">
                                    <div
                                        className="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none !m-0 p-6">
                                        <h5 className="block antialiased tracking-normal text-xl font-semibold leading-snug text-blue-gray-900 capitalize rundry">한달
                                            이용권</h5>
                                        <p className="block antialiased text-sm leading-normal text-inherit font-normal !text-gray-500 mt-5">
                                            꾸준히 자기계발을 하고 싶은 당신에게 추천하는 한석줍쇼 한달 이용권
                                        </p>
                                        <h3 className="antialiased tracking-normal text-3xl font-semibold leading-snug text-blue-gray-900 flex gap-1 mt-4">
                                            159,000원<span
                                            className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-blue-gray-900 -translate-y-0.5 self-end opacity-70"></span>
                                        </h3>
                                    </div>
                                    <div className="p-6 border-t border-blue-gray-50">
                                        <ul className="flex flex-col gap-3">
                                            <li className="flex items-center gap-3 text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="2" stroke="currentColor" aria-hidden="true"
                                                     className="h-4 w-4 text-blue-gray-900">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M4.5 12.75l6 6 9-13.5"></path>
                                                </svg>
                                                <p className="block antialiased text-sm leading-normal font-normal text-inherit">카페테리아
                                                    / 무료 와이파이
                                                    이용 가능</p>
                                            </li>
                                            <li className="flex items-center gap-3 text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="2" stroke="currentColor" aria-hidden="true"
                                                     className="h-4 w-4 text-blue-gray-900">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M4.5 12.75l6 6 9-13.5"></path>
                                                </svg>
                                                <p className="block antialiased text-sm leading-normal font-normal text-inherit">도서
                                                    열람 및 대여 가능</p>
                                            </li>
                                            <li className="flex items-center gap-3 text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="2" stroke="currentColor" aria-hidden="true"
                                                     className="h-4 w-4 text-blue-gray-900">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M4.5 12.75l6 6 9-13.5"></path>
                                                </svg>
                                                <p className="block antialiased text-sm leading-normal font-normal text-inherit">개인석
                                                    이용 가능</p>
                                            </li>
                                        </ul>
                                        <button
                                            onClick={() => clickChargeBtn('kakaopay', '159000', 'nickname', 'http://localhost:3000/membershipInfo')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mt-6"
                                            style={{border: "2px solid black"}}>
                                            가입하기
                                        </button>
                                    </div>
                                </div>
                                {/* 오른쪽 박스 */}
                                <div
                                    className="reative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md border border-blue-gray-100 mx-4">
                                    <div
                                        className="relative bg-clip-border mt-4 mx-4 rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none !m-0 p-6">
                                        <h5 className="block antialiased tracking-normal text-xl font-semibold leading-snug text-blue-gray-900 capitalize rundry">기업체
                                            공유오피스 입주 상담</h5>
                                        <p className="block antialiased text-sm leading-normal text-inherit font-normal !text-gray-500 mt-5">
                                            사옥 이전 비용, 인테리어 비용이 부담스러운 사장님들께 추천하는 입주 상담 서비스
                                        </p>
                                        <h3 className="antialiased tracking-normal text-3xl font-semibold leading-snug text-blue-gray-900 flex gap-1 mt-4">
                                            CONTACT US<span
                                            className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-blue-gray-900 -translate-y-0.5 self-end opacity-70"></span>
                                        </h3>
                                    </div>
                                    <div className="p-6 border-t border-blue-gray-50">
                                        <ul className="flex flex-col gap-3">
                                            <li className="flex items-center gap-3 text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="2" stroke="currentColor" aria-hidden="true"
                                                     className="h-4 w-4 text-blue-gray-900">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M4.5 12.75l6 6 9-13.5"></path>
                                                </svg>
                                                <p className="block antialiased  text-sm leading-normal font-normal text-inherit">24시간
                                                    입주 상담 예약 가능</p>
                                            </li>
                                            <li className="flex items-center gap-3 text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="2" stroke="currentColor" aria-hidden="true"
                                                     className="h-4 w-4 text-blue-gray-900">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M4.5 12.75l6 6 9-13.5"></path>
                                                </svg>
                                                <p className="block antialiased text-sm leading-normal font-normal text-inherit">아래
                                                    톡상담 버튼을 클릭해주세요</p>
                                            </li>
                                            <li className="flex items-center gap-3 text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="2" stroke="currentColor" aria-hidden="true"
                                                     className="h-4 w-4 text-blue-gray-900">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M4.5 12.75l6 6 9-13.5"></path>
                                                </svg>
                                                <p className="block antialiased text-sm leading-normal font-normal text-inherit">
                                                    전화상담 010-4795-9464로 연락주세요
                                                </p>
                                            </li>
                                        </ul>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mt-6"
                                            style={{border: "2px solid black"}}
                                            onClick={() => {
                                                const kakaoTalk = document.querySelector("#chat-channel-button")
                                                kakaoTalk.click()
                                            }}>상담하기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>


                    </div>
                </section>


            </div>
        </main>
    )
}