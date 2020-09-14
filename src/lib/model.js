const axios = require('axios');

class Model {
  constructor(){
    this._baseurl = 'https://eve.theiconic.com.au';
  }

  async getProducts(options){
    const queryParams = new URLSearchParams(options);
    const response = await axios.get(this._baseurl+'/catalog/products?'+queryParams);
    return response.data._embedded.product
  }
}

export default new Model();
