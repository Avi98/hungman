export class EmailExists extends Error {
  name = 'EmailExists';
}

export class UsernameExists extends Error {
  name = 'UsernameExists';
}

export class RoomNameExists extends Error {
  name = 'RoomNameExists';
}

export class RoomNotFound extends Error {
  name = 'RoomNotFound';
}

export class RoomMemberExists extends Error {
  name = 'RoomMemberExists';
}
