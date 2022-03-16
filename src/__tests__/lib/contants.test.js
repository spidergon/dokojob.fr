import * as contants from '@lib/constants';

it('renders lib/constants unchanged', () => {
  expect(contants).toMatchSnapshot();
});
