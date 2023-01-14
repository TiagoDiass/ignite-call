import { Avatar, Heading, Text } from '@ignite-ui/react';
import * as S from './Schedule.styles';
import { ScheduleForm } from './ScheduleForm/ScheduleForm';

export interface ScheduleProps {
  user: {
    name: string;
    bio?: string;
    avatarUrl: string;
  };
}

export function Schedule({ user }: ScheduleProps) {
  return (
    <S.Wrapper>
      <S.UserHeader>
        <Avatar src={user.avatarUrl} alt={user.name} />

        <Heading>{user.name}</Heading>

        <Text>{user.bio}</Text>
      </S.UserHeader>

      <ScheduleForm />
    </S.Wrapper>
  );
}
