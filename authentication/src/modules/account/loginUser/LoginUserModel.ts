import { prisma } from '../../../database/prisma';

import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { MessagingAdapter } from "../../../application/adapters/messaging-adapter";

interface IAuthenticateUser {
  username: string;
  password: string;
}

export class AuthenticateUserModel {
  constructor(
    private messagingAdapter: MessagingAdapter,
  ) {}
  
  async execute({ username, password }: IAuthenticateUser) {
    const user = await prisma.users.findFirst({
      where: {
        username,
      },
    });
   
    if (!user) {
      throw new Error('Username or password invalid!');   
    }    
    
    if (user.blocked) {
      console.log('Username ' + username + ' blocked! Contact your System Administrator.');
      throw new Error('Username blocked! Contact your System Administrator.');   
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      await this.messagingAdapter.sendMessage('authentications.new-authorization', {
        user: {
          username: username,
          message: "access denied",
        }
      }) 
      
      const countFailed = user.failed + 1

      if (countFailed === 3) {
        const updateUser = await prisma.users.update({
          where: {
            username,
          },
          data: {
            blocked: true,
          },
        })
      }

      const updateUser = await prisma.users.update({
        where: {
          username,
        },
        data: {
          failed: countFailed,
        },
      })
            
      throw new Error('Username or password invalid!');
    }

    const token = sign({ username }, '739f8ebd49733117a132c34fe866bc09', {
      subject: user.id,
      expiresIn: '1d', // Validade do TOKEN de acesso
    })

    const updateUser = await prisma.users.update({
      where: {
        username,
      },
      data: {
        failed: 0,
      },
    })
             
    await this.messagingAdapter.sendMessage('authentications.new-authorization', {
      user: {
        username: username,
        message: "authenticated",
      }
    })       

    return token;
  }
}
