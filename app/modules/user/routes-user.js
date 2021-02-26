module.exports = {
  register: (data, callback) => {
    return callback(200, { message: 'Product saved' });
  }
}
