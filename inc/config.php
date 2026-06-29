<?php
// SELECCIONAR MOTOR DE BASE DE DATOS: "mysql" o "pgsql"
$conf["DBTYPE"] = "pgsql";

// Configuración MySQL
$conf["mysql"]["HOST"] = "localhost";
$conf["mysql"]["USER"] = "root";
$conf["mysql"]["PWD"]  = "";
$conf["mysql"]["NAME"] = "desis";
$conf["mysql"]["PORT"] = "3306";

// Configuración PostgreSQL
$conf["pgsql"]["HOST"] = "localhost";
$conf["pgsql"]["USER"] = "postgres";
$conf["pgsql"]["PWD"]  = "1234";
$conf["pgsql"]["NAME"] = "desis";
$conf["pgsql"]["PORT"] = "5432";


// CONEXIÓN AUTOMÁTICA SEGÚN EL MOTOR ELEGIDO
$type = $conf["DBTYPE"];
$h    = $conf[$type]["HOST"];
$u    = $conf[$type]["USER"];
$p    = $conf[$type]["PWD"];
$db   = $conf[$type]["NAME"];
$port = $conf[$type]["PORT"];

try {
    if ($type === "pgsql") {
        $dsn = "pgsql:host=$h;port=$port;dbname=$db";
    } else {
        $dsn = "mysql:host=$h;port=$port;dbname=$db;charset=utf8";
    }
    $pdo = new PDO($dsn, $u, $p);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión [$type]: " . $e->getMessage());
}

$url_sitio = "http://localhost/desis/";

// FUNCIONES DE DANILO ULLOA

// Ejecuta un SELECT y retorna un arreglo de filas asociativas
function Datos($Tabla, $Condicion, $Campos) {
    global $pdo;
    $stmt = $pdo->query("SELECT $Campos FROM $Tabla WHERE $Condicion");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Ejecuta una sentencia SQL de escritura (INSERT, UPDATE, DELETE)
function Ejecutar($sql) {
    global $pdo;
    return $pdo->exec($sql);
}

//FUNCION PARA REVISAR ARREGLOS
function _p($datos) {
    ?><pre><?php print_r($datos); ?></pre><?php
}
