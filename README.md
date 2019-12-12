# Node.js Project
# Making the first user who registers, as Admin.
Database Name : authentication

Two tables or model,
1. userRole
query for creating userRole table:
mysql> create table userRole (userRoleId INT not null primary key auto_increment, userRole varchar(20));
mysql> desc userRole; 

+------------+-------------+------+-----+---------+----------------+
| Field      | Type        | Null | Key | Default | Extra          |
+------------+-------------+------+-----+---------+----------------+
| userRoleId | int(11)     | NO   | PRI | NULL    | auto_increment |
| userRole   | varchar(20) | YES  |     | NULL    |                |
+------------+-------------+------+-----+---------+----------------+

2. users
query for creating userRole table:
mysql> create table users (userId INT not null primary key auto_increment , firstName varchar(20), lastName varchar(20), email varchar(30), password varchar(30), userRoleId INT, Foreign key (userRoleId) references userRole(userRoleId));

mysql> desc users; // mysql query
+------------+-------------+------+-----+---------+----------------+
| Field      | Type        | Null | Key | Default | Extra          |
+------------+-------------+------+-----+---------+----------------+
| userId     | int(11)     | NO   | PRI | NULL    | auto_increment |
| firstName  | varchar(20) | YES  |     | NULL    |                |
| lastName   | varchar(20) | YES  |     | NULL    |                |
| email      | varchar(30) | YES  |     | NULL    |                |
| password   | varchar(30) | YES  |     | NULL    |                |
| userRoleId | int(11)     | YES  | MUL | NULL    |                |
+------------+-------------+------+-----+---------+----------------+

==========================================================================================
Pull the project from https://github.com/jasim08/appinessTest.git
Open the project folder in terminal and type
npm install --save
==========================================================================================
After install required packages, run server.js file
==========================================================================================
Console in Terminal exact below
################
Database connected sucessfully
################
listening on localhost:3000
============================================================================================
Open browser and serach
localhost:3000

That's it you can now enjoy creating Admin and user as well.
===========================================================================================

