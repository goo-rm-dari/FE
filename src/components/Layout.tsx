import { PropsWithChildren } from 'react';

import clsx from 'clsx';

const Introduction = () => (
  <div className='flex flex-col items-center'>
    <p className='text-center text-gray-500'>text</p>
  </div>
);

const RootLayout = ({ children }: PropsWithChildren) => (
  <div
    id={'layoutRoot'}
    className={clsx(
      'relative flex h-screen max-h-[896px] min-h-[667px] w-screen min-w-[375px] max-w-[414px] shrink-0 flex-col shadow-xl',
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
      <RootLayout>{children}</RootLayout>
    </div>
  );
};

export default ResponsiveLayoutWrapper;
