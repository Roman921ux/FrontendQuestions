import styled from 'styled-components';
import counter from '../store/counter';
import { observer } from 'mobx-react-lite';

const Counter = observer(() => {
  return (
    <Container>

      <span>Counter: {counter.count}</span>
      <button onClick={() => counter.increment()}>+</button>
      <button onClick={() => counter.decrement()}>-</button>
    </Container>
  );
})

export default Counter;

const Container = styled.div`
  
`;