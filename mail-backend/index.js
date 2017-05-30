const { parse } = require("url");
const helper = require("sendgrid").mail;
const sg = require("sendgrid")(
  "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"
);

module.exports = async function(req, res) {
  const orig = req.headers.origin;
  if (/https:/.test(orig)) {
    res.setHeader("Access-Control-Allow-Origin", orig);
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Methods", "POST");
  }

  const { query: { fromEmail, toEmail, subject, content } } = parse(
    req.url,
    true
  );

  var email1 = new helper.Email(fromEmail);
  var email2 = new helper.Email(toEmail);
  var subject2 = subject;
  var content2 = new helper.Content("text/plain", content);
  var mail = new helper.Mail(email1, subject2, email2, content2);
  var request = sg.emptyRequest({
    method: "POST",
    path: "/v3/mail/send",
    body: mail.toJSON()
  });
  try {
    const send = await sg.API(request);
    await console.log(send);
    return { statusCode: 200 };
  } catch (error) {
    await console.log(error);
    return { statusCode: error.statusCode, error: error };
  }
};
