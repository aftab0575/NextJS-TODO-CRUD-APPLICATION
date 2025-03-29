import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../app/dashboard/page";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// ✅ Global fetch mock for all tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]), // Returning an empty task list by default
  })
);

describe("Dashboard Page", () => {
  let mockRouter;

  beforeEach(() => {
    mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
    fetch.mockClear();
  });

  test("redirects unauthenticated users to /authForm", () => {
    useSession.mockReturnValue({ data: null, status: "unauthenticated" });

    render(<Dashboard />);

    expect(mockRouter.push).toHaveBeenCalledWith("/authForm");
  });

  test("renders Dashboard heading for authenticated users", () => {
    useSession.mockReturnValue({
      data: { user: { name: "Aftab" } },
      status: "authenticated",
    });

    render(<Dashboard />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  test("fetches and displays tasks from API", async () => {
    useSession.mockReturnValue({
      data: { user: { name: "Aftab" } },
      status: "authenticated",
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: "1", title: "Learn Jest" }],
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Learn Jest")).toBeInTheDocument();
    });
  });

  test("adds a new task", async () => {
    useSession.mockReturnValue({
      data: { user: { name: "Aftab" } },
      status: "authenticated",
    });
  
    // Mock fetch response for task addition
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "2", title: "New Task" }),
    });
  
    render(<Dashboard />);
  
    const input = screen.getByPlaceholderText("New Task");
    const addButton = screen.getByText("Add Task");
  
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);
  
    // Wait for the task to appear in the DOM
    await waitFor(() => {
      expect(screen.findByText("New Task")).resolves.toBeInTheDocument();
  });
  
  });
  

  test("deletes a task", async () => {
    useSession.mockReturnValue({
      data: { user: { name: "Aftab" } },
      status: "authenticated",
    });

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: "3", title: "Delete Task" }],
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Delete Task")).toBeInTheDocument();
    });

    fetch.mockResolvedValueOnce({ ok: true });
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("Delete Task")).not.toBeInTheDocument();
    });
  });

  test("has a sign-out button", () => {
    useSession.mockReturnValue({
      data: { user: { name: "Aftab" } },
      status: "authenticated",
    });

    render(<Dashboard />);

    const signOutButton = screen.getByText("Sign Out");
    expect(signOutButton).toBeInTheDocument();

    fireEvent.click(signOutButton);
    expect(signOut).toHaveBeenCalled();
  });
});
