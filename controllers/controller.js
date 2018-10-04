module.exports = function(){
  var request = require('request-promise');

  const API_ENDPOINT = 'https://api.binance.com/api/v3/ticker/price?symbol=';

  // Window time units in miliseconds and how many of those units the SMA should cover
  const WINDDOW_TIME_UNITS = 1000;
  const WINDOW_TIME = 60;

  var optionsBTC = {
    uri: API_ENDPOINT+"BTCUSDT",
    json: true // Automatically parses the JSON string in the response
  };

  const optionsETH = {
    uri: API_ENDPOINT+"ETHUSDT",
    json: true 
  };

  const varsBTC = {
    // TODO => implement with a linked list to make time of removal from begining more efficient
    priceOverWindow : [],
    // Last calculated SMA to return to the endpoint
    lastSMA : null,
    sumOverWindow : 0
  };

  const varsETH = {
    priceOverWindow : [],
    lastSMA : null,
    sumOverWindow : 0
  };  

  const getNewSma = async () => {
    try{
      const res  = await Promise.all([request(optionsBTC), request(optionsETH)])

      console.log(await getSMA(Number(res[0].price),varsBTC)
                 ,await getSMA(Number(res[1].price),varsETH))

      //Wait a second (or any other set interval) and repets with recursion 
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
      await sleep(WINDDOW_TIME_UNITS)

      getNewSma();
    } catch (error) {
      return error;
    }
  }
  getNewSma();

  
  // When called with a new price sets lastSMA to a newSMA and returns it
  async function getSMA(newPrice,vars){
    let newSMA = null;
    vars.priceOverWindow.push(newPrice);
    
    let dataStoreLength = vars.priceOverWindow.length;
    vars.sumOverWindow += newPrice;
    // calculating the SMA of the price over the window time by getting its avarage

    if(dataStoreLength === WINDOW_TIME+1){

      let windowOldPrice = vars.priceOverWindow.shift();
      vars.sumOverWindow -= windowOldPrice;
      newSMA = vars.sumOverWindow/(dataStoreLength-1);
      // If less data points then window time don't delete first data point from datastore
    } else{
      if(vars.lastSMA){
        newSMA = vars.sumOverWindow/dataStoreLength;
      // If first 
      } else {
        newSMA = newPrice;
      }
    }
    
    vars.lastSMA = newSMA;

    return newSMA;
  }
  module.exports.varsBTC = varsBTC;
  module.exports.varsETH = varsETH;
}

