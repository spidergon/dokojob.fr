import siteData from '@lib/siteData';

it('renders lib/siteData unchanged', () => {
  expect(siteData).toMatchSnapshot();
});
