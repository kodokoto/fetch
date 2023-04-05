import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// get schema from ./schema.prisma

async function main() {
  // seed new user with owner profile
  await prisma.user.create({
    data: {
      email: 'modiibeats@gmail.com',
      googleId: '123456789',
      name: 'Modii',
      imageUrl: 'https:fakelink.com',
      ownerAccount: {
        create: {},
      },
    },
  })

  // seed new user with sitter profile
  await prisma.user.create({
    data: {
      email: 'sitter@gmail.com',
      googleId: '12345678910',
      name: 'Sitter',
      imageUrl: 'https:fakelink.com',
      sitterAccount: {
        create: {
          services: {
            create: {
              type: 'WALK',
              price: 20,
              description: 'I will walk your dog for 30 minutes',
              duration: 30,
              petType: 'DOG',
            },
          },
        },
      },
    },
  })

  // seed new booking using existing users
  await prisma.booking.create({
    data: {
      owner: {
        connect: {
          id: 1,
        },
      },
      sitter: {
        connect: {
          id: 2,
        },
      },
      services: {
        connect: {
          id: 1,
        },
      },
      status: 'PENDING',
      startDate: new Date(),
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
