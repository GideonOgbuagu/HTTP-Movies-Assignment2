import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useParams, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, movies, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const { id } = useParams();
  const { push } = useHistory();

  // const movieItem = movieList.find(
  //   e => `${e.id}` === match.params.id
  // );

  //console.log(match.params)

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleDelete = e => {
    e.preventDefault()
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res.data)
        setMovieList(movies.filter(e => `${e.id}` !== id));
        push(`/`);

      })
}


  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <span className="delete" onClick={handleDelete}>
        Delete
      </span>
      
    </div>
  );
}

export default Movie;
