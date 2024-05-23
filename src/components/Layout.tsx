import { PropsWithChildren, Suspense } from 'react';

import clsx from 'clsx';

const Introduction = () => (
  <div className='flex flex-col items-center'>
    <img src={'https://picsum.photos'} />
    <p className='text-center text-gray-500'>text</p>
  </div>
);

const RootLayout = ({ children }: PropsWithChildren) => (
  <div
    id={'layoutRoot'}
    className={clsx(
      'dark:border-gray-accent7 relative flex h-full w-full shrink-0 flex-col shadow-xl dark:border dark:shadow-none',
      'h-[852px] w-[393px]',
    )}
  >
    {children}
  </div>
);

const ResponsiveLayoutWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex h-screen w-screen flex-row items-center justify-center gap-10'>
      <div className='hidden shrink sm:flex'>
        <Introduction />
      </div>
      <RootLayout>
        <Suspense fallback={<h1></h1>}>{children}</Suspense>
      </RootLayout>
    </div>
  );
};

export default ResponsiveLayoutWrapper;
