const axios = require('axios');

class Model {
  constructor(){
    this._baseurl = 'https://eve.theiconic.com.au';
    this._cache = {};
  }

  buildURLQuery(obj) {
    console.log(obj);
    return Object.entries(obj)
      .filter(pair => !!(pair[1].toString().trim()))
      .map(pair => pair.map(encodeURIComponent).join('='))
      .join('&');
  }

  async getProducts(options = {}){
    const queryParams = this.buildURLQuery(options);
    console.log(queryParams);
    const cacheData = this.cacheGet(queryParams);
    if(cacheData) return cacheData;

    const response = await axios.get(this._baseurl+'/catalog/products?'+queryParams);
    this.cacheSet(queryParams,response.data._embedded.product);
    return response.data._embedded.product
  }

  cacheGet(params){
    return this._cache[params]
  }

  cacheSet(params,data){
      this._cache[params] = data;
  }

}

export default new Model();
