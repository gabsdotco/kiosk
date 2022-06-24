import { FC } from 'react';

import { useRecoilState } from 'recoil';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { Flex, Sidebar, SidebarItem } from '@kiosk/ui';

import { loggedUserAtom } from '@/store/user';

export interface MainLayoutProps {
  title: string;
}

export const MainLayout: FC<MainLayoutProps> = ({ children, title }) => {
  const router = useRouter();

  const [loggedUserState, setLoggedUserState] = useRecoilState(loggedUserAtom);

  const handleLogout = () => {
    setLoggedUserState(undefined);

    router.push('/login');
  };

  return (
    <Flex className="w-full h-full overflow-auto bg-white">
      <Head>
        <title>Fingermark - {title}</title>
      </Head>
      <Sidebar
        userName={loggedUserState?.name}
        userEmail={loggedUserState?.email}
        onLogOut={() => handleLogout()}
      >
        <SidebarItem icon="FiBarChart2" route="/dashboard">
          Dashboard
        </SidebarItem>
        <SidebarItem icon="FiGrid" route="/kiosks">
          Kiosks
        </SidebarItem>
        <SidebarItem icon="FiFile" route="/logs">
          Logs
        </SidebarItem>
      </Sidebar>
      <Flex
        direction="column"
        className="relative w-full h-full overflow-auto p-lg sm:p-2xl"
      >
        {children}
      </Flex>
    </Flex>
  );
};
