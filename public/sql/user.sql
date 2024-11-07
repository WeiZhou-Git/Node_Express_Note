-- 创建数据库
CREATE DATABASE IF NOT EXISTS user_mysql;

-- 使用数据库
USE user_mysql;

-- 创建表 t_student
CREATE TABLE IF NOT EXISTS t_student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    no VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    sex CHAR(1),
    classno VARCHAR(20),
    birth DATE
);

-- 插入数据示例
INSERT INTO t_student (no, name, sex, classno, birth) 
VALUES ('001', 'Alice', 'F', 'A1', '2000-01-01');
