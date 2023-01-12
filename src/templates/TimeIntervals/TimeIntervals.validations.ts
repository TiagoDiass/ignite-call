import { z } from 'zod';
import { convertTimeStringToMinutes } from '../../utils/convertTimeStringToMinutes';

export const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number(),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você deve selecionar pelo menos um dia da semana!',
    })
    .transform((intervals) =>
      intervals.map((interval) => ({
        weekDay: interval.weekDay,
        startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
        endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
      }))
    )
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - interval.startTimeInMinutes >= 60
        );
      },
      {
        message:
          'Seus horários de término devem ser pelo menos 1h após os horários iniciais',
      }
    ),
});

export type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>;
export type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>;
