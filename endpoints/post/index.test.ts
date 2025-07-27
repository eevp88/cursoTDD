import { postHandlers } from "./index";
describe("Endpoints", () => {
  describe("post", () => {
    it("should create", async () => {
      const mockUser = [{ id: 1 }, { id: 2 }];
      const post = {
        userId: 1,
        id: 1,
        title: "Titulo",
        body: "Cuerpo del post",
      };

      const req = {
        body: post,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      const axios = {
        get: jest.fn().mockResolvedValue({ data: mockUser }),
        post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
      };

      await postHandlers({ axios }).post(req, res);
      expect(res.status.mock.calls).toEqual([[201]]);
      expect(res.send.mock.calls).toEqual([[{ id: 1000 }]]);
      expect(axios.get.mock.calls).toEqual([
        ["https://jsonplaceholder.typicode.com/users"],
      ]);
      expect(axios.post.mock.calls).toEqual([
        ["https://jsonplaceholder.typicode.com/posts", post],
      ]);
    });

    it("should not create if userId does not exist", async () => {
      const mockUser = [{ id: 1 }, { id: 2 }];
      const post = {
        userId: 3,
        id: 1,
        title: "Titulo",
        body: "Cuerpo del post",
      };

      const req = {
        body: post,
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        sendStatus: jest.fn(),
      };
      const axios = {
        get: jest.fn().mockResolvedValue({ data: mockUser }),
        post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
      };

      await postHandlers({ axios }).post(req, res);
      expect(axios.post.mock.calls).toEqual([]);
      expect(res.sendStatus.mock.calls).toEqual([[400]]);
    });
  });
});
