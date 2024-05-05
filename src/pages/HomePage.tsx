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
  }, [])


  // const submitType = (select: string) => {
  //   question.toggleType(select)
  // }
  return (
    <Container>
      <SelectBar />
      {question.selectQuestionsByType.map(item => <QuestionItem item={item} key={item._id} />)}
    </Container>
  );
})

export default HomePage;

const Container = styled.div`
  
`;