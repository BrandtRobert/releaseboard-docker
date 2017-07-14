CREATE TABLE IF NOT EXISTS releases (
    id char(32) PRIMARY KEY NOT NULL,
    package varchar(50),
    release varchar(50),
    version varchar(50),
    merged boolean default false
);
