CREATE TABLE `Agency` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`location` text,
	`phone_number` text
);
--> statement-breakpoint
CREATE TABLE `Booking` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`start_date` text NOT NULL,
	`end_time` real NOT NULL,
	`car_id` integer,
	`user_id` text,
	`agency_id` integer,
	FOREIGN KEY (`car_id`) REFERENCES `Car`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`agency_id`) REFERENCES `Agency`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Car` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	`seats` integer NOT NULL,
	`transmission` text NOT NULL,
	`type` text NOT NULL,
	`trunk_space` integer NOT NULL,
	`engine` text NOT NULL,
	`is_available` integer DEFAULT 1 NOT NULL,
	`agency_id` integer NOT NULL,
	`image` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`date_of_brith` text,
	`email` text
);
