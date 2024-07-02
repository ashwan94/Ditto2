package kr.or.nextit.ditto.seat;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SeatMapper {
    List<SeatVO> selectSeat();
    void goReservate(int seatNo);
}
