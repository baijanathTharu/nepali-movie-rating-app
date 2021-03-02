import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from '../components/layout.component';
import { UserContext } from '../context';
import { handleError } from '../utils/handleError';
import { GET } from '../utils/httpClient';
import { notifyError, notifySuccess } from '../utils/notifyError';
import { MovieCard } from '../components/movies/movieCard.component';
import { Loader } from '../components/ui/loader.component';
import { Pagination } from '../components/ui/pagination.component';
import { MoviesByTitle } from '../components/movies/moviesByTitle.component';
import { Carousel } from '../components/ui/carousel/carousel.component';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H2 = styled.h2`
  color: ${(props) => props.color};
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
`;

const MovieContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  padding: 20px;
  background-color: ${(props) => props.bgColor};
`;

const CarouselImage = styled.div`
  width: 100%;
  flex-shrink: 0;
  flex-grow: 1;
  background-image: url(${(props) => props.backgroundImage});
  background-position: center center;
  background-repeat: no-repeat;
  height: 70vh;
  background-size: cover;
`;

export const MoviesScreen = () => {
  const userContext = useContext(UserContext);
  const [moviesData, setMoviesData] = useState({});
  const [hasFetched, setHasFetched] = useState(false);
  const [pageDetails, setPageDetails] = useState({
    page: 1,
    totalPage: null,
    limit: 5,
  });

  const fetchMovies = async (page = 1, limit = 5) => {
    const [moviesErr, moviesRes] = await handleError(
      GET(`/search/movies?page=${page}&limit=${limit}`, {}, false)
    );
    if (moviesErr) {
      console.log('err: ', moviesErr);
      return notifyError('Movies could not be fetched!');
    }
    notifySuccess('Movies fetched successfully.');
    setHasFetched(true);
    setPageDetails({
      page: moviesRes.data.currentPage,
      totalPage: moviesRes.data.totalPages,
      limit: 5,
    });
    setMoviesData(moviesRes.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const moviesCards =
    moviesData.data &&
    moviesData.data.map((movie, idx) => {
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

  const carouselMovieImagesList =
    moviesData.data &&
    moviesData.data.map((movie, idx) => {
      const imageSrc = movie.imageUrl
        ? movie.imageUrl
        : `https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg`;
      return <CarouselImage key={idx} backgroundImage={imageSrc} />;
    });

  const ShowCarousel = moviesData.data ? (
    <Carousel>{carouselMovieImagesList}</Carousel>
  ) : (
    'Loading'
  );

  return (
    <Layout>
      {ShowCarousel}
      <MovieContainer bgColor='wheat'>
        <Loader
          isHidden={hasFetched}
          width='50px'
          height='50px'
          position='absolute'
          top='50%'
          left='50%'
        />
        {moviesCards}
      </MovieContainer>
      <Pagination
        currentPage={pageDetails.page}
        totalPage={pageDetails.totalPage}
        fetchPage={fetchMovies}
      />
      <MoviesByTitle genre='crime' title='Crime' />
      <MoviesByTitle genre='thriller' title='Thriller' />
      <MoviesByTitle genre='nogenre' title='No Genre' />
    </Layout>
  );
};
