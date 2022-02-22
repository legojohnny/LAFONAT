
$(document).ready(function(){

var isMobile = false; //initiate as false

// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}

//슬라이드
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
			$inner_ul.animate({ left: li_width * _direction * move_cnt + "px"}, duration, function(){
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




	if(!isMobile){
//탭 버튼 클릭시 해당 페이지로 전환
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
					item.style.display = 'block';
					});
			}
			function moveHighLight(num){
				const newLeft = tabMenu[num].offsetLeft;
				const newWidth = tabMenu[num].offsetWidth;
				console.log(newWidth);
				highLight.style.left = newLeft + 'px';
				highLight.style.width = newWidth + 'px';
			}

	}
	else {
	
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


	}

});

/*$(document).ready(function(){



		
});

$(document).ready(function(){



*/