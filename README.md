# Black Box 
## Specifications
Backend is made with a flask server on port `5000` which feeds the latest reading on serial `COM9` to the `/companies` route. If no serial is open, a 0 array is sent which signals to the frontend to use values from a prestored dataset. Frontend is made with Javascript using the ChartJS library for chart rendering. Home page uses particles.js to generate background on home page. Tailwindcss is used for styling and jQuery for minor changes to DOM.  


please give us 1st place
