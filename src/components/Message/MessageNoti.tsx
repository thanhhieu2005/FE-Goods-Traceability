import { message } from "antd";

export const successMessage = (content: string, duration? : number) => {
  message.success(content, duration ?? 3);
};

export const errorMessage = (content: string, duration? : number) => {
  message.error(content, duration ?? 3);
};
