-- Found that there were albums and songs that were the same but with different ids that were returned to us by spotify's api
-- Here's our psql queries that fixed it:

SELECT count, COUNT(*) FROM (SELECT COUNT(*) FROM album GROUP BY name, release_date) AS foo GROUP BY count;
--  count | count
-- -------+-------
--      3 |     2
--      2 |    58
--      1 |   771
-- (1 row)

BEGIN;

-- https://www.dbrnd.com/2019/09/postgresql-how-to-delete-all-duplicate-rows-except-one/
DELETE FROM song WHERE album_id IN (
  SELECT album_id FROM (
    SELECT album_id, ROW_NUMBER() OVER (partition BY name, release_date) AS rowNum FROM album
  ) AS T WHERE T.rowNum > 1);

DELETE FROM album WHERE album_id IN (
  SELECT album_id FROM (
    SELECT album_id, ROW_NUMBER() OVER (partition BY name, release_date) AS rowNum FROM album
  ) AS T WHERE T.rowNum > 1);

SELECT count, COUNT(*) FROM (SELECT COUNT(*) FROM album GROUP BY name, release_date) AS foo GROUP BY count;
--  count | count
-- -------+-------
--      1 |   831
-- (1 row)

COMMIT;
