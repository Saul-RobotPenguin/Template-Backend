// const reader = new FileReader();
// reader.onload = function () {
//   alert(reader.result);
// };
// let result = reader.readAsBinaryString(req.body.file);

// let binaryTemplate = {
//   name: req.body.name,
//   description: req.body.description,
//   file: req.body.file,
// };

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// }
// let fileBase64 = getBase64(req.body.file);
// let base64Template = {
//   name: req.body.name,
//   description: req.body.description,
//   file: fileBase64,
// };
// const template = await new Template(base64Template);
