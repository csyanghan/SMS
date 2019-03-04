/*
 Navicat Premium Data Transfer

 Source Server         : ali
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : school

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 04/03/2019 13:53:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class`  (
  `kh` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `km` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `xf` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '4',
  `xs` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '40',
  `yxh` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`kh`) USING BTREE,
  INDEX `idx2`(`km`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('08301001', '分子物理学', '4', '40', '03');
INSERT INTO `class` VALUES ('08302001', '通信学', '3', '30', '02');
INSERT INTO `class` VALUES ('08305001', '离散数学', '4', '40', '01');
INSERT INTO `class` VALUES ('08305002', '数据库原理', '4', '50', '01');
INSERT INTO `class` VALUES ('08305003', '数据结构', '4', '50', '01');
INSERT INTO `class` VALUES ('08305004', '系统结构', '6', '60', '01');

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `yxh` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mc` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dz` char(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lxdh` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`yxh`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES ('01', '计算机学院', '上大东校区三号楼', '65347567');
INSERT INTO `department` VALUES ('02', '通讯学院', '上大东校区二号楼', '65341234');
INSERT INTO `department` VALUES ('03', '材料学院', '上大东校区四号楼', '65347890');

-- ----------------------------
-- Table structure for openclass
-- ----------------------------
DROP TABLE IF EXISTS `openclass`;
CREATE TABLE `openclass`  (
  `xq` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `kh` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gh` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sksj` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`xq`, `kh`, `gh`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of openclass
-- ----------------------------
INSERT INTO `openclass` VALUES ('2012-2013 冬季', '08305002', '0101', '星期三 1-4');
INSERT INTO `openclass` VALUES ('2012-2013 冬季', '08305002', '0102', '星期三 1-4');
INSERT INTO `openclass` VALUES ('2012-2013 冬季', '08305002', '0103', '星期三 1-4');
INSERT INTO `openclass` VALUES ('2012-2013 冬季', '08305003', '0102', '星期五 5-6');
INSERT INTO `openclass` VALUES ('2012-2013 秋季', '08305001', '0103', '星期三 5-6');
INSERT INTO `openclass` VALUES ('2013-2014 冬季', '08302001', '0201', '星期一 5-8');
INSERT INTO `openclass` VALUES ('2013-2014 秋季', '08305001', '0102', '星期一 5-6');
INSERT INTO `openclass` VALUES ('2013-2014 秋季', '08305002', '0101', '周一 1-2');
INSERT INTO `openclass` VALUES ('2013-2014 秋季', '08305004', '0101', '星期二 1-4');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `xh` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `xm` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `xb` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `csrq` datetime(0) NOT NULL,
  `jg` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `sjhm` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `yxh` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`xh`) USING BTREE,
  INDEX `idx1`(`yxh`, `xm`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1101', '李明', '男', '1993-03-06 00:00:00', '上海', '13613005466', '02');
INSERT INTO `student` VALUES ('1102', '刘晓明', '男', '1992-12-08 00:00:00', '安徽', '18913457890', '01');
INSERT INTO `student` VALUES ('1103', '张颖', '女', '1993-01-05 00:00:00', '江苏', '18826490423', '01');
INSERT INTO `student` VALUES ('1104', '刘晶晶', '女', '1994-11-06 00:00:00', '上海', '13331934111', '01');
INSERT INTO `student` VALUES ('1105', '刘成刚', '男', '1991-06-07 00:00:00', '上海', '18015872567', '01');
INSERT INTO `student` VALUES ('1106', '李二丽', '女', '1993-05-04 00:00:00', '江苏', '18107620945', '01');
INSERT INTO `student` VALUES ('1107', '张晓峰', '男', '1992-08-16 00:00:00', '浙江', '13912341078', '01');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `gh` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `xm` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `xb` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `csrq` datetime(0) NOT NULL,
  `xl` char(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `jbgz` decimal(6, 2) NOT NULL,
  `yxh` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`gh`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('0101', '陈迪茂', '男', '1973-03-06 00:00:00', '副教授', 3567.00, '01');
INSERT INTO `teacher` VALUES ('0102', '马小红', '女', '1972-12-08 00:00:00', '讲师', 2845.00, '01');
INSERT INTO `teacher` VALUES ('0103', '吴宝钢', '男', '1980-11-06 00:00:00', '讲师', 2554.00, '01');
INSERT INTO `teacher` VALUES ('0201', '张心颖', '女', '1960-01-05 00:00:00', '教授', 4200.00, '02');

-- ----------------------------
-- Table structure for xuankeTable
-- ----------------------------
DROP TABLE IF EXISTS `xuankeTable`;
CREATE TABLE `xuankeTable`  (
  `xh` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `xq` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `kh` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gh` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pscj` tinyint(4) NULL DEFAULT NULL,
  `kscj` tinyint(4) NULL DEFAULT NULL,
  `zpcj` tinyint(4) NULL DEFAULT NULL,
  PRIMARY KEY (`xh`, `xq`, `kh`, `gh`) USING BTREE,
  INDEX `xq`(`xq`, `kh`, `gh`) USING BTREE,
  CONSTRAINT `xuankeTable_ibfk_1` FOREIGN KEY (`xq`, `kh`, `gh`) REFERENCES `openclass` (`xq`, `kh`, `gh`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of xuankeTable
-- ----------------------------
INSERT INTO `xuankeTable` VALUES ('1101', '2012-2013 秋季', '08305001', '0103', 60, 60, 60);
INSERT INTO `xuankeTable` VALUES ('1101', '2013-2014 秋季', '08305001', '0102', NULL, NULL, NULL);
INSERT INTO `xuankeTable` VALUES ('1101', '2013-2014 秋季', '08305004', '0101', 100, NULL, 100);
INSERT INTO `xuankeTable` VALUES ('1102', '2012-2013 冬季', '08305002', '0101', 82, 82, 82);
INSERT INTO `xuankeTable` VALUES ('1102', '2012-2013 秋季', '08305001', '0103', 87, 87, 87);
INSERT INTO `xuankeTable` VALUES ('1102', '2013-2014 秋季', '08305004', '0101', 90, 78, 90);
INSERT INTO `xuankeTable` VALUES ('1103', '2012-2013 冬季', '08305002', '0102', 75, 75, 75);
INSERT INTO `xuankeTable` VALUES ('1103', '2012-2013 冬季', '08305003', '0102', 84, 84, 84);
INSERT INTO `xuankeTable` VALUES ('1103', '2012-2013 秋季', '08305001', '0103', 56, 56, 56);
INSERT INTO `xuankeTable` VALUES ('1103', '2013-2014 秋季', '08305001', '0102', NULL, NULL, NULL);
INSERT INTO `xuankeTable` VALUES ('1103', '2013-2014 秋季', '08305004', '0101', 60, 60, 60);
INSERT INTO `xuankeTable` VALUES ('1104', '2012-2013 秋季', '08305001', '0103', 74, 74, 90);
INSERT INTO `xuankeTable` VALUES ('1104', '2013-2014 冬季', '08302001', '0201', NULL, NULL, NULL);
INSERT INTO `xuankeTable` VALUES ('1106', '2012-2013 冬季', '08305002', '0103', 66, 66, 90);
INSERT INTO `xuankeTable` VALUES ('1106', '2012-2013 秋季', '08305001', '0103', 85, 85, 94);
INSERT INTO `xuankeTable` VALUES ('1107', '2012-2013 冬季', '08305003', '0102', 79, 79, 79);
INSERT INTO `xuankeTable` VALUES ('1107', '2012-2013 秋季', '08305001', '0103', 90, 90, 90);
INSERT INTO `xuankeTable` VALUES ('1107', '2013-2014 冬季', '08302001', '0201', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
