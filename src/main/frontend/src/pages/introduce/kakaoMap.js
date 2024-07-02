import React, { useEffect } from 'react';

const { kakao } = window;

function KakaoMap() {
    useEffect(() => {
        const container = document.getElementById('map');
        const option = {
            center: new kakao.maps.LatLng(36.326786, 127.407835), // 대전 중구 계룡로 825에 맞는 좌표로 변경
            level: 3
        };
        const map = new kakao.maps.Map(container, option);

        // 마커가 표시될 위치입니다
        const markerPosition  = new kakao.maps.LatLng(36.326786, 127.407835);

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    }, []);

    return (
        <div id="map" style={{
            margin: "auto",
            width: '60%',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "500px"}}></div>
    );
}

export default KakaoMap;
