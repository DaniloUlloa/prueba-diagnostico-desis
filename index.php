<?php
//INCLUIMOS EL HEAD DEL FORMULARIO
include("inc/head.php");
?>
<body>
    <div class="contenedor">
        <h1>Formulario de Producto</h1>

        <form id="formulario-producto">
            <div class="fila">
                <div class="campo">
                    <label for="codigo">Código</label>
                    <input type="text" id="codigo" name="codigo">
                </div>
                <div class="campo">
                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre">
                </div>
            </div>

            <div class="fila">
                <div class="campo">
                    <label for="bodega">Bodega</label>
                    <select id="bodega" name="bodega" onchange="javascript:abroestructura('select-sucursal',this.options[this.selectedIndex].value);">
                        <option value="" selected>  </option>
                        <?php
                        $res = Datos("bodegas","estado = 1 order by nombre asc","*");
                        foreach($res as $row){
                            echo '<option value="'.$row["id"].'">'.$row["nombre"].'</option>';
                        }
                        ?>
                    </select>
                </div>
                <div class="campo">
                    <label for="sucursal">Sucursal</label>
                   <div id="select-sucursal"></div>
                </div>
            </div>

            <div class="fila">
                <div class="campo">
                    <label for="moneda">Moneda</label>
                    <select id="moneda" name="moneda">
                        <option value="" selected>  </option>
                        <?php
                        $res = Datos("monedas","estado = 1 order by nombre asc","*");
                        foreach($res as $row){
                            echo '<option value="'.$row["id"].'">'.$row["nombre"].'</option>';
                        }
                        ?>
                    </select>
                </div>
                <div class="campo">
                    <label for="precio">Precio</label>
                    <input type="number" id="precio" name="precio">
                </div>
            </div>

            <div class="campo-completo">
                <span class="titulo-grupo">Material del Producto</span>
                <div class="materiales">
                    <label class="material-item">
                        <input type="checkbox" name="material" value="Plástico"> Plástico
                    </label>
                    <label class="material-item">
                        <input type="checkbox" name="material" value="Metal"> Metal
                    </label>
                    <label class="material-item">
                        <input type="checkbox" name="material" value="Madera"> Madera
                    </label>
                    <label class="material-item">
                        <input type="checkbox" name="material" value="Vidrio"> Vidrio
                    </label>
                    <label class="material-item">
                        <input type="checkbox" name="material" value="Textil"> Textil
                    </label>
                </div>
            </div>

            <div class="campo-completo">
                <label for="descripcion">Descripción</label>
                <textarea id="descripcion" name="descripcion"></textarea>
            </div>

            <button type="button" class="boton-guardar" onclick="javascript:validaCampos();">Guardar Producto</button>
        </form>
    </div>
</body>
<?php include("inc/footer.php");
  
