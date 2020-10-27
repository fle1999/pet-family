<?php
	header("Content-type:text/json;charest=uft-8");
	
	session_start();
	
	$code = $_SESSION['code'];
	$username = $_POST['username'];
	$userpassword = $_POST['userpassword'];
	$usercode = $_POST['usercode'];
	
	$coon = mysqli_connect('150.158.155.157','root','123','prt_family');
	if($coon){
		$sql = "SELECT * FROM userinfo WHERE username='{$username}' AND userpassword='{$userpassword}'";
		$result = mysqli_query($coon,$sql);
		if($result){
			if(strtolower($code)==strtolower($usercode)){
				$datas= [];
				while($row = mysqli_fetch_assoc($result)){
					$datas[] = $row;
				}
				if(count($datas)>0){
					$data = array('id'=>0,'msg'=>'登陆成功！');
					echo json_encode($data);
					$_SESSION['userinfo']=$datas;
				}else{
					$data = array('id'=>1,'msg'=>'账号或密码输入错误');
					echo json_encode($data);
				}
			}else{
				$data = array('id'=>1,'msg'=>'验证码错误');
				echo json_encode($data);
			}
		}else{
			$data = array('id'=>1,'msg'=>'数据表连接失败');
			echo json_encode($data);
		}
	}else{
		$data = array('id'=>1,'msg'=>'数据库连接失败');
		echo json_encode($data);
	}
?>