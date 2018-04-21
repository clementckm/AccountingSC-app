const mailgun = Meteor.settings.private.mailgun;

const smtp = {
  username: mailgun.username,
  password: mailgun.password,
  server: mailgun.server,
  port: mailgun.port
};

process.env.MAIL_URL = `smtp://${encodeURIComponent(smtp.username)}:${encodeURIComponent(smtp.password)}@${encodeURIComponent(smtp.server)}:${smtp.port}`;
