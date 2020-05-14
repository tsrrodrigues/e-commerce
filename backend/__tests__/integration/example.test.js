
/// NOT WORKING YET


const {MongoClient} = require('mongodb');

const faker = require("faker");
 
describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
        db = connection.db();
    });
    
    afterAll(async () => {
        await connection.close();
    });

    it("check user registration with all fields correctly filled.", async () => {
        const users = db.collection('users');

        const first = faker.name.firstName();
        const last = faker.name.lastName();
        const name = {first, last}

        const image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        const email = faker.internet.email().toLowerCase();
        const password = faker.internet.password();
        const cpf = '00000000001'
        const phone = '00000000000'

        const cep = '00000001'
        const logradouro = 'Area Especial de Industria Projecao A - UNB'
        const bairro = 'Setor Leste (Gama)'
        const localidade = 'Brasilia'
        const uf = 'df'
        const adress = {cep, logradouro, bairro, localidade, uf}

        const mockUser = { name, email, cpf, phone, adress, password, image }

        await users.insertOne(mockUser);
        const insertedUser = await users.findOne({_id: 'some-user-id'})

        expect(response.error).toBe('aaaa')
        expect(response.statusCode).toBe(200);
        expect(insertedUser).toEqual(mockUser);
    });
});

describe ("Authentication", () => {
    it('should sum two numbers', () => {
        const x = 2
        const y = 3
        const sum = x + y

        expect(sum).toBe(5)
    })
})