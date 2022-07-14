const { application } = require('express');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/Product');


//=================================
//             Product
//=================================

// 가져온 이미지를 저장
var storage = multer.diskStorage({
    // 파일 저장 위치
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})
    
const upload = multer({ storage: storage }).single('file')

router.post('/image', (req,res) => {
      
      upload(req,res,err => {
        if(err) {
            return req.json({sucess : false, err});
        }
        return res.json({success:true , filePath : res.req.file.path , fileName : res.req.file.filename })
      });
});

// 상품 등록
router.post('/', (req,res) => {      
    // 받아온 정보들을 DB에 저장한다.
    const product = new Product(req.body);
    product.save((err) => {
        if(err) {
            return res.status(400).json({ success : false , err })
        }
        return res.status(200).json({ success : true })
        
    });

});

router.post('/products', (req,res) => {      
    //proudct collection에 들어있는 모든 상품 정보를 가져오기.

    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;

    Product.find()
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err,product) => {
        if(err) return res.status(400).json({success : false, err})

        return res.status(200).json({ 
            success : true 
           , product 
           , postSize : product.length
        })

    })
});


module.exports = router;
