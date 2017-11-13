module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    product_name: DataTypes.STRING,
    price: DataTypes.STRING,
    reviews: DataTypes.ARRAY(DataTypes.TEXT)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Products;
};