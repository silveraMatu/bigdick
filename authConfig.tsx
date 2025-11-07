import { Configuration, LogLevel } from "@azure/msal-browser";

// Configuración de MSAL
export const msalConfig: Configuration = {
  auth: {
    clientId: "TU_APPLICATION_CLIENT_ID", // <-- Pega tu Client ID de Azure AD aquí
    authority: "https://login.microsoftonline.com/TU_DIRECTORY_TENANT_ID", // <-- Pega tu Tenant ID aquí
    redirectUri: "http://localhost:3000/dashboard" // O la URL donde hostees el dashboard
  },
  cache: {
    cacheLocation: "sessionStorage", 
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      }
    }
  }
};

// Scopes (permisos) que solicitamos para Power BI
export const loginRequest = {
  scopes: ["User.Read", "https://analysis.windows.net/powerbi/api/Report.Read.All"]
};