CREATE TABLE `consultations` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text NOT NULL,
	`topic` text NOT NULL,
	`message` text,
	`status` text DEFAULT 'REQUESTED' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `content_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`slug` text NOT NULL,
	`data` text NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `follow_ups` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text NOT NULL,
	`note` text NOT NULL,
	`next_follow_up` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `interest_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`lead_id` text NOT NULL,
	`raw_answers` text NOT NULL,
	`category_scores` text NOT NULL,
	`top_category` text NOT NULL,
	`second_category` text NOT NULL,
	`completed_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`student_name` text NOT NULL,
	`parent_name` text NOT NULL,
	`phone` text NOT NULL,
	`school` text NOT NULL,
	`source` text NOT NULL,
	`interest_level` text,
	`top_category` text,
	`second_category` text,
	`concern` text,
	`status` text DEFAULT 'NEW' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
