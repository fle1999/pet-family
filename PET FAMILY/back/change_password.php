<?php
	header("Content-type:text/json;charset=uft-8");
	
	$coon = mysqli_connect('150.158.155.157','root','123','prt_family');
	if($coon){
		$sql1 = "SECTEL"
		// $data = array('id'=>0,'msg'=>'ok');
	}else{
		$data = array('id'=>1,'msg'=>'数据库连接失败');
	}
	echo json_encode($data);
?>