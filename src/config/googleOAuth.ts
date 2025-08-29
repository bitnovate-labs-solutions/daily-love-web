export const GOOGLE_OAUTH_CONFIG = {
  clientId: "57845197359-ivp209g04874aap98471t1sr4i92l9j8.apps.googleusercontent.com",
  clientSecret: "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",
  projectId: "durable-gizmo-470408-u0",
  authUri: "https://accounts.google.com/o/oauth2/auth",
  tokenUri: "https://oauth2.googleapis.com/token",
  redirectUris: [
    "http://localhost:8080/api/auth/callback/google",
    "https://www.dailylovewellness.com/api/auth/callback/google"
  ],
  scopes: [
    'https://www.googleapis.com/auth/business.manage',
    'https://www.googleapis.com/auth/plus.business.manage'
  ]
};

export const GOOGLE_BUSINESS_API_SCOPES = [
  'https://www.googleapis.com/auth/business.manage',
  'https://www.googleapis.com/auth/plus.business.manage'
];
