import Slider from "react-slick";
import React, {useEffect} from "react";

export default function Faq() {

    // 첫 랜더링 시 사이트 가장 상단으로 위치
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        })
    }, []);
    // 캐러셀 관련 설정
    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        swipeToSlide: true,
        draggable: true,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };


    return (
        <main className="rundry text-xl">
            <section className="gj do hj sp jr i pg rundry">
                <div className="bb ze ki xn 2xl:ud-px-0 mb-8" style={{borderTop: "1px solid lightgray"}}>
                    {/* 상단 이미지 갤러리 섹션 */}
                    <section className="image-gallery mt-8">
                        <Slider {...settings}>
                            <div>
                                <img
                                    src={`https://image.dnews.co.kr/photo/photo/2018/10/29/201810291019244350107-2-114694.jpg`}
                                    alt="Image 1"/>
                            </div>
                            <div>
                                <img
                                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhf82S8fE21yPRJjlnqouNbrQvmEkR1Vkk3g&s`}
                                    alt="Image 2"/>
                            </div>
                            <div>
                                <img src={`https://dimg.donga.com/wps/NEWS/IMAGE/2021/02/27/105618240.7.jpg`}
                                     alt="Image 3"/>
                            </div>
                            <div>
                                <img
                                    src={`https://newline-interactive.com/wp-content/uploads/2020/10/NewlineInteractive_Newline_%E1%84%82%E1%85%B2%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%90%E1%85%A5%E1%84%85%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B5%E1%84%87%E1%85%B3_%E1%84%82%E1%85%B2%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB_%E1%84%80%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%B2%E1%84%8B%E1%85%A9%E1%84%91%E1%85%B5%E1%84%89%E1%85%B3_%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%8C%E1%85%A1%E1%84%8E%E1%85%B5%E1%86%AF%E1%84%91%E1%85%A1%E1%86%AB_%E1%84%89%E1%85%B3%E1%84%86%E1%85%A1%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A9%E1%84%91%E1%85%B5%E1%84%89%E1%85%B3_%E1%84%89%E1%85%B0%E1%84%8B%E1%85%A5%E1%84%8B%E1%85%A9%E1%84%91%E1%85%B5%E1%84%89%E1%85%B3_3.png`}
                                    alt="Image 4"/>
                            </div>
                            <div>
                                <img
                                    src={`https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/201903/04/moneyweek/20190304060903719uedv.jpg`}
                                    alt="Image 5"/>
                            </div>
                            <div>
                                <img
                                    src={`https://love.seoul.go.kr/tmda/Pds/Board/seoul_news_write/article_201904_03_1200.jpg`}
                                    alt="Image 6"/>
                            </div>
                            <div>
                                <img src={`https://cdn.pinpointnews.co.kr/news/photo/201908/270_705_1110.jpg`}
                                     alt="Image 7"/>
                            </div>
                            <div>
                                <img
                                    src={`https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/5KoQ/image/Qj5Yek7hwGoXJZNBKaXSuXR7uno`}
                                    alt="Image 8"/>
                            </div>
                            <div>
                                <img
                                    src={`https://cdn.globale.co.kr/news/photo/201907/img_201907121332055826dad9f33a29_36_0.jpg`}
                                    alt="Image 9"/>
                            </div>
                            <div>
                                <img
                                    src={`https://talk.hyundai-steel.com/wp-content/uploads/2019/11/1082%ED%98%B8_%ED%8A%B8%EB%A0%8C%EB%93%9C%EC%9D%B4%EC%95%BC%EA%B8%B0_01%EC%88%98%EC%A0%95.jpg`}
                                    alt="Image 10"/>
                            </div>
                        </Slider>
                    </section>

                    <div className="bb ze ki xn 2xl:ud-px-0 mb-8" style={{borderTop: "1px solid lightgray"}}/>

                    <div style={{color: "white", padding: "5%", border: "3px solid black"}}
                         className="rounded-xl bg-blue-950">
                        <div style={{display: "inline-flex", alignItems: "flex-start", margin: "auto"}}>
                            {/* FAQ 좌측 이미지 */}
                            <p style={{
                                color: "white",
                                fontSize: "50px",
                                display: "inline-flex",
                                alignItems: "flex-start",
                                margin: "auto"
                            }}>한석줍쇼에게 궁금한 점</p></div>
                        {/* FAQ 질문 모음 */}
                        <ul className="max-w-4xl mx-3 divide-y rounded-xl ml-32 mt-10">
                            <li>
                                <details className="group">
                                    <summary
                                        className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                                        <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                            </path>
                                        </svg>
                                        <span style={{padding: "1%"}}
                                              className="rounded-xl">보증금이 너무 저렴해서 의심스러워요</span>
                                    </summary>

                                    <article className="px-4 pb-4" style={{borderTop: "1px dashed white"}}>
                                        <p style={{padding: "1%"}} className="rounded-xl">
                                            <span className="highlighter">NO! 보증금은 원래 비싸지 않아도 괜찮아요.</span><br/>
                                            안전하게 임대료를 받을 수 있도록 임대인을 보호하는<br/>
                                            장치인 보증금. 보통 월세의 10배 이상으로 책정되지만,<br/>
                                            강남처럼 인기 많은 지역은 부르는 게 값이죠.<br/>
                                            그 부담은 고스란히 임차인의 몫이 되고요.<br/>
                                            <br/>
                                            한석줍쇼는 본질로 돌아가기로 했어요. 진짜 계약 보증을 위한<br/>
                                            최소 금액만 받기로요. 더 이상 사무실에 큰돈 묶어두지 마세요.<br/>
                                            대신 사업 성장에 투자해 보세요. 일 잘하는 인재를 뽑거나<br/>
                                            새로운 상품을 개발할 수도 있죠. 사무실 걱정 없이 일할 권리,<br/>
                                            신뢰로 다져진 한석줍쇼가 보장합니다.<br/>

                                        </p>
                                    </article>
                                </details>
                            </li>
                            <li>
                                <details className="group">
                                    <summary
                                        className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                                        <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                            </path>
                                        </svg>
                                        <span style={{padding: "1%"}}
                                              className="rounded-xl">그래도 저렴한 건 임대 사무실 아닌가요?</span>
                                    </summary>

                                    <article className="px-4 pb-4" style={{borderTop: "1px dashed white"}}>
                                        <p style={{padding: "1%"}} className="rounded-xl">
                                            <span className="highlighter"> NO! 사무실 구할 때 월세만 따지면 꼭 후회해요.</span><br/>
                                            매달 나오는 전기 요금 고지서에 한번 놀라고, 꼭 갑자기<br/>
                                            고장 나는 에어컨과 청구된 수리 비용에 두 번 놀라죠.<br/>
                                            문제를 해결하느라 직원들 시간을 뺏은 걸 생각하면<br/>
                                            한숨만 나오고요.<br/>
                                            배보다 배꼽이 더 큰 상황, 한석줍쇼가 막아드릴게요.<br/>
                                            <br/>
                                            한석줍쇼는 매달 단 한 번의 이용료로<br/>
                                            임대부터 시설 관리까지 말끔히 해결해요.<br/>
                                            땀 많은 우리 직원이 에어컨을 펑펑 틀어도, 뜬금없이<br/>
                                            인터넷이 고장 나 점검을 받아도 추가 요금은 없답니다.<br/>
                                            오직 한석줍쇼에서만 줄일 수 있는 사무실 비용을<br/>
                                            가볍게 계산해 보세요. </p>
                                    </article>
                                </details>
                            </li>
                            <li>
                                <details className="group">
                                    <summary
                                        className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                                        <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                            </path>
                                        </svg>
                                        <span style={{padding: "1%"}}
                                              className="rounded-xl">건물 출입이나 시설 예약이 번거롭진 않나요?</span>
                                    </summary>

                                    <article className="px-4 pb-4" style={{borderTop: "1px dashed white"}}>
                                        <p style={{padding: "1%"}} className="rounded-xl">
                                            <span className="highlighter"> NO! 한석줍쇼는 한석줍쇼 회원증 카드로 출입이 가능해요.</span><br/>
                                            단순한 출입 기능 외에도 미팅룸과 스튜디오 같은 시설<br/>
                                            예약부터 복합기까지 편리하게 회원증으로 이용할 수 있어요.<br/>
                                            <br/>
                                            또 갑자기 사무실 전등이 나가거나 화장실 변기가 막혀도<br/>
                                            웹으로 문의해 보세요.<br/>
                                            1:1 문의 기능으로 빠르고 손쉽게 해결이 가능하니까요.<br/>
                                            시대에 걸맞은 스마트 워크 시스템을 갖춘 한석줍쇼!<br/>
                                            입주 기업이라면 누구나 무료로 이용할 수 있답니다. </p>
                                    </article>
                                </details>
                            </li>
                            <li>
                                <details className="group">
                                    <summary
                                        className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                                        <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                            </path>
                                        </svg>
                                        <span style={{padding: "1%"}}
                                              className="rounded-xl">정말 24시간 운영이 되나요?</span>
                                    </summary>

                                    <article className="px-4 pb-4" style={{borderTop: "1px dashed white"}}>
                                        <p style={{padding: "1%"}} className="rounded-xl">
                                            <span className="highlighter"> NO! 한석줍쇼는 24시간 냉난방 가동을 멈추지 않아요.</span><br/>
                                            심지어 추가 요금도 없죠. 열심히 일하려고 마련한<br/>
                                            사무실인데, 너무 춥거나 더워서 집중력이 떨어지면<br/>
                                            안 되니까요.<br/>
                                            <br/>
                                            또한 한석줍쇼는 소형 사무실이나 미팅룸도 개별적으로
                                            냉난방기를 조절할 수 있어요. 기본적인 온도는 물론,<br/>
                                            바람의 세기와 방향까지 원하는 대로 설정할 수 있죠.<br/>
                                            공기 청정 기능까지 탑재되어 있어 365일 쾌적하게<br/>
                                            일할 수 있답니다. 일에만 몰두할 수 있는 환경,<br/>
                                            한석줍쇼에서 경험하세요. </p>
                                    </article>
                                </details>
                            </li>
                            <li>
                                <details className="group">
                                    <summary
                                        className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                                        <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                            </path>
                                        </svg>
                                        <span style={{padding: "1%"}}
                                              className="rounded-xl">창업 초반에 잠깐 머무는 곳이죠?</span>
                                    </summary>

                                    <article className="px-4 pb-4" style={{borderTop: "1px dashed white"}}>
                                        <p style={{padding: "1%"}} className="rounded-xl">
                                            <span className="highlighter"> NO! 한석줍쇼는 오래 쓰기 좋은 사무실이에요. </span><br/>
                                            일단 한 달 단위로 계약할 수 있어 어떤 상황이든 빠른 대응이<br/>
                                            가능하죠. 또 당장 다음 달에 더 큰 사무실이 필요해도 걱정<br/>
                                            없어요. 계약 기간 중에도 편히 확장할 수 있거든요.<br/>
                                            <br/>
                                            실제로 한석줍쇼에서는 여러 규모의 기업을 쉽게 찾아볼 수<br/>
                                            있어요. 갓 창업을 시작한 1인 기업과 회사 아이덴티티에<br/>
                                            꼭 맞게 사무실을 커스터마이징해서 쓰는 50인 기업,<br/>
                                            건물 하나를 통으로 사용하는 100인 기업까지.<br/>
                                            심지어 업력 70년 이상인 대기업도 거점오피스로<br/>
                                            한석줍쇼를 선택했죠. 전에 없던 유연한 사무실로 여러분의<br/>
                                            무한한 성장에 부스터를 달아드릴게요.</p>
                                    </article>
                                </details>
                            </li>
                            <li>
                                <details className="group">
                                    <summary
                                        className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
                                        <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                            </path>
                                        </svg>
                                        <span style={{padding: "1%"}}
                                              className="rounded-xl">멤버십 혜택에 있는 팟캐스트는 뭔가요?</span>
                                    </summary>

                                    <article className="px-4 pb-4" style={{borderTop: "1px dashed white"}}>
                                        <p style={{padding: "1%"}} className="rounded-xl">
                                            <span className="highlighter"> 한석줍쇼는 독서에 진심입니다. </span><br/>
                                            홀로 자기계발을 위해 독서를 하는 한석줍쇼 가족들을 위해<br/>
                                            서로 읽은 책에 대해 감상을 나눌 수 있는 팟캐스트를 운영중이에요<br/>
                                            팟캐스트 오픈 권한이 있는 모두에게 열려있는 장이니 마음껏 의견을 나눠보는게 어떨까요?</p>
                                    </article>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>


            {/* 홍보 */}
            <section className="do hj sp jr i pg rundry mt-14 mb-10">
                <div className="bb ze ki xn 2xl:ud-px-0 rounded-xl text-black py-5 border-2"
                     style={{backgroundColor: "#C1DDF2", display:"flex"}}>
                    <div className="ml-16 mt-56" style={{fontSize: "25px"}}>
                        <p className="py-2">정말 괜찮은 공간에서 몰두하는 경험, 오해 때문에 놓치긴 아까우니까.</p>
                        <p className="font-bold py-2">우리 회사의 다음 사무실, 나만의 공부방 </p>
                            <p className="font-bold py-2"><p className="highlighter">한석줍쇼에서 찾아보세요!</p></p>
                        <button
                            onClick={()=>{  window.location.href = '/membershipInfo';}}
                            className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full w-50 mt-6 ml-3"
                            style={{border: "2px solid black"}}>
                            멤버십 구독하러 가기
                        </button>
                    </div>

                    <div>
                        <img src="https://image.utoimage.com/preview/cp872722/2023/05/202305001269_500.jpg"/>
                    </div>
                </div>

            </section>
        </main>

    )
}
