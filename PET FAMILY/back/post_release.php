<?php
	header("Content-type:text/json;charset=uft-8");
	
	$title = $_POST['title'];
	$content = $_POST['content'];
	$type = $_POST['type'];
	$author = $_POST['author'];
	
	$conn = mysqli_connect('150.158.155.157','root','123','prt_family');
	 
	 if($conn){
		 //插入数据
		 $sql1 = "INSERT INTO postinfo values(null,'{$title}','{$content}',0,0,0,'{$type}','{$author}')";
		 $result = mysqli_query($conn,$sql1);
		 if($result){
			 $data = array('id'=>0,'msg'=>'发帖成功');
		 }else{
			 $data = array('id'=>1,'msg'=>'数据表查询失败');
		 }
	 }else{
		 $data = array('id'=>1,'msg'=>'数据库连接失败');
	 }
	 
	 echo json_encode($data);
?>