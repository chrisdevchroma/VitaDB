<?php
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$id = $request->hid;
	$id2 = addslashes($request->hid);
	if ($id != $id2) die("Invalid id");
	include 'config.php';

	// Create connection
	$con = mysqli_connect($servername, $username, $password, $dbname);
	
	// Check connection
	if (mysqli_connect_errno()){
		die("Connection failed: " . mysqli_connect_error());
	} 
	
	$sth = mysqli_query($con,"SELECT * FROM vitadb WHERE id = '$id'");
	if ($sth){
		$rows = array();
		while($r = mysqli_fetch_assoc($sth)) {
			$rows[] = $r;
		}
		echo json_encode($rows, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
	} else {
		echo("An error occurred: " . mysqli_error($con));
	}
	mysqli_close($con);
?>