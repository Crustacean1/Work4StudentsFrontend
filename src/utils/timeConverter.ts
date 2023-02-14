export const toDateTime = (secs: number) => {
  let time = new Date(1970, 0, 1);
  time.setSeconds(secs);

  return 'Opublikowano: ' + ('0' + time.getDate()).slice(-2) + '/'
    + ('0' + (time.getMonth()+1)).slice(-2) + '/'
    + time.getFullYear();
};