//Contants fro cutomizing Prime Ng Components

///1.Static Messages
export const successMessage = [
  { severity: 'success', summary: 'Success', detail: 'Message Content' },
];
export const infoMessage = [
  { severity: 'info', summary: 'Info', detail: 'Message Content' },
];
export const warnMessage = [
  { severity: 'warn', summary: 'Waning', detail: 'Closable Message Content' },
];
export const errorMessage = [
  {
    severity: 'error',
    detail: 'Datos de Usuario Incorrectos',
  },
];

export const emailTakenErrorMessage = [
  {
    severity: 'error',
    detail: 'This Email is Alreay Taked',
  },
];

export const userTakenErrorMessage = [
  {
    severity: 'error',
    detail: 'This Username Already Exists',
  },
];

//2.Toast Messages (Top corner screen Pop Up Info Message)
//More info at : https://primeng.org/toast

export const successMessageToast = {
  severity: 'success',
  summary: 'Success',
  detail: 'Message Content',
};

export const infoMessageToast = {
  severity: 'info',
  summary: 'Info',
  detail: 'Message Content',
};

export const warnMessageToast = {
  severity: 'warn',
  summary: 'Waning',
  detail: 'Closable Message Content',
};

export const errorMessageToast = {
  severity: 'error',
  detail: 'Datos de Usuario Incorrectos',
};

export const emailTakenErrorToast = {
  severity: 'error',
  detail: 'This Email is Alreay Taked',
};

export const userTakenErrorToast = {
  severity: 'error',
  detail: 'This Username Already Exists',
};

//Create Post Succes Toast
export const createPostSuccessToast = {
  sticky: true,
  severity: 'success',
  summary: 'Post Created',
  detail: 'Your Post was created successfully',
};
