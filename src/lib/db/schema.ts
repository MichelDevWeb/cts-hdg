import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ============================================================================
// PROJECTS TABLE
// ============================================================================

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  titleVi: text("title_vi").notNull(),
  titleEn: text("title_en").notNull(),
  titleZh: text("title_zh").notNull(),
  category: text("category").notNull(),
  services: text("services").array().default([]),
  location: text("location").notNull(),
  scale: text("scale"),
  year: integer("year").notNull(),
  summaryVi: text("summary_vi"),
  summaryEn: text("summary_en"),
  summaryZh: text("summary_zh"),
  coverImage: text("cover_image"),
  gallery: text("gallery").array().default([]),
  content: jsonb("content"),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

// ============================================================================
// SERVICES TABLE
// ============================================================================

export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  nameVi: text("name_vi").notNull(),
  nameEn: text("name_en").notNull(),
  nameZh: text("name_zh").notNull(),
  descriptionVi: text("description_vi"),
  descriptionEn: text("description_en"),
  descriptionZh: text("description_zh"),
  icon: text("icon"),
  orderIndex: integer("order_index").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;

// ============================================================================
// TEAM TABLE
// ============================================================================

export const team = pgTable("team", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  roleVi: text("role_vi").notNull(),
  roleEn: text("role_en").notNull(),
  roleZh: text("role_zh").notNull(),
  bioVi: text("bio_vi"),
  bioEn: text("bio_en"),
  bioZh: text("bio_zh"),
  photo: text("photo"),
  orderIndex: integer("order_index").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type TeamMember = typeof team.$inferSelect;
export type NewTeamMember = typeof team.$inferInsert;

// ============================================================================
// INQUIRIES TABLE
// ============================================================================

export const inquiries = pgTable("inquiries", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  message: text("message").notNull(),
  attachments: text("attachments").array().default([]),
  status: text("status").default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;

// ============================================================================
// POSTS TABLE
// ============================================================================

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").unique().notNull(),
  titleVi: text("title_vi").notNull(),
  titleEn: text("title_en").notNull(),
  titleZh: text("title_zh").notNull(),
  summaryVi: text("summary_vi"),
  summaryEn: text("summary_en"),
  summaryZh: text("summary_zh"),
  content: jsonb("content"),
  coverImage: text("cover_image"),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

// ============================================================================
// CLIENTS TABLE
// ============================================================================

export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  website: text("website"),
  orderIndex: integer("order_index").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;

// ============================================================================
// RELATIONS
// ============================================================================

export const projectsRelations = relations(projects, ({}) => ({}));

export const servicesRelations = relations(services, ({}) => ({}));

export const teamRelations = relations(team, ({}) => ({}));

export const inquiriesRelations = relations(inquiries, ({}) => ({}));

export const postsRelations = relations(posts, ({}) => ({}));

export const clientsRelations = relations(clients, ({}) => ({}));

