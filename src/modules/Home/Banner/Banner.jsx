import { useQuery } from '@tanstack/react-query'
import {getBanners} from '../../../apis/movieAPI'
import React from 'react'

export default function Banner() {
  const {
    data: banners = [],
    isLoading,
    error,
  } = useQuery({queryKey: ['banners'], queryFn: getBanners });

  // if(isLoading){
  //   return <Loading />
  // }

  return (
    <div>
      {banners.map((banner) => {
        return <img key={banner.maBanner} width={300} src={banner.hinhAnh}></img>
      })}
    </div>
  )
}
