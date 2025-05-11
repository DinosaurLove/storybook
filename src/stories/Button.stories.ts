import { Button } from "@/app/components";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import "@/app/globals.css";

const meta  = {
  component: Button,
  tags: ["autodocs"],
  title: "Button",
  parameters: { layout: "centered" },
  args: { onClick: action("clicked") },
  argTypes: { 
    backgroundColor: { control: "color" },
    type: { control: "select", options: ["secondary", "primary"] },
    size: { control: "select", options: ["large", "small", "medium"] }
  },
} satisfies Meta<typeof Button>

// Button type
export const Primary: Story = {
  args: {
    type: "primary",
    label: "Button",
    size: "large",
  },
};

export const Secondary: Story = {
  args: {
    type: "secondary",
    label: "Button",
    size: "large",
  },
};

// Button type
export const Small: Story = {
  args: {
    type: "secondary",
    size: "small",
    label: "Button",
  },
};

export const Medium: Story = {
  args: {
    type: "secondary",
    size: "medium",
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    type: "secondary",
    size: "large",
    label: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
