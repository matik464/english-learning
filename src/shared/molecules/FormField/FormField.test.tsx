import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "../../atoms/Input";
import { FormField } from "./FormField";

function CustomField() {
  return <input />;
}

function NonForwardingWrapper({ id }: { id: string }) {
  return <input data-provided-id={id} />;
}

describe("FormField", () => {
  it("keeps label connected to existing child id", () => {
    render(
      <FormField label="Email">
        <input id="custom-email-id" />
      </FormField>,
    );

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("id", "custom-email-id");
  });

  it("generates id and connects label when child has no id", () => {
    render(
      <FormField label="First name">
        <input />
      </FormField>,
    );

    const input = screen.getByLabelText("First name");
    const label = screen.getByText("First name");

    expect(input).toHaveAttribute("id");
    expect(label).toHaveAttribute("for", input.getAttribute("id"));
  });

  it("sets aria-invalid only when error exists", () => {
    const { rerender } = render(
      <FormField label="Email">
        <input />
      </FormField>,
    );

    expect(screen.getByLabelText("Email")).not.toHaveAttribute("aria-invalid");

    rerender(
      <FormField label="Email" error="Invalid email">
        <input />
      </FormField>,
    );

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Invalid email")).toHaveAttribute("role", "alert");
  });

  it("connects hint and error with aria-describedby", () => {
    render(
      <FormField label="Email" hint="Use work email" error="Invalid email">
        <input />
      </FormField>,
    );

    const input = screen.getByLabelText("Email");
    const hint = screen.getByText("Use work email");
    const error = screen.getByText("Invalid email");

    expect(input).toHaveAttribute("aria-describedby", `${hint.id} ${error.id}`);
  });

  it("does not attach htmlFor when child is not form control", () => {
    render(<FormField label="Section label">Static content</FormField>);

    expect(screen.getByText("Section label")).not.toHaveAttribute("for");
  });

  it("does not attach htmlFor for custom component child without guaranteed forwarding", () => {
    render(
      <FormField label="Custom label">
        <CustomField />
      </FormField>,
    );

    expect(screen.getByText("Custom label")).not.toHaveAttribute("for");
  });

  it("connects label to compatible input component", () => {
    render(
      <FormField label="Email">
        <Input />
      </FormField>,
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("does not attach htmlFor when wrapper accepts id prop but does not forward it to input", () => {
    render(
      <FormField label="Wrapped Email">
        <NonForwardingWrapper id="memo-email-id" />
      </FormField>,
    );

    expect(screen.getByText("Wrapped Email")).not.toHaveAttribute("for");
  });
});
