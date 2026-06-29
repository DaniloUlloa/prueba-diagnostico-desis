$(document).ready(function() {
    abroestructura("'select-sucursal'",0)
});
function abroestructura(seccion,id){
    var bodega = $("#bodega").val();

    var division = $("#select-sucursal");
	var variables = "modo=select-sucursal&bodega="+bodega;
	AJAXPOST("ajax.php",variables,division);
}
function validaCampos(){
    var codigo = $("#codigo").val();
    var nombre = $("#nombre").val();
    var precio = $("#precio").val();
    var bodega = $("#bodega").val();
    var sucursal = $("#sucursal").val();
    var moneda = $("#moneda").val();
    var descripcion = $("#descripcion").val();

    var materiales = [];

    $('input[name="material"]:checked').each(function(){
        materiales.push($(this).val());
    });


    //1° VALIDAMOS EL CAMPO CODIGO
    if(codigo==""){
        //CAMPO VACÍO
        alert("El código del producto no puede estar en blanco.");
        $("#codigo").focus();
        return;
    }else{
        //VALIDAMOS QUE NO EXISTA
        $.ajax({
            type: "post",
            url: "ajax.php",
            data: "modo=consulto-codigo&codigo="+codigo,
            success:
            function(respuesta){
                
                if(respuesta==1){
                    alert("El código del producto ya está registrado.");
                    $("#codigo").focus();
                    return;
                }else{
                     //NO CUMPLE FORMATO
                    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/.test(codigo)) {
                        alert("El código del producto debe contener letras y números");
                        $("#codigo").focus();
                        return;
                    }

                    //NO CUMPLE EL LARGO
                    if (codigo.length < 5 || codigo.length > 15) {
                        alert("El código del producto debe tener entre 5 y 15 caracteres.");
                        $("#codigo").focus();
                        return;
                    }

                    //2° VALIDAMOS EL CAMPO NOMBRE
                    if(nombre==""){
                        //CAMPO VACÍO
                        alert("El nombre del producto no puede estar en blanco.");
                        $("#nombre").focus();
                        return;
                    }else{
                        //NO CUMPLE EL LARGO
                        if (nombre.length < 2 || nombre.length > 50){
                            alert("El nombre del producto debe tener entre 2 y 50 caracteres.");
                            $("#nombre").focus();
                            return ;
                        } 
                    }

                    //3° VALIDAMOS EL PRECIO
                    if(precio==""){
                        //CAMPO VACÍO
                        alert("El precio del producto no puede estar en blanco.");
                        $("#precio").focus();
                        return;
                    }else{
                        // NÚMERO POSITIVO CON HASTA DOS DECIMALES
                        var regexPrecio = /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/;

                        if (!regexPrecio.test(precio)) {
                            alert("El precio del producto debe ser un número positivo con hasta dos decimales.");
                            $("#precio").focus();
                            return;
                        }
                    
                    }

                    // 4° VALIDAMOS LOS MATERIALES
                    var cantidadMateriales = $('input[name="material"]:checked').length;

                    if (cantidadMateriales < 2) {
                        // MENOS DE DOS MATERIALES SELECCIONADOS
                        alert("Debe seleccionar al menos dos materiales para el producto.");
                        return;
                    }

                    // 5° VALIDAMOS BODEGAS
                    if(bodega==""){
                        //CAMPO VACÍO
                        alert("Debe seleccionar una bodega.");
                        $("#bodega").focus();
                        return;

                    }

                    // 6° VALIDAMOS SUCURSAL
                    if(sucursal==""){
                        //CAMPO VACÍO
                        alert("Debe seleccionar una sucursal para la bodega seleccionada.");
                        $("#sucursal").focus();
                        return;

                    }

                    // 7° VALIDAMOS MONEDA
                    if(moneda==""){
                        //CAMPO VACÍO
                        alert("Debe seleccionar una moneda para el producto.");
                        $("#moneda").focus();
                        return;
                    }

                    // 8° VALIDAMOS DESCRIPCIÓN
                    if (descripcion.trim() == "") {
                        // CAMPO VACÍO
                        alert("La descripción del producto no puede estar en blanco.");
                        $("#descripcion").focus();
                        return;
                    } else {
                        // VALIDAMOS LA LONGITUD
                        if (descripcion.length < 10 || descripcion.length > 1000) {
                            alert("La descripción del producto debe tener entre 10 y 1000 caracteres.");
                            $("#descripcion").focus();
                            return;
                        }
                    }

                    
                    //AHORA QUE VALAMOS TODO INSERTAMOS
                    $.ajax({
                        type: "post",
                        url: "ajax.php",
                        data: "modo=ingreso-producto"
                            + "&codigo=" + encodeURIComponent(codigo)
                            + "&nombre=" + encodeURIComponent(nombre)
                            + "&precio=" + encodeURIComponent(precio)
                            + "&bodega=" + bodega
                            + "&sucursal=" + sucursal
                            + "&moneda=" + moneda
                            + "&descripcion=" + encodeURIComponent(descripcion)
                            + "&materiales=" + materiales.join(","),
                        success: function(respuesta){
                            //alert(respuesta);
                            if(respuesta=="ok"){
                                /*ESTE MENSAJE DE ALERTA FUE SOLICITADO EN EL DOCUMENTO. SIN EMBARGO, CONSIDERO QUE UNA REDACCIÓN MÁS CLARA PODRÍA MEJORAR LA EXPERIENCIA Y LA USABILIDAD PARA EL USUARIO.*/
                                //alert("Éxito");
                                alert("Producto registrado correctamente.");
                                $("#formulario-producto")[0].reset();
                                $("#codigo").focus();
                            }else{
                                //alert("Error");
                                 alert("Ocurrió un error al registrar el producto.");
                            }
                        }
                    });
                }
            }
        });  
    }
}