import { FC } from "react";

type LogHistory = {
  message: string;
  createdAt: string;
  users: Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    subscribed: string[];
    channels: string[];
  }>;
};

export const LogHistoryTable: FC<{ data: LogHistory[] }> = ({ data }) => {
  if (!data.length) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Users</th>
          <th>Message</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {data.map((log) => {
          return (
            <tr>
              <td>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>E-mail</th>
                      <th>Phone</th>
                      <th>Subscribed</th>
                      <th>Channels</th>
                    </tr>
                  </thead>
                  <tbody>
                    {log.users.map((user) => {
                      return (
                        <tr>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.subscribed.join(", ")}</td>
                          <td>{user.channels.join(", ")}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
              <td>{log.message}</td>
              <td>{log.createdAt}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
