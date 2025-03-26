
-- Cập nhật bảng users để thêm trường DOB
ALTER TABLE `users` ADD `dob` DATE NULL DEFAULT NULL AFTER `balance`;
