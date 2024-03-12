////////////////

export const Komponenta = ({ user }) => {
	return (
		<>
			<div>
				{user.name} -- {user.email}{" "}
			</div>
		</>
	);
};
