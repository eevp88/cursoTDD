/**
 * Tests for postHandlers endpoints.
 * Validates post creation and user existence logic.
 */
import { postHandlers } from "./index";
import type { Request, Response } from "express";
import type { AxiosInstance } from "axios";
import { mock } from "jest-mock-extended";
describe("Endpoints", () => {
  describe("post", () => {
    /**
     * Should create a post if userId exists.
     */
    it("should create", async () => {
      const mockUser = [{ id: 1 }, { id: 2 }];
      const post = {
        userId: 1,
        id: 1,
        title: "Titulo",
        body: "Cuerpo del post",
      };

      const req = mock<Request>();
      req.body = post;

      const res = mock<Response>();
      res.status.mockReturnThis();

      const axios =mock<AxiosInstance>();
      axios.get.mockResolvedValue({ data: mockUser });
      axios.post.mockResolvedValue({ data: { id: 1000 } });
      
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

    /**
     * Should not create a post if userId does not exist.
     */
    it("should not create if userId does not exist", async () => {
      const mockUser = [{ id: 1 }, { id: 2 }];
      const post = {
        userId: 3,
        id: 1,
        title: "Titulo",
        body: "Cuerpo del post",
      };

      const req = mock<Request>();
      req.body = post
      
      const res = mock<Response>();
      res.status.mockReturnThis();
      //res.send = jest.fn();
      (res.sendStatus as any) = jest.fn();

      const axios = mock<AxiosInstance>();
      axios.get.mockResolvedValue({ data: mockUser });
      axios.post.mockResolvedValue({ data: { id: 1000 } });

      await postHandlers({ axios }).post(req, res);
      expect(axios.post.mock.calls).toEqual([]);
      expect(res.sendStatus.mock.calls).toEqual([[400]]);
    });
  });
});
