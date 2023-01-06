import { Button, TextInput } from '@ignite-ui/react';
import { ArrowRight } from 'phosphor-react';

import * as S from './ClaimUsernameForm.styles';

export function ClaimUsernameForm() {
  return (
    <S.Form as='form'>
      <TextInput size='sm' prefix='ignite.com/' placeholder='seu-usuario' />
      <Button size='sm' type='submit'>
        Reservar
        <ArrowRight />
      </Button>
    </S.Form>
  );
}
