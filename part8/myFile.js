
const resolvers = {
    Query: {
      personCount: async () => Person.collection.countDocuments(),
      allPersons: async (root, args) => {
        // filters missing
        return Person.find({})
      },
      findPerson: async (root, args) => Person.findOne({ name: args.name }),
    },
    Person: {
      address: (root) => {
        return {
          street: root.street,
          city: root.city,
        }
      },
    },
    Mutation: {
      addPerson: async (root, args) => {
        const person = new Person({ ...args })
        return person.save()
      },
      editNumber: async (root, args) => {
        const person = await Person.findOne({ name: args.name })
        person.phone = args.phone
        return person.save()
      },
    },
  }