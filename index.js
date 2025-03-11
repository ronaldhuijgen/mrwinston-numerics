   const express = require('express');
   const cors = require('cors');
   const app = express();
   const PORT = process.env.PORT || 3000;

   // Middleware
   app.use(cors());
   app.use(express.json());

   // Health check endpoint
   app.get('/health', (req, res) => {
     res.status(200).json({
       status: 'OK',
       timestamp: new Date().toISOString()
     });
   });

   // Root endpoint met API informatie
   app.get('/', (req, res) => {
     const host = process.env.VERCEL_URL 
       ? `https://${process.env.VERCEL_URL}` 
       : `${req.protocol}://${req.get('host')}`;
     
     res.json({
       name: 'MrWinston Numerics API',
       description: 'API voor MrWinston omzet in Numerics app',
       endpoints: [
         {
           path: '/api/daily-revenue',
           description: 'Haalt de totale omzet op (som van alle payment amounts)',
           response: 'JSON met de waarde'
         }
       ],
       numericsSetup: {
         url: `${host}/api/daily-revenue`,
         dataPath: 'data.value'
       }
     });
   });

   // Voor lokale ontwikkeling
   if (process.env.NODE_ENV !== 'production') {
     app.listen(PORT, () => {
       console.log(`Server draait op poort ${PORT}`);
     });
   }

   // Voor Vercel
   module.exports = app;
