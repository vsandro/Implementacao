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
  
  message = "authenticated"

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
      console.log('Username ' + username + ' blocked!');
      throw new Error('Username blocked!');   
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      await this.messagingAdapter.sendMessage('authentications.new-authorization', {
        user: {
          username: username,
          message: "access denied",
        }
      })  
      
      const record = await prisma.records.create({
        data: {
          username,
          message: "access denied",
        },
      })
        
      throw new Error('Username or password invalid!');
    }

    const token = sign({ username }, '739f8ebd49733117a132c34fe866bc09', {
      subject: user.id,
      expiresIn: '1d', // Validade do TOKEN de acesso
    })

    await this.messagingAdapter.sendMessage('authentications.new-authorization', {
      user: {
        username: username,
        message: "authenticated",
      }
    })      
    
    // const record = await prisma.records.create({
    //   data: {
    //     username,
    //     message: "authenticated",
    //   },
    // })

    return token;
  }
}
