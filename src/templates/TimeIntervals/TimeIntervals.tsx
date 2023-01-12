import {
  Heading,
  Text,
  MultiStep,
  Checkbox,
  TextInput,
  Button,
} from '@ignite-ui/react';
import { ArrowRight } from 'phosphor-react';

import * as RegisterStyles from '../Register/Register.styles';
import * as S from './TimeIntervals.styles';

export function TimeIntervals() {
  return (
    <RegisterStyles.Wrapper>
      <RegisterStyles.Header>
        <Heading>Quase lá</Heading>

        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </RegisterStyles.Header>

      <S.IntervalBox as='form'>
        <S.IntervalsContainer>
          <S.IntervalItem>
            <S.IntervalDay>
              <Checkbox />
              <Text>Segunda-feira</Text>
            </S.IntervalDay>

            <S.IntervalInputs>
              <TextInput size='sm' type='time' step={60} />
              <TextInput size='sm' type='time' step={60} />
            </S.IntervalInputs>
          </S.IntervalItem>
        </S.IntervalsContainer>

        <Button type='submit'>
          Próximo passo <ArrowRight />
        </Button>
      </S.IntervalBox>
    </RegisterStyles.Wrapper>
  );
}
