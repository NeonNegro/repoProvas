import { sumTwoNumbers, sumAllTotal, statusCodes } from '../src/app';
import app from '../src/app.js';
import supertest from 'supertest';

const agent = supertest(app);

beforeAll(() => { items.push('abacate'); });

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE receitas;`;
  });

describe("POST /tasks", () => {
    it("given a valid task it should return 201", async () => {
        const body = {
          title: 'Beber agua',
          description: 'Beba, agora',
        };

        const result = await supertest(app).post("/tasks").send(body);
        const status = result.status;
        
        expect(status).toEqual(201);
    });
});

describe("POST /tasks", () => {
    // ...

    it("given an invalid task it should return 422", async () => {
        const body = {}; // corpo inválido
        const result = await supertest(app).post("/tasks").send(body);
        const status = result.status;
        expect(status).toEqual(422);
    });
 
    // ...
});

describe("POST /tasks", async () => {
    // ...

    it("given a task with duplicate title it should return 409", () => {
        const body = {
          title: 'Beber agua de novo',
          description: 'Beba, agora',
        };

        const firstTry = await supertest(app).post("/tasks").send(body);
        expect(firstTry.status).toEqual(201); // a primeira inserção vai funcionar

        // se tentarmos criar uma task igual, deve retornar 409
        const secondTry = await supertest(app).post("/tasks").send(body);
        expect(secondTry.status).toEqual(409);
    });
});


describe('POST /saudavel', () => {
    it('returns 404 for invalid input', async () => {
        const result = await supertest(app)
            .post('/saudavel')
            .send({})
        expect(result.status).toEqual(404);
    })

    it('returns 204 for duplicate input', async () => {
        const result = await supertest(app)
            .post('/saudavel')
            .send({ item: 'abacate' })
        expect(result.status).toEqual(204);
    })


    it('returns 200 for valid input', async () => {
        const result = await supertest(app)
            .post('/saudavel')
            .send({ item: 'inhame' })
        expect(result.status).toEqual(200);
    })
})

afterAll(async () => {
    await prisma.$disconnect();
});