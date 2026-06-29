-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-06-2026 a las 08:07:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: desis
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla bodegas
--

CREATE TABLE bodegas (
  id bigint(11) NOT NULL,
  nombre varchar(255) NOT NULL,
  estado int(1) NOT NULL COMMENT '0=INACTIVO 1=ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla bodegas
--

INSERT INTO bodegas (id, nombre, estado) VALUES
(1, 'Bodega 1', 1),
(2, 'Bodega 2', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla monedas
--

CREATE TABLE monedas (
  id bigint(11) NOT NULL,
  nombre varchar(255) NOT NULL,
  estado int(1) NOT NULL COMMENT '0=INACTIVO 1=ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla monedas
--

INSERT INTO monedas (id, nombre, estado) VALUES
(1, 'PESO', 1),
(2, 'DÓLAR', 1),
(3, 'EURO', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla productos
--

CREATE TABLE productos (
  id bigint(11) NOT NULL,
  codigo varchar(255) DEFAULT NULL,
  nombre varchar(255) DEFAULT NULL,
  bodega_id bigint(11) DEFAULT NULL,
  sucursal_id bigint(11) DEFAULT NULL,
  moneda_id bigint(11) DEFAULT NULL,
  precio int(11) DEFAULT NULL,
  material longtext DEFAULT NULL,
  descripcion longtext DEFAULT NULL,
  estado int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla productos
--

INSERT INTO productos (id, codigo, nombre, bodega_id, sucursal_id, moneda_id, precio, material, descripcion, estado) VALUES
(1, 'fghfg4', 'ghfgh', 1, 1, 3, 546456, 'Plástico,Metal', 'fghfghfghfghfghf', 1),
(2, 'HEKC92', 'Set Comedor', 1, 1, 2, 18000, 'Plástico,Textil', 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.', 1),
(3, 'jj3453d', 'dfgdfg', 1, 1, 2, 4444, 'Plástico,Metal', 'asdfafsdaf', 1),
(4, 'GTE454GF', 'FDGDFG', 2, 3, 1, 9765, 'Plástico,Metal,Madera,Vidrio,Textil', 'tEXTO DE PRUEBKGDSFGDSFG', 1),
(5, 'hwkc92', 'Hola', 1, 1, 3, 4447, 'Metal,Madera', 'tdhfhfdhhdfgdfgdfg', 1),
(6, 'grtet445r', 'fdgdfg', 2, 5, 1, 435345345, 'Plástico,Metal', 'dfgdsfgsfgsgsdfgsdfgsdfgsdfg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla sucursales
--

CREATE TABLE sucursales (
  id bigint(11) NOT NULL,
  bodegas_id bigint(11) NOT NULL,
  nombre varchar(255) NOT NULL,
  estado int(1) NOT NULL COMMENT '0=INACTIVO 1=ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla sucursales
--

INSERT INTO sucursales (id, bodegas_id, nombre, estado) VALUES
(1, 1, 'Sucursal 1', 1),
(2, 1, 'Sucursal 2', 1),
(3, 2, 'Sucursal 3', 1),
(4, 2, 'Sucursal 4', 1),
(5, 2, 'Sucursal 5', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla bodegas
--
ALTER TABLE bodegas
  ADD PRIMARY KEY (id);

--
-- Indices de la tabla monedas
--
ALTER TABLE monedas
  ADD PRIMARY KEY (id);

--
-- Indices de la tabla productos
--
ALTER TABLE productos
  ADD PRIMARY KEY (id),
  ADD KEY fk_productos_bodega (bodega_id),
  ADD KEY fk_productos_sucursal (sucursal_id),
  ADD KEY fk_productos_moneda (moneda_id);

--
-- Indices de la tabla sucursales
--
ALTER TABLE sucursales
  ADD PRIMARY KEY (id),
  ADD KEY fk_sucursales_bodegas (bodegas_id);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla bodegas
--
ALTER TABLE bodegas
  MODIFY id bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla monedas
--
ALTER TABLE monedas
  MODIFY id bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla productos
--
ALTER TABLE productos
  MODIFY id bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla sucursales
--
ALTER TABLE sucursales
  MODIFY id bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla productos
--
ALTER TABLE productos
  ADD CONSTRAINT fk_productos_bodega FOREIGN KEY (bodega_id) REFERENCES bodegas (id),
  ADD CONSTRAINT fk_productos_moneda FOREIGN KEY (moneda_id) REFERENCES monedas (id),
  ADD CONSTRAINT fk_productos_sucursal FOREIGN KEY (sucursal_id) REFERENCES sucursales (id);

--
-- Filtros para la tabla sucursales
--
ALTER TABLE sucursales
  ADD CONSTRAINT fk_sucursales_bodegas FOREIGN KEY (bodegas_id) REFERENCES bodegas (id) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
