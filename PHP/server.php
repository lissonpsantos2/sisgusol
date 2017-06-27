<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = 'localhost:3306';
$username = 'root';
$password = '';
$dbname = 'sisgusol';

//CONEXÃO
$conn = new mysqli($servername, $username, $password, $dbname) or die ("Falha na conexão" . $conn->connect_error);


//PESQUISA E RETORNO
$result = $conn->query("SELECT `DATE_TIME`, `NODE_ID`, `M_SENSOR30`, `M_SENSOR60` FROM `t_measurement` ORDER BY `NODE_ID`,`DATE_TIME`");
$outp = array();
while($row = mysqli_fetch_assoc($result)) {
	$outp[] = $row;
}

//ENCERRAMENTO E RETORNO
$conn->close();
echo(json_encode($outp));
?>