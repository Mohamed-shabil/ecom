const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('./util/catchAsync')
const multerStorage = multer.memoryStorage();

const multerFilter = (req,file,cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null, true);
  }else{
    cb(null,false)
  }
}

const upload = multer({
  storage :multerStorage,
  fileFilter:multerFilter,
}); 

exports.productImages = upload.single('image');

exports.resizeProductImages = catchAsync(async(req, res, next)=>{
    console.log(req.files);
    if(!req.file) return next();
    req.file.originalname = `product-${Date.now()}.jpeg`;
  
    req.body.image = req.file.originalname
    await sharp(req.file.buffer)
      .resize(500,500)
      .toFormat('jpeg')
      .jpeg({quality:90})
      .toFile(`upload/${req.file.originalname}`);
    next();
})
