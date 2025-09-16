import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputGroup } from "./input-group";
import { Input } from "../input";

const meta: Meta<typeof InputGroup> = {
  title: "Components/InputGroup",
  component: InputGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: [
      <Input key="1" placeholder="First input" />,
      <Input key="2" placeholder="Second input" />,
    ],
  },
};

export const WithButton: Story = {
  args: {
    children: [
      <Input key="1" placeholder="Search..." />,
      <button
        key="2"
        style={{
          padding: "8px 12px",
          background: "#1e90ff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Search
      </button>,
    ],
  },
};

export const ThreeInputs: Story = {
  args: {
    children: [
      <Input key="1" placeholder="First" />,
      <Input key="2" placeholder="Second" />,
      <Input key="3" placeholder="Third" />,
    ],
  },
};
