import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useStores } from '../root-store-context';
import React, { useCallback, useMemo, useState } from 'react';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface FormData {
  title: string;
  answer: string;
  rating: number;
  voted: any[]; // тип данных для voted зависит от ваших требований
  type: string[];
  level: 'Junior' | 'Middle' | 'Senior'; // Определяем возможные значения для level
  complex: number;
}

const CreateQPage = observer(() => {
  const { question, user } = useStores()
  const [formData, setFormData] = useState<FormData>({
    title: '',
    answer: '',
    rating: 0,
    voted: [],
    type: [],
    level: 'Junior',
    complex: 0
  });
  const [formSelect, setFormSelect] = useState('React');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь вы можете выполнить дополнительные действия, например, отправить данные на сервер
    const updatedType = [...formData.type, formSelect];
    const updatedFormData = { ...formData, type: updatedType };
    console.log('formData', updatedFormData);
    const token = user.token
    question.createQuestion({ token, body: updatedFormData })
      .then(res => {
        console.log(res)
        alert('Вопрос добавлен')
        question.loadQuestions()
      })
      .catch(err => {
        console.log(err)
        alert('Ошибка при создании вопроса')
      })
  };

  const [value, setValue] = useState("Initial value");
  const options = useMemo(() => ({
    spellChecker: false,
    maxHeight: '400px',
    autoFocus: true,
    placeholder: 'Напиши ответ на вопрос',
    status: false,
    autosave: {
      enabled: true,
      delay: 1000,
      uniqueId: 'autosave'
    }
  }), [])

  const onChange = useCallback((value: string) => {
    setValue(value);
    setFormData(prevState => ({
      ...prevState,
      answer: value
    }));
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <SelectWrapper style={{ "width": "90%" }}>
          <Title>Вопрос: </Title>
          <Input style={{ "width": "85%" }}
            type="text" name="title" value={formData.title} onChange={handleChange} />
        </SelectWrapper>
        <SelectWrapper style={{ "alignItems": "self-start", "width": "90%" }}>
          <Title>Ответ: </Title>
          <SimpleMDE style={{ "width": "87%" }}
            value={value} onChange={onChange} options={options} />
        </SelectWrapper>
        <Block>
          <SelectWrapper>
            <Title>Рейтинг: </Title>
            <Input type="number" name="rating" value={formData.rating} onChange={handleChange} />
          </SelectWrapper>
          <SelectWrapper>
            <Title>Тип: </Title>
            <Select name="type" value={formSelect} onChange={(e) => setFormSelect(e.target.value)}>
              <option value="React">React</option>
              <option value="Web">Web</option>
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Css">Css</option>
              <option value="Html">Html</option>
              {/* Добавьте другие варианты по вашему усмотрению */}
            </Select>
          </SelectWrapper>
        </Block>
        <Block>
          <SelectWrapper>
            <Title>Уровень: </Title>
            <Select name="level" value={formData.level} onChange={handleChange}>
              <option value="Junior">Junior</option>
              <option value="Middle">Middle</option>
              <option value="Senior">Senior</option>
            </Select>
          </SelectWrapper>
          <SelectWrapper>
            <Title>Сложность: </Title>
            <Input type="number" name="complex" value={formData.complex} onChange={handleChange} />
          </SelectWrapper>
        </Block>


        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
})

export default CreateQPage;

const Container = styled.div`
  height: 100%;
  /* overflow-y: scroll; */
  /* border: 1px solid red; */
`;
const Form = styled.form`
display: flex;
flex-direction: column;
/* gap: 5px; */
`;
const Block = styled.div`
  /* border: 1px solid red; */
width: 92%;
display: flex;
justify-content: space-between;
/* flex-direction: column; */
/* gap: 5px; */
`;
const SelectWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  position: relative;
  width: 46%;
  margin-bottom: 15px;

  border: 2px solid rgb(233, 236, 239);
  color: rgb(111, 112, 114);
  padding: 5px 5px 5px 10px;
  border-radius: 5px;
`;
const Title = styled.span`
  font-size: var(--large-Fs);
  font-weight: var(--large-W);
`;
// const Text = styled.span`
//   font-size: var(--small-Fs);
//   font-weight: var(--large-W);
// `;
const Select = styled.select`
  width: 200px;
  padding: 10px;
  font-size: var(--middle-Fs);
  border: 2px solid rgba(1,1,1, 0.1);
  appearance: none;

  border: 2px solid rgb(233, 236, 239);
  background-color: rgb(233, 236, 239);
  color: rgb(111, 112, 114);
  padding: 5px 10px;
  border-radius: 5px;`

const Input = styled.input`
  width: 175px;
  padding: 10px;
  font-size: var(--middle-Fs);
  border: 2px solid rgba(1,1,1, 0.1);
  appearance: none;

  border: 2px solid rgb(233, 236, 239);
  background-color: rgb(233, 236, 239);
  color: rgb(111, 112, 114);
  padding: 5px 10px;
  border-radius: 5px;`

const Button = styled.button`
margin-top: 15px;
width: 92%;
  padding: 10px;
  font-size: var(--middle-Fs);
  border: 2px solid rgba(1,1,1, 0.1);
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;`

