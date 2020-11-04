$(function(){
	function post_show(){
		$.ajax({
			datatype:'json',
			type:'post',
			data:{},
			url:'../../back/post_show.php',
			success:function(data){
				var postinfo = data.info;
				console.log(postinfo);
				$(postinfo).each(function(){
					var str = ' <li class="mdui-list-item mdui-ripple"><a href="" style="display: contents;"><span class="iconfont icon-atm-fill"></span><div><p class="list-item-tlt">'+this.title+'</p><span>admin</span><p class="list-item-content"><span>'+this.comment+'回复</span><span>'+this.fabulous+'赞</span><span>'+this.watch+'浏览</span></p>';
					$('.mdui-list').append(str);
				});
			},
			error:function(err){
				console.log(err);
			}
		});
	};
	
	
	
	post_show();
});