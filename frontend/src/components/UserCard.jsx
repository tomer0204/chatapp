import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
	return (
		<Link to={`/${user.username}`}>
			<Flex gap={4} alignItems={"center"} _hover={{ bg: "gray.900" }} p={4}>
				<Avatar size="md" name={user.name} src={user.profilePic} />
				<Box>
					<Text fontWeight="bold">{user.name}</Text>
					<Text fontSize="sm" color="gray.500">@{user.username}</Text>
				</Box>
			</Flex>
		</Link>
	);
};

export default UserCard;
