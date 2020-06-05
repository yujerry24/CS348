-- create table
CREATE TABLE playlist1 (artist varchar(24), title varchar(24), year int);

-- insert rows/tuples
INSERT INTO playlist1 VALUES (‘Bruno Mars’, ‘Grenades’, 2010);
INSERT INTO playlist1 VALUES (‘Bruno Mars’, ‘That’s What I Like’, 2016);
INSERT INTO playlist1 VALUES (‘Owl City’, ‘Fireflies’, 2009);
INSERT INTO playlist1 VALUES (‘Kelly Clarkson’, ‘Already Gone’, 2009);
INSERT INTO playlist1 VALUES (‘Unknown’, ‘Feel Special’, 2019);

-- query a specific artist
SELECT * FROM playlist1
WHERE (artist = ‘Bruno Mars’);

-- update a row
UPDATE playlist1 SET artist = ‘TWICE’ WHERE (title = ‘Feel Special’);

-- query for songs from after 2009
SELECT * FROM playlist1
WHERE (year > 2009);

-- clear table
DELETE FROM playlist1;
