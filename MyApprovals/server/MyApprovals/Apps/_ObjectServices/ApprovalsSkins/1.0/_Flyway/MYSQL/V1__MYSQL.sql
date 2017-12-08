CREATE TABLE `ConfigurationBundle`(
	`bundle_id` BIGINT NOT NULL AUTO_INCREMENT,
	`bundle_name` VARCHAR(25),
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`data` VARCHAR(2000),
	`dependent_bundles` VARCHAR(2000),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`bundle_id`)
);
ALTER TABLE `ConfigurationBundle`
	ADD CONSTRAINT `82d318f22f9c7a7a14ccaeebc18a10` UNIQUE KEY(`bundle_id`);
CREATE TABLE `Role`(
	`bundles` BIGINT,
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`role` VARCHAR(10),
	`role_id` BIGINT NOT NULL,
	`SoftDeleteFlag` BOOLEAN,
	PRIMARY KEY(`role_id`)
);
ALTER TABLE `Role`
	ADD CONSTRAINT `3523a7988fff460c498003f639c7c9` UNIQUE KEY(`role_id`);
