
/*
$(function(){
	var tabAnchor = $('.rel button span'),
		tabPanel = $('.lists_wrap li');
	
	//버튼을 클릭하면 할일
	tabAnchor.click(function(){

		tabAnchor.removeClass('tab-active'); //모두 빼고
		$(this).addClass('tab-active'); //그 요소만 추가

		tabPanel.hide();

		//그 요소에만 active를 추가하고 나머지 요소에는 빼는 방법
		$(this).addClass('tab-active').siblings().removeClass(tab-active);

		var target = $(this).attr('id');
		console.log(target);

		$(target).show();


	});

}); 



$(function(){
	var tabAnchor = $('.rel button'),
		tabPanel = $('.lists_wrap li');
	
	//버튼을 클릭하면 할일
	tabAnchor.click(function(){

//		tabAnchor.find('span').removeClass('tab-active'); //모두 빼고
//		$(this).find('span').addClass('tab-active'); //그 요소만 추가
		$(this).find('span').addClass('tab-active');
		$(this).siblings().find('span').removeClass('tab-active');

		tabPanel.hide();


		var targetIdx = $(this).index();
		console.log(targetIdx);
		tabPanel.eq(targetIdx).show();

	});

});
*/

$(document).ready(function(){


			const tabMenu = document.querySelectorAll('.rel button');
			const tabContent = document.querySelectorAll('.lists_wrap li');
			const highLight = document.querySelector('.bar');

			tabMenu.forEach(function(item, idx){
				item.addEventListener('click', function(){
					showContent(idx);
					moveHighLight(idx);
					$(this).find('span').addClass('tab-active');
					$(this).siblings().find('span').removeClass('tab-active');
				});
			});
			function showContent(num){

				var windowWidth = $( window ).width();
				if(windowWidth <= 768){
					tabContent.forEach(function(item){
					item.style.display = 'none';
					});
					tabContent[num].style.display = 'block';
				} else {
					tabContent.forEach(function(item){
					item.style.display = 'block';
					});
				}

			}
			function moveHighLight(num){
				const newLeft = tabMenu[num].offsetLeft;
				const newWidth = tabMenu[num].offsetWidth;
				console.log(newWidth);
				highLight.style.left = newLeft + 'px';
				highLight.style.width = newWidth + 'px';
			}

		
});

