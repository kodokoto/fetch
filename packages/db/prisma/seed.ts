import { PrismaClient, TimeOfDay } from '@prisma/client'
import { time } from 'console'
const prisma = new PrismaClient()

// get schema from ./schema.prisma

async function main() {
  // seed new user with owner profile
  await prisma.sitter.create({
    data: {
      userId: 'user_1',
      name: 'Sitter 1',
      imageUrl: 'https://images.unsplash.com/photo-1610000000000-000000000000?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    },
  })

  await prisma.service.create({
    data: {
      Sitter: {
        connect: {
          userId: 'user_1',
        }
      },
      duration: 60,
      description: 'I will walk your dog for 60 minutes',
      petType: 'DOG',
      type: 'WALK',
      price: 20,
      availableTimes: {
        create: [
          {
            day: 'MONDAY',  
            time: 'MORNING',
          },
          {
            day: 'MONDAY',
            time: 'AFTERNOON',
          },
        ],        
      },
    },
  })

  // create new
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
