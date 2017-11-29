const test = require('tape');
const shot = require('shot');
const router = require('../src/router.js');
const time_url = "https://api.xmltime.com/timeservice?accesskey=RZCuYAuoC3&expires=2017-11-29T10%3A55%3A01%2B00%3A00&signature=6w7yR8inwcK6e%2Fqur0fb5fKug5Y%3D&version=2&out=js&prettyprint=1&query=Oslo&geo=1&lang=en&time=1&sun=0&timechanges=0&tz=1&verbosetime=1"

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

test('Testing the router for the time api', (t) => {
  shot.inject(router, { method: 'get', url: time_url }, (res) => {
    t.equal(res.statusCode, 200, 'should respond with status code of 200 for the JSON data');
    t.notEqual(res.payload,undefined, 'response should contain a JSON object');
  })
  t.end();
})
