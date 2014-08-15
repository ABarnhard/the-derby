(function(){
  'use strict';

  $(document).ready(function(){
    $('.info').click(sellAsset);
  });

  function sellAsset(){
    var id    = $(this).closest('.gambler').attr('data-gambler-id'),
        asset = $(this).find('.name').text(),
        url   = '/gamblers/' + id + '/assets/' + asset,
        type  = 'delete';
    console.log(type, url);
    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      console.log(data);
    }});
  }

})();
