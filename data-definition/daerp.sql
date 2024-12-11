CREATE TABLE `bank_account`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_number` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `cash_advance`  (
  `id` int NULL AUTO_INCREMENT,
  `amount` longblob NOT NULL,
  `remainAmount` longblob NOT NULL,
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
  `workerId` int NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_workerId_payroll`(`workerId` ASC)
);

CREATE TABLE `payrolldata`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` longtext NOT NULL,
  `grossmount` double NOT NULL,
  `workerpercentage` double NOT NULL,
  `sharingpercentage` double NOT NULL,
  `idPayroll` int NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_idPayroll_payrolldata`(`idPayroll` ASC)
);

CREATE TABLE `worker`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `idNumber` varchar(20) NOT NULL,
  `department` vachar NOT NULL,
  `firstName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `middleName` varchar(25) NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `cash_advance` ADD FOREIGN KEY (`workerId`) REFERENCES `worker` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `cash_advance_dates` ADD FOREIGN KEY (`cashAdvanceId`) REFERENCES `cash_advance` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE `payroll` ADD CONSTRAINT `FK_bfd18d0d76a2bffa92b36449e1b` FOREIGN KEY (`workerId`) REFERENCES `worker` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `payrolldata` ADD CONSTRAINT `FK_payroll` FOREIGN KEY (`idPayroll`) REFERENCES `payroll` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

