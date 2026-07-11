import userEvent from '@testing-library/user-event';
import { render, screen } from 'test-utils';
import { Contact } from '.';

const mockFetch = jest.fn();

beforeEach(() => {
  process.env.REACT_APP_WEB3FORMS_ACCESS_KEY = 'test-access-key';
  mockFetch.mockResolvedValue({
    ok: true,
    json: async () => ({ success: true, message: 'Success! Your message has been sent.' })
  });
  (global as { fetch?: unknown }).fetch = mockFetch;
});

afterEach(() => {
  delete process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;
  mockFetch.mockReset();
  delete (global as { fetch?: unknown }).fetch;
});

const fillForm = async (user: ReturnType<typeof userEvent.setup>, values: Partial<Record<string, string>>) => {
  if (values.name) await user.type(screen.getByLabelText('NAME *'), values.name);
  if (values.email) await user.type(screen.getByLabelText('EMAIL *'), values.email);
  if (values.details) await user.type(screen.getByLabelText('PROJECT DETAILS *'), values.details);
};

const submit = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: /send the signal/i }));
};

it('renders the section header, link table, résumé button, and form', () => {
  const { container } = render(<Contact />);

  expect(container.querySelector('section#contact')).toBeInTheDocument();
  expect(screen.getByText('07 / contact')).toBeInTheDocument();
  expect(screen.getByText('$ ./say-hello.sh')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
    'Have a complicated product idea? Good. Those are usually the interesting ones.'
  );

  expect(screen.getByRole('link', { name: /app\.creator@jessiet\.dev/ })).toHaveAttribute(
    'href',
    'mailto:app.creator@jessiet.dev'
  );
  expect(screen.getByRole('link', { name: /\/in\/jessiedev/ })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/jessiedev/'
  );
  expect(screen.getByRole('link', { name: /oreoseenoevil/ })).toHaveAttribute(
    'href',
    'https://github.com/oreoseenoevil/'
  );
  expect(screen.getByRole('link', { name: /^web\s+jessiet\.dev/i })).toHaveAttribute('href', 'https://jessiet.dev/');

  const resumeLink = screen.getByRole('link', { name: /download résumé/i });
  expect(resumeLink).toHaveAttribute('download');

  expect(screen.getByText('new-message.tsx')).toBeInTheDocument();
  expect(screen.getByLabelText('NAME *')).toBeInTheDocument();
  expect(screen.getByLabelText('EMAIL *')).toBeInTheDocument();
  expect(screen.getByLabelText('COMPANY')).toBeInTheDocument();
  expect(screen.getByLabelText('PROJECT DETAILS *')).toBeInTheDocument();
  expect(screen.getByLabelText('TYPE / BUDGET')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /send the signal/i })).toBeInTheDocument();
});

it('shows the missing-fields error when required fields are empty', async () => {
  const user = userEvent.setup();
  render(<Contact />);

  await submit(user);

  expect(screen.getByText('Add your name, email, and a line about the project.')).toBeInTheDocument();
  expect(screen.queryByText('Signal received.')).not.toBeInTheDocument();
  expect(mockFetch).not.toHaveBeenCalled();
});

it('still requires details when only name and email are filled', async () => {
  const user = userEvent.setup();
  render(<Contact />);

  await fillForm(user, { name: 'Jane Doe', email: 'jane@company.com' });
  await submit(user);

  expect(screen.getByText('Add your name, email, and a line about the project.')).toBeInTheDocument();
});

it('shows the email error when the email looks off', async () => {
  const user = userEvent.setup();
  render(<Contact />);

  await fillForm(user, { name: 'Jane Doe', email: 'jane@company', details: 'A complicated billing system.' });
  await submit(user);

  expect(screen.getByText('That email looks off — mind checking it?')).toBeInTheDocument();
  expect(screen.queryByText('Signal received.')).not.toBeInTheDocument();
  expect(mockFetch).not.toHaveBeenCalled();
});

it('submits to Web3Forms and swaps to the success panel', async () => {
  const user = userEvent.setup();
  render(<Contact />);

  await fillForm(user, { name: 'Jane Doe', email: 'jane@company.com', details: 'A complicated billing system.' });
  await submit(user);

  expect(await screen.findByText('Signal received.')).toBeInTheDocument();
  expect(screen.getByText(/thanks — i’ll reply within a day or two/i)).toBeInTheDocument();
  expect(screen.getByText(/\$ exit 0/)).toBeInTheDocument();
  expect(screen.getByText('# the cat approves')).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /send the signal/i })).not.toBeInTheDocument();

  expect(mockFetch).toHaveBeenCalledTimes(1);
  const [url, options] = mockFetch.mock.calls[0];
  expect(url).toBe('https://api.web3forms.com/submit');
  const payload = JSON.parse(options.body);
  expect(payload).toMatchObject({
    access_key: 'test-access-key',
    name: 'Jane Doe',
    email: 'jane@company.com',
    details: 'A complicated billing system.',
    botcheck: false
  });
});

it('sanitizes a NAME=value formatted access key before sending', async () => {
  process.env.REACT_APP_WEB3FORMS_ACCESS_KEY = 'REACT_APP_WEB3FORMS_ACCESS_KEY="11111111-2222-3333-4444-555555555555"';
  const user = userEvent.setup();
  render(<Contact />);

  await fillForm(user, { name: 'Jane Doe', email: 'jane@company.com', details: 'A complicated billing system.' });
  await submit(user);

  expect(await screen.findByText('Signal received.')).toBeInTheDocument();
  const payload = JSON.parse(mockFetch.mock.calls[0][1].body);
  expect(payload.access_key).toBe('11111111-2222-3333-4444-555555555555');
});

it('shows the failure message when Web3Forms rejects the submission', async () => {
  mockFetch.mockResolvedValue({ ok: false, json: async () => ({ success: false, message: 'Invalid access key' }) });
  const user = userEvent.setup();
  render(<Contact />);

  await fillForm(user, { name: 'Jane Doe', email: 'jane@company.com', details: 'A complicated billing system.' });
  await submit(user);

  expect(await screen.findByText('Signal lost — try again, or email me directly.')).toBeInTheDocument();
  expect(screen.queryByText('Signal received.')).not.toBeInTheDocument();
});

it('shows the failure message when the network request throws', async () => {
  mockFetch.mockRejectedValue(new Error('offline'));
  const user = userEvent.setup();
  render(<Contact />);

  await fillForm(user, { name: 'Jane Doe', email: 'jane@company.com', details: 'A complicated billing system.' });
  await submit(user);

  expect(await screen.findByText('Signal lost — try again, or email me directly.')).toBeInTheDocument();
});

it('points visitors at direct email when no access key is configured', async () => {
  delete process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;
  const user = userEvent.setup();
  render(<Contact />);

  await fillForm(user, { name: 'Jane Doe', email: 'jane@company.com', details: 'A complicated billing system.' });
  await submit(user);

  expect(
    await screen.findByText('Form backend not configured — email app.creator@jessiet.dev instead.')
  ).toBeInTheDocument();
  expect(mockFetch).not.toHaveBeenCalled();
});

it('recovers from an error and submits successfully', async () => {
  const user = userEvent.setup();
  render(<Contact />);

  await submit(user);
  expect(screen.getByText('Add your name, email, and a line about the project.')).toBeInTheDocument();

  await fillForm(user, { name: 'Jane Doe', email: 'jane@company.com', details: 'A complicated billing system.' });
  await submit(user);

  expect(screen.queryByText('Add your name, email, and a line about the project.')).not.toBeInTheDocument();
  expect(await screen.findByText('Signal received.')).toBeInTheDocument();
});
