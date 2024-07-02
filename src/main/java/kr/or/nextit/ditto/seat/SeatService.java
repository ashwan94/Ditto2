package kr.or.nextit.ditto.seat;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatService {
    private final SeatMapper mapper;

    public List<SeatVO> selectSeat(){
        return mapper.selectSeat();
    }
    void goReservate(int seatNo){mapper.goReservate(seatNo);}
}
