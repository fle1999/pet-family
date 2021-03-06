$(function(){
	//用户信息获取
	var str_array = window.location.search.split("&");
	var user_name = str_array[0].substring(11);
	var user_id=str_array[1].substring(3);
	var userinfo = [];
	
	//漂浮提示
	function remake_alert(icon,type,msg){
		new $.zui.Messager(msg,{
			icon: icon,
			type: type
		}).show();
	};
	
	//清空函数
	function empty(){
		$('#password').val('');
		$('#repassword').val('');
	};
	
	//面板模块显示
	function panel_show_re(id_name,title_name,create_node){
		// 标题
		$('.panel').attr('id',id_name).find('h2').text(title_name);
		
		//添加元素
		$('.panel_body').prepend(create_node);
		
		//关闭按钮
		$('.panel').find('.exit_btn').bind('click',function(){
			$('.panel').css({
				'display':'none',
			})
			.attr('id','');
		});
		
		//显示面板
		$('.panel').css({
			'display':'block',
		});
	};
	
	//登陆检测
	function loading_check(){
		 if(user_name=="none"){
			 remake_alert('times','danger','未登陆');
			 $('.mdui-tab p').text('未登陆');
			 setTimeout(function(){
			 	window.location.href="../../index.html";
			 },3000);
		 }else{
			 remake_alert('bell','success','欢迎登陆 '+user_name);
			 $('.mdui-tab p').text('Hi '+user_name+' 欢迎登陆');
		 }
	};

	//获取用户信息
	function  gain_userinfo(user_id){
		$.ajax({
			type:'post',
			datatType:'json',
			data:{
				user_id : user_id
			},
			url:"../../back/gain_userinfo.php",
			success:function(data){
				userinfo[0] = data.info[0];
				console.log(userinfo[0]);
			},
			error:function(err){
				console.log(err);
			}
		});
	}
	
	function btn_clcik(){
		//页面跳转
		function page_jump(){
			$('.mdui-tab').find('a:eq(2)').click(function(){
				window.location.href = 'main.html?user_name='+user_name+'&id='+user_id;
			});
			
			$('.mdui-tab').find('a:eq(3)').click(function(){
				window.location.href = 'pet_forum.html?user_name='+user_name+'&id='+user_id;
			});
			
			$('.mdui-tab').find('a:eq(4)').click(function(){
				window.location.href = 'pet_photo.html?user_name='+user_name+'&id='+user_id;
			});
			
			$('.mdui-tab').find('a:eq(5)').click(function(){
				window.location.href = 'doctor_manner.html?user_name='+user_name+'&id='+user_id;
			});
			
			$('.mdui-tab').find('a:eq(6)').click(function(){
				window.location.href = 'doctor_appointment.html?user_name='+user_name+'&id='+user_id;
			});
			
			$('.mdui-tab').find('a:eq(7)').click(function(){
				window.location.href = 'contact_us.html?user_name='+user_name+'&id='+user_id;
			});
			
			$('.mdui-tab').find('a:eq(8)').click(function(){
				window.location.href = 'personal_center.html?user_name='+user_name+'&id='+user_id;
			});
		};
		
		//通知栏点击
		function notice_click(){
			$('.navbar_notice i:eq(0)').bind('click',function(){
				$('.navbar_notice').css({
					'width':'100%',
				});
			});
			
			$('.navbar_notice i:eq(1)').bind('click',function(){
				$('.navbar_notice').css({
					'width':'0px',
					'transition':'1.2s',
				});
			});
		};
		
		// 个人信息
		function personal_information(){
			$('.module_container:eq(0)').click(function(){
				$('.panel_body').html('<button class="btn" type="button">确认</button>');
				if(userinfo[0].classifyid==1){
					var userclass = '普通用户';
				}else if(userinfo[0].classifyid==2){
					var userclass = '管理员';
				}else if(userinfo[0].classifyid==3){
					var userclass = '超级管理员';
				}else{
					var userclass = 'undefind';
				}
				var document_node = '<p>用户名：'+userinfo[0].username+'</p><p>联系方式：'+userinfo[0].telephone+'</p><p>余额：'+userinfo[0].balance+'元</p><p>用户等级：'+userclass+'</p>';
				panel_show_re('user_account','个人信息',document_node);
				$('.panel').find('.btn:contains("确认")').text('修改');
			});
		};
		
		//余额充值
		function recharge(){
			$('.module_container:eq(1)').click(function(){
				$('.panel_body').html('<button class="btn" type="button">确认</button>');
				var document_node = '<div class="input-control has-icon-right"><input id="money" type="text" class="form-control" placeholder="请输入充值金额"></div><div class="input-control has-icon-right"><input id="password" type="password" class="form-control" placeholder="请输入密码"><label for="inputPasswordExample1" class="input-control-icon-right"><i class="iconfont icon-Notvisible"></i></label>';
				panel_show_re('recharge','余额充值',document_node);
				
				//确认按钮
				$('#recharge').find('button:contains("确认")').unbind().bind('click',function(){
					var rechargeMoney = $('#money').val();
					var userPassword = $('#password').val();
					var userName = userinfo[0].username;
					if(rechargeMoney==""){
						remake_alert('warning-sign','warning','请输入充值金额');
					}else if(Number(rechargeMoney)<100){
						remake_alert('warning-sign','warning','最低充值金额为100元');
					}else if(userPassword==""){
						remake_alert('warning-sign','warning','请输入密码');
					}else{
						rechargeMoney = Number(userinfo[0].balance)+Number($('#money').val());
						$.ajax({
							url:'../../back/recharge_money.php',
							type:'post',
							dataType:'json',
							data:{
								username:userName,
								userpassword:userPassword,
								rechargemoney:rechargeMoney
							},
							success:function(data){
								console.log(data);
								if(data.id==0){
									remake_alert('bell','success',data.msg);
									$('.panel').css({
										'display':'none',
									})
									.attr('id','');
									setTimeout(function(){
										window.location.href = 'personal_center.html?user_name='+user_name+'&id='+user_id;
									},1500);
								}else{
									remake_alert('times','danger',data.msg);
								}
							},
							erro:function(err){
								remake_alert('times','danger',err);
							}
						});
					};
				});
			});
		};
		
		//重置密码
		function change_password(){
			//显示编辑面板
			$('.module_container:eq(2)').click(function(){
				$('.panel_body').html('<button class="btn" type="button">确认</button>');
				var document_node =  '<div class="input-control has-icon-right"><input id="password" type="password" class="form-control" placeholder="请输入新密码"><label for="inputPasswordExample1" class="input-control-icon-right"><i class="iconfont icon-Notvisible"></i></label></div><div class="input-control has-icon-right"><input id="repassword" type="password" class="form-control" placeholder="再次输入密码"></div>';
				panel_show_re('change_password','重置密码',document_node);
				$('.panel').find('.btn:contains("确认")').text('重置');
				//确认按钮
				$('button:contains("重置")').unbind().bind('click',function(){
					var password =  $('#password').val();
					var repassword =  $('#repassword').val();
					if(password==""){
						remake_alert('warning-sign','warning','请输入新密码');
						empty();
					}else if(repassword==""){
						remake_alert('warning-sign','warning','请再次输入密码');
						empty();
					}else if(repassword!=password){
						remake_alert('warning-sign','warning','两次密码输入不一致');
						empty();
					}else{
						$.ajax({
							type:'post',
							dataType:'json',
							data:{
								userpassword:password
							},
							url:'../../back/change_password.php',
							success:function(data){
								console.log(data);
							},
							error:function(err){
								console.log(err);
							}
						});
					};
				});
			});
			
		};
		
		page_jump();
		notice_click();
		personal_information();
		recharge();
		change_password();	
	};
	
	
	// 通知信息滚动
	function rool_tlt(){
		var num = 0;
		var max = 85;
		var timer = setInterval(function() {
			if(num>=max){
				num=0;
			}else{
				num+=0.3;
			}
			
			$('.navbar_notice p a').css({
				'margin-left':num.toString()+"%",
			});
			
		}, 50);
	};
	
	
	loading_check();
	gain_userinfo(user_id);
	btn_clcik();
	rool_tlt();
});