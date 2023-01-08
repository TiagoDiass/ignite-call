import { Button, Heading, MultiStep, Text } from '@ignite-ui/react';
import { signIn, useSession } from 'next-auth/react';
import { ArrowRight, Check } from 'phosphor-react';
import { useState } from 'react';

import * as RegisterStyles from '../Register/Register.styles';
import * as S from './ConnectCalendar.styles';

export function ConnectCalendar() {
  const session = useSession();
  const [userConnectedCalendar, _setUserConnectedCalendar] = useState(false);

  const handleConnectCalendar = () => {
    signIn('google');
  };

  return (
    <RegisterStyles.Wrapper>
      <RegisterStyles.Header>
        <Heading>Conecte sua agenda!</Heading>

        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </RegisterStyles.Header>

      <S.ConnectBox>
        <S.ConnectItem>
          <Text>Google Agenda</Text>

          {userConnectedCalendar ? (
            <Button disabled>
              Conectado <Check />
            </Button>
          ) : (
            <Button
              variant='secondary'
              size='sm'
              onClick={handleConnectCalendar}
            >
              Conectar <ArrowRight />
            </Button>
          )}
        </S.ConnectItem>

        <Button type='submit' disabled={!userConnectedCalendar}>
          Próximo passo <ArrowRight />
        </Button>
      </S.ConnectBox>
    </RegisterStyles.Wrapper>
  );
}
