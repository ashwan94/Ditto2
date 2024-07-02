import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [loginLog, setLoginLog] = useState(sessionStorage.getItem("member")); // Session 에서 가져온 로그인된 유저 정보

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode);
    }

    const handleScroll = () => {
      setStickyMenu(window.pageYOffset > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loginLog]);

  // 로그인 상태 변화 감지 useEffect
  useEffect(() => {
    setLoginLog(sessionStorage.getItem("member"))
  }, [loginLog]);


  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);


  // 로그아웃
  const goLogout = () => {
    sessionStorage.removeItem("member");
    setLoginLog(sessionStorage.getItem("member")); // page rendering 을 위한 hook
    window.location.href = '/';
  }

  return (
    <header
      className={`g s r vd ya cj rundry text-xl ${stickyMenu ? "hh sm _k dj bl ll" : ""}`}
    >
      <div className="bb ze ki xn 2xl:ud-px-0 oo wf yf i">
        <div className="vd to/4 tc wf yf">
          <Link to="/">
            <img className="om w-44" src="/images/hansukjupshow_logo.png" alt="Logo Light" />
            <img
              className="xc nm"
              src="/images/logo-dark.svg"
              alt="Logo Dark"
            />
          </Link>
          <button
            className="po rc"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <span className="rc i pf re pd">
              <span className="du-block h q vd yc">
                <span
                  className={`rc i r s eh um tg te rd eb ml jl dl ${!navigationOpen ? "ue el" : ""}`}
                ></span>
                <span
                  className={`rc i r s eh um tg te rd eb ml jl fl ${!navigationOpen ? "ue qr" : ""}`}
                ></span>
                <span
                  className={`rc i r s eh um tg te rd eb ml jl gl ${!navigationOpen ? "ue hl" : ""}`}
                ></span>
              </span>
              <span className="du-block h q vd yc lf">
                <span
                  className={`rc eh um tg ml jl el h na r ve yc ${!navigationOpen ? "sd dl" : ""}`}
                ></span>
                <span
                  className={`rc eh um tg ml jl qr h s pa vd rd ${!navigationOpen ? "sd rr" : ""}`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        <div
          className={`vd wo/4 sd qo f ho oo wf yf ${navigationOpen ? "d hh rm sr td ud qg ug jc yh" : ""}`}
        >
          <nav>
            <ul className="tc _o sf yo cg ep">
              <li className="c i" x-data="{ dropdown: false }">
                <a
                    href="#"
                    className="xl tc wf yf bg"
                    onClick={(e) => e.preventDefault()}
                >
                  한석줍쇼
                  <svg
                      className="th mm we fd pf"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                  >
                    <path
                        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                  </svg>
                </a>
                <ul className="a">
                  <li><Link to="/membershipInfo" className="xl">멤버십 소개</Link></li>
                  <li><Link to="/faq" className="xl">FAQ</Link></li>
                  <li><Link to="/floor" className="xl">입점 기업 리스트 / 층별 안내</Link></li>
                </ul>
              </li>
              <li className="c i" x-data="{ dropdown: false }">
                <a
                    href="#"
                    className="xl tc wf yf bg"
                    onClick={(e) => e.preventDefault()}
                >
                  커뮤니티
                  <svg
                      className="th mm we fd pf"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                  >
                    <path
                        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                  </svg>
                </a>
                <ul className="a">
                  <li><Link to="/community/noticeBoard/list" className="xl">공지사항</Link></li>
                  <li><Link to="/community/freeBoard/list" className="xl">자유게시판</Link></li>
                  <li><Link to="/community/relayBoard/list" className="xl">릴레이 소설</Link></li>
                  <li><Link to="/community/podcastBoard/list" className="xl">팟캐스트</Link></li>
                </ul>
              </li>
              <li className="c i" x-data="{ dropdown: false }">
                <a
                    href="#"
                    className="xl tc wf yf bg"
                    onClick={(e) => e.preventDefault()}
                >
                  도서
                  <svg
                      className="th mm we fd pf"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                  >
                    <path
                        d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                  </svg>
                </a>
                <ul className="a">
                  <li><Link to="/book/warn" className="xl">도서 대출 주의사항 안내</Link></li>
                  <li><Link to="/book/list" className="xl">도서 목록 조회</Link></li>
                </ul>
              </li>
              <li>
                <Link to="/seat/list">열람실</Link>
              </li>
            </ul>
          </nav>

          <div className="tc wf ig pb no">
          <div
                className="pc h io pa ra"
                style={{visibility: navigationOpen ? "visible" : "hidden"}}
            >
              <label className="rc ab i">
                <input
                    type="checkbox"
                    value={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                    className="pf vd yc uk h r za ab"
                />
                <svg
                    className="th om"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M12.0908 18.6363C10.3549 18.6363 8.69 17.9467 7.46249 16.7192C6.23497 15.4916 5.54537 13.8268 5.54537 12.0908C5.54537 10.3549 6.23497 8.69 7.46249 7.46249C8.69 6.23497 10.3549 5.54537 12.0908 5.54537C13.8268 5.54537 15.4916 6.23497 16.7192 7.46249C17.9467 8.69 18.6363 10.3549 18.6363 12.0908C18.6363 13.8268 17.9467 15.4916 16.7192 16.7192C15.4916 17.9467 13.8268 18.6363 12.0908 18.6363ZM12.0908 16.4545C13.2481 16.4545 14.358 15.9947 15.1764 15.1764C15.9947 14.358 16.4545 13.2481 16.4545 12.0908C16.4545 10.9335 15.9947 9.8236 15.1764 9.00526C14.358 8.18692 13.2481 7.72718 12.0908 7.72718C10.9335 7.72718 9.8236 8.18692 9.00526 9.00526C8.18692 9.8236 7.72718 10.9335 7.72718 12.0908C7.72718 13.2481 8.18692 14.358 9.00526 15.1764C9.8236 15.9947 10.9335 16.4545 12.0908 16.4545ZM10.9999 0.0908203H13.1817V3.36355H10.9999V0.0908203ZM10.9999 20.8181H13.1817V24.0908H10.9999V20.8181ZM2.83446 4.377L4.377 2.83446L6.69082 5.14828L5.14828 6.69082L2.83446 4.37809V4.377ZM17.4908 19.0334L19.0334 17.4908L21.3472 19.8046L19.8046 21.3472L17.4908 19.0334ZM19.8046 2.83337L21.3472 4.377L19.0334 6.69082L17.4908 5.14828L19.8046 2.83446V2.83337ZM5.14828 17.4908L6.69082 19.0334L4.377 21.3472L2.83446 19.8046L5.14828 17.4908ZM24.0908 10.9999V13.1817H20.8181V10.9999H24.0908ZM3.36355 10.9999V13.1817H0.0908203V10.9999H3.36355Z"
                    fill=""
                  />
                </svg>
                <img className="xc nm" src="images/icon-moon.svg" alt="Moon" />
              </label>
            </div>

            {sessionStorage.getItem("member") ?
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <button className="lk gh dk rg tc wf xf _l gi hi font-extrabold" onClick={goLogout}>로그아웃</button>
                  {JSON.parse(sessionStorage.getItem("member")).memberAdmin == "MEMBER" ?
                      (<Link to="/mypage" className="lk gh dk rg tc wf xf _l gi hi font-extrabold mx-3">마이페이지</Link>) : (<Link to="/adminPage" className="lk gh dk rg tc wf xf _l gi hi font-extrabold mx-3">관리자</Link>) }
                </div>
                :
                <Link to="/SignIn" className="lk gh dk rg tc wf xf _l gi hi font-extrabold">로그인</Link>
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
