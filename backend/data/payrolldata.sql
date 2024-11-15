/*
 Navicat Premium Data Transfer

 Source Server         : daerp-laravel
 Source Server Type    : SQLite
 Source Server Version : 3036000 (3.36.0)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3036000 (3.36.0)
 File Encoding         : 65001

 Date: 13/11/2024 13:12:02
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for payrolldata
-- ----------------------------
DROP TABLE IF EXISTS "payrolldata";
CREATE TABLE "payrolldata" (
  "id" INTEGER NOT NULL ON CONFLICT FAIL PRIMARY KEY AUTOINCREMENT,
  "description" TEXT(255) NOT NULL,
  "grossmount" real NOT NULL,
  "workerpercentage" real NOT NULL,
  "sharingpercentage" real NOT NULL,
	"idPayroll" INTEGER NOT NULL,
  CONSTRAINT "FK_payroll" FOREIGN KEY ("idPayroll") REFERENCES "payroll" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

PRAGMA foreign_keys = true;
