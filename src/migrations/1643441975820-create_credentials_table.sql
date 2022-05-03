CREATE TABLE IF NOT EXISTS credentials (
id UUID NOT NULL,
login VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
role VARCHAR(255) NOT NULL,
PRIMARY KEY(id)
);

CREATE INDEX login_index ON credentials(login);