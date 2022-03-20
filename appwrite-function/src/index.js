const fs = require("fs");
const path = require("path");
const { htmlToText } = require("html-to-text");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - object with request body data
    'env' - object with environment variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  try {
    if (!req.env.MAILGUN_API_KEY || !req.env.EMAIL_ADDRESS_TO) {
      throw new Errror("Environment variables not properly set.");
    }

    const payload = JSON.parse(req.payload);

    const mg = mailgun.client({
      username: "api",
      key: req.env.MAILGUN_API_KEY,
    });

    const date = new Date();
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month =
      date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth();
    const year = date.getFullYear();
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const hours =
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours();

    emailTemplateString = fs
      .readFileSync(
        path.join(__dirname, "../email-template-dist", "contact.html")
      )
      .toString()
      .split("[[senderEmail]]")
      .join(payload.email)
      .split("[[dateVerbose]]")
      .join(`Dňa ${day}.${month}.${year} o ${hours}:${minutes}`)
      .split("[[message]]")
      .join(payload.message)
      .split("[[senderName]]")
      .join(payload.name);

    const emailTemplateText = htmlToText(emailTemplateString, {
      wordwrap: 130,
    });

    await mg.messages.create("mg.raneurope.eu", {
      from: "Noreply Raneurope <noreply@mg.raneurope.eu>",
      to: [req.env.EMAIL_ADDRESS_TO],
      subject: "Nová správa z www.raneurope.eu",
      text: emailTemplateText,
      html: emailTemplateString,
    });

    res.json({
      success: true,
      message: "Správa odoslána. V blízkej dobe sa s Vami spojíme.",
    });
  } catch (err) {
    res.json({
      success: false,
      message:
        "Chyba odosielania správy. Prosím konraktujte nás prostredníctvom emailu: " +
        req.env.EMAIL_ADDRESS_TO,
      detail: err,
    });
  }
};
