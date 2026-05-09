CREATE TABLE `applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`formspreeId` varchar(128),
	`name` varchar(256) NOT NULL,
	`email` varchar(320) NOT NULL,
	`relationship` text NOT NULL,
	`status` enum('new','reviewed','accepted','declined') NOT NULL DEFAULT 'new',
	`notes` text,
	`submittedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `applications_id` PRIMARY KEY(`id`),
	CONSTRAINT `applications_formspreeId_unique` UNIQUE(`formspreeId`)
);
