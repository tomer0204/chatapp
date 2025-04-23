import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Box,
	IconButton,
	Text,
	Badge,
	Flex,
	Avatar,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import notificationAtom from "../atoms/notificationAtom";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const NotificationDropdown = () => {
	const { unreadCount, notifications } = useRecoilValue(notificationAtom);
	const navigate = useNavigate();

	const handleClick = (notif) => {
		navigate(notif.link);
	};

	return (
		<Menu placement="bottom-end">
			<MenuButton
				as={IconButton}
				icon={<BellIcon />}
				variant="ghost"
				position="relative"
			>
				{unreadCount > 0 && (
					<Badge
						colorScheme="red"
						position="absolute"
						top="-1"
						right="-1"
						borderRadius="full"
						fontSize="0.7rem"
						px={1}
					>
						{unreadCount > 99 ? "99+" : unreadCount}
					</Badge>
				)}
			</MenuButton>

			<MenuList maxH="350px" overflowY="auto" minW="360px" boxShadow="lg" borderRadius="md">
				{notifications.length === 0 ? (
					<Box px={4} py={3}>
						<Text fontSize="sm" color="gray.500">
							No notifications yet.
						</Text>
					</Box>
				) : (
					notifications.map((notif, idx) => (
						<MenuItem
							key={idx}
							onClick={() => handleClick(notif)}
							_hover={{ bg: "gray.100" }}
							py={2}
							px={3}
							whiteSpace="normal"
						>
							<Flex align="center" gap={3}>
								<Avatar src={notif.avatar} size="sm" />
								<Box>
									<Text fontSize="sm">{notif.text}</Text>
									<Text fontSize="xs" color="gray.500">
										{dayjs(notif.createdAt).fromNow()}
									</Text>
								</Box>
							</Flex>
						</MenuItem>
					))
				)}
			</MenuList>
		</Menu>
	);
};

export default NotificationDropdown;
