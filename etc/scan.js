const prefix = 'http://192.168.0.';
const start = 1;
const finish = 255;

for(let i=start; i<=finish; i++){
  $.ajax(prefix+i, {
    success: function(result){
      if(result.startsWith('<!DOCTYPE html>')){
        document.write(`<a target="_blank" href="${prefix+i}">${prefix+i}</a><br>`);
      }
    }
  });
}