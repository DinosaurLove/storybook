import { isEmpty } from "lodash";
import { Table } from "@/app/components";
import mocks from "@/stories/mocks.json";
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { IBodyData, ITableProps } from "@/app/components/Table";

const meta: Meta<typeof Table> = {
  title: "Table",
  component: Table,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {},
  argTypes: {
    onActiveAll: {
      action: "onActiveAll",
      description: "Callback when select-all checkbox is toggled",
    },
    zebra: { control: "boolean" },
    isActiveAll: { control: "boolean" },
    onActiveRows: {
      action: "onActiveAll",
      description: "Callback when select-all checkbox is toggled",
    },
    showCheckbox: { control: "boolean" },
    headerTitleColor: { control: "color" },
    headerBackgroundColor: { control: "color" },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Normal: Story = {
  args: {
    body: mocks.tableBody,
    header: mocks.tableHead,
  },
};

const CheckboxEnabledRender = (args: ITableProps) => {
  const [{ isActiveAll, body }, updateArgs] = useArgs<ITableProps>();

  const onActiveAll = (value: boolean) => {
    if (isEmpty(body)) return;
    updateArgs({ isActiveAll: value });
  };

  const onActiveRow = (rows: IBodyData[]) => {
    console.log(rows, "ROWS active");
  };

  return (
    <Table
      {...args}
      body={body}
      onActiveAll={onActiveAll}
      onActiveRows={onActiveRow}
      isActiveAll={isActiveAll}
    />
  );
};

export const CheckboxEnabled: Story = {
  args: {
    zebra: true,
    isActiveAll: false,
    showCheckbox: true,
    body: mocks.tableBody,
    header: mocks.tableHead,
  },
  render: CheckboxEnabledRender,
};
