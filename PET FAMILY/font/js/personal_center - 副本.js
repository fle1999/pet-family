$(function(){
	//变量存储
	userinfo = [];
	
	window.userinfo2 = [];
	//封装
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
	
	
	//事件
	//登陆检测
	function loading_check(){
		$.ajax({
			url:'../../back/loading_check.php',
			type:'post',
			dataType:'json',
			data:{},
			success:function(data){
				if(data.id==0){
					userinfo[0] = data.datas[0];
					console.log(userinfo[0]);
					remake_alert('bell','success','欢迎登陆 '+data.datas[0].username);
					$('.mdui-tab p').text('Hi '+data.datas[0].username+' 欢迎登陆');
					return data.datas[0];
				}else if(data.id==1){
					remake_alert('times','danger','未登陆');
					$('.mdui-tab p').text('未登陆');
					setTimeout(function(){
						window.location.href="../../index.html";
					},3000);
				};
			},
			erro:function(err){
				console.log(err);
			}
		});
	};
	
	//用户查询
	function gain_userinfo(id){
		var userid = id;
		$.ajax({
				type:'post',
				datatType:'json',
				data:{
					user_id : userid
				},
				url:"../../back/gain_userinfo.php",
				success:function(data){
					userinfo2[0] = data.info[0];
				},
				error:function(err){
					console.log(err);
				}
		});
	};
	
	
	// 点击事件集合
	function btn_clcik(){
		//通知栏
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
				gain_userinfo(userinfo[0].id);
				gain_userinfo(userinfo[0].id);
				$('.panel_body').html('<button class="btn" type="button">确认</button>');
				if(userinfo2[0].classifyid==1){
					var userclass = '普通用户';
				}else if(userinfo2[0].classifyid==2){
					var userclass = '管理员';
				}else if(userinfo2[0].classifyid==3){
					var userclass = '超级管理员';
				}else{
					var userclass = 'undefind';
				}
				var document_node = '<p>用户名：'+userinfo2[0].username+'</p><p>联系方式：'+userinfo2[0].telephone+'</p><p>余额：'+userinfo2[0].balance+'元</p><p>用户等级：'+userclass+'</p>';
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
				$('button:contains("确认")').on('click',function(){
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
								}else{
									remake_alert('times','danger',data.msg);
								}
							},
							erro:function(err){
								remake_alert('times','danger',err);
							}
						});
					}
				})
			});
		};
		
		//重置密码
		function change_password(){
			//显示编辑面板
			$('.module_container:eq(2)').click(function(){
				$('.panel_body').html('<button class="btn" type="button">确认</button>');
				var document_node =  '<div class="input-control has-icon-right"><input id="password" type="password" class="form-control" placeholder="请输入新密码"><label for="inputPasswordExample1" class="input-control-icon-right"><i class="iconfont icon-Notvisible"></i></label></div><div class="input-control has-icon-right"><input id="repassword" type="password" class="form-control" placeholder="再次输入密码"></div>';
				panel_show_re('change_password','重置密码',document_node);
			});
			//确认按钮
		};
		
		notice_click();
		personal_information();
		recharge();
		change_password();
	};
	
	//鼠标划过事件
	function hover(){
		// 个人中心模块鼠标划过
		function module_hover(){
			$('.module_container').mouseenter(function(){
				$(this).find('img').css({
					'width':'50%',
					'height':'50%',
					'transition':'0.2s',
				})
				.next(':first').children().each(function(){
					$(this).css({
						'color':'#2c80ff',
					});
				});
			});
			
			
			$('.module_container').mouseleave(function(){
				$(this).find('img').css({
					'width':'56px',
					'height':'56px',
				})
				.next(':first').children(':first').css({
					'color':'#333',
				})
				.next().css({
					'color':'#777',
				});
			});
		};
		
		module_hover();
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
	
	
	//总线
	loading_check()
	btn_clcik();
	rool_tlt();
	hover();
});