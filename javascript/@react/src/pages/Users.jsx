import React from "react";
import { UsersListApi } from "../components/UsersList";

export function UsersPage() {
	return <UsersListApi url={"https://jsonplaceholder.typicode.com/users"} />;
}
