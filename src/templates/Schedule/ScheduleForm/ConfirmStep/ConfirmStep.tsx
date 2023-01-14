import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react';
import { CalendarBlank, Check, Clock } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import * as S from './ConfirmStep.styles';

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'Você deve preencher seu nome' }),
  email: z.string().email({
    message: 'Digite um e-mail válido',
  }),
  description: z.string().min(10, {
    message: 'Você deve dar uma descrição de pelo menos 10 caracteres',
  }),
});

type ConfirmFormData = z.infer<typeof confirmFormSchema>;

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
    mode: 'onChange',
  });

  async function handleConfirmScheduling() {}

  return (
    <S.ConfirmForm as='form' onSubmit={handleSubmit(handleConfirmScheduling)}>
      <S.FormHeader>
        <Text>
          <CalendarBlank />
          14 de Janeiro de 2022
        </Text>

        <Text>
          <Clock />
          18:00h
        </Text>
      </S.FormHeader>

      <label>
        <Text size='sm'>Nome completo *</Text>
        <TextInput placeholder='Seu nome' {...register('name')} />

        {errors.name?.message && (
          <S.FormError size='sm'>{errors.name.message}</S.FormError>
        )}
      </label>

      <label>
        <Text size='sm'>Endereço de e-mail *</Text>
        <TextInput
          type='email'
          placeholder='Seu e-mail'
          {...register('email')}
        />

        {errors.email?.message && (
          <S.FormError size='sm'>{errors.email.message}</S.FormError>
        )}
      </label>

      <label>
        <Text size='sm'>Descrição da agenda *</Text>
        <TextArea
          placeholder='Um texto descritivo sobre o que se trata a agenda'
          {...register('description')}
        />

        {errors.description?.message && (
          <S.FormError size='sm'>{errors.description.message}</S.FormError>
        )}
      </label>

      <S.FormActions>
        <Button type='button' variant='tertiary'>
          Cancelar
        </Button>

        <Button type='submit' disabled={isSubmitting}>
          Confirmar <Check />
        </Button>
      </S.FormActions>
    </S.ConfirmForm>
  );
}
