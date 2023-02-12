import { message } from "antd";

export const successMessage = (content: string) => {
  message.success(content, 1);
};

export const errorMessage = (content: string) => {
  message.error(content, 1);
};
