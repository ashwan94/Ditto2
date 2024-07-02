  import { BrowserRouter, Route, Routes } from "react-router-dom";
  import Header from "./pages/common/header";
  import Main from "./main";
  import SignIn from "./pages/common/signIn";
  import SignUp from "./pages/common/signUp";
  import Mypage from "./pages/common/mypage";
  import Faq from "./pages/introduce/faq";
  import Membership from "./pages/introduce/membership";
  import Floor from "./pages/introduce/floor";
  import BookWarn from "./pages/book/warn";
  import BookList from "./pages/book/list";
  import BookView from "./pages/book/view";
  import FreeBoard from "./pages/community/freeBoard/list";
  import FreeBoardView from "./pages/community/freeBoard/view";
  import FreeBoardAdd from "./pages/community/freeBoard/add";
  import FreeBoardUpdate from "./pages/community/freeBoard/update";
  import NoticeBoard from "./pages/community/noticeBoard/list";
  import NoticeView from "./pages/community/noticeBoard/view";
  import NoticeAdd from "./pages/community/noticeBoard/add";
  import NoticeUpdate from "./pages/community/noticeBoard/update";
  import PodcastBoard from "./pages/community/podcastBoard/list";
  import PodcastView from "./pages/community/podcastBoard/view";
  import PodcastAdd from "./pages/community/podcastBoard/add";
  import PodcastUpdate from "./pages/community/podcastBoard/update";
  import RelayBoard from "./pages/community/relayBoard/list";
  import SeatList from  "./pages/seat/list"
  import KaKaoTalk from "./pages/common/kakaoTalk";
  import AdminPage from "./pages/common/adminPage";
  import Footer from "./pages/common/footer";
  import "./css/style.css";

  function App() {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/membershipInfo" element={<Membership />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/floor" element={<Floor />} />
            <Route path="/community/freeBoard/list" element={<FreeBoard />}/>
            <Route path="/community/freeBoard/view" element={<FreeBoardView />}/>
            <Route path="/community/freeBoard/add" element={<FreeBoardAdd />}/>
            <Route path="/community/freeBoard/update" element={<FreeBoardUpdate />}/>
            <Route path="/community/noticeBoard/list" element={<NoticeBoard />}/>
            <Route path="/community/noticeBoard/view" element={<NoticeView />}/>
            <Route path="/community/noticeBoard/add" element={<NoticeAdd />}/>
            <Route path="/community/noticeBoard/update" element={<NoticeUpdate />}/>
            <Route path="/community/podcastBoard/list" element={<PodcastBoard />} />
            <Route path="/community/podcastBoard/view" element={<PodcastView />} />
            <Route path="/community/podcastBoard/add" element={<PodcastAdd />} />
            <Route path="/community/podcastBoard/update" element={<PodcastUpdate />} />
            <Route path="/community/RelayBoard/list" element={<RelayBoard />} />
            <Route path="/book/warn" element={<BookWarn />} />
            <Route path="/book/list" element={<BookList/>}/>
            <Route path="/book/view" element={<BookView/>}/>
            <Route path="/seat/list" element={<SeatList />} />
            <Route path="/adminPage" element={<AdminPage />} />
          </Routes>
          <KaKaoTalk />
          <Footer />
        </BrowserRouter>
      </>
    );
  }
  export default App;