<?php

include("inc/config.php");
$modo = $_POST["modo"];
switch ($modo) {
    case 'select-sucursal':
        $id_bodega = $_POST["bodega"];
        $contenido = '<select id="sucursal" name="sucursal">';
        $contenido .= '<option value=""> </option>';
        if($id_bodega !== ""){
            $res = Datos("sucursales","bodegas_id = '".$id_bodega."' and estado = 1 order by nombre asc","*");
            foreach($res as $row){
                $contenido .= '<option value="'.$row["id"].'">'.$row["nombre"].'</option>';
            }
        }
        $contenido .= '</select>';
        echo $contenido;
    break;
    case 'consulto-codigo':
        //CONSULTO EL CODIGO EN LA BD
        $codigo = trim($_REQUEST["codigo"]);
        $res = Datos("productos","codigo LIKE '".$codigo."' and estado = 1","*");
        $num = count($res);
        echo $num;
    break;
    case "ingreso-producto":

        $codigo      = $_POST["codigo"];
        $nombre      = $_POST["nombre"];
        $precio_raw  = trim($_POST["precio"]);
        $precio      = ($precio_raw !== '') ? floatval(str_replace(',', '.', $precio_raw)) : 0;
        $bodega      = $_POST["bodega"];
        $sucursal    = $_POST["sucursal"];
        $moneda      = $_POST["moneda"];
        $descripcion = $_POST["descripcion"];
        $materiales  = $_POST["materiales"];

        $sql = "INSERT INTO productos
                (codigo, nombre,  bodega_id , sucursal_id , moneda_id ,precio, descripcion, material, estado)
                VALUES
                ('$codigo', '$nombre', '$bodega', '$sucursal', '$moneda', '$precio', '$descripcion', '$materiales','1')";

        if(Ejecutar($sql) !== false){
            echo "ok";
        }else{
            echo "error";
        }

    break;
    
}
?>
