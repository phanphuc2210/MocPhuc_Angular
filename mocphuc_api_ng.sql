-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2023 at 12:31 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mocphuc_api_ng`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `userId`, `productId`) VALUES
(37, 4, 3),
(38, 4, 3),
(39, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `date` date NOT NULL,
  `address` varchar(200) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `payment_method` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `userId`, `date`, `address`, `phone`, `payment_method`) VALUES
(11, 4, '2023-01-20', '34 Nguyễn Khuyến, Nha Trang, Khánh Hòa', '0935701234', 'cod'),
(12, 4, '2023-02-01', '34 Nguyễn Khuyến, Nha Trang, Khánh Hòa', '0935701234', 'cod'),
(14, 3, '2023-02-02', '58KA Cù Lao Thượng', '0708488402', 'cod'),
(15, 3, '2023-02-03', '58KA Cù Lao Thượng', '0708488402', 'cod'),
(16, 4, '2023-02-03', '34 Nguyễn Khuyến, Nha Trang, Khánh Hòa', '0935701234', 'cod'),
(17, 3, '2023-02-03', '58KA Cù Lao Thượng', '0708488402', 'cod'),
(18, 3, '2023-02-04', '58KA Cù Lao Thượng', '0708488402', 'cod');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`orderId`, `productId`, `quantity_order`) VALUES
(11, 1, 1),
(11, 2, 2),
(12, 4, 1),
(12, 8, 1),
(14, 8, 2),
(14, 24, 1),
(15, 5, 1),
(15, 10, 1),
(16, 14, 2),
(17, 7, 1),
(17, 17, 1),
(18, 9, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `typeId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `typeId`, `quantity`, `image`, `price`, `description`) VALUES
(1, 'Bàn làm viêc AAAA', 1, 0, 'https://i.imgur.com/0vvbuVj.jpg', 600000, 'Bàn là một loại nội thất, với cấu tạo của nó hàm chứa một mặt phẳng nằm ngang (gọi là mặt bàn) có tác dụng dùng để nâng đỡ cho những vật dụng hay vật thể mà người dùng muốn đặt lên mặt bàn đó.'),
(2, 'Bàn làm viêc B', 1, 20, 'https://i.imgur.com/KgBrhIW.jpg', 600000, 'Bàn là một loại nội thất, với cấu tạo của nó hàm chứa một mặt phẳng nằm ngang (gọi là mặt bàn) có tác dụng dùng để nâng đỡ cho những vật dụng hay vật thể mà người dùng muốn đặt lên mặt bàn đó.'),
(3, 'Bàn làm việc C', 1, 20, 'https://i.imgur.com/jiCMLv9.jpg', 600000, 'Bàn là một loại nội thất, với cấu tạo của nó hàm chứa một mặt phẳng nằm ngang (gọi là mặt bàn) có tác dụng dùng để nâng đỡ cho những vật dụng hay vật thể mà người dùng muốn đặt lên mặt bàn đó.'),
(4, 'Bàn ăn A', 1, 20, 'https://i.imgur.com/LU58n7q.jpg', 500000, 'Bàn là một loại nội thất, với cấu tạo của nó hàm chứa một mặt phẳng nằm ngang (gọi là mặt bàn) có tác dụng dùng để nâng đỡ cho những vật dụng hay vật thể mà người dùng muốn đặt lên mặt bàn đó.'),
(5, 'Ghế làm việc A', 2, 20, 'https://i.imgur.com/oKeAtdt.jpg', 400000, 'Thông thường ghế có bốn chân. Ngoài ra có ghế ba chân và cũng có thể có ghế nhiều chân hơn nữa, nhưng hiếm. Có các loại ghế một chân hay hai chân nếu chân ghế có hình dạng đủ để tạo thành chân đế bền vững chống đỡ cho cấu trúc không bị đổ.'),
(6, 'Ghế làm việc B', 2, 20, 'https://i.imgur.com/k0yc90p.jpg', 400000, 'Ghế với phần lưng và mặt ngồi sử dụng nhựa cao độ bền cao kết hợp hệ khung chân bằng gỗ chắc chắn, sản phẩm lắp ráp khung chân với mặt ghế. Ghế nhựa chân gỗ ST3003B sở hữu kiểu dáng hiện đại, trang nhã phù hợp với mọi không gian và mục đích sử dụng từ gia đình, nhà ở đến quán cafe, nhà hàng đều được.'),
(7, 'Ghế làm việc C', 2, 19, 'https://i.imgur.com/ZqnJIRm.jpg', 400000, 'Ghế với phần lưng và mặt ngồi sử dụng nhựa cao độ bền cao kết hợp hệ khung chân bằng gỗ chắc chắn, sản phẩm lắp ráp khung chân với mặt ghế. Ghế nhựa chân gỗ ST3003B sở hữu kiểu dáng hiện đại, trang nhã phù hợp với mọi không gian và mục đích sử dụng từ gia đình, nhà ở đến quán cafe, nhà hàng đều được.'),
(8, 'Ghế cổ điển A', 2, 20, 'https://i.imgur.com/dtJnlAb.jpg', 300000, 'Ghế với phần lưng và mặt ngồi sử dụng nhựa cao độ bền cao kết hợp hệ khung chân bằng gỗ chắc chắn, sản phẩm lắp ráp khung chân với mặt ghế. Ghế nhựa chân gỗ ST3003B sở hữu kiểu dáng hiện đại, trang nhã phù hợp với mọi không gian và mục đích sử dụng từ gia đình, nhà ở đến quán cafe, nhà hàng đều được.'),
(9, 'Tủ quần áo A', 5, 19, 'https://i.imgur.com/DwMau0h.jpg', 350000, 'Tủ quần áo sở hữu thiết kế đơn giản với phong cách hiện đại gây ấn tượng mạnh với khách hàng. Sản phẩm tủ quần áo bằng gỗ này được sản xuất bằng máy móc công nghệ tiên tiến đảm bảo chất lượng cao, bền đẹp theo thời gian.'),
(10, 'Tủ quần áo B', 5, 20, 'https://i.imgur.com/Ia2S7gg.jpg', 400000, 'Tủ quần áo bằng gỗ sở hữu thiết kế đơn giản với phong cách hiện đại gây ấn tượng mạnh với khách hàng. Sản phẩm tủ quần áo bằng gỗ này được sản xuất bằng máy móc công nghệ tiên tiến đảm bảo chất lượng cao, bền đẹp theo thời gian.'),
(11, 'Tủ quần áo tối giản', 5, 20, 'https://i.imgur.com/ndL0Ev1.jpg', 380000, 'Tủ quần áo bằng gỗ công nghiệp sở hữu thiết kế đơn giản với phong cách hiện đại gây ấn tượng mạnh với khách hàng. Sản phẩm tủ quần áo bằng gỗ này được sản xuất bằng máy móc công nghệ tiên tiến đảm bảo chất lượng cao, bền đẹp theo thời gian.'),
(12, 'Tủ đa năng', 5, 20, 'https://i.imgur.com/T8RF2az.jpg', 370000, 'Tủ quần áo bằng gỗ công nghiệp sở hữu thiết kế đơn giản với phong cách hiện đại gây ấn tượng mạnh với khách hàng. Sản phẩm tủ quần áo bằng gỗ này được sản xuất bằng máy móc công nghệ tiên tiến đảm bảo chất lượng cao, bền đẹp theo thời gian.'),
(13, 'Giường ngủ A', 3, 20, 'https://i.imgur.com/nUdg0H1.jpg', 1600000, 'Giường ngủ với thiết kế chủ đạo là tính tối giản, thẩm mỹ kết hợp với công năng nhằm đem đến khách hàng trải nghiệm tốt nhất. Sản phẩm giường ngủ được làm từ gỗ sồi tự nhiên, thân thiện với môi trường và an toàn với sức khỏe cho tận hưởng bạn giấc ngủ bình yên và và thư thái.'),
(14, 'Giường ngủ B', 3, 18, 'https://i.imgur.com/Ix6YTv7.jpg', 1650000, 'Giường ngủ với thiết kế chủ đạo là tính tối giản, thẩm mỹ kết hợp với công năng nhằm đem đến khách hàng trải nghiệm tốt nhất. Sản phẩm giường ngủ được làm từ gỗ sồi tự nhiên, thân thiện với môi trường và an toàn với sức khỏe cho tận hưởng bạn giấc ngủ bình yên và và thư thái.'),
(15, 'Giường ngủ C', 3, 20, 'https://i.imgur.com/u9iFvrR.jpg', 1700000, 'Giường ngủ với thiết kế chủ đạo là tính tối giản, thẩm mỹ kết hợp với công năng nhằm đem đến khách hàng trải nghiệm tốt nhất. Sản phẩm giường ngủ được làm từ gỗ sồi tự nhiên, thân thiện với môi trường và an toàn với sức khỏe cho tận hưởng bạn giấc ngủ bình yên và và thư thái.'),
(16, 'Giường ngủ D', 3, 20, 'https://i.imgur.com/wQFdXd6.jpg', 1600000, 'Giường ngủ với thiết kế chủ đạo là tính tối giản, thẩm mỹ kết hợp với công năng nhằm đem đến khách hàng trải nghiệm tốt nhất. Sản phẩm giường ngủ được làm từ gỗ sồi tự nhiên, thân thiện với môi trường và an toàn với sức khỏe cho tận hưởng bạn giấc ngủ bình yên và và thư thái.'),
(17, 'Kệ tiện dụng A', 4, 19, 'https://i.imgur.com/HD744At.jpg', 150000, 'Kệ sách giúp trưng bày sách và là một món đồ nội thất làm tăng thêm tính thẩm mỹ cho không gian nhà. Hiện có nhiều mẫu sản phẩm kệ sách đơn giản, đang dạng kích thước và chất liệu như kệ sách đứng, kệ sách gỗ, treo tường,…'),
(18, 'Kệ đa năng B', 4, 20, 'https://i.imgur.com/VJmRUo7.jpg', 200000, 'Kệ sách giúp trưng bày sách và là một món đồ nội thất làm tăng thêm tính thẩm mỹ cho không gian nhà. Hiện có nhiều mẫu sản phẩm kệ sách đơn giản, đang dạng kích thước và chất liệu như kệ sách đứng, kệ sách gỗ, treo tường,…'),
(24, 'Kệ tao mày!', 4, 20, 'https://i.imgur.com/7l8lY0q.jpeg', 210000, 'Kệ tao mày! giúp trưng bày sách và là một món đồ nội thất làm tăng thêm tính thẩm mỹ cho không gian nhà. Hiện có nhiều mẫu sản phẩm kệ sách đơn giản, đang dạng kích thước và chất liệu như kệ sách đứng, kệ sách gỗ, treo tường,…');

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`id`, `name`) VALUES
(1, 'Bàn'),
(2, 'Ghế'),
(3, 'Giường'),
(4, 'Kệ'),
(5, 'Tủ');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `phone`, `address`, `email`, `password`, `role`) VALUES
(2, 'Phúc', 'Phan', '0708488401', '56KA Cù Lao Thượng', 'phucpth2001@gmail.com', '$2b$10$iLh./TxxTMjFr3UfpLXGMua9karLbFatfXXox45SPqSUUqEftjJ3a', 'Admin'),
(3, 'Tâm Khùng', 'Hoàng', '0708488402', '58KA Cù Lao Thượng', 'tamhoang@gmail.com', '$2b$10$FjxN2H49DXqzqJzW8LuomOyl7dHAn9MOujW4lAvTja8IWoN1IHQD2', 'Customer'),
(4, 'Hiệp', 'Mạnh', '0935701234', '34 Nguyễn Khuyến, Nha Trang, Khánh Hòa', 'hiepmanh@gmail.com', '$2b$10$rNlCFZkOwciVdXEdSuN.W.PEhzTom5kl448aM9lITYUHCtIZ4gXfa', 'Customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`orderId`,`productId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
