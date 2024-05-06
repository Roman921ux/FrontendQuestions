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
  display: flex;
  gap: 15px;

  /* box-shadow: var(--box-shadow);
  padding: 15px;
  border: var(--border-color);
  border-radius: 5px; */
  border-bottom: var(--border-color);
`;
const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  position: relative;
  width: 220px;
  margin-bottom: 15px;

  border: 2px solid rgb(233, 236, 239);
  color: rgb(111, 112, 114);
  padding: 5px 5px 5px 10px;
  border-radius: 5px;
`;

const SelectElement = styled.select`
  width: 120px;
  padding: 10px;
  font-size: var(--middle-Fs);
  border: 2px solid rgba(1,1,1, 0.1);
  appearance: none;

  border: 2px solid rgb(233, 236, 239);
  background-color: rgb(233, 236, 239);
  color: rgb(111, 112, 114);
  padding: 5px 10px;
  border-radius: 5px;
`;