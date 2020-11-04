<?php
	header("Content-type:text/json;charset=uft-8");
	include("model/Sql_tools.php");
	
	$coon = mysqli_connect('150.158.155.157','root','123','prt_family');
	$mysql_obj = new mysql_handel;
	$result = $mysql_obj->mysql_contact("SELECT * FROM postinfo",$coon);
	
	if($result['id']==0){//数据表查询成功
		//获取数据
		$result = $mysql_obj->show_datas("SELECT * FROM postinfo",$coon);
		$data=array('info'=>$result);
		//输出数据
		echo json_encode($data);
	}else{//数据表查询失败
		echo $result['msg'];
	}
?>