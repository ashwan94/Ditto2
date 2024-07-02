import React from 'react';

const Footer = () => {
    return (
        <footer className="rundry">
            <hr className="w-full hr1 mb-10"/>
            <div className="bb ze ki xn 2xl:ud-px-0">
                <div className="mt-3">
                    <div className="tc uf ap gg fp">
                        <div className="my-12">
                            <div className="text-2xl mb-2 text-center text-black">이용 문의</div>
                            <a href="#" className="ek jk lk gh gi hi rg ml il vc _d _l">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/>
                                </svg>
                                <span className="ms-3">042 - 719 - 8850</span>
                            </a>
                        </div>
                        <div className="vd ro tc sf rn un gg vn">
                            <div className="animate_top">
                                <h4 className="kk wm tj ec rundry">바로가기</h4>
                                <ul>
                                    <li><a href="http://localhost:3000/" className="sc xl vb">홈</a></li>
                                    <li><a href="http://localhost:3000/book/list" className="sc xl vb">도서</a></li>
                                    <li><a href="http://localhost:3000/membershipInfo" className="sc xl vb">멤버십</a></li>
                                </ul>
                            </div>
                            <div className="animate_top">
                                <h4 className="kk wm tj ec rundry">시설 안내</h4>
                                <ul>
                                    <li><a href="http://localhost:3000/seat/list" className="sc xl vb">열람실</a></li>
                                    <li><a href="http://localhost:3000/seat/list" className="sc xl vb">내부 구조도</a></li>
                                </ul>
                            </div>
                            <div className="animate_top">
                                <h4 className="kk wm tj ec rundry">지원</h4>
                                <ul>
                                    <li><a href="https://section.blog.naver.com/BlogHome.naver?directoryNo=0&currentPage=1&groupId=0" className="sc xl vb">블로그</a></li>
                                    <li><a href="https://github.com/ashwan94/Ditto" className="sc xl vb">Github</a></li>
                                </ul>
                            </div>
                            <div className="animate_top">
                                <h4 className="kk wm tj ec rundry">개인정보취급방침</h4>
                                <ul>
                                    <li><a href="#" className="sc xl vb">이용약관</a></li>
                                    <li><a href="#" className="sc xl vb">운영정책</a></li>
                                    <li><a href="#" className="sc xl vb">접근성 안내</a></li>
                                </ul>
                            </div>
                        </div>
                        {/*<a id="chat-channel-button" href="javascript:chatChannel()">*/}
                        {/*    <img src="/images/consult_small_yellow_pc.png"*/}
                        {/*         alt="카카오톡 채널 채팅하기 버튼"/>*/}
                        {/*</a>*/}
                    </div>
                </div>
                <div className="bh ch pm tc uf sf wf xf ap cg fp bj">
                    <p>&copy; 2024 한석줍쇼. All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
