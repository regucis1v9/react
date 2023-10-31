-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2023 at 11:15 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_managment`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT 'no',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `due_date`, `status`, `created_at`, `userID`) VALUES
(1, '123', '123', '2322-12-31', 'no', '2023-10-16 14:44:06', 12),
(2, 'admin test', 'admin test', '2023-10-16', 'no', '2023-10-16 15:29:19', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', '$2y$10$MAKt4X0yf29oYOmlaKRdXu7f2n3UZe9Pu7vUes7cye6m1hg0/8AZy', 'admin'),
(3, 'user', '$2y$10$6hMm2h6.bNj1p8OjViuPCeDGjcXForT4BfXGDSKW9Nwa42eQaIzdW', 'user'),
(4, 'lohs', '$2y$10$ZZDMYvMIe0XOoCayLFc2je8OX4J/YLI01VYacOs.n8pQkSzMh2iTu', 'user'),
(5, 'Regnars', '$2y$10$QZYgzhHu660N.tWHU8EKmuYJwLBk4N8Ks8WmmAXepzOfi/j1Nvnzq', 'user'),
(6, 'botsu', '$2y$10$6iL6GEfVYlIPdMM7qShhje1DrNt4DHPZit0Uhia2i1PpaCoTegMkG', 'user'),
(7, 'guest', '$2y$10$EXTQBUA0B/GllA/k4WjOtuc8lQwLDVLoOSsxES3kXAlKWXKQ2vqX2', 'user'),
(8, 'kipis', '$2y$10$fWIs7Md1hUHYzKgquV1RN.o.4ooVcJrhjkkc8nLeyzwV/aujoB1/m', 'user'),
(12, '123', '$2y$10$sWp.zSso1YGDfFg6v71sluyoj71BVNveIeV9W95VDnNvUhqNjj9mq', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
