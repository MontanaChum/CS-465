const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 3000;

// Register the Handlebars engine and the MVC view folders.
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Public assets and the remaining static pages from Module One.
app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// Route requests through the appropriate MVC controllers.
const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');
app.use('/', indexRouter);
app.use('/travel', travelRouter);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Travlr website running at http://localhost:${PORT}`);
    console.log(`MVC travel page: http://localhost:${PORT}/travel`);
  });
}

module.exports = app;
