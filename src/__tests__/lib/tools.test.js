import { logoText } from '@lib/tools';

it('renders logoText correctly', () => {
  expect(logoText('Go')).toBe('G');
  expect(logoText('Google')).toBe('G');
  expect(logoText('Google Inc')).toBe('GI');
  expect(logoText('Foie de Canard')).toBe('FC');
  expect(logoText('Foie des Canards')).toBe('Fd');
  expect(logoText('G to')).toBe('G');
});
