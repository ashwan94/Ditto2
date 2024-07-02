import React from "react";
import {useLocation} from "react-router-dom";

const KakaoTalk = () => {
    const locationNow = useLocation();
    if(locationNow.pathname === "/community/podcastBoard/chat") return null;

    return (
        <a id="chat-channel-button" href="javascript:chatChannel()">
            <img src="/images/consult_small_yellow_pc.png"
                 alt="카카오톡 채널 채팅하기 버튼"/>
        </a>
    )
}

export default KakaoTalk;