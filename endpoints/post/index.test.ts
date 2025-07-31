import request from "supertest";
import { app }  from "../../index";
//import { request } from "express";

describe("Server", () => {
  describe("Endpoints", () => {
    describe("Post POST", () => {});
    it("create a new Post", async () => {
      const response = await request(app)
        .post("/")
        .send({ userId: 5 })
        .set("user_id", '1')
        .set("Content-Type", "application/json");
      
      expect(response.statusCode).toEqual(201);
      expect(response.body.userId).toEqual(5)
      expect(response.body).toHaveProperty("id");

      //console.log(response); // Aquí puedes ver la respuesta
      // Puedes agregar expect(response.status).toBe(201) o lo que corresponda
    });

    it("does not create a new Post", async () => {
      const response = await request(app)
        .post("/")
        .send({ userId: 100 })
        .set("user_id", '1')
        .set("Content-Type", "application/json");
      
      expect(response.statusCode).toEqual(400);
      //expect(response.body.userId).toEqual(5)
      //expect(response.body).toHaveProperty("id");
    });

  });
});
