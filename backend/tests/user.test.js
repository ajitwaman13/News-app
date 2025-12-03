import test from "node:test";
import assert from "node:assert";
import { DeleteUser } from "../controller/user_controller.js";
import UserModel from "../model/user.js";
import profileModel from "../model/profile.js";

UserModel.findByIdAndDelete = async () => true;
profileModel.deleteOne = async () => true;

test("DeleteUser simple test", async () => {
  const req = { params: { id: "123" } };
  const res = {
    code: null,
    data: null,
    status(c) { this.code = c; return this; },
    json(d) { this.data = d; return this; }
  };

  await DeleteUser(req, res);

  assert.strictEqual(res.code, 200);
  assert.strictEqual(res.data.message, "Account deleted");
});
