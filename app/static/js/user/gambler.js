(function(){
  'use strict';

  $(document).ready(function(){
    $('.info').click(sellAsset);
  });

  function sellAsset(){
    var id    = $(this).closest('.gambler').attr('data-gambler-id'),
        asset = $(this).attr('data-asset-name'),
        url   = '/gamblers/' + id + '/assets/' + asset,
        type  = 'delete';
    //console.log(id, asset, url, type);
    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      var $g = $('.gambler[data-gambler-id=' + data.id + ']'),
          $asset = $g.find('.info[data-asset-name=' + data.name + ']').parent();
      $asset.fadeOut(800);
      $g.find('.cash').text('$' + data.cash.toFixed(2));
      //console.log(data);
      if(data.isDivorced){
        $g.find('.spouse p').addClass('divorced').text('DIVORCED');
      }
      setTimeout(function(){$asset.remove();}, 1000);
    }});
  }

})();
