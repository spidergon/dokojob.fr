import { render, screen } from '@testing-library/react';
import Page from '@components/page';

const MyPage = () => (
  <Page>
    <h1>The title</h1>
    <p>The first paragraph of my page</p>
    <p>The second</p>
  </Page>
);

it('renders Page component unchanged', () => {
  const { container } = render(<MyPage />);

  expect(container).toMatchSnapshot();
});

it('renders Page component Children correctly', () => {
  const { container } = render(<MyPage />);
  const heading = screen.getByRole('heading', {
    name: /The title/i,
  });

  expect(heading).toBeInTheDocument();
});
