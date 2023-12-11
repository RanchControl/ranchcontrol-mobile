export const endpoints = {
  auth: {
    login: '/auth/login/',
    profile: '/auth/profile/',
    signUp: '/users/',
    forgotPassword: '/auth/reset-password/',
    updateOrganizationUser: '/auth/organization-users/:id/',
    cities: {
      list: '/auth/cities/',
    },
    removeAccount: '/auth/remove-account/',
    refreshToken: '/auth/refresh/',
    updatePassword: '/auth/update-password/',
    updateEmail: '/auth/update-email/',
    resendEmail: '/auth/resend-email-confirmation/',
    dependents: {
      create: '/auth/organization-users/dependents/',
    },
  },
  cep: {
    get: '/cep/v2/:cep',
  },
  farm: {
    list: '/farms/',
  },
  enclosure: {
    list: '/enclosure/',
    detail: '/enclosure/:id/',
    create: '/enclosure/',
    update: '/enclosure/:id/',
  },
  batch: {
    list: '/batchs/',
    detail: '/batchs/:id/',
    create: '/batchs/',
    update: '/batchs/:id/',
  },
  animal: {
    list: '/animal/',
    detail: '/animal/:id/',
    create: '/animal/',
    update: '/animal/:id/',
  },
};
