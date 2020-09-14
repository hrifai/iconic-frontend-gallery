const axios = require('axios');

class Model {
  constructor(){
    this._baseurl = 'https://eve.theiconic.com.au';
    this._cache = {};
  }

  //used to build the query params for the external api
  buildURLQuery(obj) {
    return Object.entries(obj)
      .filter(pair => !!(pair[1].toString().trim()))
      .map(pair => pair.map(encodeURIComponent).join('='))
      .join('&');
  }

  //
  async getProducts(options = {}){
    //if the request has been done before, use cached data
    const queryParams = this.buildURLQuery(options);
    const cacheData = this.cacheGet(queryParams);
    if(cacheData) return cacheData;
    //else hit the endpoint, get the data, set the cache and return the data
    const response = await axios.get(this._baseurl+'/catalog/products?'+queryParams);
    this.cacheSet(queryParams,response.data._embedded.product);
    return response.data._embedded.product
  }


  //getter and setter for basic style cache
  //prevents repetitive requests for data
  cacheGet(params){
    return this._cache[params]
  }

  cacheSet(params,data){
      this._cache[params] = data;
  }

}

export default new Model();
