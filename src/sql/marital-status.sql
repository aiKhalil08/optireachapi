CREATE TABLE IF NOT EXISTS marital_status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO marital_status (name, description) VALUES
('Single', 'Never married'),
('Married', 'Legally married'),
('Divorced', 'Legally divorced'),
('Separated', 'Legally separated but not divorced'),
('Widowed', 'Spouse is deceased'),
('Domestic Partnership', 'In a registered domestic partnership or civil union'),
('Common Law', 'In a common law marriage where recognized'),
('Annulled', 'Marriage has been legally declared null and void'),
('Other', 'Marital status not listed above'),
('Prefer not to say', 'Prefers not to disclose marital status');

CREATE INDEX IF NOT EXISTS idx_marital_status_name ON marital_status(name);