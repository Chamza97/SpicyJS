import multer from "multer";

export const generateProductImageFileName = (filename)=>{
    console.log(filename);
    const fileNameArray = filename.split('.');
    const randomNumber = Math.floor((Math.random() * 10000000000) + 1);
    return  fileNameArray[0] + '_' + randomNumber + '.' + fileNameArray[1] ;
}
export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img/p');
    },
    filename: (req, file, cb) => {
        cb(null , generateProductImageFileName(file.originalname) );
    }
});
export const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}