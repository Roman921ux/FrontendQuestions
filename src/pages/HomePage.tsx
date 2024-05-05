import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useStores } from '../root-store-context';
import { useEffect } from 'react';
import SelectBar from '../components/HomePage/SelectBar';
import QuestionItem from '../components/HomePage/QuestionItem';

const HomePage = observer(() => {
  const { question } = useStores()

  useEffect(() => {
    question.loadQuestions()
  }, [question.createQuestion, question.questions, question.type, question.level])


  // const submitType = (select: string) => {
  //   question.toggleType(select)
  // }
  return (
    <Container>
      <SelectBar />
      <Block>
        {question.selectQuestionsByType.map(item => <QuestionItem item={item} key={item._id} />)}
      </Block>
    </Container>
  );
})

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100%;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 85%;
  overflow-y: scroll; 
  padding-right: 15px;
  /* border: 1px solid red; */
`;