-- CREATE QUERY

create table users
(
    Userid varchar(255) NOT NULL,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    contactnumber varchar(20),
    role varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (Userid),
    UNIQUE(email)
);

-- INSERT QUERY

insert into users(userid,firstname,lastname,email,contactnumber,role,password)
values('admin.a','admin','admin','admin123@gmail.com','9898976554','admin','admin@123');