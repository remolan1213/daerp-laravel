CREATE TABLE `bank_account`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `accountNumber` varchar(20) NOT NULL,
  `bankName` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL,
  `workerId` int NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `payroll_data`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` longtext NOT NULL,
  `grossAmount` double NOT NULL,
  `sharingPercentage` double NOT NULL,
  `idPayroll` int NOT NULL,
  `workerRateId` int NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_idPayroll_payrolldata`(`idPayroll` ASC)
);

CREATE TABLE `worker_rate`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `rate` numeric NOT NULL,
  `dateGranted` datetime NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT latest,
  `workerId` int NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `cash_advance`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` longblob NOT NULL,
  `dateRequested` datetime NOT NULL,
  `dateGiven` datetime NOT NULL,
  `status` longtext NULL,
  `workerId` int NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_workerId_cash_advance`(`workerId` ASC)
);

CREATE TABLE `cash_advance_dates`  (
  `id` int NULL AUTO_INCREMENT,
  `cashAdvanceId` int NOT NULL,
  `dateRequested` longblob NOT NULL,
  `dateGiven` longblob NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `payroll`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `payrollPeriod` longtext NOT NULL,
  `payrollDate` longtext NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_workerId_payroll`(`workerId` ASC)
);

CREATE TABLE `worker`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `idNumber` varchar(20) NOT NULL,
  `department` vachar NOT NULL,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `middleName` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `payroll_data` ADD CONSTRAINT `FK_payroll` FOREIGN KEY (`idPayroll`) REFERENCES `payroll` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `worker_rate` ADD CONSTRAINT `fk_worker_rate_payroll_data_1` FOREIGN KEY (`id`) REFERENCES `payroll_data` (`workerRateId`);
ALTER TABLE `cash_advance` ADD FOREIGN KEY (`workerId`) REFERENCES `worker` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `cash_advance_dates` ADD FOREIGN KEY (`cashAdvanceId`) REFERENCES `cash_advance` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `worker` ADD CONSTRAINT `fk_worker_bank_account_1` FOREIGN KEY (`id`) REFERENCES `bank_account` (`workerId`);
ALTER TABLE `worker` ADD CONSTRAINT `fk_worker_worker_rate_1` FOREIGN KEY (`id`) REFERENCES `worker_rate` (`workerId`);

