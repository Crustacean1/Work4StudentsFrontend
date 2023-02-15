export const getBase64 = (file: Blob, callback: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callback(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    return reader.result;
 }