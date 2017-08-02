CREATE TABLE `ConfigurationMaster`(
	`app_id` VARCHAR(50),
	`app_version` VARCHAR(30),
	`bundles` VARCHAR(10),
	`CreatedBy` VARCHAR(32),
	`CreatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`LastUpdatedBy` VARCHAR(32),
	`LastUpdatedDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
	`role_id` VARCHAR(20),
	`SoftDeleteFlag` BOOLEAN,
	`user_id` VARCHAR(10),
	PRIMARY KEY(`id`)
);
ALTER TABLE `ConfigurationMaster`
	ADD CONSTRAINT `3f2e08b18ba42422cbe8275cb222ba` UNIQUE KEY(`id`);
