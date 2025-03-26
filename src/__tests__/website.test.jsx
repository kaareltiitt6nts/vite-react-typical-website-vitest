import React from "react";
import {test, expect, vi} from "vitest";
import {screen, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/Login/Login";
import Navbar from "../components/Navbar/Navbar";
import Navigation from "../components/Navigation/Navigation";
import AuthContext from "../store/AuthContext";

test("login on nähtav", () => {
  const {unmount} = render(<Login/>)

  const form = screen.queryByRole("form")

  expect(form).toBeDefined()

  unmount()
})

test('nupp peaks olema disabled kui väljad on tühjad', () => {
  render(<Login />);

  const button = screen.getByRole('button');

  expect(button.classList.contains("disabled")).toBeTruthy()
});

test('email ja password väljad peavad olema invalid kui sisestada vale email ja pw', async () => {
  const {unmount} = render(<Login />);

  const emailField = screen.getByLabelText("E-mail");
  const pwField = screen.getByLabelText("Password");

  await userEvent.type(emailField, "test")
  await userEvent.tab()
  await userEvent.type(pwField, "qwerty")
  await userEvent.tab()

  expect(emailField.parentElement.classList.contains("invalid")).toBeTruthy()
  expect(pwField.parentElement.classList.contains("invalid")).toBeTruthy()

  unmount()
});

test('email ja password väljad peavad olema valiidsed kui sisestada sobiv email ja pw', async () => {
  const {unmount} = render(<Login />);

  const emailField = screen.getByLabelText("E-mail");
  const pwField = screen.getByLabelText("Password");

  await userEvent.type(emailField, "test@gmail.com")
  await userEvent.tab()
  await userEvent.type(pwField, "turvalineparool123!")
  await userEvent.tab()

  expect(emailField.parentElement.classList.contains("invalid")).toBeFalsy()
  expect(pwField.parentElement.classList.contains("invalid")).toBeFalsy()

  unmount()
});

test("navigatsiooniriba peaks olema nähtav", () => {
  const {unmount} = render(<Navbar/>)

  const navbar = screen.getByRole("banner")

  expect(navbar).toBeDefined()

  unmount()
})

test("navigatsiooniribal peaks olema nähtav lehe nimi", () => {
  const {unmount} = render(<Navbar/>)

  const h1 = screen.getByRole("heading", {level: 1})

  expect(h1).not.toBeNull()

  unmount()
})

test('väljalogimise nupp peaks olema nähtav kui kasutaja on sisselogitud', () => {
  const contextValue = {
    loggedIn: true,
    onLogout: vi.fn(),
  }

  const {unmount} = render(
    <AuthContext.Provider value={contextValue}>
      <Navigation />
    </AuthContext.Provider>
  )

  const logoutButton = screen.getByText('Logout')
  expect(logoutButton).toBeDefined()

  unmount()
})

test('väljalogimise nupp ei tohiks tekkida kui kasutaja on väljalogitud', () => {
  const contextValue = {
    loggedIn: false,
    onLogout: vi.fn(),
  }

  const {unmount} = render(
    <AuthContext.Provider value={contextValue}>
      <Navigation />
    </AuthContext.Provider>
  )

  const logoutButton = screen.queryByText('Logout')
  expect(logoutButton).toBeNull()

  unmount()
})