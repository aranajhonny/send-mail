const helper = require("sendgrid").mail;
const sg = require("sendgrid")(
  "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"
);

module.exports = async function(fromEmail, toEmail, subject, content) {
  var fromEmail = new helper.Email(fromEmail);
  var toEmail = new helper.Email(toEmail);
  var subject = subject;
  var content = new helper.Content("text/plain", content);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);
  var request = sg.emptyRequest({
    method: "POST",
    path: "/v3/mail/send",
    body: mail.toJSON()
  });
  try {
    const send = await sg.API(request);
    await console.log(send);
  } catch (error) {
    await console.log(error);
  }
}
