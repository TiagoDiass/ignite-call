import {
  Heading,
  Text,
  MultiStep,
  Checkbox,
  TextInput,
  Button,
} from '@ignite-ui/react';
import { ArrowRight } from 'phosphor-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { getWeekDays } from '../../utils/get-week-days';

import * as RegisterStyles from '../Register/Register.styles';
import * as S from './TimeIntervals.styles';

type Interval = {
  weekDay: number;
  enabled: boolean;
  startTime: string;
  endTime: string;
};

export function TimeIntervals() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm<{ intervals: Interval[] }>({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  });

  const weekDays = getWeekDays();

  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  });

  const handleSetTimeIntervals = async () => {};

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

      <S.IntervalBox as='form' onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <S.IntervalsContainer>
          {fields.map((field, index) => (
            <S.IntervalItem>
              <S.IntervalDay key={field.id}>
                <Checkbox />
                <Text>{weekDays[field.weekDay]}</Text>
              </S.IntervalDay>

              <S.IntervalInputs>
                <TextInput
                  size='sm'
                  type='time'
                  step={60}
                  {...register(`intervals.${index}.startTime`)}
                />
                <TextInput
                  size='sm'
                  type='time'
                  step={60}
                  {...register(`intervals.${index}.endTime`)}
                />
              </S.IntervalInputs>
            </S.IntervalItem>
          ))}
        </S.IntervalsContainer>

        <Button type='submit'>
          Próximo passo <ArrowRight />
        </Button>
      </S.IntervalBox>
    </RegisterStyles.Wrapper>
  );
}
