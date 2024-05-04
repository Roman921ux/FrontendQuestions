import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import TodoStore from '../store/todo';
import { TodoItem as TodoItemType } from '../store/todo';

interface Props {
  todo: TodoItemType;
}

const TodoItem = observer(({ todo }: Props) => {
  const handleChange = () => {
    TodoStore.completedTodo(todo.id)
  }
  return (
    <Container>
      <span>{todo.title}</span>
      <input type='checkbox' checked={todo.toggle} onChange={handleChange} />
      <button onClick={() => TodoStore.removeTodo(todo.id)}>Удалить</button>
    </Container>
  );
})

export default TodoItem;

const Container = styled.div`
  
`;