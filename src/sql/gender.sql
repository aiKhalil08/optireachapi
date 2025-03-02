CREATE TABLE IF NOT EXISTS gender (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO gender (name, description) VALUES
('Male', 'Identifies as male'),
('Female', 'Identifies as female'),
('Non-binary', 'Identifies as neither exclusively male nor female'),
('Transgender', 'Gender identity differs from sex assigned at birth'),
('Genderqueer', 'Identity outside of the gender binary'),
('Genderfluid', 'Gender identity shifts between different genders'),
('Agender', 'Does not identify with any gender'),
('Bigender', 'Identifies as both male and female'),
('Other', 'Gender identity not listed above'),
('Prefer not to say', 'Prefers not to disclose gender identity');

CREATE INDEX IF NOT EXISTS idx_gender_name ON gender(name);