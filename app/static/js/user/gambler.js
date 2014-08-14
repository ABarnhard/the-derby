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
    console.log(id, asset, url, type);

  }

})();
