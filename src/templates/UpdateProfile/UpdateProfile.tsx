import { zodResolver } from '@hookform/resolvers/zod';
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ArrowRight } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { api } from '../../lib/axios';
import * as RegisterStyles from '../Register/Register.styles';
import * as S from './UpdateProfile.styles';

const updateProfileSchema = z.object({
  bio: z.string().optional(),
});

type UpdateProfileForm = z.infer<typeof updateProfileSchema>;

export function UpdateProfile() {
  const session = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
  });

  async function handleUpdateProfile(values: UpdateProfileForm) {
    await api.patch('/users/profile', {
      bio: values.bio,
    });

    await router.push(`/schedule/${session.data?.user.username}`);
  }

  if (session.status === 'loading') {
    return null;
  }

  console.log(session);

  return (
    <RegisterStyles.Wrapper>
      <RegisterStyles.Header>
        <Heading>Complete seu perfil</Heading>

        <Text>Por último, uma breve descrição e uma foto de perfil.</Text>

        <MultiStep size={4} currentStep={4} />
      </RegisterStyles.Header>

      <S.ProfileBox as='form' onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size='sm'>Foto de perfil</Text>

          <Avatar
            src={session.data?.user.avatar_url}
            alt={session.data?.user.name}
          />
        </label>

        <label>
          <Text size='sm'>Sobre você</Text>
          <TextArea {...register('bio')} />

          <S.FormAnnotation size='sm'>
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </S.FormAnnotation>
        </label>

        <Button type='submit' disabled={isSubmitting}>
          Finalizar <ArrowRight />
        </Button>
      </S.ProfileBox>
    </RegisterStyles.Wrapper>
  );
}
