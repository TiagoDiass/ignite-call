import { Button, TextInput, Text } from '@ignite-ui/react';
import { ArrowRight } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import * as S from './ClaimUsernameForm.styles';

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Seu usuário precisa ter pelo menos 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Seu usuário deve ter somente letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
});

type ClaimUsernameFormValues = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormValues>({
    resolver: zodResolver(claimUsernameFormSchema),
  });

  async function handleClaimUsername(values: ClaimUsernameFormValues) {
    console.log(values);
  }

  return (
    <>
      <S.Form as='form' onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size='sm'
          prefix='ignite.com/'
          placeholder='seu-usuario'
          {...register('username')}
        />
        <Button size='sm' type='submit'>
          Reservar
          <ArrowRight />
        </Button>
      </S.Form>

      <S.FormAnnotation isError={!!errors.username}>
        <Text size='sm'>
          {errors.username
            ? errors.username.message
            : 'Digite seu usuário desejado'}
        </Text>
      </S.FormAnnotation>
    </>
  );
}
