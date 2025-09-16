import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "This input is disabled",
    disabled: true,
  },
};
