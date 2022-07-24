const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://part3:${password}@cluster0.gaeqxja.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')
        if (process.argv.length > 3) {
            const person = new Person({
                name: process.argv[3],
                number: process.argv[4] || ''
            })
            return person.save()
        }

        if (process.argv.length === 3){
            Person.find({}).then(result => {
                result.forEach(person => {
                    console.log(person)
                })
                mongoose.connection.close()
                console.log('connection closed')
            })
        }
    })
    .then(() => {
        if (process.argv.length > 3) {
            mongoose.connection.close()
            console.log('connection closed')
        }
    })
    .catch((err) => console.log(err))