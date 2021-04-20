let sku = [6455122];
let sku_list = [6455122,6445827,6445830,6445823,6084400];

const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data), //should be json data
        headers: data ? {'Content-type': 'application/json'} : {} 
    }).then(response => {
        if (response.status >= 400) { 
            return response.json().then(errResData => {
                const error = new Error('something fucked')
                error.data = errResData; 
                throw error;
            });
        }
        return response.json(); 
    });
};

//gets only one item
// const getData = () => {
//     sendHttpRequest('GET', `https://api.bestbuy.com/v1/products/${sku}.json?show=sku,name,salePrice,onlineAvailability,inStoreAvailability,image&apiKey=YOURAPIHERE`)
//     .then(responseData => {
//         console.log(responseData);
//         if(responseData.onlineAvailability == true) {
//             console.log("dick mode - its in stock");
//         } else {
//             console.log("not cool - its out of stock")
//         }
//     })
// };

// getData();

//make for loop to check each item if its availalbe 

const getDataList = () => {
    sendHttpRequest('GET', `https://api.bestbuy.com/v1/products(sku in(${sku_list}))?show=sku,name,salePrice,onlineAvailability,inStoreAvailability,image&format=json&apiKey=YOURAPIHERE`)
    .then(responseData => {
        console.log(responseData.products); //responseData.products logs only the product info w/o it, it logs everything | responseData.products[0] gets the first object val
        for (const stockStatus of responseData.products) {
            console.log(stockStatus)
            if (stockStatus.onlineAvailability == true) {
                console.log('Item in Stock')
            } else {
                console.log('Item not in stock')
            }

        };
    })
    .then(stockStatus => {
    })
    .catch(err => {
        console.log(err, err.data);
    });
};

getDataList();
