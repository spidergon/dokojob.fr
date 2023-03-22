import purify from '@lib/purify';

it('does not purifie clean html', () => {
  expect(purify('<strong>hello world</strong>')).toBe('<strong>hello world</strong>');
  expect(purify("console.log('hello world')")).toBe("console.log('hello world')");
});

it('purifies dirty html', () => {
  expect(purify('abc <script>alert(1)<' + '/script> def')).toBe('abc  def');
  expect(purify("<img src=x onerror=alert('img') />")).toBe('');
  expect(purify("<script>alert('hello world')</script>")).toBe('');
  expect(purify('<script><script>alert(1)</script>')).toBe('');
  expect(purify('<scr<script>ipt>alert(1)</script>')).toBe('ipt&gt;alert(1)');
  expect(purify('<scr<object>ipt>alert(1)</script>')).toBe('ipt&gt;alert(1)');
  expect(purify('<svg onload="alert(1)">')).toBe('');
  expect(purify('<object data=javascript:alert(1)>')).toBe('');
  expect(purify('<iframe src=javascript:alert(1)>')).toBe('');
  expect(purify('<embed src=javascript:alert(1)>')).toBe('');
});
