import styled from 'styled-components';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../root-store-context';

interface Option {
  value: string;
  label: string;
}

const SelectBar = observer(() => {
  const { question } = useStores()
  const optionsType: Option[] = [
    { value: 'all', label: 'all' },
    { value: 'Web', label: 'Web' },
    { value: 'React', label: 'React' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'Css', label: 'Css' },
    { value: 'Html', label: 'Html' },
  ];
  const optionsLevel: Option[] = [
    { value: 'all', label: 'all' },
    { value: 'Junior', label: 'Junior' },
    { value: 'Middle', label: 'Middle' },
    { value: 'Senior', label: 'Senior' },
  ];
  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    question.toggleType(selectedValue)
  };
  const handleChangeLevel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    question.toggleLevel(selectedValue)
  };

  return (
    <Container>
      <SelectWrapper>
        <span>Тема: </span>
        <SelectElement onChange={handleChangeType}>
          {optionsType.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectElement>
      </SelectWrapper>
      <SelectWrapper>
        <span>Уровень: </span>
        <SelectElement onChange={handleChangeLevel}>
          {optionsLevel.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectElement>
      </SelectWrapper>
    </Container>
  );
})

export default SelectBar;

const Container = styled.div`
  border: 2px solid rgba(1,1,1, 0.1);
  border-radius: 5px;
  padding: 15px;
  display: flex;
  gap: 15px;
`;
const SelectWrapper = styled.div`
border: 2px solid rgba(1,1,1, 0.1);
  border-radius: 5px;
  padding-left: 10px; 
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  width: 200px;
  margin-bottom: 20px;
`;

const SelectElement = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid rgba(1,1,1, 0.1);
  border-radius: 5px;
  background-color: #ffffff;
  color: #000;
  appearance: none;
`;