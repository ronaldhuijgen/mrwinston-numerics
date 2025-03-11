   const axios = require('axios');

   /**
    * Haalt de totale omzet op uit de MrWinston API
    * @param {Object} req - Express request object
    * @param {Object} res - Express response object
    */
   module.exports = async (req, res) => {
     // CORS headers instellen
     res.setHeader('Access-Control-Allow-Credentials', true);
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
     res.setHeader(
       'Access-Control-Allow-Headers',
       'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
     );

     // Afhandelen van OPTIONS requests (voor CORS)
     if (req.method === 'OPTIONS') {
       return res.status(200).end();
     }

     // Alleen GET-requests verwerken
     if (req.method !== 'GET') {
       return res.status(405).json({ error: 'Methode niet toegestaan' });
     }
     
     try {
       console.log('MrWinston API aanroepen...');
       
       // MrWinston API aanroepen
       const response = await axios.get('https://api.mrwinston.com/api/payments', {
         params: {
           api_key: '5nDKazGNoEbkA3m2',
           APP_NAME: 'selforder'
         }
       });
       
       console.log('MrWinston API response ontvangen');
       
       // Controleren of er een data array is
       if (!response.data || !response.data.data || !Array.isArray(response.data.data)) {
         console.log('Geen geldige data array gevonden in response:', 
           JSON.stringify(response.data).substring(0, 200) + '...');
         return res.status(500).json({
           status: 'error',
           message: 'Geen geldige data ontvangen van MrWinston API'
         });
       }
       
       console.log('Data array gevonden met', response.data.data.length, 'items');
       
       // Bereken de totale omzet (som van alle amount waarden)
       let totalRevenue = 0;
       
       response.data.data.forEach(payment => {
         if (payment && payment.amount) {
           const amount = parseFloat(payment.amount);
           if (!isNaN(amount)) {
             totalRevenue += amount;
           }
         }
       });
       
       console.log('Totale omzet berekend:', totalRevenue);
       
       // Response terugsturen
       return res.status(200).json({
         status: 'success',
         data: {
           value: totalRevenue,
           timestamp: new Date().toISOString()
         }
       });
       
     } catch (error) {
       console.error('Fout bij ophalen data:', error.message);
       
       // Gedetailleerde error logging
       if (error.response) {
         console.error('Response status:', error.response.status);
         console.error('Response data:', 
           JSON.stringify(error.response.data).substring(0, 200) + '...');
       }
       
       return res.status(500).json({
         status: 'error',
         message: 'Fout bij ophalen data van MrWinston API',
         details: error.message
       });
     }
   };
