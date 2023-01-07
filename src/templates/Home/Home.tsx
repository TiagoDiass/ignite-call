import { Heading, Text } from '@ignite-ui/react';
import Image from 'next/image';

import * as S from './Home.styles';
import calendarImage from '../../assets/app-preview.png';
import { ClaimUsernameForm } from './Elements/ClaimUsernameForm/ClaimUsernameForm';

export function Home() {
  return (
    <S.Wrapper>
      <S.CallToActionContentWrapper>
        <Heading as='h1' size='4xl'>
          Agendamento descomplicado
        </Heading>

        <Text size='xl'>
          Conecte seu calendário e permita que pessoas marquem agendamentos no
          seu tempo livre.
        </Text>

        <ClaimUsernameForm />
      </S.CallToActionContentWrapper>

      <S.AppPreview>
        <Image
          src={calendarImage}
          alt='Um calendário com um preview da aplicação em funcionamento'
          height={400}
          quality={100}
          priority
        />
      </S.AppPreview>
    </S.Wrapper>
  );
}
