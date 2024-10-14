import "@testing-library/jest-dom";
import Link from "@/components/Sidebar/Link/Link";
import { act, render, screen } from "@testing-library/react";

test("renders a dashboard link", async () => {
  const component = (
    <Link
      href="/dashboard"
      title="Dashboard"
      svg={{
        name: "dashboard",
      }}
    />
  );

  await act(async () => {
    render(component);
  });

  const title = screen.getByText("Dashboard");
  expect(title).toBeInTheDocument();
});
