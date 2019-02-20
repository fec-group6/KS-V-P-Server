export default function mockFetch() {
  global.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        status: 200,
        json: () => {
          return new Promise((resolve, reject) => { resolve({ hello: 'world' }) });
        },
      });
    });
  });
}