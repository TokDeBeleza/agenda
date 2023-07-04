import GenericError from '@/utils/Error/GenericError';
export default class BaseService {
  failure(error) {
    throw new GenericError(error?.code, error?.message);
  }

  success(body = {}) {
    return {
      body: body,
      success: true
    };
  }

  async httpRequestGet(URL, params, headers) {
    const fetchURL = `${URL}?${new URLSearchParams(params).toString()} `;
    return fetch(fetchURL, {
      method: 'GET',
      ...headers
    })
      .then(async (response) => await response.json())
      .catch(this.failure);
  }
}
