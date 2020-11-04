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
	
	//登陆检测
	function loading_check(){
		var check_ajx = $.ajax({
			url:'back/loading_check.php',
			type:'post',
			async:false, //同步传输
			dataType:'json',
			data:{},
			success:function(data){
				if(data.id==0){
					remake_alert('bell','success','欢迎登陆 '+data.datas[0].username);
					$('button:eq(0)').text('退出登陆');
				}else if(data.id==1){
					remake_alert('times','danger','未登陆');
					$('button:eq(0)').text('登陆账号');
				};
			},
			error:function(err){
				console.log(err);
			}
		});
	};
	
	//按钮点击事件
	function btn_click(){
		
		$('button:contains("登陆账号")').click(function(){
			$('.login_panel').css({
				'width':'375px',
				'box-shadow':'0px 1px 2px 1px #ccc',
				'border':'1px solid #ddd',
				'top':'179px',
				'left':'725px',
				'opacity':'1'
			});
			empty();
		});
		
		$('button:contains("退出登陆")').click(function(){
			var exit_ajax = $.ajax({
				url:'back/cancel.php',
				type:'post',
				datatype:'json',
				data:{},
				success:function(data){
					remake_alert('bell','success',data.msg);
					setTimeout(function(){
						window.location.href='index.html';
					},2000);
				},
				erro:function(err){
					remake_alert('times','danger',err);
				}
			});
		});
		
		//面板
		$('button:contains("X")').bind('click',function(){
			$('.login_panel').css({
				'width':'0px',
				'box-shadow':'0px 0px 0px 0px',
				'border':'0px',
				'top':'0px',
				'left':'0px',
				'opacity':'0'
			});
		});
		
		$('.panel button:contains("登陆")').bind('click',function(){
			var userName = $('#userName').val();
			var userPassword = $('#userPassword').val();
			var userCode = $('#userCode').val();
			if(userName==""){
				remake_alert('warning-sign','warning','请输入账号');
				empty();
			}else if(userPassword==""){
				remake_alert('warning-sign','warning','请输入密码');
				empty();
			}else if(userCode==""){
				remake_alert('warning-sign','warning','请输入验证码');
				empty();
			}else{
				var login_ajax =  $.ajax({
					url:'./back/login.php',
					type:'POST',
					dataType:'JSON',
					data:{
						username:userName,
						userpassword:userPassword,
						usercode:userCode,
					},
					success:function(data){
						if(data.id==0){
							remake_alert('bell','success',data.msg);
							$('.login_panel').css({
								'width':'0px',
								'box-shadow':'0px 0px 0px 0px',
								'border':'0px',
								'top':'0px',
								'left':'0px',
								'opacity':'0'
							});
							$('a:contains("登陆账号")').html('退出登陆').unbind();
							setTimeout(function(){
								window.location.href='font/subweb/main.html';
							},2000);
						}else{
							remake_alert('times','danger',data.msg);
							empty();
						};
					},
					erro:function(err){
						remake_alert('times','danger',err);
					}
				});
			};
		});
	};

	//总线
	loading_check();
	btn_click();
});