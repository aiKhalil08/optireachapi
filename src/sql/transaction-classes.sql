CREATE TABLE IF NOT EXISTS transaction_class (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO transaction_class (name, description) VALUES
('Credit', 'Flow of funds into user account'),
('Debit', 'Flow of funds out of user account');

CREATE INDEX IF NOT EXISTS idx_transaction_class_name ON transaction_class(name);