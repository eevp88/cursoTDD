import { handlers as users } from ".";

describe("Endpoints", () => {
  describe("Users", () => {
    describe("Get", () => {
      it("return users Json", async () => {
        const axios = {
          get: jest.fn().mockResolvedValue({ data: 1 }),
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };

        await users({ axios }).get({}, res);
        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([["1"]]);
      });
    });
    describe("Post", () => {
      it("create user", async () => {
        const axios = {
          post: jest.fn().mockResolvedValue({ data: 1 }),
        };
        const req = {
          body: "resquest body",
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };
        await users({ axios }).post(req, res);

        expect(res.status.mock.calls).toEqual([[201]]);
        expect(res.send.mock.calls).toEqual([[1]]);
        expect(axios.post.mock.calls).toEqual([
          ["https://jsonplaceholder.typicode.com/users", "resquest body"],
        ]);
      });
    });

    describe("Put", () => {
      it("update user", async () => {
        const req = {
          body: "resquest body",
          params: {
            id: 12,
          },
        };
        const res = {
          sendStatus: jest.fn(),
        };

        const axios = {
          put: jest.fn().mockResolvedValue({ data: 1 }),
        };

        await users({ axios }).put(req, res);

        expect(axios.put.mock.calls).toEqual([
          ["https://jsonplaceholder.typicode.com/users/12", "resquest body"],
        ]);
        expect(res.sendStatus.mock.calls).toEqual([[204]]);
      });
    });

    describe("Delete", () => {
      it("Delete user", async () => {
        const req = {
          params: {
            id: 54,
          },
        };
        const res = {
          sendStatus: jest.fn(),
        };

        const axios = {
          delete: jest.fn(),
        };

        await users({ axios }).delete(req, res);

        expect(axios.delete.mock.calls).toEqual([
          ["https://jsonplaceholder.typicode.com/users/54"],
        ]);

        expect(res.sendStatus.mock.calls).toEqual([[204]]);
      });
    });
  });
});
