import styled from 'styled-components';

function TestPage() {
  return (
    <Container>
      TestPage
      {/* <GlassCard>
        Вопрос 1
      </GlassCard> */}
    </Container>
  );
}

export default TestPage;

const Container = styled.div`
  /* background-color: #d88a8a; */
`;

export const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.15); /* Прозрачность фона */
  backdrop-filter: blur(10px); /* Эффект размытия заднего плана */
  border-radius: 10px; /* Закругленные углы */
  border: 1px solid rgba(255, 255, 255, 0.125); /* Рамка */
  box-shadow:  0 4px 6px rgba(0, 0, 0, 0.1), 
             0 1px 3px rgba(0, 0, 0, 0.08); /* Тень */
  padding: 20px; /* Отступы внутри карточки */
  width: 300px; /* Ширина карточки */
  height: 200px; /* Высота карточки */
  margin: 20px; /* Отступы между карточками */
  display: flex; /* Включаем флексбокс для центрирования содержимого */
  justify-content: center; /* Выравнивание содержимого по центру по горизонтали */
  align-items: center; /* Выравнивание содержимого по центру по вертикали */
  color: white; /* Цвет текста внутри карточки */
  font-weight: bold; /* Жирный шрифт */
  font-size: 24px; /* Размер шрифта */
`;
