import { zodResolver } from '@hookform/resolvers/zod';
import {
  Heading,
  Text,
  MultiStep,
  Checkbox,
  TextInput,
  Button,
} from '@ignite-ui/react';
import { ArrowRight } from 'phosphor-react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { api } from '../../lib/axios';
import { getWeekDays } from '../../utils/get-week-days';

import * as RegisterStyles from '../Register/Register.styles';
import * as S from './TimeIntervals.styles';
import {
  TimeIntervalsFormInput,
  TimeIntervalsFormOutput,
  timeIntervalsFormSchema,
} from './TimeIntervals.validations';

export function TimeIntervals() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    watch,
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
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

  const intervals = watch('intervals');

  const handleSetTimeIntervals = async (values: TimeIntervalsFormOutput) => {
    await api.post('/users/time-intervals', values);
  };

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

      <S.IntervalBox
        as='form'
        onSubmit={handleSubmit((v) =>
          handleSetTimeIntervals(v as unknown as TimeIntervalsFormOutput)
        )}
      >
        <S.IntervalsContainer>
          {fields.map((field, index) => (
            <S.IntervalItem key={field.id}>
              <S.IntervalDay>
                <Controller
                  name={`intervals.${index}.enabled`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                      checked={field.value}
                    />
                  )}
                />
                <Text>{weekDays[field.weekDay]}</Text>
              </S.IntervalDay>

              <S.IntervalInputs>
                <TextInput
                  size='sm'
                  type='time'
                  step={60}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.startTime`)}
                />
                <TextInput
                  size='sm'
                  type='time'
                  step={60}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.endTime`)}
                />
              </S.IntervalInputs>
            </S.IntervalItem>
          ))}
        </S.IntervalsContainer>

        {errors.intervals?.message && (
          <S.FormError size='sm'>{errors.intervals.message}</S.FormError>
        )}

        <Button type='submit' disabled={isSubmitting}>
          Próximo passo <ArrowRight />
        </Button>
      </S.IntervalBox>
    </RegisterStyles.Wrapper>
  );
}
