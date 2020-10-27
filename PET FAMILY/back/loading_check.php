<?php
	header("Content-type:text/json;charset=uft-8");
	
	session_start();
	
	if(isset($_SESSION['userinfo'])){
		$data = array("id"=>0,"datas"=>$_SESSION['userinfo']);
		echo json_encode($data);
	}else{
		$data = array("id"=>1,"location"=>"index.html");
		echo json_encode($data);
	}
?>