<?php
	header("Content-type:text/json;charset=uft-8");
	session_start();
	session_destroy();

	$data = array('id'=>0,'msg'=>'注销成功');
	echo json_encode($data);
?>