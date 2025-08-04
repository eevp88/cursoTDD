/**
 * Tests for the authenticate middleware.
 * Checks behavior based on the value returned by req.header("user_id").
 */
import { mock } from "jest-mock-extended";
import type { Request, Response  } from "express";

import { authenticate } from "./authenticate";


describe("Middlewares", () => {
  describe("Authenticate", () => {
    /**
     * Should allow access if the user id is 1.
     */
    it("Should have id 1", () => {
      const req = mock<Request>()
      req.header.mockReturnValue('1');

      const res = mock<Response>();
      //res.status = 
      (res.sendStatus as any) = jest.fn();

      const next = jest.fn()
      authenticate(req, res, next);

      //console.log(res.sendStatus.mock.calls);
      expect(req.header.mock.calls).toEqual([["user_id"]]);
      expect(res.sendStatus.mock.calls).toEqual([]);
      expect(next.mock.calls).toEqual([[]]);
    });
    /**
     * Should deny access if the user id is not 1.
     */
    it("Should fail if user is not one", () => {
      const req = mock<Request>();
      req.header.mockReturnValue('2');

      const res = mock<Response>();
      (res.sendStatus as any) = jest.fn();
      
      const next = jest.fn();
 
      authenticate(req, res, next);

      expect(req.header.mock.calls).toEqual([["user_id"]]);
      expect(res.sendStatus.mock.calls).toEqual([[403]]);
      expect(next.mock.calls).toEqual([]);
    });
  });
});
