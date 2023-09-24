import React from 'react'
import MovieProfile from './MovieProfile/MovieProfile'
import Showtimes from './Showtimes/Showtimes'
import { useParams } from 'react-router-dom'

export default function Details() {
  const {movieId} = useParams();
  return (
    <div>
      <MovieProfile movieId={movieId} />
      <Showtimes movieId={movieId} />
    </div>
  )
}
