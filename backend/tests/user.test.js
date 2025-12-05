import test from "node:test";
import assert from "node:assert";

import {
  NewUser,
  Login,
  DeleteUser,
  profile,
  Update_Usr,
} from "../controller/user_controller.js";

import UserModel from "../model/user.js";
import profileModel from "../model/profile.js";
import bcrypt from "bcrypt";

// mock token generator
const mockToken = "MOCK_TOKEN";
const token = () => mockToken;

// mock bcrypt
bcrypt.hash = async () => "HASHED_PASS";
bcrypt.compare = async () => true;

// mock database calls
UserModel.findOne = async () => null;
UserModel.findByIdAndDelete = async () => true;
UserModel.create = async (data) => ({ _id: "101", ...data });
UserModel.findById = async (id) => ({ _id: id, email: "test@example.com" });

profileModel.deleteOne = async () => true;
profileModel.findOneAndUpdate = async (q, data) => ({ _id: q.userId, ...data });

function mockRes() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
  };
}

test("DeleteUser → should delete a user", async () => {
  const req = { params: { id: "123" } };
  const res = mockRes();

  await DeleteUser(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.message, "Account deleted");
});

test("Login → success", async () => {
  UserModel.findOne = async () => ({
    _id: "101",
    email: "ajit@example.com",
    password: "HASHED_PASS",
  });

  const req = {
    body: { email: "ajit@example.com", password: "12345678" },
  };
  const res = mockRes();

  await Login(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.message, "User Login");
});

test("Login → wrong password", async () => {
  UserModel.findOne = async () => ({
    _id: "101",
    email: "ajit@example.com",
    password: "HASHED_PASS",
  });

  bcrypt.compare = async () => false; // wrong password

  const req = {
    body: { email: "ajit@example.com", password: "wrongPassword" },
  };
  const res = mockRes();

  await Login(req, res);

  assert.strictEqual(res.statusCode, 401);
  assert.strictEqual(res.body.message, "Invalid credentials");

  // reset bcrypt mock
  bcrypt.compare = async () => true;
});

test("NewUser → should create new user", async () => {
  UserModel.findOne = async () => null;

  const req = {
    body: {
      username: "ajit",
      email: "ajit@example.com",
      password: "12345678",
    },
  };
  const res = mockRes();

  await NewUser(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.message, "User create");
});

test("profile → should return user data", async () => {
  const req = { userId: "101" };
  const res = mockRes();

  await profile(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.profile._id, "101");
});

test("Update_Usr → profile updated", async () => {
  const req = {
    userId: "101",
    body: {
      name: "Ajit",
      nickname: "AJ",
      age: 25,
      phoneNumber: "9999999999",
    },
  };

  const res = mockRes();

  await Update_Usr(req, res);

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.message, "User profile updated");
});
