const test = require('tape');
const shot = require('shot');
const router = require('../src/router.js');

//TESTING THE ROUTER
// Home Route
test('Home route returns a status code of 200', (t) => {
  shot.inject(router, { method: 'get', url: '/' }, (res) => {
    t.equal(res.statusCode, 200, 'should respond with status code of 200');
    t.notEqual(res.payload,undefined, 'response should contain an html file');
    t.end();
  })
})
//static files
test('Testing the router for the static files', (t) => {
  shot.inject(router, { method: 'get', url: '/style.css' }, (res) => {
    t.equal(res.statusCode, 200, 'should respond with status code of 200 for the css file');
    t.notEqual(res.payload,undefined, 'response should contain a css file');

  })
  shot.inject(router, { method: 'get', url: '/main.js' }, (res) => {
    t.equal(res.statusCode, 200, 'should respond with status code of 200 for the JS file');
    t.notEqual(res.payload,undefined, 'response should contain a JS file');

  })
  t.end();
})
