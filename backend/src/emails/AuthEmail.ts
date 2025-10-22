import { transporter } from "../config/nodemailer";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    // Enviar email
    await transporter.sendMail({
      from: "BetterEssay <admin@better-essay.com>",
      to: user.email,
      subject: "BetterEssay - Confirma tu cuenta",
      text: "BetterEssay - Confirma tu cuenta",
      html: `<p> Hola ${user.name}, has creado tu cuenta en BetterEssay, ya casi esta todo listo, solo debes confirmar tu cuenta </p>
                <p> Visita el siguiente enlace: </p>
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
                <p>E ingresa el codigo: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>
            `,
    });
  };

  static sendPasswordResetToken = async (user: IEmail) => {
    // Enviar email
    await transporter.sendMail({
      from: "BetterEssay <admin@better-essay.com>",
      to: user.email,
      subject: "BetterEssay - Reestablece tu password",
      text: "BetterEssay - Reestablece tu password",
      html: `<p> Hola ${user.name}, has solicitado reestablecer tu password.</p>
                <p> Visita el siguiente enlace: </p>
                <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Password</a>
                <p>E ingresa el codigo: <b>${user.token}</b></p>
                <p>Este token expira en 10 minutos</p>
            `,
    });
  };
}
