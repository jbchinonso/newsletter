 declare global{
  namespace NodeJS {
    interface ProcessEnv{
    MAIL_USER: string;
    MAIL_PASS: string;
    MAIL_HOST: string;
    SMTP_PORT: number;
    FRONT_END_URL: string;
  }
}
};

export interface ImailVariables {
  [key: string]: string;
}

type TemplateVariables = {
  html: string;
  text: string;
};

export interface Template {
  (arg0: ImailVariables): TemplateVariables;
}

export {}