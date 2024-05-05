import styled from 'styled-components';
import { IQuestions } from '../../store/question-store';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../root-store-context';
import AnswerItem from './AnswerItem';
// icons
import { BiSolidArrowToBottom } from "react-icons/bi";
import { BiSolidArrowFromBottom } from "react-icons/bi";

interface Props {
  item: IQuestions;
}

const QuestionItem = observer(({ item }: Props) => {
  const { user, question } = useStores()
  const [open, setOpen] = useState<boolean>(false)
  // const [click, setClick] = useState({
  //   left: 0,
  //   right: 0
  // })
  // useEffect(() => {
  //   const a = item.voted.find(q => q.user === user.user?._id)
  //   if (a) {
  //     // console.log('a left', a.btn.left)
  //     // console.log('a right', a.btn.right)
  //     setClick({
  //       left: a.btn.left,
  //       right: a.btn.right
  //     })
  //   } else {
  //     setClick({
  //       left: 0,
  //       right: 0
  //     })
  //   }
  // }, [question.questions, user.user, question.countRating, question.resetRating])

  const left = () => {
    const votedObj = item.voted.find(q => q.user === user.user?._id)
    // console.log('quection', quection.btn.left)
    if (votedObj) {
      if (votedObj.btn.left === 0 && votedObj.btn.right === 1) {
        const objBody = {
          token: user.token,
          questionId: item._id,
          action: "increment"
        }
        question.resetRating(objBody)
          .then(res => {
            console.log(res)
            question.loadQuestions()
          })
          .catch(err => {
            console.log(err)
            alert('Ошибка1')
          })
      } else if (votedObj.btn.left === 1 && votedObj.btn.right === 0) {
        const objBody = {
          token: user.token,
          questionId: item._id,
          action: "decrement"
        }
        // inc -
        // dec +
        question.resetRating(objBody)
          .then(res => {
            console.log(res)
            question.loadQuestions()
          })
          .catch(err => {
            console.log(err)
            alert('Ошибка2')
          })
      }
    } else {
      const ObjBody = {
        token: user.token,
        questionId: item._id,
        body: {
          action: 'decrement',
          btn: {
            left: 1,
            right: 0,
          },
        }
      }
      question.countRating(ObjBody)
        .then(res => {
          console.log(res)
          question.loadQuestions()
        })
        .catch(err => {
          console.log(err)
          alert('Ошибка3')
        })
    }
  }
  const right = () => {
    const votedObj = item.voted.find(q => q.user === user.user?._id)
    // console.log('quection', quection.btn.left)
    if (votedObj) {
      if (votedObj.btn.left === 0 && votedObj.btn.right === 1) {
        const objBody = {
          token: user.token,
          questionId: item._id,
          action: "increment"
        }
        question.resetRating(objBody)
          .then(res => {
            console.log(res)
            question.loadQuestions()
          })
          .catch(err => {
            console.log(err)
            alert('Ошибка')
          })
      } else if (votedObj.btn.left === 1 && votedObj.btn.right === 0) {
        const objBody = {
          token: user.token,
          questionId: item._id,
          action: "decrement"
          // inc -
          // dec +
        }
        question.resetRating(objBody)
          .then(res => {
            console.log(res)
            question.loadQuestions()
          })
          .catch(err => {
            console.log(err)
            alert('Ошибка')
          })
      }
    } else {
      const ObjBody = {
        token: user.token,
        questionId: item._id,
        body: {
          action: 'increment',
          btn: {
            left: 0,
            right: 1,
          },
        }
      }
      question.countRating(ObjBody)
        .then(res => {
          console.log(res)
          question.loadQuestions()
        })
        .catch(err => {
          console.log(err)
          alert('Ошибка')
        })
    }
  }

  return (
    <Container>
      <FlexBlock>
        <Title onClick={() => setOpen(prev => !prev)}>{item.title}</Title>
        <BlockGroup>
          <Block>
            <Level>{item.level}</Level>
            <Block>{item.type.map(i => <Type>{i}</Type>)}</Block>
          </Block>
          <BlockRating>
            <Rating>{item.rating}</Rating>
            {/* <button onClick={() => left()} style={click.left === 0 ? { 'background': '#4b4b4b' } : { 'background': '#fff' }}>-</button> */}
            <BiSolidArrowToBottom onClick={() => left()} />
            <BiSolidArrowFromBottom onClick={() => right()} />
            {/* <button onClick={() => right()} style={click.right === 0 ? { 'background': '#4b4b4b' } : { 'background': '#fff' }}>+</button> */}
          </BlockRating>
        </BlockGroup>
      </FlexBlock>
      {open && <AnswerItem item={item} />}
    </Container>
  );
})

export default QuestionItem;

const Container = styled.div`
  border: 2px solid rgba(1,1,1, 0.1);
  border-radius: 5px;
  padding: 15px;
`;

const FlexBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: self-start;
`;

const Block = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  border: 2px solid rgba(1,1,1, 0.1);
  padding: 2px 2px 2px 5px;
  border-radius: 5px;
`;
const BlockGroup = styled.div`
  display: flex;
  align-items: self-start;
  gap: 5px;
  /* border: 2px solid rgba(1,1,1, 0.1); */
  padding: 2px 2px 2px 5px;
  border-radius: 5px;
`;
const BlockRating = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid rgba(1,1,1, 0.1);
  padding: 2px 2px 2px 5px;
  border-radius: 5px;
`;

const Rating = styled.div`
  color: rgba(1,1,1, 0.5);
  font-size: var(--small-Fs);
  font-weight: var(--small-W);
`;

const Level = styled.span`
  color: rgba(1,1,1, 0.5);
  font-size: var(--small-Fs);
  font-weight: var(--small-W);
  padding: 0 5px;
`;
const Type = styled.span`
  color: rgba(1,1,1, 0.5);
  font-size: var(--small-Fs);
  font-weight: var(--small-W);
  padding: 0 5px;
`;

const Title = styled.div`
  color: var(--color-1);
  font-size: var(--large-Fs);
  font-weight: var(--large-W);
`;