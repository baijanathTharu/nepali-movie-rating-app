import styled from 'styled-components';
import { MdDelete, MdEdit, MdMore } from 'react-icons/md';

const IMG_URL = process.env.REACT_APP_IMG_URL;

const CardDiv = styled.div`
  width: ${(props) => props.width};
  height: fit-content;
  border: 2px solid black;
  border-radius: 10px;
  box-shadow: 0 2px 3px black;
  background-color: tomato;
  transform: scale(1);
  :hover {
    transform: scale(1.01);
    box-shadow: 0 10px 10px black;
  }
`;

const ImgContainer = styled.div`
  height: 200px;
  width: 100%;
`;

const MovieImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
`;

const H3 = styled.h3`
  color: black;
  font-size: 24px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
`;

const P = styled.p`
  color: black;
  padding: 10px;
  text-align: center;
`;

const ActionDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 24px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Span = styled.span`
  color: ${(props) => props.color};
  cursor: pointer;
`;

export const MovieCard = ({
  width,
  movieName,
  imageUrl,
  movieDescription,
  triggerPopUp,
  triggerConfirmDeletePopUp,
  hasAdminOptions = true,
}) => {
  const imageSrc = imageUrl
    ? imageUrl
    : `https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg`;

  const adminActions = hasAdminOptions ? (
    <>
      <MdEdit color='green' cursor='pointer' onClick={triggerPopUp} />
      <MdDelete
        color='red'
        cursor='pointer'
        onClick={triggerConfirmDeletePopUp}
      />
    </>
  ) : (
    <Span color='wheat'>
      More <MdMore color='wheat' />
    </Span>
  );
  return (
    <CardDiv>
      <ImgContainer>
        <MovieImage src={imageSrc} />
      </ImgContainer>
      <H3>{movieName}</H3>
      <P>{movieDescription.slice(0, 50)}...</P>
      <ActionDiv>{adminActions}</ActionDiv>
    </CardDiv>
  );
};
