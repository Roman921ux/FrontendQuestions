import styled from 'styled-components';
import { IQuestions } from '../../store/question-store';
import ReactMarkdown from 'react-markdown'

interface Props {
  item: IQuestions;
}

function AnswerItem({ item }: Props) {
  return (
    <Container>
      <ReactMarkdown children={item.answer} />
    </Container>
  );
}

export default AnswerItem;

const Container = styled.div`
  
`;