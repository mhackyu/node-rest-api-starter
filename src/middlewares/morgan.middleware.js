const morgan = require('morgan');

morgan.token('date', () => {
  const p = new Date()
    .toString()
    .replace(/[A-Z]{3}\+/, '+')
    .split(/ /);
  return `${p[2]}/${p[1]}/${p[3]}:${p[4]} ${p[5]}`;
});

module.exports = () =>
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
  );
