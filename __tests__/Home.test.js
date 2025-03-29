import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../app/page"; // Adjust the import based on your file structure
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from 'react';


jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home Page", () => {
  let mockRouter;

  beforeEach(() => {
    mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
  });

  test("renders welcome message and sign-in button", () => {
    useSession.mockReturnValue({ data: null, status: "unauthenticated" });

    render(<Home />);

    expect(
      screen.getByText("Welcome to the To-Do App")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please sign in to manage your tasks.")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign in/i })).toBeInTheDocument();
  });

  test("redirects authenticated users to /dashboard", () => {
    useSession.mockReturnValue({
      data: { user: { name: "Aftab" } },
      status: "authenticated",
    });

    render(<Home />);

    expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
  });

  test("does not redirect unauthenticated users", () => {
    useSession.mockReturnValue({ data: null, status: "unauthenticated" });

    render(<Home />);

    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  test("sign-in button should have correct text", () => {
    useSession.mockReturnValue({ data: null, status: "unauthenticated" });

    render(<Home />);
    
    const signInButton = screen.getByRole("link", { name: /sign in/i });
    expect(signInButton).toHaveTextContent("Sign In");
  });

  test("sign-in button navigates to /authForm", async () => {
    useSession.mockReturnValue({ data: null, status: "unauthenticated" });

    render(<Home />);
    
    const signInButton = screen.getByRole("link", { name: /sign in/i });
    expect(signInButton).toHaveAttribute("href", "/authForm");
  });
});
