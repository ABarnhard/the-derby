(function(){
  'use strict';

  $(document).ready(function(){
    $('.info').click(sellAsset);
  });

  function sellAsset(){
    var id    = $(this).closest('.gambler').attr('data-gambler-id'),
        asset = $(this).find('.asset-name').text(),
        url   = '/gamblers/' + id + '/assets/' + asset,
        type  = 'delete';
    console.log(type, url);
    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      console.log(data);
      var $g = $('.gambler[data-gambler-id=' + data.id + ']'),
          $a = $g.find('.asset-name:contains('+data.name+')').closest('.asset');
      $g.find('.cash').text('$' + data.cash.toFixed(2));
      if(data.isDivorced){
        $g.find('.spouse-name').addClass('divorced').text('DIVORCED');
      }
      $a.fadeOut(500);
      setTimeout(function(){$a.remove();}, 550);
    }});
  }

})();
