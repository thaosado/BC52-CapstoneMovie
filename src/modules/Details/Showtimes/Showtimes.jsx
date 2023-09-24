import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getMovieShowtimes } from '../../../apis/cinemaAPI';
import dayjs from 'dayjs';

export default function Showtimes({movieId}) {
  const [cinemas, setCinemas] = useState([])

  const {data, isLoading} =
  useQuery({
    queryKey: ["movieShowtimes", movieId],
    queryFn: () => getMovieShowtimes(movieId),
    enabled: !!movieId,
  });

  const cinemaSystems = data?.heThongRapChieu || [];
  const handleGetCinemaSystem = (cinemaSystemId)=>{
    const found = cinemaSystems.find((item) => item.maHeThongRap === cinemaSystemId);
    
    setCinemas(found.cumRapChieu);
  };

  useEffect(()=>{
    if(cinemaSystems.length > 0){
      setCinemas(cinemaSystems[0].cumRapChieu);
    }
  }, [cinemaSystems])
  
  return (
    <>
    <div>
      {cinemaSystems.map((cinemaSystem) => {
        return (
          <div key={cinemaSystem.maHeThongRap}>
            <img src={cinemaSystem.logo} alt="" width={50} height={50}
            onClick={() => handleGetCinemaSystem(cinemaSystem.maHeThongRap)} />
          </div>
        )
      })}

      {cinemas.map(cinema => {
        return (
          <div>
            <h3>{cinema.tenCumRap}</h3>

            {cinema.lichChieuPhim.map((showtime) => {
              const time = dayjs(showtime.ngayChieuGioChieu).format(
                "DD-MM-YYYY ~ HH:mm"
              )

              return <button>{time}</button>
            })}
          </div>
        )
      })}
    </div>
    </>
    
  )
}
