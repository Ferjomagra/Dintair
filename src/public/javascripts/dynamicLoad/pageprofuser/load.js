$(function (){

  $(".prod-start .perfiluser .part_user_publics_22 div.wrap .content_public-2").slice(0,9).show();

  $("#loadMore").on("click", function(e){

    e.preventDefault();

    $(".prod-start .perfiluser .part_user_publics_22 div.wrap .content_public-2:hidden").slice(0,4).slideDown();
    if ($(".prod-start .perfiluser .part_user_publics_22 div.wrap .content_public-2:hidden").length == 0){
      $("#load").fadeOut("fast");
    }
    $("jade,body").animate({
      scrollTop: $(this).offset().top
    }, 1500)

    
  })

})