-- SQLite Database Schema for Engage Application

-- Users table for authentication and admin roles
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE,
    description TEXT,
    Home_Desc TEXT,
    Services_page_desc TEXT,
    features TEXT,
    headline TEXT,
    headline_desc TEXT,
    headline1 TEXT,
    headline1_desc TEXT,
    headline2 TEXT,
    headline2_desc TEXT,
    show_home_page BOOLEAN DEFAULT FALSE,
    service_logo TEXT,
    video_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Images table
CREATE TABLE IF NOT EXISTS Images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url TEXT NOT NULL,
    title TEXT,
    service_id INTEGER,
    is_screen BOOLEAN DEFAULT FALSE,
    image_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Contact requests table
CREATE TABLE IF NOT EXISTS contact_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Outdoor locations table
CREATE TABLE IF NOT EXISTS outdoor_locations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    img_url TEXT NOT NULL,
    location TEXT NOT NULL,
    size TEXT,
    type TEXT,
    outdoor_slug TEXT NOT NULL CHECK (outdoor_slug IN ('static', 'screen')),
    img_order INTEGER DEFAULT 0,
    pixel TEXT,
    duration TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Market news table
CREATE TABLE IF NOT EXISTS Market_news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    event_date DATETIME NOT NULL,
    desc TEXT,
    viewHomepage BOOLEAN DEFAULT FALSE,
    hidden BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_images_service_id ON Images(service_id);
CREATE INDEX IF NOT EXISTS idx_images_order ON Images(image_order);
CREATE INDEX IF NOT EXISTS idx_outdoor_slug ON outdoor_locations(outdoor_slug);
CREATE INDEX IF NOT EXISTS idx_outdoor_order ON outdoor_locations(img_order);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_market_news_date ON Market_news(event_date);

-- Insert default admin user (password: admin123)
INSERT OR IGNORE INTO users (email, password_hash, is_admin) 
VALUES ('admin@opzoptimize.com', '$2b$10$rQZ8K9mN2pL3sT4uV5wX6yZ7aB8cD9eF0gH1iJ2kL3mN4oP5qR6sT7uV8wX9yZ', TRUE);

-- Insert default services
INSERT OR IGNORE INTO services (id, name, slug, description, Home_Desc, Services_page_desc, show_home_page) VALUES 
(1, 'Creative Services', 'creative-services', 'Creative design and branding services', 'Creative design and branding services', 'Creative design and branding services', TRUE),
(2, 'Digital Marketing', 'digital-marketing', 'Digital marketing and social media management', 'Digital marketing and social media management', 'Digital marketing and social media management', TRUE),
(3, 'Events', 'events', 'Event planning and management', 'Event planning and management', 'Event planning and management', TRUE),
(4, 'Outdoor Advertising', 'outdoor-advertising', 'Outdoor advertising solutions', 'Outdoor advertising solutions', 'Outdoor advertising solutions', TRUE),
(5, 'TV Production', 'tv-production', 'Television production services', 'Television production services', 'Television production services', TRUE),
(6, 'Web Development', 'web-development', 'Web development and design', 'Web development and design', 'Web development and design', TRUE);
