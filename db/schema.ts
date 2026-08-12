import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable(
  "products",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    category: text("category").notNull().default("Kutu Çözümleri"),
    shortDescription: text("short_description").notNull().default(""),
    description: text("description").notNull().default(""),
    imageUrl: text("image_url").notNull().default(""),
    cropX: integer("crop_x").notNull().default(67),
    cropY: integer("crop_y").notNull().default(728),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => [
    index("idx_products_active_sort").on(table.isActive, table.sortOrder),
  ],
);

export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull().default(""),
  updatedAt: text("updated_at").notNull(),
});

export const media = sqliteTable(
  "media",
  {
    id: text("id").primaryKey(),
    objectKey: text("object_key").notNull().unique(),
    filename: text("filename").notNull(),
    contentType: text("content_type").notNull(),
    size: integer("size").notNull().default(0),
    createdAt: text("created_at").notNull(),
  },
  (table) => [index("idx_media_created_at").on(table.createdAt)],
);
