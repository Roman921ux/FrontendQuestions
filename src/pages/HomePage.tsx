import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useStores } from '../root-store-context';
import { useEffect, useState } from 'react';
import SelectBar from '../components/HomePage/SelectBar';
import QuestionItem from '../components/HomePage/QuestionItem';

const HomePage = observer(() => {
  const { question } = useStores()
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    question.loadQuestions()
  }, [question.createQuestion, question.questions, question.type, question.level])


  // const submitType = (select: string) => {
  //   question.toggleType(select)
  // }
  return (
    <Container>
      <SelectBar value={value} setValue={setValue} />
      <Block>
        {question.selectQuestionsByType.filter(question => {
          const title = question.title.toLowerCase();
          const search = value.toLowerCase();
          return title.includes(search);
        }).map(item => <QuestionItem item={item} key={item._id} />)}
      </Block>
    </Container>
  );
})

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 15px; */
  height: 100%;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 85%;
  overflow-y: scroll; 
  padding: 15px 15px 0 15px;
  /* box-shadow: inset -10px 5px 15px rgba(0, 0, 0, 0.1); */
  /* border: 1px solid red; */
`;