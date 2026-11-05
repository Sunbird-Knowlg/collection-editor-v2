import { describe, it, expect, vi, beforeEach } from 'vitest';

const get = vi.fn();
vi.mock('./client', () => ({ apiClient: { get: (...args: unknown[]) => get(...args) } }));

import { fetchContentDetails } from './content';

describe('fetchContentDetails', () => {
  beforeEach(() => {
    get.mockReset();
    get.mockResolvedValue({ data: { result: { content: { identifier: 'do_1', body: '{"theme":{}}' } } } });
  });

  it('asks for the requested fields, e.g. the ECML body (positive)', async () => {
    const content = await fetchContentDetails('do_1', ['body']);
    expect(get).toHaveBeenCalledWith('/action/content/v3/read/do_1?fields=body');
    expect(content.body).toBe('{"theme":{}}');
  });

  it('keeps the plain read when no fields are given (negative)', async () => {
    await fetchContentDetails('do_1');
    await fetchContentDetails('do_1', []);
    expect(get).toHaveBeenNthCalledWith(1, '/action/content/v3/read/do_1');
    expect(get).toHaveBeenNthCalledWith(2, '/action/content/v3/read/do_1');
  });
});
