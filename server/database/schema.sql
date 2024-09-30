create table candidate (
  id int primary key auto_increment not null,
  firstname varchar(255) not null,
  lastname varchar(255) not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);

create table company (
  id int  primary key auto_increment not null,
  name varchar(255) not null,
  city varchar(255) not null
);


create table contract (
  id int  primary key auto_increment not null,
  name varchar(255) not null

);

create table remote (
  id int  primary key auto_increment not null,
  name varchar(255) not null
);


create table ad (
  id int  primary key auto_increment not null,
  title varchar(255) not null,
  picture varchar(255) not null,
  description text not null,
  location varchar(255) not null,
  company_id int not null,
  contract_id int not null, 
  remote_id int not null,
  FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
  FOREIGN KEY (contract_id) REFERENCES contract(id) ON DELETE CASCADE,
  FOREIGN KEY (remote_id) REFERENCES remote(id) ON DELETE CASCADE
);


insert into candidate( firstname, lastname, email, password)
values
  ("john", "doe",  "jdoe@mail.com", "123456"),
  ("jack", "sparrow",  "j.sparrow@mail.com", "pirate");

insert into company (name, city) 
VALUES("MastartUpdeDev","Miami"), 
("UneBoiteEnOr","LosAngeles");

insert into contract (name) 
VALUES("CDI"), 
("CDD"), ("ALTERNANCE"), ("FREELANCE"), ("STAGE") ;


insert into remote(name) 
VALUES("ON SITE"), 
("HYBRID"), ("FULL REMOTE");


INSERT INTO ad (title, picture, description, location, company_id, contract_id, remote_id) VALUES 
("Développeur Full Stack", "image", "Poste de développeur full stack avec expérience en Node.js et React.", "Paris, France", 1, 2, 1),
("Data Scientist", "https://exemple.com/images/datascientist.jpg", "Poste de Data Scientist pour analyser des données volumineuses et complexes.", "Lyon, France", 2, 3, 2);

