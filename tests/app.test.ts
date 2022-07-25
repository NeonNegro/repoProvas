import app from '../src/app.js';
import supertest from 'supertest';
import { prisma } from '../src/configs/database.js';
import userFactory from './factories/userFactory.js';
import { array } from 'joi';

const agent = supertest(app);

//beforeAll(() => { items.push('abacate'); });

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe("Test tests suit", ()=>{
  it('search tests by discipline', async  ()=>{
    const login = userFactory.createLogin();
    //await supertest(app).post(`/sign-up`).send(login);
    const user: any = await userFactory.createUser(login);
        
    const response_login = await supertest(app).post(`/sign-in`).send({
          email: user.email,
          password: user.plainPassword
        });
    const token = response_login.body.token;
    const response = await agent.get('/tests?groupBy=disciplines').set("Authorization",token);
    const status= response.status;
    expect(status).toEqual(200);
    //console.log(response.body);


  })

})

describe("User tests suit", () => {
    

    it("given email and password, create user", async () => {
        
        const login = userFactory.createLogin();

        const result = await agent.post("/sign-up").send(login);
        const status = result.status;
        
        expect(status).toEqual(201);

        const user = await prisma.user.findFirst({
            where: {email: login.email }
          });
      
          // checks user
          expect(user.email).toBe(login.email);
    });

    it("given an invalid input, returns 422", async () => {
        const login = userFactory.createLogin();
        delete login.password;
    
        const response = await supertest(app).post(`/sign-up`).send(login);
        expect(response.status).toBe(422);
      });
      
      it("given valid email and password, receive token", async () => {
        // SETUP
        const login = userFactory.createLogin();
        const user: any = await userFactory.createUser(login);
        
        const response = await supertest(app).post(`/sign-in`).send({
          email: user.email,
          password: user.plainPassword
        });
        const token = response.body.token;
        expect(token).not.toBeNull();
      });
    
      it("given invalid password, receive 401", async () => {
        // SETUP
        const login = userFactory.createLogin();
        const user = userFactory.createUser(login);
    
        const response = await supertest(app).post(`/sign-in`).send({...login, password: "outropassword"});
        expect(response.status).toBe(401);
      });

    it("given email and password already in use, fail to create user", async () => {
        // SETUP
        const login = userFactory.createLogin();
        await userFactory.createUser(login);
        
        const response = await supertest(app).post(`/sign-up`).send(login);
        expect(response.statusCode).toBe(409);
      })
});

// describe("POST /tasks", () => {
//     // ...

//     it("given an invalid task it should return 422", async () => {
//         const body = {}; // corpo inválido
//         const result = await supertest(app).post("/tasks").send(body);
//         const status = result.status;
//         expect(status).toEqual(422);
//     });
 
//     // ...
// });

// describe("POST /tasks", async () => {
//     // ...

//     it("given a task with duplicate title it should return 409", () => {
//         const body = {
//           title: 'Beber agua de novo',
//           description: 'Beba, agora',
//         };

//         const firstTry = await supertest(app).post("/tasks").send(body);
//         expect(firstTry.status).toEqual(201); // a primeira inserção vai funcionar

//         // se tentarmos criar uma task igual, deve retornar 409
//         const secondTry = await supertest(app).post("/tasks").send(body);
//         expect(secondTry.status).toEqual(409);
//     });
// });


// describe('POST /saudavel', () => {
//     it('returns 404 for invalid input', async () => {
//         const result = await supertest(app)
//             .post('/saudavel')
//             .send({})
//         expect(result.status).toEqual(404);
//     })

//     it('returns 204 for duplicate input', async () => {
//         const result = await supertest(app)
//             .post('/saudavel')
//             .send({ item: 'abacate' })
//         expect(result.status).toEqual(204);
//     })


//     it('returns 200 for valid input', async () => {
//         const result = await supertest(app)
//             .post('/saudavel')
//             .send({ item: 'inhame' })
//         expect(result.status).toEqual(200);
//     })
// })

afterAll(async () => {
    await prisma.$disconnect();
});