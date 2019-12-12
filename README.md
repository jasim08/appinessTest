# Node.js Project
# Making the first user who registers, as Admin.
Database Name : authentication

Two tables or model,
1. userRole
query for creating userRole table:
mysql> create table userRole (userRoleId INT not null primary key auto_increment, userRole varchar(20));




2. users
query for creating userRole table:
mysql> create table users (userId INT not null primary key auto_increment , firstName varchar(20), lastName varchar(20), email varchar(30), password varchar(30), userRoleId INT, Foreign key (userRoleId) references userRole(userRoleId));

======================

Pull the project from https://github.com/jasim08/appinessTest.git
Open the project folder in terminal and type,
npm install --save


======================

After install required packages, 
run server.js file


Console in Terminal exact below

################

Database connected sucessfully

################

listening on localhost:3000

==================
Open browser and serach

http://localhost:3000 or http:localhost:3000/register

That's it you can now enjoy creating Admin and user as well.

===========================================================================

