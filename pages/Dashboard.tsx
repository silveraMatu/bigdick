import { FC, useState, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
// --- CORRECCIÓN AQUÍ ---
import { TokenType, PageNavigationPosition, BackgroundType } from 'powerbi-models';
// -----------------------
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../authConfig"; 
import { AuthenticationResult, InteractionRequiredAuthError } from '@azure/msal-browser';

// --- PLACEHOLDERS ---
const reportId = "TU_REPORT_ID"; 
const groupId = "TU_GROUP_ID"; 
const embedUrl = `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${groupId}`;
// --------------------

export const Dashboard: FC = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [accessToken, setAccessToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && accounts[0]) {
      setIsLoading(true);
      setError(null);
      
      instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
      }).then((response: AuthenticationResult) => {
        setAccessToken(response.accessToken);
        setIsLoading(false);
      }).catch((e) => {
        if (e instanceof InteractionRequiredAuthError) {
          instance.acquireTokenPopup(loginRequest).then((response: AuthenticationResult) => {
            setAccessToken(response.accessToken);
            setIsLoading(false);
          }).catch(popupError => {
            console.error(popupError);
            setError("No se pudo obtener el token de acceso.");
            setIsLoading(false);
          });
        } else {
          console.error(e);
          setError("Error de autenticación.");
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false); 
    }
  }, [instance, accounts, isAuthenticated]);

  const handleLogin = () => {
    setIsLoading(true);
    instance.loginPopup(loginRequest).catch(e => {
      console.error(e);
      setError("Fallo en el inicio de sesión.");
      setIsLoading(false);
    });
  }

  const containerStyle = "min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center";
  const cardStyle = "bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-lg w-full";
  const buttonStyle = "bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-900/50";

  if (!isAuthenticated) {
    return (
      <div className={containerStyle}>
        <div className={cardStyle}>
          <h1 className="text-3xl font-bold mb-4 text-white">Dashboard de Power BI</h1>
          <p className="text-gray-400 mb-6">Por favor, inicia sesión con tu cuenta de organización para ver el informe.</p>
          <button onClick={handleLogin} className={buttonStyle} disabled={isLoading}>
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !accessToken) {
    return (
      <div className={containerStyle}>
        <div className={cardStyle}>
          <h1 className="text-3xl font-bold mb-4 text-white">Cargando Informe...</h1>
          <p className="text-gray-400">Obteniendo token de acceso y conectando con Power BI...</p>
        </div>
      </div>
    );
  }

  if (error) {
     return (
      <div className={containerStyle}>
        <div className={cardStyle}>
          <h1 className="text-3xl font-bold mb-4 text-red-400">Error</h1>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-900 p-4">
      <PowerBIEmbed
        embedConfig={{
          type: 'report',
          id: reportId,
          embedUrl: embedUrl,
          accessToken: accessToken,
          // --- CORRECCIÓN AQUÍ ---
          tokenType: TokenType.Aad, 
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: true
              },
              pageNavigation: {
                visible: true,
                position: PageNavigationPosition.Bottom 
              }
            },
            background: BackgroundType.Transparent, 
          }
          // -----------------------
        }}
        eventHandlers={
          new Map([
            ['error', function (event) { console.error(event.detail); }],
          ])
        }
        cssClassName={"w-full h-full border-none rounded-lg overflow-hidden"} 
      />
    </div>
  );
};