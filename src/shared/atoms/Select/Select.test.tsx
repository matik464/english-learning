import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

describe("Select", () => {
  it("renders options", () => {
    render(
      <Select aria-label="Document type" defaultValue="id">
        <option value="id">ID</option>
        <option value="proof_of_income">Proof of income</option>
      </Select>,
    );

    const select = screen.getByRole("combobox", { name: "Document type" });
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("id");
  });

  it("calls onChange", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Select aria-label="Document type" defaultValue="id" onChange={onChange}>
        <option value="id">ID</option>
        <option value="proof_of_income">Proof of income</option>
      </Select>,
    );

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Document type" }),
      ["proof_of_income"],
    );

    expect(onChange).toHaveBeenCalled();
    expect(screen.getByRole("combobox", { name: "Document type" })).toHaveValue(
      "proof_of_income",
    );
  });

  it("merges external className", () => {
    render(
      <Select aria-label="Type" className="custom-class" defaultValue="id">
        <option value="id">ID</option>
      </Select>,
    );

    expect(screen.getByRole("combobox", { name: "Type" }).className).toContain(
      "custom-class",
    );
  });
});
