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

import { getUserService } from '@/services';

import { loggedUserAtom } from '@/store/user';

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [, setLoggedUserState] = useRecoilState(loggedUserAtom);

  const [email, setEmail] = useState('');
  const [userDontExists, setUserDontExists] = useState(false);

  const handleLogin = async () => {
    setUserDontExists(false);

    const user = await getUserService(email);

    if (!user.data[0]) {
      setUserDontExists(true);

      return;
    }

    setLoggedUserState(user.data[0]);

    router.push('/dashboard');
  };

  return (
    <Flex direction="column" className="w-full gap-md">
      <Flex direction="column">
        <Heading weight="extrabold" className="text-gray-900">
          Login
        </Heading>
        <Text size="md" className="text-gray-500">
          Fill the form below to login into the platform.
        </Text>
      </Flex>
      <Flex direction="column" className="w-full gap-md">
        {!!userDontExists && (
          <Flex
            direction="column"
            className="w-full text-red-500 bg-red-200 border-l-4 border-red-500 p-md"
          >
            <Text weight="bold">User not found</Text>
            <Text>
              No user found with the provided e-mail. Try again or register a
              new user.
            </Text>
          </Flex>
        )}
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
          onClick={() => router.push('/register')}
        >
          Register
        </Button>
        <Button
          className="w-full sm:w-fit"
          disabled={!email}
          onClick={() => handleLogin()}
        >
          Login
        </Button>
      </Flex>
    </Flex>
  );
};

LoginPage.getLayout = (page) => <AuthLayout title="Login">{page}</AuthLayout>;

export default LoginPage;
