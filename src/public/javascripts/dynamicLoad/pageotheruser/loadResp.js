$(function (){

  $(".prod-start .perfiluser .part_publications_resp div.wrap .contenedor_publications").slice(0,8).show();

  $("#loadMoreResp").on("click", function(e){

    e.preventDefault();

    $(".prod-start .perfiluser .part_publications_resp div.wrap .contenedor_publications:hidden").slice(0,4).slideDown();
    if ($(".prod-start .perfiluser .part_publications_resp div.wrap .contenedor_publications:hidden").length == 0){
      $("#load").fadeOut("fast");
    }
    $("jade,body").animate({
      scrollTop: $(this).offset().top
    }, 1500)

    
  })

})