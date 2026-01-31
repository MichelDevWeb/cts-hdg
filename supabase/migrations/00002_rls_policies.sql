-- Row Level Security Policies
-- Public read access for published content, authenticated write access

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_info ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Public can view published projects"
    ON projects FOR SELECT
    USING (published = true);

CREATE POLICY "Authenticated users can manage projects"
    ON projects FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Services policies
CREATE POLICY "Public can view services"
    ON services FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage services"
    ON services FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Team policies
CREATE POLICY "Public can view team"
    ON team FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage team"
    ON team FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Inquiries policies
CREATE POLICY "Anyone can create inquiries"
    ON inquiries FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view inquiries"
    ON inquiries FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Authenticated users can update inquiries"
    ON inquiries FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Posts policies
CREATE POLICY "Public can view published posts"
    ON posts FOR SELECT
    USING (published = true);

CREATE POLICY "Authenticated users can manage posts"
    ON posts FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Clients policies
CREATE POLICY "Public can view clients"
    ON clients FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage clients"
    ON clients FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Site Info policies
CREATE POLICY "Public can view site info"
    ON site_info FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can manage site info"
    ON site_info FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Storage policies for project images
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Allow public read" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'project-images');

CREATE POLICY "Allow authenticated updates" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'project-images');

CREATE POLICY "Allow authenticated deletes" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'project-images');

