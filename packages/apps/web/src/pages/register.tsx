import { useState } from 'react';

import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@kiosk/ui';

import { AuthLayout } from '@/components/layouts';

import { NextPageWithLayout } from '@/types';

import { createUserService, getUserService } from '@/services';

import { loggedUserAtom } from '@/store/user';

const RegisterPage: NextPageWithLayout = () => {
  const [, setLoggedUserState] = useRecoilState(loggedUserAtom);

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [userExists, setUserExists] = useState(false);

  const handleRegister = async () => {
    setUserExists(false);

    const user = await getUserService(email);

    if (!!user.data[0]) {
      setUserExists(true);
      return;
    }

    const newUser = await createUserService({ email, name });

    setLoggedUserState(newUser.data);

    router.push('/dashboard');
  };

  return (
    <Flex direction="column" className="w-full gap-md">
      <Flex direction="column">
        <Heading weight="extrabold" className="text-gray-900">
          Register
        </Heading>
        <Text size="md" className="text-gray-500">
          Fill the form below to register and login into the platform.
        </Text>
      </Flex>
      <Flex direction="column" className="w-full gap-md">
        {!!userExists && (
          <Flex
            direction="column"
            className="w-full text-red-500 bg-red-200 border-l-4 border-red-500 p-md"
          >
            <Text weight="bold">E-mail already exists</Text>
            <Text>
              The e-mail defined already exist, try a different one or login
              using that e-mail.
            </Text>
          </Flex>
        )}
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            className="w-full"
            placeholder="Your name"
            onChange={(value) => setName(value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>E-mail</FormLabel>
          <Input
            className="w-full"
            placeholder="Your e-mail"
            onChange={(value) => setEmail(value)}
          />
        </FormControl>
      </Flex>
      <Flex justify="end" className="w-full gap-sm">
        <Button
          variant="secondary"
          className="w-full sm:w-fit"
          onClick={() => router.push('/login')}
        >
          Login
        </Button>
        <Button
          className="w-full sm:w-fit"
          disabled={!(name && email)}
          onClick={() => handleRegister()}
        >
          Register
        </Button>
      </Flex>
    </Flex>
  );
};

RegisterPage.getLayout = (page) => (
  <AuthLayout title="Register">{page}</AuthLayout>
);

export default RegisterPage;
