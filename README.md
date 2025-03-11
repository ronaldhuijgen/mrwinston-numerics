   # MrWinston Numerics API

   Eenvoudige API die de MrWinston API aanroept om de totale omzet te berekenen en deze beschikbaar te maken voor de Numerics app.

   ## Functionaliteit

   Deze API:
   1. Haalt data op van de MrWinston API via het `/api/payments` endpoint
   2. Berekent de totale omzet door alle `amount` waarden in de `data` array op te tellen
   3. Geeft het resultaat terug in JSON formaat dat compatibel is met de Numerics app

   ## Endpoints

   ### GET /api/daily-revenue

   Haalt de totale omzet op (som van alle payment amounts).

   **Response:**

   ```json
   {
     "status": "success",
     "data": {
       "value": 1234.56,
       "timestamp": "2023-12-01T12:34:56.789Z"
     }
   }
   ```

   ### GET /health

   Gezondheidscheck endpoint om te controleren of de API online is.

   **Response:**

   ```json
   {
     "status": "OK",
     "timestamp": "2023-12-01T12:34:56.789Z"
   }
   ```

   ## Gebruik met Numerics

   Om deze API te gebruiken met de Numerics app:

   1. Voeg een 'Simple JSON' widget toe in Numerics
   2. Configureer de widget met:
      - URL: `https://jouw-vercel-url.vercel.app/api/daily-revenue`
      - Data Path: `data.value`
      - Optioneel: Stel een prefix in zoals "€" om het bedrag duidelijk te markeren

   ## Deployment

   Deze API is klaar voor deployment naar Vercel.

   1. Push de code naar GitHub
   2. Verbind de repository met Vercel
   3. Deploy!
