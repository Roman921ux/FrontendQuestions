import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import TodoStore, { TodoBody } from '../store/todo';
import { useState } from 'react';
import TodoItem from './TodoItem';

const Todo = observer(() => {
  const [value, setValue] = useState<string>('')
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const todoBody: TodoBody = { title: value, toggle: false }
    TodoStore.addTodo(todoBody)
    setValue('')
  }
  return (
    <Container>
      <button onClick={() => TodoStore.fetchTodos()}>Load todos</button>
      <span>TodoList:
        {TodoStore.todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
      </span>
      <form onSubmit={formSubmit}>
        <input type='text' value={value} onChange={(e) => setValue(e.target.value)} />
        <input type='submit' />
      </form>
    </Container>
  );
})

export default Todo;

const Container = styled.div`
  
`;