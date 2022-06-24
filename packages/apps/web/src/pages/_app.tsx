/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import { FC, useEffect } from 'react';

import { useRouter } from 'next/router';

import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot, useRecoilValue } from 'recoil';
import NProgress from 'nprogress';

import { AppPropsWithLayout } from '@/types';

import { loggedUserAtom } from '@/store/user';

import 'nprogress/nprogress.css';

import '@/styles/global.css';

const queryClient = new QueryClient();

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    const handleRouteChange = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', () => NProgress.start());
    router.events.on('routeChangeError', () => NProgress.done());
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', () => NProgress.start());
      router.events.off('routeChangeError', () => NProgress.done());
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AuthWrapper>{getLayout(<Component {...pageProps} />)}</AuthWrapper>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

const AuthWrapper: FC = ({ children }) => {
  const router = useRouter();

  const loggedUserState = useRecoilValue(loggedUserAtom);

  useEffect(() => {
    if (!loggedUserState) {
      router.replace('/login');
    }
  }, [loggedUserState]);

  return children;
};

export default MyApp;
