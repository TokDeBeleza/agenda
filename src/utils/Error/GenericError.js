export default class GenericError extends Error {
  constructor(code, message = 'Unknow error contact the admin') {
    super(message);
    this.code = code;
    this.success = false;
  }
}
