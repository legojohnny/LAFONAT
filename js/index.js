

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
					tabContent.forEach(function(item){
					item.style.display = 'none';
					});
					tabContent[num].style.display = 'block';
			}
			function moveHighLight(num){
				const newLeft = tabMenu[num].offsetLeft;
				const newWidth = tabMenu[num].offsetWidth;
				console.log(newWidth);
				highLight.style.left = newLeft + 'px';
				highLight.style.width = newWidth + 'px';
			}

		
});

$(document).ready(function(){

	function rolling_slides(_targetWrap){

		const $wrap = _targetWrap;		
		const $mask = $($wrap + " div.view_mask");
		let $inner_ul = $($wrap +" div.view_mask > ul");
		let $inner_ul_li = $($wrap +" div.view_mask > ul > li");
		const $btn_prev = $($wrap +" button.prev");
		const $btn_next = $($wrap +" button.next");
		
		const li_width = $inner_ul_li.outerWidth();
		const move_cnt = 1;
		const duration = 300;
		let click_Event = true;
		let si_01 = 0;

		(function init(){
			for(var i = 1; i<= move_cnt; i++){
				$inner_ul_li.last().prependTo($inner_ul);
			}
			$inner_ul.css("margin-left", -(li_width * move_cnt) + "px");
		})();

		$btn_prev.click(function(){
			if(click_Event){
				click_Event = false;
				movement(1);
			}
			else { return };
		});

		$btn_next.click(function(){
			if(click_Event){
				click_Event = false;
				movement(-1);
			}
			else { return };
		});
		
		function movement(_direction){
			stop_si();
			$inner_ul.animate({ left: (li_width * _direction) * move_cnt + "px"}, duration, function(){
				for(var i = 1; i <= move_cnt; i++){
					$inner_ul_li = $($wrap + " div.view_mask > ul > li");
					if(_direction == 1){
						$inner_ul_li.last().prependTo($inner_ul);
					}
					else if(_direction == -1){
						$inner_ul_li.first().appendTo($inner_ul);
					}
				}
				$inner_ul.css("left", "0px");
				click_Event = true;
				start_si();
			});
		}

		function start_si(){
			if(si_01 != 0){
				clearInterval(si_01);
			}
			si_01 = setInterval(function(){$btn_next.click()}, 3000);
		}
		function stop_si(){
			if(si_01 != 0) clearInterval(si_01);
			si_01 = 0;
		}
		start_si();

	}

	let rolling_01 = rolling_slides(".sns");


	});


