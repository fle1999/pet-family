<?php
	header("Content-type:text/json;charset=uft-8");
	
	//数据库连接
	class mysql_handel{
		//数据库连接字段
		var $coon; 
		//测试数据表连接
		public function mysql_contact($sql,$coon_field){
			$coon = $coon_field;
			if($coon){
				$result = mysqli_query($coon,$sql);
				if($result){
					$data = array('id'=>0,'msg'=>'数据表查询成功');
				}else{
					$data = array('id'=>1,'msg'=>'数据表查询失败');
				}
			}else{
				$data = array('id'=>1,'msg'=>'数据库连接失败');
			}
			return $data;
		}
		//获取数据
		public function show_datas($sql,$coon_field){
			$coon = $coon_field;
			if($coon){
				$result = mysqli_query($coon,$sql);
				if($result){
					$datas = [];
					while($row = mysqli_fetch_assoc($result)){
						$datas[] = $row;
					}
				}
				$data = $datas;
			}else{
				$data = array('id'=>1,'msg'=>'数据库连接失败');
			}
			return $data;
		}
		//添加数据
		// public function add_datas($sql,$coon_field){
		// 	$coon = $coon_field;
		// 	if($coon){
		// 		$result = mysqli_query($coon,$sql);
		// 		if($result){
		// 			$data = array('id'=>0,'msg'=>'数据插入成功');
		// 		}
		// 	}else{
		// 		$data = array('id'=>1,'msg'=>'数据库连接失败');
		// 	}
		// 	return $data;
		// }
		
		
		//替换数据
	}
?>