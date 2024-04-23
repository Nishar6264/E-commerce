-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 23, 2024 at 01:31 PM
-- Server version: 8.2.0
-- PHP Version: 8.1.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUser` int DEFAULT NULL,
  `idProduct` int DEFAULT NULL,
  `nameProduct` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `priceProduct` decimal(10,2) DEFAULT NULL,
  `count` int DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idProduct` (`idProduct`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `idUser`, `idProduct`, `nameProduct`, `priceProduct`, `count`, `img`, `createdAt`, `updatedAt`) VALUES
(1, 6, 6, 'Tree Oil 30ml', 12.00, 1, 'https://cdn.dummyjson.com/product-images/17/thumbnail.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 5, 2, 'Samsung Galaxy Book', 1499.00, 1, 'https://cdn.dummyjson.com/product-images/7/1.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 6, 2, 'Samsung Galaxy Book', 1499.00, 1, 'https://cdn.dummyjson.com/product-images/7/1.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 6, 1, 'Samsung Universe 9', 1249.00, 1, ' https://cdn.dummyjson.com/product-images/3/1.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 6, 3, 'Microsoft Surface Laptop 4', 1499.00, 2, 'https://cdn.dummyjson.com/product-images/8/1.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 6, 6, 'Tree Oil 30ml', 12.00, 1, 'https://cdn.dummyjson.com/product-images/17/thumbnail.jpg', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 6, 6, 'Tree Oil 30ml', 12.00, 2, 'https://cdn.dummyjson.com/product-images/17/thumbnail.jpg', '2024-04-23 12:48:19', '2024-04-23 12:48:19'),
(8, 6, 4, 'perfume Oil', 13.00, 1, 'https://cdn.dummyjson.com/product-images/11/1.jpg', '2024-04-23 12:48:20', '2024-04-23 12:48:20'),
(9, 6, 4, 'perfume Oil', 13.00, 1, 'https://cdn.dummyjson.com/product-images/11/1.jpg', '2024-04-23 13:07:16', '2024-04-23 13:07:16'),
(10, 6, 5, 'Brown Perfume', 13.00, 1, 'https://cdn.dummyjson.com/product-images/12/1.jpg', '2024-04-23 13:07:16', '2024-04-23 13:07:16'),
(11, 6, 4, 'perfume Oil', 13.00, 1, 'https://cdn.dummyjson.com/product-images/11/1.jpg', '2024-04-23 13:11:34', '2024-04-23 13:11:34'),
(12, 6, 5, 'Brown Perfume', 13.00, 1, 'https://cdn.dummyjson.com/product-images/12/1.jpg', '2024-04-23 13:11:34', '2024-04-23 13:11:34'),
(13, 6, 4, 'perfume Oil', 13.00, 1, 'https://cdn.dummyjson.com/product-images/11/1.jpg', '2024-04-23 13:12:51', '2024-04-23 13:12:51'),
(14, 6, 5, 'Brown Perfume', 13.00, 1, 'https://cdn.dummyjson.com/product-images/12/1.jpg', '2024-04-23 13:12:51', '2024-04-23 13:12:51'),
(15, 6, 4, 'perfume Oil', 13.00, 1, 'https://cdn.dummyjson.com/product-images/11/1.jpg', '2024-04-23 13:15:09', '2024-04-23 13:15:09'),
(16, 6, 5, 'Brown Perfume', 13.00, 1, 'https://cdn.dummyjson.com/product-images/12/1.jpg', '2024-04-23 13:15:09', '2024-04-23 13:15:09');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUser` int DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cart` int DEFAULT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `productName` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `total` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint DEFAULT '0',
  `delivery` tinyint DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `cart` (`cart`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `idUser`, `phone`, `address`, `cart`, `fullname`, `productName`, `total`, `status`, `delivery`, `createdAt`, `updatedAt`) VALUES
(1, 6, '9973775325', 'Ahmedabad Gujarat', NULL, 'Nishar Alam', '', '2748', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 6, '9973775325', 'Ahmedabad Gujarat', NULL, 'Nishar Alam', '', '2748', 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 6, '9973775325', 'Ahmedabad Gujarat', NULL, 'Nishar Alam', '', '2998', 0, 0, '2024-04-23 12:02:13', '2024-04-23 12:02:13'),
(4, 6, '9973775325', 'Ahmedabad Gujarat', NULL, 'Nishar Alam', '', '12', 0, 0, '2024-04-23 12:06:10', '2024-04-23 12:06:10'),
(5, 6, '9973775325', 'Ahmedabad Gujarat', NULL, 'Nishar Alam', '', '37', 0, 0, '2024-04-23 12:48:19', '2024-04-23 12:48:19'),
(6, 6, '9973775325', 'Ahmedabad Gujarat', NULL, 'Nishar Alam', '', '37', 0, 0, '2024-04-23 12:48:20', '2024-04-23 12:48:20'),
(7, 6, '9973775325', 'Ahmedabad Gujarat', NULL, 'Nishar Alam', '', '26', 0, 0, '2024-04-23 13:07:16', '2024-04-23 13:07:16'),
(8, 6, '9973775325', 'Ahmedabad Gujarat', NULL, 'Nishar Alam', '', '26', 0, 0, '2024-04-23 13:07:16', '2024-04-23 13:07:16'),
(9, 6, '9973775325', 'Ahmedabad Gujarat', NULL, 'Nishar Alam', '', '26', 0, 0, '2024-04-23 13:11:34', '2024-04-23 13:11:34'),
(10, 6, '9973775325', 'Ahmedabad Gujarat', NULL, 'Nishar Alam', '', '26', 0, 0, '2024-04-23 13:11:34', '2024-04-23 13:11:34'),
(11, 6, '9973775325', 'Ahmedabad Gujarat', NULL, 'Nishar Alam', '', '26', 0, 0, '2024-04-23 13:12:51', '2024-04-23 13:12:51'),
(12, 6, '9973775325', 'Ahmedabad Gujarat', NULL, 'Nishar Alam', '', '26', 0, 0, '2024-04-23 13:12:51', '2024-04-23 13:12:51'),
(13, 6, '9973775325', 'Ahmedabad Gujarat', NULL, 'Nishar Alam', '', '26', 0, 0, '2024-04-23 13:15:09', '2024-04-23 13:15:09'),
(14, 6, '9973775325', 'Ahmedabad Gujarat', NULL, 'Nishar Alam', '', '26', 0, 0, '2024-04-23 13:15:09', '2024-04-23 13:15:09');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `price` int DEFAULT NULL,
  `img1` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `img2` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `img3` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `img4` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `stocks` int NOT NULL,
  `originalPrice` int DEFAULT NULL,
  `promotionPercent` int DEFAULT NULL,
  `createdAt` int NOT NULL,
  `updatedAt` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `img1`, `img2`, `img3`, `img4`, `category`, `stocks`, `originalPrice`, `promotionPercent`, `createdAt`, `updatedAt`) VALUES
