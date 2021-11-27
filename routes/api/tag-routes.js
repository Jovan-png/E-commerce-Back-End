const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
 Tag.findAll({
   include: {
     model: Product,
     attributes: ['id','product_name','price','stock']
   }
 })
 .then(dbTagData =>{
   res.json(dbTagData)
 })
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
Tag.findOne({
  include:{
    model: Product,
    attributes: ['id','product_name','price','stock', 'category_id']

  },
  where:{
    id: req.params.id
  }
 
})
.then(dbTagData =>{
  res.json(dbTagData)
})
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
Tag.create({
id: req.body.id,
tag_name: req.body.tag_name,

})
.then(dbTagData=>{
  res.json(dbTagData)
})
});

router.put('/:id', (req, res) => {
Tag.update(req.body,{
  where:{
    id: req.params.id
  },
  attributes:{
    tag_name: req.body.tag_name
  }
})
.then(dbTagData =>{
  res.json(dbTagData)
})
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
