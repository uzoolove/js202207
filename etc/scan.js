const prefix = 'http://192.168.0.';
const start = 2;
const finish = 250;

for(let i=start; i<=finish; i++){
  console.log(prefix+i);
  $.ajax(prefix+i, {
    success: function(result){
      // if(result.startsWith('<!DOCTYPE html>')){
        document.write(`<a target="_blank" href="${prefix+i}">${prefix+i}</a><br>`);
      // }
    }
  });
}