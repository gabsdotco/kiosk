/* eslint-disable @next/next/no-img-element */
import { FC } from 'react';

import Head from 'next/head';

import { Flex, Logo, Text } from '@kiosk/ui';

export interface AuthLayoutProps {
  title: string;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <Flex className="w-full h-full overflow-auto bg-white">
      <Head>
        <title>Fingermark - {title}</title>
      </Head>
      <Flex className="w-full h-full overflow-auto">
        <Flex className="relative hidden w-full h-full sm:flex">
          <img
            alt="cover"
            src="/cover.jpg"
            className="absolute object-cover w-full h-full grayscale"
          />
          <Flex
            direction="column"
            justify="between"
            className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-90 p-xl"
          >
            <Logo />
            <Flex direction="column">
              <Text size="lg" weight="bold" className="text-white">
                Manage Faster!
              </Text>
              <Text size="md" className="text-gray-200">
                With the Fingermark Kiosks management you can manage all your
                Kiosks and monitor all the logs made by the users. With
                simplicity and ease.
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          justify="center"
          direction="column"
          className="w-full h-full overflow-auto p-3xl"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
