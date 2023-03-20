const replacetemplate = function (res, template) {
  let product = template.replace(/{%IMAGE%}/g, res.image);
  product = product.replace(/{%PRODUCTNAME%}/g, res.productName);
  product = product.replace(/{%QUANTITY%}/g, res.quantity);
  product = product.replace(/{%Price%}/g, res.price);
  product = product.replace(/{%NUTRIENTS%}/g, res.nutrients);
  product = product.replace(/{%FROM%}/g, res.from);
  product = product.replace(/{%DESCRIPTION%}/g, res.description);
  product = product.replace(/{%ID%}/g, res.id);
  if (res.organic) {
    product = product.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return product;
};
module.exports = replacetemplate;
