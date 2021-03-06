import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  max-width: ${(props) => props.width};
  padding: 10px;
  background-color: lightsalmon;
  border-radius: 10px;
`;

export const H3 = styled.h3`
  text-align: center;
  font-size: 18px;
  margin: 10px 0;
`;

export const Div = styled.div`
  padding: 10px;
  margin: 10px 0;
`;

export const CheckBoxDiv = styled(Div)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Label = styled.label`
  color: black;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  padding: 0 5px;
`;

export const Input = styled.input`
  width: 100%;
  margin: 10px 0;
  font-size: 18px;
  padding: 15px;
  background-color: wheat;
  outline: none;
  border: 0;
  border-radius: 50px;
`;

export const Button = styled.button`
  color: wheat;
  font-size: 18px;
  background-color: ${(props) =>
    props.disabled ? 'rgba(0,0,0, 0.25)' : 'black'};
  padding: 10px 15px;
  border: 0;
  border-radius: 5px;
  outline: none;
  display: ${(props) => (props.isHidden ? 'none' : 'block')};
  :hover {
    background-color: ${(props) =>
      props.disabled ? null : 'rgba(0, 0, 0, 0.8)'};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;

export const ErrorSpan = styled.span`
  font-size: 12px;
  color: tomato;
  background-color: black;
  margin: 0 10px;
  padding: 0 10px;
  display: ${(props) => (props.active ? 'inline-block' : 'none')};
`;

export const Strong = styled.strong`
  color: tomato;
  font-size: 24px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  margin: 10px 0;
  font-size: 18px;
  padding: 15px;
  background-color: wheat;
  outline: none;
  border: 0;
  border-radius: 5px;
  color: black;
  resize: vertical;
`;

export const P = styled.p`
  font-size: 24px;
  color: wheat;
  text-align: center;
  margin: 10px;
`;

export const ActionDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 30px auto;
  width: ${(props) => props.width};
`;

export const TitleSpan = styled.span`
  color: tomato;
  font-weight: bold;
`;

export const DeleteBtn = styled.button`
  background-color: red;
  padding: 10px 15px;
  color: white;
  outline: none;
  border: 0;
  font-size: 18px;
  cursor: pointer;
  display: ${(props) => (props.isHidden ? 'none' : 'inline-block')};
  :hover {
    background-color: rgba(255, 0, 0, 0.8);
  }
`;

export const CancelBtn = styled.button`
  background-color: green;
  padding: 10px 15px;
  color: white;
  outline: none;
  border: 0;
  font-size: 18px;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 255, 0, 0.8);
  }
`;
