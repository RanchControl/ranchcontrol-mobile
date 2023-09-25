export const endpoints = {
  auth: {
    login: '/auth/login/',
    profile: '/auth/profile/',
    signUp: '/auth/signup/',
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
  assets: {
    image: '/assets/image/',
    image_raw: '/assets/image/raw/',
  },
  offers: {
    comments: {
      list: '/offers/comments/',
      create: '/offers/comments/',
    },
    list: '/offers/',
    like: '/offers/:id/like/',
    unlike: '/offers/:id/unlike/',
    get: '/offers/:id/',
  },
  stores: {
    list: '/stores/',
    get: '/stores/:id/',
  },
  coupons: {
    list: '/coupons/',
    redeems: {
      list: '/coupons/redeems/',
      post: '/coupons/redeems/',
      use: '/coupons/redeems/:id/use/',
    },
  },
  events: {
    list: '/events/',
  },
  categories: {
    list: '/stores/categories/',
  },
  tutorial: {
    list: '/tutorials/',
  },
  settings: {
    list: '/core/check-client-version/',
  },
  customScreen: {
    list: '/organizations/links/',
  },
  payments: {
    cards: {
      list: '/payments/cards/',
      delete: '/payments/cards/:id/',
      create: '/payments/cards/',
    },
    plans: {
      list: '/payments/plans/',
    },
    subscriptions: {
      list: '/payments/subscriptions/',
      get: '/payments/subscriptions/:id/',
      create: '/payments/subscriptions/',
      delete: '/payments/subscriptions/:id/',
    },
  },
  spaces: {
    list: '/spaces/',
    get: '/spaces/:id/',
    spacesCategories: {
      list: '/spaces/space-categories/',
    },
  },
  metrics: {
    totalSavedAmount: '/metrics/coupons-redeem/total-saved-amount/',
  },
};
