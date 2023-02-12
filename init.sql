CREATE DATABASE IF NOT EXISTS streetsDB;

USE streetsDB;

CREATE TABLE IF NOT EXISTS street (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  street_id  varchar(300) NULL,
  region_code     BIGINT,
  region_name varchar(300) NULL,
  city_code  BIGINT,
  city_name  varchar(300) NULL,
  street_code BIGINT,
  street_name varchar(300) NULL,
  street_name_status varchar(300) NULL,
  official_code BIGINT,
  createdate TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO messages (
--   content
-- ) VALUES (
--   'starting docker container'
-- );