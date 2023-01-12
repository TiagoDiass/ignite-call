import { Button, Heading, MultiStep, Text } from '@ignite-ui/react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ArrowRight, Check } from 'phosphor-react';

import * as RegisterStyles from '../Register/Register.styles';
import * as S from './ConnectCalendar.styles';

export function ConnectCalendar() {
  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const userSignedIn = session.status === 'authenticated';

  const handleConnectCalendar = () => {
    signIn('google');
  };

  const handleNavigateToTimeIntervals = () => {
    router.push('/register/time-intervals');
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

          {userSignedIn ? (
            <Button size='sm' disabled>
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

        {hasAuthError && (
          <S.AuthError size='sm'>
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </S.AuthError>
        )}

        <Button
          type='submit'
          disabled={!userSignedIn}
          onClick={handleNavigateToTimeIntervals}
        >
          Próximo passo <ArrowRight />
        </Button>
      </S.ConnectBox>
    </RegisterStyles.Wrapper>
  );
}
