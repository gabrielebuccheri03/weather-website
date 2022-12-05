import  rp from 'request-promise'

class req{
  async geocode(location){

    var options = {
      method : 'GET',
      uri: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoia2F0YTExMjMiLCJhIjoiY2xiNHdyaG5zMDB4MTN2bGdmeHUwdm5kOCJ9.ZHEmDTiK9NBEFYOG4zoffA&limit=1`,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true 
    };
    try{
      const response = await rp(options)
      if(response.features.length === 0){
        return {lon : undefined, lat : undefined, error : 'Can\'t find the location'};
        
      }
      else{
        const lon =  response.features[0].center[0];
        const lat = response.features[0].center[1];
        return {lon : lon, lat : lat, error :undefined};
      }
    }
    catch(err){
      return  {lon : undefined, lat : undefined, error :'Can\'t connect to the geocode api'};
    }
  }

  async forecast(lat,lon){
    var options = {
      method : 'GET',
      uri: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ea10401d3728a90802691a9c88d2e373&units=metric`,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true 
    };
    try{
      const response = await rp(options)
      if(response.cod !== 200){
        return 'Can\'t find the location';
      }
      else{
        const weather = response.weather[0].main;
        const country = response.sys.country ;
        return {weather,country} ;
      }
    }
    catch(err){
      return 'Can\'t connect to the weather api';
    }
  }

}



export default new req;
