<?php
class Message
{
	private  int $id_message;
	private  string $content;
	private  int $id_user;
	private  PDO $pdo;

	/*
	public function __construct(int $nouvelleIdMessage,  string $nouvelleContent,   int $nouvelleIdUser , PDO $nouvellePdo)
    {
        $this->id_message = $nouvelleIdMessage;
        $this->content = $nouvelleContent;
        $this->id_user = $nouvelleIdUser;
        $this->pdo= $nouvellePdo;
    }
	*/

	public function __construct(PDO $nouvellePdo)
	{
		$this->pdo = $nouvellePdo;
	}

	public function getIdMessage(): int
	{
		return $this->id_message;
	}

	public function getContent(): string
	{
		return $this->content;
	}

	public function getUser(): int
	{
		return $this->id_user;
	}
	public function setContent(string $nouvelleContent): void
	{
		$this->content = $nouvelleContent;
	}

	public function setUser(int $nouveauId): void
	{
		$this->id_user = $nouveauId;
	}
	public function setIdMessage(string $nouvelleIdMessage): void
	{
		$this->id_message = $nouvelleIdMessage;
	}

	public function SaveMessage(
		int $id_user_message,
		string $text
	): bool {
		$req = $this->pdo->prepare('INSERT INTO messages (text, user_id) VALUES(:text, :user_id)');
		return $req->execute(array(
			'text' => $text,
			'user_id' => $id_user_message,
		));
	}
	public  function ShowLastMessage(int $id_message): PDOStatement
	{
		return $this->pdo->query(
			"SELECT * FROM messages LEFT JOIN users ON users.id_user = messages.user_id LIMIT 5 OFFSET $id_message"
		);
	}

	public function __toString()
	{
		return "Message [ID: {$this->id_message}, Content: {$this->content}, User: {$this->id_user}]";
	}
}
