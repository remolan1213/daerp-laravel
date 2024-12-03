CREATE TABLE "cash_advance" (
  "id" integer PRIMARY KEY AUTOINCREMENT,
  "amount" DECIMAL NOT NULL,
  "remainAmount" DECIMAL NOT NULL,
  "status" VARCHAR DEFAULT 'pending',
  "workerId" INTEGER,
  FOREIGN KEY ("workerId") REFERENCES "worker" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE "cash_advance_dates" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "cashAdvanceId" INTEGER NOT NULL,
  "dateRequested" DATE NOT NULL,
  "dateGiven" DATE,
  FOREIGN KEY ("cashAdvanceId") REFERENCES "cash_advance" ("id") ON DELETE CASCADE
);

CREATE INDEX idx_workerId_cash_advance ON "cash_advance" ("workerId");

CREATE TABLE "payroll" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "payrollPeriod" varchar NOT NULL,
  "payrollDate" varchar NOT NULL,
  "workerId" integer,
  CONSTRAINT "FK_bfd18d0d76a2bffa92b36449e1b" FOREIGN KEY ("workerId") REFERENCES "worker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_workerId_payroll ON "payroll" ("workerId");

CREATE TABLE "payrolldata" (
  "id" INTEGER NOT NULL ON CONFLICT FAIL PRIMARY KEY AUTOINCREMENT,
  "description" TEXT(255) NOT NULL,
  "grossmount" real NOT NULL,
  "workerpercentage" real NOT NULL,
  "sharingpercentage" real NOT NULL,
  "idPayroll" integer NOT NULL,
  CONSTRAINT "FK_payroll" FOREIGN KEY ("idPayroll") REFERENCES "payroll" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_idPayroll_payrolldata ON "payrolldata" ("idPayroll");

CREATE TABLE "worker" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "idNumber" varchar NOT NULL,
  "department" varchar NOT NULL,
  CONSTRAINT "UQ_531af5cc8a07e955f1fd5b8b9af" UNIQUE ("idNumber" ASC)
);

CREATE TABLE "worker_names" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "workerId" INTEGER NOT NULL,
  "firstname" VARCHAR NOT NULL DEFAULT '',
  "lastname" VARCHAR NOT NULL DEFAULT '',
  "middlename" VARCHAR NOT NULL DEFAULT '',
  FOREIGN KEY ("workerId") REFERENCES "worker" ("id") ON DELETE CASCADE
);
