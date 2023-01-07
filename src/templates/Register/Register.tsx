import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react';
import { ArrowRight } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import * as S from './Register.styles';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { api } from '../../lib/axios';
import { AxiosError } from 'axios';

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Seu usuário precisa ter pelo menos 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Seu usuário deve ter somente letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'Seu nome precisa ter pelo menos 3 caracteres' }),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: router.query.username ? (router.query.username as string) : '',
    },
  });

  async function handleRegister(values: RegisterFormValues) {
    console.log(values);

    try {
      await api.post('/users', {
        name: values.name,
        username: values.username,
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        alert(error.response.data.message);
        return;
      }

      console.error(error);
    }
  }

  return (
    <S.Wrapper>
      <S.Header>
        <Heading>Bem-vindo ao Ignite Call!</Heading>

        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </S.Header>

      <S.Form as='form' onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size='sm'>Nome de usuário</Text>

          <TextInput
            size='sm'
            prefix='ignite.com/'
            placeholder='seu-usuario'
            {...register('username')}
          />

          {!!errors.username && (
            <S.FormError size='sm'>{errors.username.message}</S.FormError>
          )}
        </label>

        <label>
          <Text size='sm'>Nome completo</Text>

          <TextInput size='sm' placeholder='Seu nome' {...register('name')} />

          {!!errors.name && (
            <S.FormError size='sm'>{errors.name.message}</S.FormError>
          )}
        </label>

        <Button type='submit' disabled={isSubmitting}>
          Próximo passo <ArrowRight />
        </Button>
      </S.Form>
    </S.Wrapper>
  );
}
