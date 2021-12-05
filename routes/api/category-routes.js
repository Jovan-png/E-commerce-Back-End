const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
Category.findAll({
  include:{
    model: Product,
    attributes: ['id','product_name','price', 'stock','category_id'],
  }
})
.then(catData => {
  res.json(catData)
  console.log(catData)
})
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where:{
      id: req.params.id
    },
    include:{
      model: Product,
      attributes: ['id','product_name','price','stock'],
    }
  })
  .then(dbCatData =>{
    res.json(dbCatData)
  })
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCatData =>{
    res.json(dbCatData)
    console.log(dbCatData)
  })
});

router.put('/:id', (req, res) => {
  Category.update(req.body,{
    where:{
      id: req.params.id
    },
    attributes:{
      category_name: req.body.category_name
    }
  })
  .then(dbCatData =>{
    res.json(dbCatData)
    console.log(dbCatData)
  })
});

router.delete('/:id', (req, res) => {

  Category.destroy({
    where:{
      id: req.params.id
    },
  })
  .then(dbCatData =>{
    res.json(dbCatData)
    console.log(dbCatData)
  })
});

module.exports = router;
