function isObject(value: any) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );
}

export const getBase64 = (file: Blob, callback: any) => {
  var reader = new FileReader();
    if (isObject(file)) {
      reader.readAsDataURL(file);
    } else callback('');
    reader.onload = function () {
      callback(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    return reader.result;
 }