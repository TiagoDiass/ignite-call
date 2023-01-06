import { Button, TextInput } from '@ignite-ui/react';
import { ArrowRight } from 'phosphor-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import * as S from './ClaimUsernameForm.styles';

const claimUsernameFormSchema = z.object({
  username: z.string(),
});

type ClaimUsernameFormValues = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameFormValues>();

  async function handleClaimUsername(values: ClaimUsernameFormValues) {}

  return (
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
  );
}
