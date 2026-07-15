import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders with default text type", () => {
    render(<Input aria-label="Email" />);

    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("supports custom type", () => {
    render(<Input aria-label="Password" type="password" />);

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
  });

  it("calls onChange and passes typed value", async () => {
    const handleChange = vi.fn();
    render(<Input aria-label="Name" onChange={handleChange} />);

    const input = screen.getByRole("textbox", { name: "Name" });
    const user = userEvent.setup();
    await user.type(input, "John");

    expect(handleChange).toHaveBeenCalled();
    expect((input as HTMLInputElement).value).toBe("John");
  });

  it("applies disabled and readOnly props", () => {
    render(
      <Input
        aria-label="Field"
        disabled
        readOnly
        value="locked"
        onChange={() => {}}
      />,
    );

    const input = screen.getByRole("textbox", { name: "Field" });
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("readonly");
  });

  it("merges external className", () => {
    render(<Input aria-label="Styled field" className="custom-class" />);

    const input = screen.getByRole("textbox", { name: "Styled field" });
    expect(input.className).toContain("custom-class");
  });
});
