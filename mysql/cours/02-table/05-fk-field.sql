-- Champ relationnel
ALTER TABLE articles
	ADD COLUMN id_user_article INT NOT NULL;

-- Foreign Key

ALTER TABLE articles
	ADD CONSTRAINT fk_user_article
	FOREIGN KEY (id_user_article)
	REFERENCES users(id_user)
	ON DELETE RESTRICT
	ON UPDATE RESTRICT;
