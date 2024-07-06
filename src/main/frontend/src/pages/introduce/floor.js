import React, {useEffect} from "react";
import Slider from "react-slick";

export default function Floor() {


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

    
    // 첫 화면 윈도우 상단으로 위치
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    }, []);

    return (

        <main className="rundry text-xl">
            <section className="gj do hj sp jr i pg rundry" >
                <div className="bb ze ki xn 2xl:ud-px-0 mb-8" style={{borderTop: "1px solid lightgray"}}>

                    <div className="mb-28"/>
                    {/* 상단 기업 이미지 갤러리 섹션 */}
                    <div
                        className="mb- bg-blue-950 text-white py-10 px-6 rounded-xl border-black border-2 text-center"
                        style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            justifyContent: 'center', fontSize: "50px", width: "60%", margin: '0 auto'
                        }}
                      >
                        <img src="https://cdn-icons-png.flaticon.com/512/8347/8347452.png" className="w-48 h-40"/>

                        <p>한석줍쇼와 함께한 기업들</p>
                    </div>
                    <section className="image-gallery mt-12  border-t border-b border-gray-200 border-dashed">
                        <Slider {...settings}>
                            <div>
                                <img
                                    src={`http://asset.bizhows.com/bhfile01/__CM_FILE_DATA/202211/07/16/4699188_1667805902355.jpg`}
                                    alt="Image 1"/>
                            </div>
                            <div>
                                <img
                                    src={`http://asset.bizhows.com/bhfile01/__CM_FILE_DATA/202211/07/16/4699189_1667805902359.jpg`}
                                    alt="Image 2"/>
                            </div>
                            <div>
                                <img
                                    src={`http://asset.bizhows.com/bhfile01/__CM_FILE_DATA/202211/07/16/4699190_1667805902376.jpg`}
                                    alt="Image 3"/>
                            </div>
                            <div>
                                <img
                                    src={`http://asset.bizhows.com/bhfile01/__CM_FILE_DATA/202211/07/16/4699191_1667805902376.jpg`}
                                    alt="Image 4"/>
                            </div>
                            <div>
                                <img
                                    src={`http://asset.bizhows.com/bhfile01/__CM_FILE_DATA/202211/07/16/4699192_1667805902383.jpg`}
                                    alt="Image 5"/>
                            </div>
                            <div>
                                <img
                                    src={`http://asset.bizhows.com/bhfile01/__CM_FILE_DATA/202211/07/16/4699166_1667805706179.png`}
                                    alt="Image 6"/>
                            </div>
                            <div>
                                <img
                                    src={`http://asset.bizhows.com/bhfile01/__CM_FILE_DATA/202211/07/16/4699335_1667806270150.jpg`}
                                    alt="Image 7"/>
                            </div>
                            <div>
                                <img
                                    src={`http://asset.bizhows.com/bhfile01/__CM_FILE_DATA/202211/07/16/4699334_1667806270147.jpg`}
                                    alt="Image 8"/>
                            </div>
                            <div>
                                <img
                                    src={`http://asset.bizhows.com/bhfile01/__CM_FILE_DATA/202211/07/16/4699352_1667806403871.jpg`}
                                    alt="Image 9"/>
                            </div>
                            <div>
                                <img
                                    src={`http://asset.bizhows.com/bhfile01/__CM_FILE_DATA/202211/07/16/4699363_1667806532917.jpg`}
                                    alt="Image 10"/>
                            </div>
                        </Slider>
                    </section>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                         className="mb-12 mt-5">
                        <button style={{display: 'inline-flex', alignItems: 'center', textAlign: 'center'}}
                                className="mt-12 text-blue-400 border-b"
                                onClick={() => {
                                    const kakaoTalk = document.querySelector("#chat-channel-button")
                                    kakaoTalk.click()
                                }}
                        >
                            한석줍쇼는 함께 성장할 기업들을 환영합니다
                        </button>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqRcDnbOxWwxbXs7iAXwJascC2EPVbKCFbFQ&s"
                            alt="이미지 설명"
                            style={{width: '80px', height: '80px'}}
                        />
                    </div>


                    <div className="border-2 border-gray-200 border-dashed rounded-xl bg-gray-50 mb-28 py-5 px-8">



                        {/* 층별 안내 세션 */}
                        <section style={{
                            display: "grid",
                            placeItems: "center"
                        }}
                        >

                            <div
                                className="mt-14 py-10 px-6 rounded-xl border-black border-2 text-center text-white bg-blue-950"
                                style={{
                                    fontSize: "50px", width: "50%", display: "inline-flex",
                                    alignItems: "center",
                                    textAlign: "center"
                                }}>
                                <img src="https://cdn-icons-png.flaticon.com/128/3824/3824541.png"
                                     className="w-36 h-36"/>
                                <p className="text-center px-8">한석줍쇼 층별 안내</p>
                            </div>

                            <div id="floor">
                                <div className="mt-14 mb-36">
                                    <div
                                        className="text-center mt-12 mb-10 bg-blue-300 rounded-xl py-10 px-8 text-white border-dashed border-2 font-bold"
                                        style={{fontSize: "30px"}}>
                                        1층<br/>
                                        카페테리아
                                    </div>

                                    <div className="main">
                                        <div className="main_img">
                                            <img
                                                src="https://png.pngtree.com/background/20230618/original/pngtree-high-angle-view-of-a-coffee-shop-cafe-lounge-in-3d-picture-image_3747899.jpg"/>
                                            <p>
                                                <div className="text-center">
                                                    <div style={{fontSize: "50px"}} className="mb-5 ">1층 카페테리아</div>

                                                </div>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="main mt-5">
                                        <div className="main_img">
                                            <img
                                                src="https://png.pngtree.com/background/20230618/original/pngtree-a-coffee-shop-and-cafe-lounge-rendered-in-3d-picture-image_3748081.jpg"/>
                                            <p>
                                                <div className="text-center">
                                                    <div style={{fontSize: "50px"}} className="mb-5 ">카페테리아</div>
                                                    잔잔한 음악이 나오는 휴게카페존으로 <br/>

                                                    이용자들을 위한 최고급 원두커피와 다양한 간식이 준비되어 있습니다. <br/>

                                                    휴식을 즐기면서 마음을 가다듬고 리프레쉬할 수 있는 공간입니다.
                                                </div>
                                            </p>

                                        </div>
                                    </div>
                                </div>


                                <div className="mt-14 mb-36">
                                    <div
                                        className="text-center mt-12 mb-10 bg-blue-300 rounded-xl py-10 px-8 text-white border-dashed border-2  font-bold"
                                        style={{fontSize: "30px"}}>
                                        2층<br/>
                                        개인열람실 / 스터디존
                                    </div>


                                    <div className="main mt-5">
                                        <div className="main_img">
                                            <img
                                                src="https://mblogthumb-phinf.pstatic.net/MjAyMDA4MDNfNjgg/MDAxNTk2NDQzMzQ5MjEy.TBom_aL0Yn92UsENNZY9LnytloApxS6206AoQcYioYkg.MRgZ5sZvxv_yE1Y1xW7EaxYberwKash4J2AQK02eHdsg.JPEG.gamsungstudycafe10/KakaoTalk_20200803_165536859.jpg?type=w800"/>
                                            <p>
                                                <div className="text-center">
                                                    <div style={{fontSize: "50px"}} className="mb-5 ">2층 개인열람실</div>

                                                </div>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="main mt-5">
                                        <div className="main_img">
                                            <img
                                                src="https://modo-phinf.pstatic.net/20200717_171/1594975412422YJd2L_PNG/mosahJRfTa.png?type=w1100"/>
                                            <p>
                                                <div className="text-center">
                                                    <div style={{fontSize: "50px"}} className="mb-5 ">유틸리티존</div>
                                                    너무 조용하지도, 시끄럽지도 않은 분위기 속에서 <br/>

                                                    노트북이나 키보드 등을 써야할 때 이제 눈치보지 말고 사용해요! <br/>

                                                    편안한 분위기 속에서 공부할 수 있는 세미 스터디공간입니다.
                                                </div>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="main mt-5">
                                        <div className="main_img">
                                            <img
                                                src="https://cdn.imweb.me/upload/S20200827134edd4261517/0959ea1d77556.png"/>
                                            <p>
                                                <div className="text-center">
                                                    <div style={{fontSize: "50px"}} className="mb-5 "> 스터디존</div>
                                                    노트북 소리, 이야기 소리 등에 방해받지 않고 조용한 분위기 속에서 <br/>

                                                    집중력을 최대한으로 끌어올리고 싶을 때에는 스터디존! <br/>

                                                    절대정숙 스터디공간으로 높은 집중도를 가지고 공부할 수 있습니다.
                                                </div>
                                            </p>
                                        </div>
                                    </div>


                                </div>


                                <div className="mt-14 mb-36">
                                    <div
                                        className="text-center mt-12 mb-10 bg-blue-300 rounded-xl py-10 px-8 text-white border-dashed border-2 font-bold"
                                        style={{fontSize: "30px"}}>
                                        3층<br/>
                                        공유오피스
                                    </div>


                                    <div className="main mt-5">
                                        <div className="main_img">
                                            <img
                                                src="https://i0.wp.com/916er.com/wp-content/uploads/%EA%B3%B5%EC%9C%A0%EC%98%A4%ED%94%BC%EC%8A%A4%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B409.jpg?resize=840%2C473&ssl=1"/>
                                            <p>
                                                <div className="text-center">
                                                    <div style={{fontSize: "50px"}} className="mb-5 ">3층 공유오피스</div>

                                                </div>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="main mt-5">
                                        <div className="main_img">
                                            <img
                                                src="https://previews.123rf.com/images/nikonaft/nikonaft1111/nikonaft111100025/11385173-%EC%82%AC%EB%AC%B4%EC%8B%A4-%EA%B1%B4%EB%AC%BC%EC%9D%98-%EB%82%B4%EB%B6%80%EB%8A%94-%EC%95%84%EB%9E%98%EB%A1%9C-%EB%B3%B8%EB%8B%A4-3d-%EC%9D%B4%EB%AF%B8%EC%A7%80.jpg"/>
                                            <p>
                                                <div className="text-center">
                                                    <div style={{fontSize: "50px"}} className="mb-5 ">전층형 오피스</div>
                                                    한 층을 단독으로 사용하여<br/>
                                                    층 내 미팅룸, 라운지, 팬트리도 우리 회사만 사용하는<br/>
                                                    보안이 월등히 우수한 사무 공간입니다.
                                                </div>
                                            </p>
                                        </div>
                                    </div>


                                    <div className="main mt-5">
                                        <div className="main_img">
                                            <img
                                                src="https://i0.wp.com/916er.com/wp-content/uploads/2020-01-18-235435-1.png?resize=840%2C613&ssl=1"/>
                                            <p>
                                                <div className="text-center">
                                                    <div style={{fontSize: "50px"}} className="mb-5 ">독립형 오피스</div>
                                                    독립된 사무 공간은 프라이빗하게 누리고<br/>
                                                    라운지, 미팅룸, 화장실 등 공용 공간은<br/>
                                                    더 넓게 누리는 사무실입니다.
                                                </div>
                                            </p>
                                        </div>
                                    </div>

                                </div>


                                <div className="mt-14 mb-36">
                                    <div
                                        className="text-center mt-12 mb-10 bg-blue-300 rounded-xl py-10 px-8 text-white border-dashed border-2 font-bold"
                                        style={{fontSize: "30px"}}>
                                        4층<br/>
                                        도서관
                                    </div>

                                    <div className="main mt-5">
                                        <div className="main_img">
                                            <img
                                                src="https://png.pngtree.com/background/20240413/original/pngtree-contemporary-library-interior-in-3d-design-picture-image_8473738.jpg"/>
                                            <p>
                                                <div className="text-center">
                                                    <div style={{fontSize: "50px"}} className="mb-5 ">4층 도서관</div>

                                                </div>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="main mt-5">
                                        <div className="main_img">
                                            <img
                                                src="https://png.pngtree.com/background/20240125/original/pngtree-contemporary-library-interior-featuring-study-desk-and-table-rendered-in-3d-picture-image_7425700.jpg"/>
                                            <p>
                                                <div className="text-center">
                                                    <div style={{fontSize: "50px"}} className="mb-5 ">도서관</div>
                                                    한석줍쇼 도서관은 한석줍쇼 오피스를 이용하는 모든 분께<br/>
                                                    다양한 자료를 제공하고 식견을 넓힐 수 있도록<br/>
                                                    도움을 드리는 자유로운 공간입니다.
                                                </div>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </main>


    )


}