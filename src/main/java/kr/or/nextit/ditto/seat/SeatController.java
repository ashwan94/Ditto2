package kr.or.nextit.ditto.seat;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/seat")
@CrossOrigin(origins = "http://localhost:3000")
public class SeatController {

    private final SeatService service;

    @GetMapping("/list")
    public List<SeatVO> select(){
        List<SeatVO> vo = service.selectSeat();
        return vo;
    }

    @PostMapping("/reservate")
    public void goReservate(@RequestParam int seatNo){
        log.info("수신 좌석 번호 : {}", seatNo);
        service.goReservate(seatNo);
    }
}
