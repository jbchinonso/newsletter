import { ImailVariables } from "../utils/types.utils";

const welcomeTemplate = (mailVariable: ImailVariables) => {
  const { name, link } = mailVariable
  const html = `
    <html>

            <head>
                <style>
                    a{
                        padding: 10px;
                        border: solid #f9f9f9 1px;
                        border-radius: 5px;
                        text-decoration: none;
                    }
                </style>
            </head>

            <body>
                <p>Hi ${name},</p>
                <p style="font-size: 16px;">
                    Thank you for signing up on our platform.
                    Please, click the link below to verify your email
                </p>
                <a href="${link}">Confirm Subscription</a>
            </body>

    </html>`;

  const text = `Hi ${name}, Thank you for signing up on our platform.
    Please, click the link below to verify your email
    <a href="${link}">Confirm Subscription</a>
    `;

  return {
    html,
    text,
  };
};

export default welcomeTemplate;
