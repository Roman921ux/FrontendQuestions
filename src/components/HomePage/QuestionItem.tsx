import styled from 'styled-components';
import { IQuestions } from '../../store/question-store';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../root-store-context';
import AnswerItem from './AnswerItem';

interface Props {
  item: IQuestions;
}

const QuestionItem = observer(({ item }: Props) => {
  const { user, question } = useStores()
  const [open, setOpen] = useState<boolean>(false)
  const [click, setClick] = useState({
    left: 0,
    right: 0
  })
  useEffect(() => {
    const a = item.voted.find(q => q.user === user.user?._id)
    if (a) {
      // console.log('a left', a.btn.left)
      // console.log('a right', a.btn.right)
      setClick({
        left: a.btn.left,
        right: a.btn.right
      })
    } else {
      setClick({
        left: 0,
        right: 0
      })
    }
  }, [question.questions, user.user, question.countRating, question.resetRating])

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
        <span onClick={() => setOpen(prev => !prev)}>{item.title}</span>
        <div>
          Level: {item.level}<br />
          Type: {item.type.map(i => <li>{i}</li>)}
        </div>
        <div>
          <span>{item.rating}</span>
          <button onClick={() => left()} style={click.left === 0 ? { 'background': '#4b4b4b' } : { 'background': '#fff' }}>-</button>
          <button onClick={() => right()} style={click.right === 0 ? { 'background': '#4b4b4b' } : { 'background': '#fff' }}>+</button>
        </div>
      </FlexBlock>
      {open && <AnswerItem item={item} />}
    </Container>
  );
})

export default QuestionItem;

const Container = styled.div`
  border: 1px solid #d88ad8;
  padding: 15px;
`;

const FlexBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;