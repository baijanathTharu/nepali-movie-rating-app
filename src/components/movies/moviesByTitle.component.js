import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { handleError } from '../../utils/handleError';
import { GET } from '../../utils/httpClient';
import { notifyError, notifySuccess } from '../../utils/notifyError';
import { Loader } from '../ui';
import { MovieCard } from './movieCard.component';

const Container = styled.div`
  margin: 20px;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const H3 = styled.h3`
  font-size: 1.75rem;
  padding: 10px 20px;
`;

const MoviesContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  padding: 20px;
  background-color: ${(props) => props.bgColor};
`;

export const MoviesByTitle = ({ title, genre }) => {
  const [movies, setMovies] = useState([]);
  const [movieLoading, setMovieLoading] = useState(true);

  const fetchMovies = async (page = 1, limit = 5) => {
    const [moviesErr, moviesRes] = await handleError(
      GET(
        `/search/movies?page=${page}&limit=${limit}&genre=${genre}`,
        {},
        false
      )
    );
    if (moviesErr) {
      return notifyError(`Movies from ${genre} cannot be fetched.`);
    }
    if (moviesRes) {
      notifySuccess(`Movies from ${genre} fetched.`);
      setMovieLoading(false);
      setMovies(moviesRes.data);
    }
  };

  const moviesList =
    movies.data &&
    movies.data.map((movie, idx) => {
      return (
        <Link to={`/movies/${movie._id}`} key={idx}>
          <MovieCard
            width='50%'
            hasAdminOptions={false}
            movieName={movie.title}
            imageUrl={movie.imageUrl}
            movieDescription={movie.description}
          />
        </Link>
      );
    });

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Container>
      <H3>{title}</H3>
      <MoviesContainer bgColor='wheat'>
        {movieLoading ? (
          <Loader
            isHidden={!movieLoading}
            position='absolute'
            width='30px'
            height='30px'
            top='50%'
            left='50%'
          />
        ) : (
          moviesList
        )}
      </MoviesContainer>
    </Container>
  );
};
