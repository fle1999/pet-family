$(function(){
	//封装漂浮提示
	function remake_alert(icon,type,msg){
		new $.zui.Messager(msg, {
			icon: icon,
			type: type
		}).show();
	};
	
	//清空函数
	function empty(){
		$('#userName').val('');
		$('#userPassword').val('');
		$('#userCode').val('');
	};
	
	//显示帖子
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
	
	//发布帖子
	function post_release(){
		$('button:contains("确认")').bind('click',function(){
			//获取帖子信息
			var post_title = $('input:eq(0)').val();
			var post_content = $('textarea:eq(0)').val();
			var post_type = $('.post_type select option:selected').val();
			var post_author = 'admin';
			//提交帖子信息
			$.ajax({
				type:'post',
				dataType:'json',
				url:'../../back/post_release.php',
				data:{
					title : post_title,
					content : post_content,
					type: post_type,
					author: post_author
				},
				success:function(data){
					// console.log(data);
					if(data.id==0){
						
					}else{
						
					}
				},
				error:function(err){
					console.log("错误");
				}
			});
		});
	};
	
	//总线
	post_show();
	post_release()
});