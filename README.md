# binance-sma

An API that returns SMA over a minute for Bitcoin and Ethereum


### Prerequisites

```
Node.js with support for async/await
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

First clone the repository 
```
git clone https://github.com/esilver/binance-sma.git
```

Navigate to the folder and run 
```
npm install
```

To start the local server
```
npm start
```

API endpoint: 
```
http://localhost:3000/api
```

The api could be extend to other cryptocurrencies by navigating to controllers/controller.js and adding the following lines: (ETH for example)

```
 const optionsETH = {
    uri: API_ENDPOINT+"ETHUSDT",
    json: true 
  };

  const varsETH {
    priceOverWindow : [],
    lastSMA : null,
    sumOverWindow : 0
  };
  
  
  
  
 ...
 const res  = await Promise.all([request(optionsBTC), request(optionsETH)])

 console.log(await getSMA(Number(res[0].price),varsBTC)
           ,await getSMA(Number(res[1].price),varsETH))
             
  
  
  
 ...
 module.exports.varsBTC = varsBTC;
 module.exports.varsETH = varsETH;
  
 ```
  
  And in the routes/api.js:
  
 ```
  res.send({"Last minute Bitcoin SMA": controller.varsBTC.lastSMA
           ,"Last minute Ethereum SMA": controller.varsETH.lastSMA})
 ```
  

## TODO

Add testing 



## Authors

* **Eli Silver** - [esilver](https://github.com/esilver)



