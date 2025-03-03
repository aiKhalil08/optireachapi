CREATE TABLE IF NOT EXISTS transaction_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO transaction_type (name, description) VALUES
('Deposit', 'Cash deposit into account'),
('Withdrawal', 'Cash withdrawal from account'),
('Transfer', 'Transfer of funds between accounts'),
('Data', 'Purchase of mobile data'),
('Airtime', 'Purchase of airtime'),
('Bills', 'Payment of bills');

CREATE INDEX IF NOT EXISTS idx_transaction_type_name ON transaction_type(name);