import { fireEvent, render, screen } from 'test-utils';
import { App } from '.';

describe('App', () => {
  it('renders the redesigned page with every section anchor', () => {
    const { container } = render(<App />);

    expect(container.firstChild).toHaveAttribute('id', 'top');
    ['work', 'about', 'experience', 'skills', 'contact'].forEach((id) => {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    });
  });

  it('opens and closes the 404 overlay from the footer link', () => {
    render(<App />);

    expect(screen.queryByText('404')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/there.s a 404 for that/i));
    expect(screen.getByText('404')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /take me home/i }));
    expect(screen.queryByText('404')).not.toBeInTheDocument();
  });
});
