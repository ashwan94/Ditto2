package kr.or.nextit.ditto.seat;

import lombok.Data;

@Data
public class SeatVO {
    private int seatNo;
    private int seatRow;
    private int seatCol;
    private String status;

}
