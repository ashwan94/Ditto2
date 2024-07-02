import React, {useEffect} from 'react';
import Slider from 'react-slick';
import './css/introduction.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import KakaoMap from './pages/introduce/kakaoMap';

export default function Main() {


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
            <section className="gj do ir hj sp jr i pg">
                <div className="bb ze ki xn 2xl:ud-px-0" style={{borderTop: "1px solid lightgray"}}/>

                {/* 로고 구역 */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                }}>
                    <div>
                        <img src="/images/hansukjupshow_logo.png" alt="Logo Light"
                             style={{
                                 display: "block",
                                 margin: "0 auto"
                             }}/>
                        <p style={{textAlign: "center"}} className="mb-12">직장인 5명 중 2명은 퇴근 후 ‘공부한다’라고 답할 만큼<br/>
                            분초사회라 일컫는 현대사회에 자기계발에 시간과 돈을 아끼지 않는 ‘샐러던트’들을 위해 <br/>
                            업무 공간과 그룹 스터디와 같은 미팅룸, 개인 작업을 할 수 있는 시스템과 공간을 마련하였습니다</p>
                    </div>
                </div>
                <div className="bb ze ki xn 2xl:ud-px-0" style={{borderTop: "1px solid lightgray"}}/>
                {/* gif 구역 */}
                <div className="bb ze ki xn 2xl:ud-px-0">


                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div className="animate_left jn/2">
                            <h1 className="fk vj zp or kk wm wbss font-extrabold rundry px-2 py-3"
                                style={{fontSize: "65px"}}>
                                나와 너, 그리고 우리를<br/> 위한 공간
                            </h1>
                            <p className="fq mt-2">
                                생각은 곱씹으면 깊어지고, 아이디어는 부딪힐수록 커집니다.<br/> 한석줍쇼에서는 사람과 사람을 연결하는<br/> 커뮤니케이션 공간을
                                제공하며,<br/> 많은 사람들이 반짝이는
                                영감을 얻을 수 있는 환경 조성을<br/> 최우선 목표로 두고 있습니다.
                            </p>
                        </div>

                        <img src="/images/shape-01.svg" alt="shape"
                             className="xc 2xl:ud-block h t -ud-left-[10%] ua scale-75"/>
                        <img src="https://cdn.wadiz.kr/ft/images/green001/2021/0702/20210702193533979_7.gif"
                             alt="library" className="rounded-3xl my-52"
                             style={{width: "60%", height: "80%"}}/>
                    </div>


                </div>
            </section>


            <section>
                <div className="bb ze ki xn 2xl:ud-px-0">

                    {/* 상단 이미지 갤러리 섹션 */}
                    <section className="image-gallery">
                        <Slider {...settings}>
                            <div>
                                <img src={`${process.env.PUBLIC_URL}/images/gu1.png`} alt="Image 1"/>
                            </div>
                            <div>
                                <img src={`${process.env.PUBLIC_URL}/images/gu2.jpg`} alt="Image 2"/>
                            </div>
                            <div>
                                <img src={`${process.env.PUBLIC_URL}/images/gu3.jpg`} alt="Image 3"/>
                            </div>
                            <div>
                                <img src={`${process.env.PUBLIC_URL}/images/gu4.png`} alt="Image 4"/>
                            </div>
                            <div>
                                <img src={`${process.env.PUBLIC_URL}/images/gu5.jpg`} alt="Image 5"/>
                            </div>
                            <div>
                                <img src={`${process.env.PUBLIC_URL}/images/gu6.jpg`} alt="Image 6"/>
                            </div>
                            <div>
                                <img src={`${process.env.PUBLIC_URL}/images/gu7.jpg`} alt="Image 7"/>
                            </div>
                            <div>
                                <img src={`${process.env.PUBLIC_URL}/images/gu8.jpg`} alt="Image 8"/>
                            </div>
                            <div>
                                <img src={`${process.env.PUBLIC_URL}/images/gu9.jpg`} alt="Image 9"/>
                            </div>
                            <div>
                                <img src={`${process.env.PUBLIC_URL}/images/gu10.jpg`} alt="Image 10"/>
                            </div>
                        </Slider>
                    </section>


                    {/* 슬로건 섹션 */}
                    <section className="slogan">

                        <p style={{
                            fontSize: "30px",
                            display: "inline-flex",
                            alignItems: "center",
                            textAlign: "center"
                        }}>
                            <img src="https://cdn-icons-png.flaticon.com/512/2784/2784530.png"
                                 style={{width: "70px", marginRight: "10px"}}/>
                            일반 공유 오피스와 한석줍쇼의 차이?
                        </p>

                        <p className="mt-12" style={{fontSize: "20px"}}> 커피를 마시며 개인 작업을 할 수 있는 공유오피스나 스터디카페들은
                            많지만 <br/>
                            도서 대여 서비스는 없어 자기계발을 하고자 하는 샐러던트들이 <br/>
                            새로운 기술이나 지식을 습득하기 위해 도서 구매를 하는 등 <br/>
                            '한석줍쇼'에서는 이중 지출하는 것을 방지할 수 있으며<br/>
                            사용자가 24시간 시간과 공간에 구애받지 않고 시설을 이용할 수 있습니다</p>
                    </section>


                    <div className="animate_left xc gn gg jn/2 i">


                    </div>


                    <section>
                        <div className="mt-44 mb-44" style={{display: "flex", alignItems: "center"}}>
                            <div style={{width: "50rem"}}>
                                <img
                                    src="images/main_relay_sample.png"
                                    alt="Shape"
                                    className="ms-24 mb-24 scale-125 border"
                                />
                            </div>


                            <div className="mb-28">
                                <h4 className="ek yj mk gb rundry">릴레이 소설</h4>
                                <h2 className="fk vj zp pr kk wm qb rundry">
                                    우리가 완성하는 이야기
                                </h2>
                                <p className="uo">
                                    여러 사람의 손을 거친 소설은 어떻게 마무리될까요?<br/>
                                    자유롭고 두서없이 완성해나가는 릴레이 소설에 참여해보세요!
                                </p>
                            </div>


                        </div>
                    </section>


                    <section className="mt-5 mb-36">
                        <div className="animate_top_container"
                             style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <div className="animate_top kn to/3 tc cg oq mb-12 mt-10">
                                <div className="tc wf xf cf ae cd rg mh">
                                    <img src="images/main_call_icon.png" alt="Icon"/>
                                </div>
                                <div>
                                    <h4 className="ek yj go kk wm xb rundry">24시간 상담</h4>
                                    <p className="mr-5">
                                        도움이 필요하신가요? 시설 이용 중 발생하는 궁금증, 건의사항, 요청 사항 등 언제든 응대할 수 있는 상담원이 대기 중입니다
                                    </p>
                                </div>
                            </div>


                            <div className="animate_top kn to/3 tc cg oq mb-12">
                                <div className="tc wf xf cf ae cd rg nh">
                                    <img src="images/main_membership_icon.png" alt="Icon" className="scale-110"/>
                                </div>
                                <div>
                                    <h4 className="ek yj go kk wm xb rundry">멤버십 서비스</h4>
                                    <p className="mr-5">복합기, 열람실, 스낵 등 무제한 이용 가능합니다</p>
                                </div>
                            </div>

                            <div className="animate_top kn to/3 tc cg oq">
                                <div className="tc wf xf cf ae cd rg oh">
                                    <img src="images/main_community_icon.png" alt="Icon" className="scale-110"/>
                                </div>
                                <div className="mb-12">
                                    <h4 className="ek yj go kk wm xb rundry">팟캐스트</h4>
                                    <p>재밌게 읽은 책 내용을 많은 사람들과 실시간 방송으로 공유해보세요</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 비전 섹션 */}
                    <section className="vision">
                        <p style={{fontSize: "30px", color: "black"}} className="mb-12">한석줍쇼 시설 안내</p>
                        <div className="bb ze ki xn yq mb en">
                            <div className="wc qf pn xo ng">
                                <div className="animate_top sg oi pi zq ml il am cn _m">
                                    <img
                                        src="https://lh5.googleusercontent.com/proxy/stZ-O88AvcPbSNZXwPKT298v92BWPAVK24U8z7ysuvfIT442Glz6przdBI_mg95lJIEzfyU-0x_DhuwnwBJYbxpQg2ae8T7rhXiJyd2suIxxhY68qZvVCs8Oh34Jy9QJWK-RtvxxaS-UiCwFsxP-ssaEVjVqCxnn7GPyZ77KrEc4dhNNPfoMxyo9eMoDqcAQw9Q"
                                        alt="라운지" style={{weight: "300px", height: "200px"}}/>
                                    <h4 className="ek zj kk wm nb _b rundry">라운지</h4>

                                </div>

                                <div className="animate_top sg oi pi zq ml il am cn _m">
                                    <img
                                        src="https://static.wixstatic.com/media/5993f5_80eafed105344fe5bf48bbcb4fe86639~mv2.jpg/v1/fill/w_451,h_246,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/hatchardsroom_01_230103_.jpg"
                                        alt="열람실" style={{weight: "300px", height: "200px"}}/>
                                    <h4 className="ek zj kk wm nb _b rundry">열람실</h4>
                                </div>

                                <div className="animate_top sg oi pi zq ml il am cn _m">
                                    <img
                                        src="https://mblogthumb-phinf.pstatic.net/MjAyMTEyMDJfMTg1/MDAxNjM4NDA5MzE0MDE4._Ufays3m2koayAvxONowzWwZPzI4SeUbi0E-eewgcuYg.LuI2DsZjeKUO81EOMm8BXuqOXjKWgsbcHH2PDQO4SSIg.JPEG.fast_five_/181012_FASTFIVE_0854.jpg?type=w800"
                                        alt="미팅룸" style={{weight: "300px", height: "200px"}}/>
                                    <h4 className="ek zj kk wm nb _b rundry">미팅룸</h4>
                                </div>

                                <div className="animate_top sg oi pi zq ml il am cn _m">
                                    <img src="https://corp.fastfive.co.kr/wp-content/uploads/2019/03/005-scaled.jpg"
                                         alt="공유오피스" style={{weight: "300px", height: "200px"}}/>
                                    <h4 className="ek zj kk wm nb _b rundry">공유오피스</h4>

                                </div>

                                <div className="animate_top sg oi pi zq ml il am cn _m">
                                    <img src="https://cdn.hankyung.com/photo/202201/01.28637198.1.jpg" alt="카페이용가능"
                                         style={{weight: "300px", height: "200px"}}/>
                                    <h4 className="ek zj kk wm nb _b rundry">카페</h4>

                                </div>

                                <div className="animate_top sg oi pi zq ml il am cn _m">
                                    <img
                                        src="https://i.namu.wiki/i/Jq3BxfdptAuvp5RMaFlWs1X7NPb6IJCsnQA6sDzqeUrT8gzyWR3unU8hOW3XEfyhpCnG5qSCEDxopRlfgPyiNg.webp"
                                        alt="도서대여기능" style={{weight: "300px", height: "200px"}}/>
                                    <h4 className="ek zj kk wm nb _b rundry">도서 열람 / 대여</h4>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 연락처 섹션 */}
                    <section className="contact" style={{marginTop: "10%"}}>
                        <p className="rundry" style={{fontSize: "30px", color: "black"}}>
                            오시는 길</p>
                        <p style={{color: "black", fontSize: "20px"}}>대전광역시 중구 계룡로 825</p>
                        <KakaoMap/>
                        <div className="bb ze ki xn yq mb en">
                            <div className="wc qf pn xo ng">
                                <div className="sg oi pi zq ml il am cn _m">
                                    <h4 className="ek zj kk wm nb _b rundry ml-20"
                                        style={{display: "flex", alignItems: "center", textAlign: "center"}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="size-6 mr-1 text-blue-900"
                                        >
                                            <path
                                                d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"/>
                                            <path fillRule="evenodd"
                                                  d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                        영업 시간
                                    </h4>
                                    <p>
                                        월요일 : 연중무휴 24시간 <br/>
                                        화요일 : 연중무휴 24시간 <br/>
                                        수요일 : 연중무휴 24시간<br/>
                                        목요일 : 연중무휴 24시간<br/>
                                        금요일 : 연중무휴 24시간<br/>
                                        토요일 : 연중무휴 24시간<br/>
                                        일요일 : 연중무휴 24시간<br/>
                                        입주 상담 : 매일 9시 - 18시 가능 <br/>
                                        상담원 연결 : 매일 24시간 가능
                                        <br/>
                                    </p>
                                </div>

                                <div className="animate_top sg oi pi zq ml il am cn _m">
                                    <h4 className="ek zj kk wm nb _b rundry  ml-20"
                                        style={{display: "flex", alignItems: "center", textAlign: "center"}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="size-6 mr-1 text-blue-900">
                                            <path fillRule="evenodd"
                                                  d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                        연락처
                                    </h4>
                                    <p style={{textAlign: "left"}}> 한석줍쇼 연락처 : 010-4795-9464 </p>
                                    <p style={{textAlign: "left"}}> * 사이트 하단의 톡상담 버튼 클릭 시 <br/>상담원과 연결됩니다 </p>
                                </div>

                                <div className="animate_top sg oi pi zq ml il am cn _m">
                                    <h4 className="ek zj kk wm nb _b rundry  ml-20"
                                        style={{display: "flex", alignItems: "center", textAlign: "center"}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="size-6 mr-1 text-blue-900">
                                            <path fillRule="evenodd"
                                                  d="M8.161 2.58a1.875 1.875 0 0 1 1.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0 1 21.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 0 1-1.676 0l-4.994-2.497a.375.375 0 0 0-.336 0l-3.868 1.935A1.875 1.875 0 0 1 2.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437ZM9 6a.75.75 0 0 1 .75.75V15a.75.75 0 0 1-1.5 0V6.75A.75.75 0 0 1 9 6Zm6.75 3a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 1.5 0V9Z"
                                                  clipRule="evenodd"/>
                                        </svg>

                                        주소
                                    </h4>
                                    <p style={{textAlign: "left"}}> 주소 : 대전광역시 중구 계룡로 825<br/>(용두동, 희영빌딩 2층) </p>
                                    <p style={{textAlign: "left"}}> 지하철 : 오룡역 8번 출구에서 300미터<br/>(3분거리) </p>
                                    <p style={{textAlign: "left"}}> 버스 : 101, 103, 107, 601, 603, 604, 618, 315, 317,
                                        614
                                        <br/> (중도일보 또는 오룡역 주변 하차, 5분 이내)
                                    </p>
                                </div>

                            </div>
                        </div>
                    </section>


                    <section className="i pg gh ji mt-24">
                        <img className="h p q" src="images/shape-16.svg" alt="Bg Shape"/>

                        <section id="testimonials" style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <div className="container px-4 ms-28">
                                <div className="flex flex-wrap">
                                    <div className="w-full mx-4">
                                        <div
                                            className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[620px] text-white">
                                            <h2
                                                className="
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[42px]
                  text-dark
                  mb-4
                "
                                            >
                                                마음의 소리
                                            </h2>
                                            <p
                                                className="
                  text-lg
                  sm:text-xl
                  leading-relaxed
                  sm:leading-relaxed
                  text-body-color
                "
                                            >
                                                한석줍쇼를 이용자들의 마음 속에서 우러나온 이야기들
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap">
                                    <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                                        <div
                                            className="
                ud-single-testimonial
                p-8
                bg-white
                mb-12
                shadow-testimonial
                wow
                fadeInUp
              "
                                            data-wow-delay=".1s
              "
                                        >
                                            <div className="ud-testimonial-ratings flex items-center mb-3">
                <span className="text-[#fbb040] mr-1">
                  <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      className="fill-current"
                  >
                    <path
                        d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z"
                    />
                  </svg>
                </span>
                                                <span className="text-[#fbb040] mr-1">
                  <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      className="fill-current"
                  >
                    <path
                        d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z"
                    />
                  </svg>
                </span>
                                                <span className="text-[#fbb040] mr-1">
                  <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      className="fill-current"
                  >
                    <path
                        d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z"
                    />
                  </svg>
                </span>
                                                <span className="text-[#fbb040] mr-1">
                  <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      className="fill-current"
                  >
                    <path
                        d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z"
                    />
                  </svg>
                </span>
                                                <span className="text-[#fbb040] mr-1">
                  <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      className="fill-current"
                  >
                    <path
                        d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z"
                    />
                  </svg>
                </span>
                                            </div>
                                            <div className="ud-testimonial-content mb-6">
                                                <p className="text-base tracking-wide text-body-color">
                                                    실수로 복도에 음료를 쏟았는데 데스크 직원분이 빠르게 처리해주셨습니다. 죄송하고 감사합니다.
                                                </p>
                                            </div>
                                            <div className="ud-testimonial-info flex items-center">
                                                <div
                                                    className="
                    ud-testimonial-image
                    w-[50px]
                    h-[50px]
                    rounded-full
                    overflow-hidden
                    mr-5
                  "
                                                >
                                                    <img
                                                        src="/images/main_review1.png"
                                                        alt="author"
                                                    />
                                                </div>
                                                <div className="ud-testimonial-meta">
                                                    <h4 className="text-sm font-semibold">카릿나</h4>
                                                    <p className="text-[#969696] text-xs">knifeHave @ nextit.or.kr</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                                        <div
                                            className="
                ud-single-testimonial
                p-8
                bg-white
                mb-12
                shadow-testimonial
                wow
                fadeInUp
              "
                                            data-wow-delay=".15s
              "
                                        >
                                            <div className="ud-testimonial-ratings flex items-center mb-3">
                <span className="text-[#fbb040] mr-1">
                  <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      className="fill-current"
                  >
                    <path
                        d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z"
                    />
                  </svg>
                </span>
                                                <span className="text-[#fbb040] mr-1">
                  <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      className="fill-current"
                  >
                    <path
                        d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z"
                    />
                  </svg>
                </span>
                                                <span className="text-[#fbb040] mr-1">
                  <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      className="fill-current"
                  >
                    <path
                        d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z"
                    />
                  </svg>
                </span>
                                                <span className="text-[#fbb040] mr-1">
                  <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      className="fill-current"
                  >
                    <path
                        d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z"
                    />
                  </svg>
                </span>
                                                <span className="text-[#fbb040] mr-1">
                  <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      className="fill-current"
                  >
                    <path
                        d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z"
                    />
                  </svg>
                </span>
                                            </div>
                                            <div className="ud-testimonial-content mb-12">
                                                <p className="text-base tracking-wide text-body-color">
                                                    에어컨이 빵빵함. 남극에 온 것 같음. 취조실로 써도 될 듯.
                                                </p>
                                            </div>
                                            <div className="ud-testimonial-info flex items-center">
                                                <div
                                                    className="
                    ud-testimonial-image
                    w-[50px]
                    h-[50px]
                    rounded-full
                    overflow-hidden
                    mr-5
                  "
                                                >
                                                    <img
                                                        src="/images/main_review2.png"
                                                        alt="author"
                                                    />
                                                </div>
                                                <div className="ud-testimonial-meta">
                                                    <h4 className="text-sm font-semibold">진실공방</h4>
                                                    <p className="text-[#969696] text-xs">truthroom @ instagram</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                                        <div
                                            style={{height: "238px"}}
                                            className="
                ud-single-testimonial
                p-8
                bg-white
                mb-12
                shadow-testimonial
                wow
                fadeInUp
              "
                                            data-wow-delay=".2s
              "
                                        >
                                            <div className="ud-testimonial-ratings flex items-center mb-3">
                <span className="text-[#fbb040] mr-1">
                  <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      className="fill-current"
                  >
                    <path
                        d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z"
                    />
                  </svg>
                </span>
                                                <span className="text-[#fbb040] mr-1">
                  <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      className="fill-current"
                  >
                    <path
                        d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z"
                    />
                  </svg>
                </span>
                                                <span className="text-[#fbb040] mr-1">
                  <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      className="fill-current"
                  >
                    <path
                        d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z"
                    />
                  </svg>
                </span>
                                                <span className="text-[#fbb040] mr-1">
                  <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      className="fill-current"
                  >
                    <path
                        d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z"
                    />
                  </svg>
                </span>
                                                <span className="text-[#fbb040] mr-1">
                  <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      className="fill-current"
                  >
                    <path
                        d="M9.09815 0.360596L11.1054 6.06493H17.601L12.3459 9.5904L14.3532 15.2947L9.09815 11.7693L3.84309 15.2947L5.85035 9.5904L0.595291 6.06493H7.0909L9.09815 0.360596Z"
                    />
                  </svg>
                </span>
                                            </div>
                                            <div className="ud-testimonial-content mb-12">
                                                <p className="text-base tracking-wide text-body-color">
                                                    복사기 무료 이용이 너무 좋습니다. 흑백만 되는게 아쉽지만 만족합니다.
                                                </p>
                                            </div>
                                            <div className="ud-testimonial-info flex items-center">
                                                <div
                                                    className="
                    ud-testimonial-image
                    w-[50px]
                    h-[50px]
                    rounded-full
                    overflow-hidden
                    mr-5
                  "
                                                >
                                                    <img
                                                        src="/images/main_review3.png"
                                                        alt="author"
                                                    />
                                                </div>
                                                <div className="ud-testimonial-meta">
                                                    <h4 className="text-sm font-semibold">상냥한자와</h4>
                                                    <p className="text-[#969696] text-xs">kindthief @ Troie</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </section>


                </div>
            </section>
        </main>
    );
}