(1, 'Samsung Universe 9', 'Samsung\'s new variant which goes beyond Galaxy to the Universe', 1249, ' https://cdn.dummyjson.com/product-images/3/1.jpg', 'https://cdn.dummyjson.com/product-images/3/1.jpg', 'https://cdn.dummyjson.com/product-images/3/1.jpg', 'https://cdn.dummyjson.com/product-images/3/1.jpg', 'smartphones', 36, 1062, 15, 2024, 2024),
(2, 'Samsung Galaxy Book', 'Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched', 1499, 'https://cdn.dummyjson.com/product-images/7/1.jpg', 'https://cdn.dummyjson.com/product-images/7/2.jpg', 'https://cdn.dummyjson.com/product-images/7/3.jpg', 'https://cdn.dummyjson.com/product-images/7/thumbnail.jpg', 'laptops', 50, 1249, 15, 2024, 2024),
(3, 'Microsoft Surface Laptop 4', 'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.', 1499, 'https://cdn.dummyjson.com/product-images/8/1.jpg', 'https://cdn.dummyjson.com/product-images/8/3.jpg', 'https://cdn.dummyjson.com/product-images/8/4.jpg', 'https://cdn.dummyjson.com/product-images/8/2.jpg', 'laptops', 68, 1249, 15, 2024, 2024),
(4, 'perfume Oil', 'Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil', 13, 'https://cdn.dummyjson.com/product-images/11/1.jpg', 'https://cdn.dummyjson.com/product-images/11/2.jpg', 'https://cdn.dummyjson.com/product-images/11/3.jpg', 'https://cdn.dummyjson.com/product-images/11/thumbnail.jpg', 'fragrances', 65, 10, 8, 2024, 2024),
(5, 'Brown Perfume', 'Royal_Mirage Sport Brown Perfume for Men & Women - 120ml', 13, 'https://cdn.dummyjson.com/product-images/12/1.jpg', 'https://cdn.dummyjson.com/product-images/12/2.jpg', 'https://cdn.dummyjson.com/product-images/12/3.png', 'https://cdn.dummyjson.com/product-images/12/4.jpg', 'fragrances', 65, 10, 8, 2024, 2024),
(6, 'Tree Oil 30ml', 'Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,', 12, 'https://cdn.dummyjson.com/product-images/17/thumbnail.jpg', 'https://cdn.dummyjson.com/product-images/17/1.jpg', 'https://cdn.dummyjson.com/product-images/17/2.jpg', 'https://cdn.dummyjson.com/product-images/17/3.jpg', 'skincare', 67, 9, 8, 2024, 2024);

-- --------------------------------------------------------

--
-- Table structure for table `productvariant`
--

DROP TABLE IF EXISTS `productvariant`;
CREATE TABLE IF NOT EXISTS `productvariant` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `color` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `productID` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `productID` (`productID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `phone`, `admin`, `createdAt`, `updatedAt`) VALUES
(5, 'Nishar Alam', 'mralamnishar@gmail.com', '$2a$10$An/VBt/tzdLkW38y5BPH5OUOnf1yQ8gdysP/BpZjkwsrFySpazw0W', '9973775325', 0, '2024-04-22 03:34:50', '2024-04-22 03:34:50'),
(6, 'Nishar Alam', 'admin@gmail.com', '$2a$10$bdk6hmp0k6MPpclpsZcnbukAK5NsR7WIngQoL5DqAJpBIDId4AlZe', '9973775325', 1, '2024-04-23 04:35:52', '2024-04-23 04:35:52');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`cart`) REFERENCES `carts` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
