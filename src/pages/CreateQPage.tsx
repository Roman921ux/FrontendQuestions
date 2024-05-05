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
      .then(res => alert('Вопрос добавлен'))
      .catch(err => alert('Ошибка при создании вопроса'))
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
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Answer:
          <SimpleMDE value={value} onChange={onChange} options={options} />
        </label>
        <br />
        <label>
          Rating:
          <input type="number" name="rating" value={formData.rating} onChange={handleChange} />
        </label>
        <br />
        <label>
          Type:
          <select name="type" value={formSelect} onChange={(e) => setFormSelect(e.target.value)}>
            <option value="React">React</option>
            <option value="Web">Web</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Css">Css</option>
            <option value="Html">Html</option>
            {/* Добавьте другие варианты по вашему усмотрению */}
          </select>
        </label>
        <br />
        <label>
          Level:
          <select name="level" value={formData.level} onChange={handleChange}>
            <option value="Junior">Junior</option>
            <option value="Middle">Middle</option>
            <option value="Senior">Senior</option>
          </select>
        </label>
        <br />
        <label>
          Complex:
          <input type="number" name="complex" value={formData.complex} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </Container>
  );
})

export default CreateQPage;

const Container = styled.div`
  
`;