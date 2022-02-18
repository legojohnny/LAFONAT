window.onload = function(){

	var elm_header = document.getElementsByTagName("header")[0];
	var btn_menu = document.getElementById("btn_menu");

	btn_menu.onclick = function(){
		elm_header.classList.toggle("on"); 
		$('body').toggleClass("hidden");

	}

}


$(document).ready(function(){


	if(matchMedia("screen and (max-width: 767px)").matches){
			$('.openclose').hide();

			$('.btn_sub').click(function(){

				 $(this).next().slideToggle(300);
				 $('.btn_sub').not(this).next().slideUp(300);
				 return false;
			 });
	} else if(matchMedia("screen and (min-width: 768px)").matches){

			$('.openclose').show();

	}
	


});