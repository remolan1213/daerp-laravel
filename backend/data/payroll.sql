/*
 Navicat Premium Data Transfer

 Source Server         : daerp-laravel
 Source Server Type    : SQLite
 Source Server Version : 3036000 (3.36.0)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3036000 (3.36.0)
 File Encoding         : 65001

 Date: 13/11/2024 13:11:49
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for payroll
-- ----------------------------
DROP TABLE IF EXISTS "payroll";
CREATE TABLE "payroll" (
  "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT,
  "payrollPeriod" varchar NOT NULL,
  "payrollDate" varchar NOT NULL,
  "workerId" integer,
  CONSTRAINT "FK_bfd18d0d76a2bffa92b36449e1b" FOREIGN KEY ("workerId") REFERENCES "worker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- ----------------------------
-- Auto increment value for payroll
-- ----------------------------

PRAGMA foreign_keys = true;
