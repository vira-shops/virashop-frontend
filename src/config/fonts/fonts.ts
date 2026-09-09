import localFont from 'next/font/local';

export const dana = localFont({
  src: [
    { path: './ttf/Dana-Regular.ttf', weight: '400', style: 'normal' },
    { path: './ttf/Dana-Medium.ttf', weight: '500', style: 'normal' },
    { path: './ttf/Dana-DemiBold.ttf', weight: '600', style: 'normal' },
    { path: './ttf/Dana-Bold.ttf', weight: '700', style: 'normal' },
    { path: './ttf/Dana-Black.ttf', weight: '900', style: 'normal' },
  ],
  variable: '--font-dana',
  display: 'swap',
});

export const poppins = localFont({
  src: [
    {
      path: './ttf/Poppins-Regular.ttf',
      style: 'normal',
    },
  ],
  variable: '--font-poppins',
  display: 'swap',
});
