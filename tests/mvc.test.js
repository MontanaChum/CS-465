const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../app');

test('MVC routes render Handlebars HTML and retain static assets', async () => {
  const server = app.listen(0);
  try {
    const base = `http://127.0.0.1:${server.address().port}`;
    for (const [path, phrase] of [['/', 'Enjoy the Summer'], ['/travel', 'Gale Reef']]) {
      const response = await fetch(base + path);
      assert.equal(response.status, 200, `${path} status`);
      const html = await response.text();
      assert.match(html, /<html>/i);
      assert.ok(html.includes(phrase), `${path} content`);
      assert.ok(html.includes('id="header"'), `${path} header partial`);
      assert.ok(html.includes('id="footer"'), `${path} footer partial`);
      assert.ok(html.includes('href="/travel"'), `${path} travel navigation`);
    }
    for (const path of ['/css/style.css', '/images/reef1.jpg', '/rooms.html']) {
      const response = await fetch(base + path);
      assert.equal(response.status, 200, `${path} status`);
    }
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
