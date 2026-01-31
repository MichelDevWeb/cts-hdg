-- HDG Website Database Schema
-- Initial migration: Create all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title_vi TEXT NOT NULL,
    title_en TEXT NOT NULL,
    title_zh TEXT NOT NULL,
    category TEXT NOT NULL,
    services TEXT[] DEFAULT '{}',
    location TEXT NOT NULL,
    scale TEXT,
    year INTEGER NOT NULL,
    client TEXT,
    summary_vi TEXT,
    summary_en TEXT,
    summary_zh TEXT,
    content_vi TEXT,
    content_en TEXT,
    content_zh TEXT,
    cover_image TEXT,
    gallery TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name_vi TEXT NOT NULL,
    name_en TEXT NOT NULL,
    name_zh TEXT NOT NULL,
    description_vi TEXT,
    description_en TEXT,
    description_zh TEXT,
    features_vi TEXT[] DEFAULT '{}',
    features_en TEXT[] DEFAULT '{}',
    features_zh TEXT[] DEFAULT '{}',
    icon TEXT,
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Site Information table (company contact info, etc.)
CREATE TABLE site_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value_vi TEXT,
    value_en TEXT,
    value_zh TEXT,
    value_plain TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team table
CREATE TABLE team (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role_vi TEXT NOT NULL,
    role_en TEXT NOT NULL,
    role_zh TEXT NOT NULL,
    bio_vi TEXT,
    bio_en TEXT,
    bio_zh TEXT,
    education_vi TEXT,
    education_en TEXT,
    education_zh TEXT,
    certifications_vi TEXT[] DEFAULT '{}',
    certifications_en TEXT[] DEFAULT '{}',
    certifications_zh TEXT[] DEFAULT '{}',
    photo TEXT,
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inquiries table (contact form submissions)
CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    message TEXT NOT NULL,
    attachments TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Posts table (news/blog)
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title_vi TEXT NOT NULL,
    title_en TEXT NOT NULL,
    title_zh TEXT NOT NULL,
    summary_vi TEXT,
    summary_en TEXT,
    summary_zh TEXT,
    content JSONB,
    cover_image TEXT,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients table
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    logo_url TEXT,
    website TEXT,
    category TEXT DEFAULT 'other',
    order_index INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_published ON projects(published);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_active ON services(active);
CREATE INDEX idx_site_info_key ON site_info(key);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_info_updated_at
    BEFORE UPDATE ON site_info
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

