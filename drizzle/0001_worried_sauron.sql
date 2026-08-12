CREATE INDEX `idx_media_created_at` ON `media` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_products_active_sort` ON `products` (`is_active`,`sort_order`);