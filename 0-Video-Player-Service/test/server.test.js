const request = require('supertest');
let server;

beforeEach(() => {
  server = require('../server/index');
});

afterEach(() => {
  server.close();
});

test('responds to /', (done) => {
  request(server)
    .get('/')
    .expect(200, done);
});

test('404 everything else', (done) => {
  request(server)
    .get('/foo/bar')
    .expect(404, done);
});