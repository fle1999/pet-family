<?php
	header("Content-type:text/json;charest=uft-8");
	session_start();
	$username = $_POST['username'];
	$userpassword = $_POST['userpassword'];
	$rechargemoney = $_POST['rechargemoney'];
	
	$coon = mysqli_connect('150.158.155.157','root','123','prt_family');
	if($coon){
		$sql = "SELECT * FROM userinfo WHERE username='{$username}' AND userpassword='{$userpassword}'";
		$result = mysqli_query($coon,$sql);
		if($result){
			$datas= [];
			while($row = mysqli_fetch_assoc($result)){
				$datas[] = $row;
			}
			if(count($datas)>0){
				$sql2 = "update userinfo set balance='".$rechargemoney."' where username='".$username."'";
				mysqli_query($coon,$sql2);
				// $_SESSION['userinfo']['balance']=$rechargemoney;
				// session_destroy();
				// $_SESSION['userinfo']=$datas;
				$data = array('id'=>0,'msg'=>'充值成功');
				echo json_encode($data);
			}else{
				$data = array('id'=>1,'msg'=>'账号或密码输入错误');
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